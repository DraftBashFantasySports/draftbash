CREATE TABLE chat_message (
    from_user_id INT,
    to_user_id INT,
    message TEXT,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
