CREATE TABLE drafts (
    id SERIAL PRIMARY KEY,
    pick_order_format VARCHAR(30) NOT NULL,
    sport VARCHAR(30) NOT NULL,
    pick_time_limit SMALLINT NOT NULL,
    scoring_format VARCHAR(30) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE football_draft_settings (
    draft_id INT PRIMARY KEY,
    quarterback_limit SMALLINT NOT NULL,
    running_back_limit SMALLINT NOT NULL,
    wide_receiver_limit SMALLINT NOT NULL,
    tightend_limit SMALLINT NOT NULL,
    flex_limit SMALLINT NOT NULL,
    kicker_limit SMALLINT NOT NULL,
    defense_limit SMALLINT NOT NULL,
    bench_limit SMALLINT NOT NULL,
    FOREIGN KEY (draft_id) REFERENCES drafts(id) ON DELETE CASCADE
);

CREATE TABLE draft_users (
    draft_id INT,
    user_id INT,
    is_auto_drafting BOOLEAN NOT NULL,
    is_admin BOOLEAN NOT NULL,
    FOREIGN KEY (draft_id) REFERENCES drafts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (draft_id, user_id)
);

CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    team_name VARCHAR(50) NOT NULL,
    team_abbreviation VARCHAR(3) NOT NULL,
    team_city VARCHAR(50) NOT NULL
);

CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    team_id INT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    age SMALLINT NULL,
    injury_status VARCHAR(3) NULL,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE SET NULL
);

CREATE TABLE draft_picks (
    id SERIAL PRIMARY KEY,
    draft_id INT NOT NULL,
    user_id INT NULL,
    player_id INT NULL,
    team_number SMALLINT NOT NULL,
    pick_number SMALLINT NOT NULL,
    FOREIGN KEY (draft_id) REFERENCES drafts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE SET NULL
);