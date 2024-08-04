package com.draftbash.features.chats.repositories;

import com.draftbash.features.chats.dtos.ChatMessageDTO;
import com.draftbash.features.chats.dtos.ConversationDTO;
import com.draftbash.features.chats.dtos.RecentConversationDTO;
import com.draftbash.features.chats.interfaces.IChatRepository;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.sql.DataSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

/**
 * Repository for handling chat data.
 */
@Repository
public class ChatRepository implements IChatRepository {
    
    private final NamedParameterJdbcTemplate db;

    public ChatRepository(DataSource dataSource) {
        this.db = new NamedParameterJdbcTemplate(dataSource);
    }

    @Override
    public void addMessage(int fromUserId, int toUserId, String message) {
        final String SQL = """
            INSERT INTO chat_message (from_user_id, to_user_id, message) 
            VALUES (:from_user_id, :to_user_id, :message)
            """;
        Map<String, Object> params = new HashMap<>();
        params.put("from_user_id", fromUserId);
        params.put("to_user_id", toUserId);
        params.put("message", message);

        db.update(SQL, params);
    }

    @Override
    public ConversationDTO getMessages(int fromUserId, int toUserId) {
        final String SQL = """
            SELECT 
                sender.username AS sender_username, 
                receiver.username AS receiver_username, 
                chat_message.message, 
                chat_message.sent_at
            FROM 
                chat_message
            INNER JOIN 
                user_account AS sender ON sender.id = chat_message.from_user_id
            INNER JOIN 
                user_account AS receiver ON receiver.id = chat_message.to_user_id
            WHERE 
                (chat_message.from_user_id = :from_user_id 
                    AND chat_message.to_user_id = :to_user_id)
                OR (chat_message.from_user_id = :to_user_id 
                    AND chat_message.to_user_id = :from_user_id)
            """;
        Map<String, Object> params = new HashMap<>();
        params.put("from_user_id", fromUserId);
        params.put("to_user_id", toUserId);

        List<ChatMessageDTO> messages = db.query(SQL, params, 
            (rs, rowNum) -> new ChatMessageDTO(
                fromUserId,
                rs.getString("sender_username"),
                toUserId,
                rs.getString("receiver_username"),
                rs.getString("message"),
                rs.getString("sent_at")
            )
        );
        return new ConversationDTO(fromUserId, toUserId, messages);
    }

    @Override
    public List<RecentConversationDTO> getRecentConversations(int userId) {
        final String SQL = """
            SELECT 
                cm1.from_user_id,
                cm1.to_user_id,
                cm1.message,
                cm1.sent_at,
                ua.id AS chat_partner_id,
                ua.username AS chat_partner_username 
            FROM 
                chat_message cm1
            INNER JOIN 
                user_account ua 
                ON ua.id = CASE
                    WHEN cm1.from_user_id = :user_id THEN cm1.to_user_id
                    ELSE cm1.from_user_id
                END
            WHERE 
                cm1.sent_at = (
                    SELECT MAX(cm2.sent_at)
                    FROM chat_message cm2
                    WHERE 
                        (cm2.from_user_id = :user_id AND cm2.to_user_id = CASE 
                        WHEN cm1.from_user_id = :user_id THEN cm1.to_user_id 
                        ELSE cm1.from_user_id END)
                        OR 
                        (cm2.to_user_id = :user_id AND cm2.from_user_id = CASE 
                        WHEN cm1.from_user_id = :user_id THEN cm1.to_user_id 
                        ELSE cm1.from_user_id END)
                )
            ORDER BY 
                cm1.sent_at DESC;
            """;
        
        Map<String, Object> params = new HashMap<>();
        params.put("user_id", userId);
        
        return db.query(SQL, params, 
            (rs, rowNum) -> new RecentConversationDTO(
                rs.getInt("chat_partner_id"),
                rs.getString("chat_partner_username"),
                rs.getString("message"),
                rs.getString("sent_at")
            )
        );
    }
}
