package com.draftbash.features.drafts.repositories;

import com.draftbash.features.drafts.dtos.DraftDTO;
import com.draftbash.features.drafts.dtos.DraftPickDTO;
import com.draftbash.features.drafts.dtos.DraftUserDTO;
import com.draftbash.features.drafts.dtos.QueuedPlayerDTO;
import com.draftbash.features.drafts.dtos.football.FootballDraftCreationRequestDTO;
import com.draftbash.features.drafts.dtos.football.FootballDraftDTO;
import com.draftbash.features.drafts.dtos.football.FootballDraftSettingsDTO;
import com.draftbash.features.drafts.dtos.football.QueuedFootballPlayerDTO;
import com.draftbash.features.drafts.interfaces.IDraftOrderGenerator;
import com.draftbash.features.drafts.interfaces.IFootballDraftRepository;
import com.draftbash.features.drafts.utils.draftorders.DraftOrderGeneratorFactory;
import com.draftbash.features.players.dtos.PlayerDTO;
import com.draftbash.features.players.dtos.football.FootballPlayerDTO;
import com.draftbash.features.players.dtos.football.FootballTeamDTO;
import com.draftbash.features.players.dtos.football.KickerProjection;
import com.draftbash.features.players.dtos.football.SkillPlayerProjection;
import com.draftbash.features.players.dtos.football.TeamDefenseProjection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.sql.DataSource;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * Interface for the Draft repository.
 */
@Repository
public class FootballDraftRepository implements IFootballDraftRepository {

    private final NamedParameterJdbcTemplate db;

    private final DraftOrderGeneratorFactory draftOrderGeneratorFactory;

    public FootballDraftRepository(DataSource dataSource) {
        this.db = new NamedParameterJdbcTemplate(dataSource);
        this.draftOrderGeneratorFactory = new DraftOrderGeneratorFactory();
    }

    @Override
    @Transactional
    public void dequeuePlayer(int draftId, int dequeuedByUserId, int playerId) {
        Map<String, Object> params = new HashMap<>();
        params.put("draft_id", draftId);
        params.put("player_id", playerId);
        params.put("user_id", dequeuedByUserId);
        db.update("""
            DELETE FROM player_queue
            WHERE draft_id = :draft_id AND player_id = :player_id AND queued_by_user_id = :user_id;
            """, params);
        db.update("""
            WITH ordered_ranks AS (
                SELECT 
                    draft_id,
                    player_id,
                    queued_by_user_id,
                    rank,
                    ROW_NUMBER() OVER (
                        PARTITION BY draft_id, queued_by_user_id ORDER BY rank) AS new_rank
                FROM player_queue
                WHERE draft_id = :draft_id
                ORDER BY rank ASC
            )
            UPDATE player_queue
            SET rank = ordered_ranks.new_rank
            FROM ordered_ranks
            WHERE player_queue.draft_id = ordered_ranks.draft_id
            AND player_queue.player_id = ordered_ranks.player_id
            AND player_queue.queued_by_user_id = ordered_ranks.queued_by_user_id;
            """, params);
    }

    @Override
    public void enqueuePlayer(int draftId, int enqueuedByUserId, int playerId, int rank) {
        Map<String, Object> params = new HashMap<>();
        params.put("draft_id", draftId);
        params.put("player_id", playerId);
        params.put("queued_by_user_id", enqueuedByUserId);
        params.put("rank", rank);
        
        db.update("""
            INSERT INTO player_queue (draft_id, player_id, queued_by_user_id, rank)
            VALUES (:draft_id, :player_id, :queued_by_user_id, :rank)
            ON CONFLICT (draft_id, player_id, queued_by_user_id) DO UPDATE
            SET rank = EXCLUDED.rank
            """, params);
    }

    @Override
    public void startDraft(int draftId) {
        final String SQL = """
                UPDATE draft
                SET is_started = TRUE
                WHERE id = :draft_id;
                """;
        Map<String, Object> params = new HashMap<>();
        params.put("draft_id", draftId);
        db.update(SQL, params);
    }

    @Override
    @Transactional
    public void pickPlayer(int draftId, DraftPickDTO draftPick) {
        Map<String, Object> params = new HashMap<>();
        params.put("draft_id", draftId);
        params.put("player_id", draftPick.player().id());
        params.put("pick_number", draftPick.pickNumber());
        params.put("picked_by_team_number", draftPick.teamNumber());
        db.update("""
            UPDATE draft_pick
            SET player_id = :player_id
            WHERE draft_id = :draft_id 
                AND picked_by_team_number = :picked_by_team_number
                AND pick_number = :pick_number;
            """, params);
        db.update("""
            DELETE FROM player_queue
            WHERE draft_id = :draft_id  AND player_id = :player_id;
            """, params);
    }

