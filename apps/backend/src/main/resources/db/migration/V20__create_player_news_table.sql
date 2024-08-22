CREATE TABLE player_news(
    id SERIAL PRIMARY KEY,
    player_id INT,
    headline TEXT,
    summary TEXT,
    analysis TEXT,
    fantasy_outlook TEXT,
    url TEXT,
    date DATE,
    FOREIGN KEY (player_id) REFERENCES player(id) ON DELETE CASCADE,
    CONSTRAINT player_news_player_id_key UNIQUE (player_id)
);
