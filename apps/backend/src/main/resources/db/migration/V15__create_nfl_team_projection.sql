CREATE TABLE nfl_team_projection (
    id SERIAL PRIMARY KEY,
    team_id INT NOT NULL,
    season SMALLINT NOT NULL,
    return_touchdowns SMALLINT DEFAULT 0,
    defensive_touchdowns SMALLINT DEFAULT 0,
    safeties SMALLINT DEFAULT 0,
    fumble_recoveries SMALLINT DEFAULT 0,
    points_against SMALLINT DEFAULT 0,
    interceptions SMALLINT DEFAULT 0,
    sacks SMALLINT DEFAULT 0,
    blocked_kicks SMALLINT DEFAULT 0,
    fantasy_points SMALLINT DEFAULT 0,
    FOREIGN KEY (team_id) REFERENCES player(id) ON DELETE SET NULL
);