    @Override
    public List<DraftUserDTO> getDraftUsers(int draftId) {
        final String DRAFT_USERS_SQL = """
            SELECT 
                user_id,
                username,
                draft_id, 
                is_auto_drafting, 
                is_admin,
                (
                    SELECT picked_by_team_number
                    FROM draft_pick 
                    WHERE draft_id = :draft_id AND picked_by_user_id = user_id
                    LIMIT 1
                ) AS team_number
            FROM draft_user
            INNER JOIN user_account ON draft_user.user_id = user_account.id
            WHERE draft_id = :draft_id;
            """;
        final String QUEUED_PLAYERS_SQL = """
            SELECT pq.player_id, pq.queued_by_user_id, pq.rank, 
                t.id AS team_id, t.team_name, t.team_city, t.team_abbreviation, t.conference, 
                t.division, t.logo_url, t.wins, t.losses, t.ties, t.current_win_streak, 
                t.bye_week, p.first_name, p.last_name, np.is_quarterback, np.is_running_back, 
                np.is_wide_receiver, np.is_tight_end, np.is_kicker, np.is_team_defense
            FROM player_queue AS pq
            INNER JOIN player AS p ON pq.player_id = p.id
            INNER JOIN nfl_player AS np ON pq.player_id = np.player_id
            INNER JOIN nfl_team AS t ON np.team_id = t.id
            WHERE draft_id = :draft_id
            ORDER BY pq.rank ASC;
            """;
        Map<String, Object> params = new HashMap<>();
        params.put("draft_id", draftId);
        List<QueuedPlayerDTO> queuedPlayers = db.query(
            QUEUED_PLAYERS_SQL, params, (rowSets, rowNum) -> {
                return new QueuedFootballPlayerDTO(
                    rowSets.getInt("rank"),
                    rowSets.getInt("queued_by_user_id"),
                    new FootballPlayerDTO(
                        rowSets.getInt("player_id"),
                        0,
                        "footballPlayer",
                        0,
                        0,
                        0,
                        rowSets.getString("first_name"),
                        rowSets.getString("last_name"),
                        0,
                        0,
                        0,
                        "",
                        0,
                        rowSets.getBoolean("is_quarterback"),
                        rowSets.getBoolean("is_running_back"),
                        rowSets.getBoolean("is_wide_receiver"),
                        rowSets.getBoolean("is_tight_end"),
                        rowSets.getBoolean("is_kicker"),
                        rowSets.getBoolean("is_team_defense"),
                        "",
                        new FootballTeamDTO(
                            rowSets.getInt("team_id"),
                            rowSets.getString("team_name"),
                            rowSets.getString("team_city"),
                            rowSets.getString("team_abbreviation"),
                            rowSets.getString("conference"),
                            rowSets.getString("division"),
                            "",
                            rowSets.getInt("wins"),
                            rowSets.getInt("losses"),
                            rowSets.getInt("ties"),
                            rowSets.getInt("current_win_streak"),
                            rowSets.getInt("bye_week")),
                            null,
                            null,
                            null));
            });
        List<DraftUserDTO> draftUsers = db.query(DRAFT_USERS_SQL, params, (rowSets, rowNum) -> {
            return new DraftUserDTO(
                rowSets.getInt("user_id"),
                rowSets.getString("username"),
                rowSets.getInt("draft_id"),
                rowSets.getInt("team_number"),
                rowSets.getBoolean("is_admin"),
                rowSets.getBoolean("is_auto_drafting"),
                queuedPlayers.stream()
                    .filter(player -> {
                        try {
                            return player.queuedByUserId() == rowSets.getInt("user_id");
                        } catch (SQLException e) {
                            return false;
                        }
                    })
                    .toList());
        });
        return draftUsers;
    }

