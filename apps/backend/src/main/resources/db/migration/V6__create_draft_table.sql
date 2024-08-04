CREATE TABLE draft (
    id SERIAL PRIMARY KEY,
    pick_order_format pick_order_format NOT NULL,
    sport sport NOT NULL,
    pick_time_limit SMALLINT NOT NULL,
    scoring_format scoring_format NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_started BOOLEAN NOT NULL DEFAULT FALSE
);
