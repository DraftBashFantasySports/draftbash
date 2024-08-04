CREATE TABLE draft_user (
    draft_id INT,
    user_id INT,
    is_auto_drafting BOOLEAN DEFAULT FALSE,
    is_admin BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (draft_id) REFERENCES draft(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES user_account(id) ON DELETE CASCADE,
    PRIMARY KEY (draft_id, user_id)
);