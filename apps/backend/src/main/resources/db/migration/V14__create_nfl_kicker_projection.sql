CREATE TABLE nfl_kicker_projection (
    id SERIAL PRIMARY KEY,
    player_id INT NOT NULL,
    season SMALLINT NOT NULL,
    field_goals_attempted SMALLINT DEFAULT 0,
    field_goals_made SMALLINT DEFAULT 0,
    extra_points_attempted SMALLINT DEFAULT 0,
    extra_points_made SMALLINT DEFAULT 0,
    fantasy_points SMALLINT DEFAULT 0,
    FOREIGN KEY (player_id) REFERENCES player(id) ON DELETE SET NULL
);
