CREATE TABLE nfl_player (
    player_id INT PRIMARY KEY,
    team_id INT NULL,
    is_quarterback BOOLEAN DEFAULT FALSE,
    is_running_back BOOLEAN DEFAULT FALSE,
    is_wide_receiver BOOLEAN DEFAULT FALSE,
    is_tight_end BOOLEAN DEFAULT FALSE,
    is_kicker BOOLEAN DEFAULT FALSE,
    is_team_defense BOOLEAN DEFAULT FALSE,
    ppr_adp SMALLINT NULL,
    half_ppr_adp SMALLINT NULL,
    standard_adp SMALLINT NULL,
    FOREIGN KEY (team_id) REFERENCES nfl_team(id) ON DELETE SET NULL,
    FOREIGN KEY (player_id) REFERENCES player(id) ON DELETE CASCADE
);