    @Override
    @Transactional
    public void claimTeam(int userId, int teamNumber, int draftId) {
        Map<String, Object> params = new HashMap<>();
        params.put("user_id", userId);
        params.put("team_number", teamNumber);
        params.put("draft_id", draftId);
        try {
            db.update("""
                    INSERT INTO draft_user (user_id, draft_id)
                    VALUES (:user_id, :draft_id)
                    ON CONFLICT (user_id, draft_id) DO NOTHING;
                    """, params);
        } catch (Exception e) {
            System.out.println("User already in draft");
        }

        db.update("""
                UPDATE draft_pick
                SET picked_by_user_id = NULL
                WHERE draft_id = :draft_id AND picked_by_user_id = :user_id;
                """, params);
        db.update("""
                UPDATE draft_pick
                SET picked_by_user_id = :user_id
                WHERE draft_id = :draft_id  AND picked_by_team_number = :team_number;
                """, params);
    }

    @Override
    public void toggleAutoDraft(int userId, int draftId, boolean isAutodrafting) {
        final String SQL = """
                UPDATE draft_user
                SET is_auto_drafting = :is_auto_drafting
                WHERE user_id = :user_id AND draft_id = :draft_id;
                """;
        Map<String, Object> params = new HashMap<>();
        params.put("user_id", userId);
        params.put("draft_id", draftId);
        params.put("is_auto_drafting", isAutodrafting);
        db.update(SQL, params);
    }

    @Override
    public List<PlayerDTO> getPlayers(int draftId) {
        final String SQL = """
            SELECT *
            FROM (
                SELECT p.id, p.first_name, p.last_name, p.age, p.height, p.weight, p.injury_status,
                    p.years_experience, p.headshot_url, p.rotowire_id, n.is_quarterback, 
                    n.is_running_back, n.ppr_adp, n.half_ppr_adp, n.standard_adp, 
                    n.is_wide_receiver, n.is_tight_end, n.is_kicker, n.is_team_defense, 
                    t.id AS team_id, t.team_name, t.team_city, t.team_abbreviation, t.conference, 
                    t.division, t.wins, t.losses, t.ties, t.current_win_streak, t.bye_week, 
                    t.logo_url, sp.rush_attempts, sp.rush_yards, sp.rush_touchdowns, sp.targets, 
                    sp.receptions, sp.receiving_yards, sp.receiving_touchdowns, sp.pass_attempts, 
                    sp.pass_completions, sp.pass_yards, sp.pass_touchdowns, sp.interceptions, 
                    sp.fumbles_lost, sp.two_point_conversions, sp.standard_fantasy_points, 
                    sp.ppr_fantasy_points, sp.half_ppr_fantasy_points, kp.field_goals_attempted, 
                    kp.field_goals_made, kp.extra_points_attempted, kp.extra_points_made, 
                    kp.fantasy_points AS kicker_fantasy_points, tdp.sacks, tdp.interceptions, 
                    tdp.fumble_recoveries, tdp.defensive_touchdowns, tdp.safeties,
                    tdp.blocked_kicks, tdp.points_against, 
                    tdp.fantasy_points AS defense_fantasy_points,
                    (SELECT scoring_format FROM draft WHERE draft.id = :draft_id) AS scoring_format
                FROM nfl_player AS n
                INNER JOIN player AS p ON n.player_id = p.id
                INNER JOIN nfl_team AS t ON n.team_id = t.id
                LEFT JOIN nfl_skill_player_projection AS sp ON n.player_id = sp.player_id
                LEFT JOIN nfl_kicker_projection AS kp ON n.player_id = kp.player_id
                LEFT JOIN nfl_team_projection AS tdp ON n.team_id = tdp.id
                WHERE p.id NOT IN (
                    SELECT player_id
                    FROM draft_pick
                    WHERE draft_id = :draft_id AND player_id IS NOT NULL
                )
            ) AS subquery
            ORDER BY
                CASE WHEN subquery.scoring_format = 'ppr' THEN subquery.ppr_adp
                    WHEN subquery.scoring_format = 'half_ppr' THEN subquery.half_ppr_adp
                    ELSE subquery.standard_adp
                END ASC;
            """;
        Map<String, Object> params = new HashMap<>();
        params.put("draft_id", draftId);

        List<PlayerDTO> players = db.query(SQL, params, (rowSets, rowNum) -> {
            return new FootballPlayerDTO(
                    rowSets.getInt("id"),
                    rowSets.getInt("rotowire_id"),
                    "footballPlayer",
                    rowSets.getInt("standard_adp"),
                    rowSets.getInt("ppr_adp"),
                    rowSets.getInt("half_ppr_adp"),
                    rowSets.getString("first_name"),
                    rowSets.getString("last_name"),
                    rowSets.getInt("age"),
                    rowSets.getInt("height"),
                    rowSets.getInt("weight"),
                    rowSets.getString("injury_status"),
                    rowSets.getInt("years_experience"),
                    rowSets.getBoolean("is_quarterback"),
                    rowSets.getBoolean("is_running_back"),
                    rowSets.getBoolean("is_wide_receiver"),
                    rowSets.getBoolean("is_tight_end"),
                    rowSets.getBoolean("is_kicker"),
                    rowSets.getBoolean("is_team_defense"),
                    rowSets.getString("headshot_url"),
                    new FootballTeamDTO(
                            rowSets.getInt("team_id"),
                            rowSets.getString("team_name"),
                            rowSets.getString("team_city"),
                            rowSets.getString("team_abbreviation"),
                            rowSets.getString("conference"),
                            rowSets.getString("division"),
                            rowSets.getString("logo_url"),
                            rowSets.getInt("wins"),
                            rowSets.getInt("losses"),
                            rowSets.getInt("ties"),
                            rowSets.getInt("current_win_streak"),
                            rowSets.getInt("bye_week")),
                    new SkillPlayerProjection(
                            rowSets.getInt("rush_attempts"),
                            rowSets.getInt("rush_yards"),
                            rowSets.getInt("rush_touchdowns"),
                            rowSets.getInt("targets"),
                            rowSets.getInt("receptions"),
                            rowSets.getInt("receiving_yards"),
                            rowSets.getInt("receiving_touchdowns"),
                            rowSets.getInt("pass_attempts"),
                            rowSets.getInt("pass_completions"),
                            rowSets.getInt("pass_yards"),
                            rowSets.getInt("pass_touchdowns"),
                            rowSets.getInt("interceptions"),
                            rowSets.getInt("fumbles_lost"),
                            rowSets.getInt("two_point_conversions"),
                            rowSets.getInt("standard_fantasy_points"),
                            rowSets.getInt("ppr_fantasy_points"),
                            rowSets.getInt("half_ppr_fantasy_points")),
                    new KickerProjection(
                            rowSets.getInt("field_goals_made"),
                            0,
                            0,
                            rowSets.getInt("field_goals_attempted"),
                            rowSets.getInt("extra_points_made"),
                            rowSets.getInt("extra_points_attempted"),
                            rowSets.getInt("kicker_fantasy_points")),
                    new TeamDefenseProjection(
                            rowSets.getInt("sacks"),
                            rowSets.getInt("interceptions"),
                            rowSets.getInt("fumble_recoveries"),
                            rowSets.getInt("defensive_touchdowns"),
                            rowSets.getInt("safeties"),
                            rowSets.getInt("blocked_kicks"),
                            rowSets.getInt("points_against"),
                            rowSets.getInt("defense_fantasy_points")));
        });
        return players;
    }

