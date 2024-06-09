package com.draftbash.features.drafts.repositories;

import com.draftbash.features.drafts.dtos.FootballDraftCreationDTO;
import com.draftbash.features.drafts.dtos.FootballDraftSettingsDTO;
import com.draftbash.features.drafts.interfaces.IFootballDraftRepository;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    public FootballDraftRepository(DataSource dataSource) {
        this.db = new NamedParameterJdbcTemplate(dataSource);
    }

    @Override
    public List<FootballDraftSettingsDTO> getDrafts(int userId) {
        final String SQL = """
                SELECT
                    pick_order_format, sport, pick_time_limit, scoring_format, quarterback_limit,
                    running_back_limit, wide_receiver_limit, tightend_limit, kicker_limit, 
                    defense_limit, flex_limit, bench_limit, created_at, draft_id,
                    (SELECT MAX(team_number)
                    FROM draft_picks
                    WHERE draft_picks.draft_id = draft.id) AS team_count
                FROM drafts AS draft
                INNER JOIN football_draft_settings ON draft.id = football_draft_settings.draft_id
                WHERE draft_id IN (
                    SELECT draft_id
                    FROM draft_users
                    WHERE user_id = :user_id);
                """;
        Map<String, Object> params = new HashMap<>();
        params.put("user_id", userId);
        List<FootballDraftSettingsDTO> footballDrafts = db.query(SQL, params, (rowSets, rowNum) -> {
            return new FootballDraftSettingsDTO(
                    rowSets.getInt("draft_id"),
                    rowSets.getString("sport"),
                    rowSets.getString("pick_order_format"),
                    rowSets.getString("scoring_format"),
                    rowSets.getString("created_at"),
                    rowSets.getInt("pick_time_limit"),
                    rowSets.getInt("team_count"),
                    rowSets.getInt("quarterback_limit"),
                    rowSets.getInt("running_back_limit"),
                    rowSets.getInt("wide_receiver_limit"),
                    rowSets.getInt("tightend_limit"),
                    rowSets.getInt("kicker_limit"),
                    rowSets.getInt("defense_limit"),
                    rowSets.getInt("flex_limit"),
                    rowSets.getInt("bench_limit"));
        });
        return footballDrafts;
    }

    @Override
    @Transactional
    public void createDraft(FootballDraftCreationDTO draftSettings, int[] draftOrder) {

        // Create the basic draft settings
        final String BASIC_DRAFT_SETTINGS_SQL = """
                INSERT INTO drafts (pick_order_format, scoring_format, sport, pick_time_limit)
                VALUES (:pick_order_format, :scoring_format, :sport, :pick_time_limit)
                RETURNING id;
                """;
        Map<String, Object> draftSettingsParams = new HashMap<>();
        draftSettingsParams.put("pick_order_format", draftSettings.pickOrderFormat());
        draftSettingsParams.put("scoring_format", draftSettings.scoringFormat());
        draftSettingsParams.put("sport", draftSettings.sport());
        draftSettingsParams.put("pick_time_limit", draftSettings.pickTimeLimit());
        final int draftId = db.queryForObject(
                BASIC_DRAFT_SETTINGS_SQL, draftSettingsParams, Integer.class);

        // Insert the football draft settings
        final String FOOTBALL_DRAFT_SETTINGS_SQL = """
                INSERT INTO football_draft_settings (
                    draft_id, quarterback_limit, running_back_limit, wide_receiver_limit,
                    tightend_limit, kicker_limit, defense_limit, flex_limit, bench_limit)
                VALUES (
                    :draft_id, :quarterback_limit, :running_back_limit, :wide_receiver_limit,
                    :tightend_limit, :kicker_limit, :defense_limit, :flex_limit, :bench_limit);
                """;
        Map<String, Object> footballDraftSettingsParams = new HashMap<>();
        footballDraftSettingsParams.put("draft_id", draftId);
        footballDraftSettingsParams.put("quarterback_limit", draftSettings.quarterbackLimit());
        footballDraftSettingsParams.put("running_back_limit", draftSettings.runningBackLimit());
        footballDraftSettingsParams.put("wide_receiver_limit", draftSettings.wideReceiverLimit());
        footballDraftSettingsParams.put("tightend_limit", draftSettings.tightendLimit());
        footballDraftSettingsParams.put("kicker_limit", draftSettings.kickerLimit());
        footballDraftSettingsParams.put("defense_limit", draftSettings.defenseLimit());
        footballDraftSettingsParams.put("flex_limit", draftSettings.flexLimit());
        footballDraftSettingsParams.put("bench_limit", draftSettings.benchLimit());
        db.update(FOOTBALL_DRAFT_SETTINGS_SQL, footballDraftSettingsParams);

        // Insert the draft creator as an admin user in the draft.
        final String DRAFT_USER_SQL = """
                INSERT INTO draft_users (user_id, draft_id, is_auto_drafting, is_admin)
                VALUES (:user_id, :draft_id, :is_auto_drafting, :is_admin);
                """;
        Map<String, Object> draftUserParams = new HashMap<>();
        draftUserParams.put("user_id", draftSettings.createdByUserId());
        draftUserParams.put("draft_id", draftId);
        draftUserParams.put("is_auto_drafting", false);
        draftUserParams.put("is_admin", true);
        db.update(DRAFT_USER_SQL, draftUserParams);

        // Insert the draft pick order in bulk a batch insert. Helps with performance.
        final String DRAFT_PICKS_SQL = """
                INSERT INTO draft_picks (draft_id, user_id, player_id, team_number, pick_number)
                VALUES (:draft_id, :user_id, :player_id, :team_number, :pick_number);
                """;
        List<MapSqlParameterSource> draftPickParams = new ArrayList<>();
        int pickNumber = 1;
        for (int teamNumber : draftOrder) {
            MapSqlParameterSource parameterSource = new MapSqlParameterSource();
            parameterSource.addValue("draft_id", draftId);
            parameterSource.addValue("user_id", null);
            parameterSource.addValue("player_id", null);
            parameterSource.addValue("team_number", teamNumber);
            parameterSource.addValue("pick_number", pickNumber);
            pickNumber += 1;
            draftPickParams.add(parameterSource);
        }
        db.batchUpdate(DRAFT_PICKS_SQL, draftPickParams.toArray(new MapSqlParameterSource[0]));
    }
}
