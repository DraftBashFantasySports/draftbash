CREATE TABLE nfl_draft_configuration (
    draft_id INT PRIMARY KEY,
    quarterback_limit SMALLINT NOT NULL,
    running_back_limit SMALLINT NOT NULL,
    wide_receiver_limit SMALLINT NOT NULL,
    tightend_limit SMALLINT NOT NULL,
    flex_limit SMALLINT NOT NULL,
    kicker_limit SMALLINT NOT NULL,
    defense_limit SMALLINT NOT NULL,
    bench_limit SMALLINT NOT NULL,
    FOREIGN KEY (draft_id) REFERENCES draft(id) ON DELETE CASCADE
);