    @Override
    public DraftDTO getDraft(int draftId) {
        final String SQL = """
                SELECT
                    pick_order_format, sport, pick_time_limit, scoring_format, quarterback_limit,
                    running_back_limit, wide_receiver_limit, tightend_limit, kicker_limit,
                    defense_limit, flex_limit, bench_limit, is_started, created_at, draft.id,
                    (SELECT MAX(picked_by_team_number)
                    FROM draft_pick
                    WHERE draft_pick.draft_id = draft.id) AS team_count
                FROM draft
                INNER JOIN nfl_draft_configuration
                ON draft.id = nfl_draft_configuration.draft_id
                WHERE draft_id = :draft_id;
                """;
        Map<String, Object> params = new HashMap<>();
        params.put("draft_id", draftId);
        DraftDTO footballDraft = db.queryForObject(SQL, params, (rowSets, rowNum) -> {
            return new FootballDraftDTO(
                    rowSets.getInt("id"),
                    "football",
                    rowSets.getString("created_at"),
                    new FootballDraftSettingsDTO(
                            rowSets.getString("pick_order_format"),
                            rowSets.getString("scoring_format"),
                            rowSets.getInt("pick_time_limit"),
                            rowSets.getInt("team_count"),
                            rowSets.getString("sport"),
                            rowSets.getInt("quarterback_limit"),
                            rowSets.getInt("running_back_limit"),
                            rowSets.getInt("wide_receiver_limit"),
                            rowSets.getInt("tightend_limit"),
                            rowSets.getInt("kicker_limit"),
                            rowSets.getInt("defense_limit"),
                            rowSets.getInt("flex_limit"),
                            rowSets.getInt("bench_limit"),
                            rowSets.getBoolean("is_started")));
        });
        return footballDraft;
    }

