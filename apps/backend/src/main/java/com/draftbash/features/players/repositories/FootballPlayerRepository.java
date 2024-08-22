package com.draftbash.features.players.repositories;

import com.draftbash.features.players.dtos.PlayerNewsDTO;
import com.draftbash.features.players.dtos.football.FootballPlayerDTO;
import com.draftbash.features.players.dtos.football.FootballTeamDTO;
import com.draftbash.features.players.dtos.football.KickerProjection;
import com.draftbash.features.players.dtos.football.SkillPlayerProjection;
import com.draftbash.features.players.dtos.football.TeamDefenseProjection;
import com.draftbash.features.players.interfaces.IFootballPlayerRepository;
import java.sql.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.sql.DataSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

/**
 * Repository for football players.
 */
@Repository
public class FootballPlayerRepository implements IFootballPlayerRepository {

    private final NamedParameterJdbcTemplate db;

    public FootballPlayerRepository(DataSource dataSource) {
        this.db = new NamedParameterJdbcTemplate(dataSource);
    }

    @Override
    public void insertPlayerNews(PlayerNewsDTO news) {
        final String SQL = """
            INSERT INTO player_news (
                player_id, headline, summary, analysis, fantasy_outlook, url, date)
            VALUES (:player_id, :headline, :summary, :analysis, :fantasy_outlook, :url, :date)
            ON CONFLICT (player_id) DO UPDATE SET
                headline = EXCLUDED.headline,
                summary = EXCLUDED.summary,
                analysis = EXCLUDED.analysis,
                fantasy_outlook = EXCLUDED.fantasy_outlook,
                url = EXCLUDED.url,
                date = EXCLUDED.date
            """;

        Map<String, Object> params = new HashMap<>();
        params.put("player_id", news.playerId());
        params.put("headline", news.headline());
        params.put("summary", news.summary());
        params.put("analysis", news.analysis());
        params.put("fantasy_outlook", news.fantasyOutlook());
        params.put("url", news.url());
        params.put("date", Date.valueOf(news.date()));

        db.update(SQL, params);
    }

    @Override
    public List<FootballPlayerDTO> getPlayers() {
        final String SQL = """
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
                tdp.fantasy_points AS defense_fantasy_points
            FROM nfl_player AS n
            INNER JOIN player AS p ON n.player_id = p.id
            INNER JOIN nfl_team AS t ON n.team_id = t.id
            LEFT JOIN nfl_skill_player_projection AS sp ON n.player_id = sp.player_id
            LEFT JOIN nfl_kicker_projection AS kp ON n.player_id = kp.player_id
            LEFT JOIN nfl_team_projection AS tdp ON n.team_id = tdp.id
            """;
        Map<String, Object> params = new HashMap<>();

        List<FootballPlayerDTO> players = db.query(SQL, params, (rowSets, rowNum) -> {
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
}
