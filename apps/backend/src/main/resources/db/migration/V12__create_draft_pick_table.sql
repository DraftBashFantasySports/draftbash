CREATE TABLE draft_pick (
    id SERIAL PRIMARY KEY,
    draft_id INT NOT NULL,
    picked_by_user_id INT NULL,
    player_id INT NULL,
    picked_by_team_number SMALLINT NOT NULL,
    pick_number SMALLINT NOT NULL,
    FOREIGN KEY (draft_id) REFERENCES draft(id) ON DELETE CASCADE,
    FOREIGN KEY (picked_by_user_id) REFERENCES user_account(id) ON DELETE SET NULL,
    FOREIGN KEY (player_id) REFERENCES player(id) ON DELETE SET NULL
);