    @Override
    public List<DraftDTO> getDrafts(int userId) {
        final String SQL = """
                SELECT
                    pick_order_format, sport, pick_time_limit, scoring_format, quarterback_limit,
                    running_back_limit, wide_receiver_limit, tightend_limit, kicker_limit,
                    defense_limit, flex_limit, bench_limit, is_started, created_at, draft.id,
                    (SELECT MAX(picked_by_team_number)
                    FROM draft_pick
                    WHERE draft_pick.draft_id = draft.id) AS team_count
                FROM draft
                INNER JOIN nfl_draft_configuration
                ON draft.id = nfl_draft_configuration.draft_id
                WHERE draft_id IN (
                    SELECT draft_id
                    FROM draft_user
                    WHERE user_id = :user_id);
                """;
        Map<String, Object> params = new HashMap<>();
        params.put("user_id", userId);
        List<DraftDTO> footballDrafts = db.query(SQL, params, (rowSets, rowNum) -> {
            return new FootballDraftDTO(
                    rowSets.getInt("id"),
                    "football",
                    rowSets.getString("created_at"),
                    new FootballDraftSettingsDTO(
                            rowSets.getString("pick_order_format"),
                            rowSets.getString("scoring_format"),
                            rowSets.getInt("pick_time_limit"),
                            rowSets.getInt("team_count"),
                            rowSets.getString("sport"),
                            rowSets.getInt("quarterback_limit"),
                            rowSets.getInt("running_back_limit"),
                            rowSets.getInt("wide_receiver_limit"),
                            rowSets.getInt("tightend_limit"),
                            rowSets.getInt("kicker_limit"),
                            rowSets.getInt("defense_limit"),
                            rowSets.getInt("flex_limit"),
                            rowSets.getInt("bench_limit"),
                            rowSets.getBoolean("is_started")));
        });
        return footballDrafts;
    }

    @Override
    @Transactional
    public void updateDraftSettings(DraftDTO draft) {
        if (draft instanceof FootballDraftDTO) {
            FootballDraftDTO footballDraft = (FootballDraftDTO) draft;
            IDraftOrderGenerator draftOrderGenerator = draftOrderGeneratorFactory
                    .getDraftOrderGenerator(draft.settings().pickOrderFormat());
            int playersPerTeam = footballDraft.settings().quarterbackLimit()
                    + footballDraft.settings().runningBackLimit()
                    + footballDraft.settings().wideReceiverLimit()
                    + footballDraft.settings().tightEndLimit()
                    + footballDraft.settings().kickerLimit()
                    + footballDraft.settings().defenseLimit()
                    + footballDraft.settings().flexLimit()
                    + footballDraft.settings().benchLimit();
            final int[] draftOrder = draftOrderGenerator.generate(
                    footballDraft.settings().teamCount(), playersPerTeam);

            Map<String, Object> draftSettingsParams = new HashMap<>();
            draftSettingsParams.put("pick_order_format", 
                footballDraft.settings().pickOrderFormat());
            draftSettingsParams.put("scoring_format", footballDraft.settings().scoringFormat());
            draftSettingsParams.put("pick_time_limit", footballDraft.settings().pickTimeLimit());
            draftSettingsParams.put("draft_id", footballDraft.id());
            db.update("""
                UPDATE draft 
                SET pick_order_format = :pick_order_format::pick_order_format,
                    scoring_format = :scoring_format::scoring_format,
                    pick_time_limit = :pick_time_limit
                WHERE id = :draft_id;
                """, draftSettingsParams);

            // Insert the football draft settings
            final String FOOTBALL_DRAFT_SETTINGS_SQL = """
                UPDATE nfl_draft_configuration 
                SET quarterback_limit = :quarterback_limit,
                    running_back_limit = :running_back_limit,
                    wide_receiver_limit = :wide_receiver_limit,
                    tightend_limit = :tightend_limit,
                    kicker_limit = :kicker_limit,
                    defense_limit = :defense_limit,
                    flex_limit = :flex_limit,
                    bench_limit = :bench_limit
                WHERE draft_id = :draft_id;
                """;
            Map<String, Object> footballDraftSettingsParams = new HashMap<>();
            footballDraftSettingsParams.put("draft_id", footballDraft.id());
            footballDraftSettingsParams.put(
                    "quarterback_limit", footballDraft.settings().quarterbackLimit());
            footballDraftSettingsParams.put(
                    "running_back_limit", footballDraft.settings().runningBackLimit());
            footballDraftSettingsParams.put(
                    "wide_receiver_limit", footballDraft.settings().wideReceiverLimit());
            footballDraftSettingsParams.put(
                    "tightend_limit", footballDraft.settings().tightEndLimit());
            footballDraftSettingsParams.put(
                    "kicker_limit", footballDraft.settings().kickerLimit());
            footballDraftSettingsParams.put(
                    "defense_limit", footballDraft.settings().defenseLimit());
            footballDraftSettingsParams.put("flex_limit", footballDraft.settings().flexLimit());
            footballDraftSettingsParams.put("bench_limit", footballDraft.settings().benchLimit());
            db.update(FOOTBALL_DRAFT_SETTINGS_SQL, footballDraftSettingsParams);

            List<MapSqlParameterSource> draftPickParams = new ArrayList<>();
            int pickNumber = 1;
            for (int teamNumber : draftOrder) {
                MapSqlParameterSource parameterSource = new MapSqlParameterSource();
                parameterSource.addValue("draft_id", footballDraft.id());
                parameterSource.addValue("player_id", null);
                parameterSource.addValue("picked_by_team_number", teamNumber);
                parameterSource.addValue("pick_number", pickNumber);
                pickNumber += 1;
                draftPickParams.add(parameterSource);
            }
            Map<String, Object> removeExtraPicksParams = new HashMap<>();
            removeExtraPicksParams.put("draft_id", footballDraft.id());
            removeExtraPicksParams.put("max_pick_number", draftOrder.length);
            db.update("""
                DELETE FROM draft_pick
                WHERE draft_id = :draft_id AND pick_number > :max_pick_number;
                """, removeExtraPicksParams);
            footballDraftSettingsParams.put("draft_id", footballDraft.id());
            db.batchUpdate("""
                UPDATE draft_pick
                SET player_id = :player_id, picked_by_team_number = :picked_by_team_number
                WHERE draft_id = :draft_id AND pick_number = :pick_number;
                """, draftPickParams.toArray(new MapSqlParameterSource[0]));
        }
    }

