CREATE TABLE player_queue (
    queued_by_user_id INT,
    draft_id INT,
    player_id INT,
    rank SMALLINT,
    FOREIGN KEY (queued_by_user_id) REFERENCES user_account(id) ON DELETE CASCADE,
    FOREIGN KEY (draft_id) REFERENCES draft(id) ON DELETE CASCADE,
    FOREIGN KEY (player_id) REFERENCES player(id) ON DELETE CASCADE,
    PRIMARY KEY (queued_by_user_id, draft_id, player_id)
);
