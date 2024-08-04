CREATE TABLE player (
    id INT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    age SMALLINT NULL,
    height SMALLINT NULL,
    weight SMALLINT NULL,
    years_experience SMALLINT DEFAULT 0,
    rotowire_id INT NULL,
    injury_status injury_status NULL,
    headshot_url VARCHAR(255) NULL,
    jersey_number SMALLINT NULL
);