    /**
     * Creates a new draft.

     * @param draftSettings The draft settings.
     */
    @Override
    @Transactional
    public int createDraft(FootballDraftCreationRequestDTO draftSettings) {
        IDraftOrderGenerator draftOrderGenerator = draftOrderGeneratorFactory
                .getDraftOrderGenerator(draftSettings.settings().pickOrderFormat());
        int playersPerTeam = draftSettings.settings().quarterbackLimit()
                + draftSettings.settings().runningBackLimit()
                + draftSettings.settings().wideReceiverLimit()
                + draftSettings.settings().tightEndLimit()
                + draftSettings.settings().kickerLimit()
                + draftSettings.settings().defenseLimit()
                + draftSettings.settings().flexLimit()
                + draftSettings.settings().benchLimit();
        final int[] draftOrder = draftOrderGenerator.generate(
                draftSettings.settings().teamCount(), playersPerTeam);

        // Create the basic draft settings
        final String BASIC_DRAFT_SETTINGS_SQL = """
                INSERT INTO draft (pick_order_format, scoring_format, sport, pick_time_limit)
                VALUES (:pick_order_format::pick_order_format, :scoring_format::scoring_format,
                    :sport::sport, :pick_time_limit)
                RETURNING id;
                """;
        Map<String, Object> draftSettingsParams = new HashMap<>();
        draftSettingsParams.put("pick_order_format", draftSettings.settings().pickOrderFormat());
        draftSettingsParams.put("scoring_format", draftSettings.settings().scoringFormat());
        draftSettingsParams.put("sport", "football");
        draftSettingsParams.put("pick_time_limit", draftSettings.settings().pickTimeLimit());
        final int draftId = db.queryForObject(
                BASIC_DRAFT_SETTINGS_SQL, draftSettingsParams, Integer.class);

        // Insert the football draft settings
        final String FOOTBALL_DRAFT_SETTINGS_SQL = """
                INSERT INTO nfl_draft_configuration (
                        draft_id, quarterback_limit, running_back_limit, wide_receiver_limit,
                        tightend_limit, kicker_limit, defense_limit, flex_limit, bench_limit)
                VALUES (
                        :draft_id, :quarterback_limit, :running_back_limit, :wide_receiver_limit,
                        :tightend_limit, :kicker_limit, :defense_limit, :flex_limit, :bench_limit);
                """;
        Map<String, Object> footballDraftSettingsParams = new HashMap<>();
        footballDraftSettingsParams.put("draft_id", draftId);
        footballDraftSettingsParams.put(
                "quarterback_limit", draftSettings.settings().quarterbackLimit());
        footballDraftSettingsParams.put(
                "running_back_limit", draftSettings.settings().runningBackLimit());
        footballDraftSettingsParams.put(
                "wide_receiver_limit", draftSettings.settings().wideReceiverLimit());
        footballDraftSettingsParams.put(
                "tightend_limit", draftSettings.settings().tightEndLimit());
        footballDraftSettingsParams.put(
                "kicker_limit", draftSettings.settings().kickerLimit());
        footballDraftSettingsParams.put(
                "defense_limit", draftSettings.settings().defenseLimit());
        footballDraftSettingsParams.put("flex_limit", draftSettings.settings().flexLimit());
        footballDraftSettingsParams.put("bench_limit", draftSettings.settings().benchLimit());
        db.update(FOOTBALL_DRAFT_SETTINGS_SQL, footballDraftSettingsParams);

        // Insert the draft creator as an admin user in the draft.
        final String DRAFT_USER_SQL = """
                INSERT INTO draft_user (user_id, draft_id, is_admin)
                VALUES (:user_id, :draft_id, :is_admin);
                """;
        Map<String, Object> draftUserParams = new HashMap<>();
        draftUserParams.put("user_id", draftSettings.createdByUserId());
        draftUserParams.put("draft_id", draftId);
        draftUserParams.put("is_admin", true);
        db.update(DRAFT_USER_SQL, draftUserParams);

        // Insert the draft pick order in bulk a batch insert. Helps with performance.
        final String DRAFT_PICKS_SQL = """
                INSERT INTO draft_pick
                (draft_id, picked_by_user_id, player_id, picked_by_team_number, pick_number)
                VALUES (:draft_id, :user_id, :player_id, :picked_by_team_number, :pick_number);
                """;
        List<MapSqlParameterSource> draftPickParams = new ArrayList<>();
        int pickNumber = 1;
        for (int teamNumber : draftOrder) {
            MapSqlParameterSource parameterSource = new MapSqlParameterSource();
            parameterSource.addValue("draft_id", draftId);
            parameterSource.addValue("user_id", null);
            parameterSource.addValue("player_id", null);
            parameterSource.addValue("picked_by_team_number", teamNumber);
            parameterSource.addValue("pick_number", pickNumber);
            pickNumber += 1;
            draftPickParams.add(parameterSource);
        }
        db.batchUpdate(DRAFT_PICKS_SQL, draftPickParams.toArray(new MapSqlParameterSource[0]));
        return draftId;
    }

