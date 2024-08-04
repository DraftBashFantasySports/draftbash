package com.draftbash.features.chats.interfaces;

import com.draftbash.features.chats.dtos.ConversationDTO;
import com.draftbash.features.chats.dtos.RecentConversationDTO;
import java.util.List;

/**
 * Interface for the chat repository.
 */
public interface IChatRepository {
    public void addMessage(int fromUserId, int toUserId, String message);

    public ConversationDTO getMessages(int fromUserId, int toUserId);

    public List<RecentConversationDTO> getRecentConversations(int userId);
}
