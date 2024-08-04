CREATE TABLE nfl_team (
    id INT PRIMARY KEY,
    team_name VARCHAR(50) NOT NULL,
    team_abbreviation VARCHAR(3) NOT NULL,
    team_city VARCHAR(50) NOT NULL,
    bye_week SMALLINT NOT NULL,
    conference CHAR(3) NOT NULL,
    division VARCHAR(10) NOT NULL,
    wins SMALLINT DEFAULT 0,
    losses SMALLINT DEFAULT 0,
    ties SMALLINT DEFAULT 0,
    current_win_streak SMALLINT DEFAULT 0,
    logo_url VARCHAR(255) NOT NULL
);