    @Override
    public List<DraftPickDTO> getDraftPicks(int draftId) {
        final String SQL = """
                SELECT dp.picked_by_team_number, dp.pick_number,
                    p.first_name, p.last_name, p.age, p.height,
                    p.weight, p.injury_status, p.years_experience, 
                    p.headshot_url, p.rotowire_id, np.player_id, np.is_quarterback,
                    np.is_running_back, np.is_wide_receiver, np.ppr_adp, 
                    np.half_ppr_adp, np.standard_adp, np.is_tight_end, 
                    np.is_kicker, np.is_team_defense, np.team_id, t.team_name, 
                    t.team_city, t.team_abbreviation, t.conference, t.division,
                    t.wins, t.losses, t.ties, t.current_win_streak,
                    t.bye_week, t.logo_url, sp.rush_attempts, sp.rush_yards, sp.rush_touchdowns,
                    sp.targets, sp.receptions, sp.receiving_yards, sp.receiving_touchdowns,
                    sp.pass_attempts, sp.pass_completions, sp.pass_yards, sp.pass_touchdowns,
                    sp.interceptions, sp.fumbles_lost, sp.two_point_conversions,
                    sp.standard_fantasy_points, sp.ppr_fantasy_points, sp.half_ppr_fantasy_points,
                    kp.field_goals_made, kp.field_goals_attempted, kp.extra_points_made,
                    kp.extra_points_attempted, kp.fantasy_points AS kicker_fantasy_points, 
                    tdp.sacks, tdp.interceptions, tdp.fumble_recoveries, tdp.defensive_touchdowns, 
                    tdp.safeties, tdp.blocked_kicks, tdp.points_against, 
                    tdp.fantasy_points AS defense_fantasy_points
                FROM draft_pick AS dp
                LEFT JOIN player AS p ON dp.player_id = p.id
                LEFT JOIN nfl_player AS np ON p.id = np.player_id
                LEFT JOIN nfl_team AS t ON np.team_id = t.id
                LEFT JOIN nfl_skill_player_projection AS sp ON np.player_id = sp.player_id
                LEFT JOIN nfl_kicker_projection AS kp ON np.player_id = kp.player_id
                LEFT JOIN nfl_team_projection AS tdp ON np.team_id = tdp.id
                WHERE draft_id = :draft_id
                ORDER BY pick_number ASC;
                """;
        Map<String, Object> params = new HashMap<>();
        params.put("draft_id", draftId);

        List<DraftPickDTO> draftPicks = db.query(SQL, params, (rowSets, rowNum) -> {
            PlayerDTO player = null;
            if (rowSets.getObject("player_id") != null) {
                FootballPlayerDTO footballPlayer = new FootballPlayerDTO(
                        rowSets.getInt("player_id"),
                        rowSets.getInt("rotowire_id"),
                        "footballPlayer",
                        rowSets.getInt("standard_adp"),
                        rowSets.getInt("ppr_adp"),
                        rowSets.getInt("half_ppr_adp"),
                        rowSets.getString("first_name"),
                        rowSets.getString("last_name"),
                        rowSets.getInt("age"),
                        rowSets.getInt("height"),
                        rowSets.getInt("weight"),
                        rowSets.getString("injury_status"),
                        rowSets.getInt("years_experience"),
                        rowSets.getBoolean("is_quarterback"),
                        rowSets.getBoolean("is_running_back"),
                        rowSets.getBoolean("is_wide_receiver"),
                        rowSets.getBoolean("is_tight_end"),
                        rowSets.getBoolean("is_kicker"),
                        rowSets.getBoolean("is_team_defense"),
                        rowSets.getString("headshot_url"),
                        new FootballTeamDTO(
                                rowSets.getInt("team_id"),
                                rowSets.getString("team_name"),
                                rowSets.getString("team_city"),
                                rowSets.getString("team_abbreviation"),
                                rowSets.getString("conference"),
                                rowSets.getString("division"),
                                rowSets.getString("logo_url"),
                                rowSets.getInt("wins"),
                                rowSets.getInt("losses"),
                                rowSets.getInt("ties"),
                                rowSets.getInt("current_win_streak"),
                                rowSets.getInt("bye_week")),
                        new SkillPlayerProjection(
                                rowSets.getInt("rush_attempts"),
                                rowSets.getInt("rush_yards"),
                                rowSets.getInt("rush_touchdowns"),
                                rowSets.getInt("targets"),
                                rowSets.getInt("receptions"),
                                rowSets.getInt("receiving_yards"),
                                rowSets.getInt("receiving_touchdowns"),
                                rowSets.getInt("pass_attempts"),
                                rowSets.getInt("pass_completions"),
                                rowSets.getInt("pass_yards"),
                                rowSets.getInt("pass_touchdowns"),
                                rowSets.getInt("interceptions"),
                                rowSets.getInt("fumbles_lost"),
                                rowSets.getInt("two_point_conversions"),
                                rowSets.getInt("standard_fantasy_points"),
                                rowSets.getInt("ppr_fantasy_points"),
                                rowSets.getInt("half_ppr_fantasy_points")),
                        new KickerProjection(
                                rowSets.getInt("field_goals_made"),
                                0,
                                0,
                                rowSets.getInt("field_goals_attempted"),
                                rowSets.getInt("extra_points_made"),
                                rowSets.getInt("extra_points_attempted"),
                                rowSets.getInt("kicker_fantasy_points")),
                        new TeamDefenseProjection(
                                rowSets.getInt("sacks"),
                                rowSets.getInt("interceptions"),
                                rowSets.getInt("fumble_recoveries"),
                                rowSets.getInt("defensive_touchdowns"),
                                rowSets.getInt("safeties"),
                                rowSets.getInt("blocked_kicks"),
                                rowSets.getInt("points_against"),
                                rowSets.getInt("defense_fantasy_points")));
                player = footballPlayer;
            }

            return new DraftPickDTO(
                    rowSets.getInt("pick_number"),
                    rowSets.getInt("picked_by_team_number"),
                    player);
        });
        return draftPicks;
    }
}
