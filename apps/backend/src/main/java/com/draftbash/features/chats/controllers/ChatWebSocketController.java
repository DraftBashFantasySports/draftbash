package com.draftbash.features.chats.controllers;

import com.draftbash.features.chats.interfaces.IChatRepository;
import java.util.HashMap;
import java.util.Map;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

/**
 * Controller for handling draft WebSocket requests.
 */
@Controller
public class ChatWebSocketController {

    private final SimpMessagingTemplate messagingTemplate;

    private final IChatRepository chatRepository;

    /**
     * Constructor for the DraftWebSocketController class.
     */
    public ChatWebSocketController(SimpMessagingTemplate messagingTemplate,
            IChatRepository chatRepository) {
        this.messagingTemplate = messagingTemplate;
        this.chatRepository = chatRepository;
    }

    private record MessageDTO(int fromUserId, int toUserId, String message) {}
    /**
     * Retrieves chats based on the provided message.

     * @param message The chat message.
     */
    @MessageMapping("/chats.send-message")
    public void sendMessage(@Payload MessageDTO message) {
        Map<String, Object> response = new HashMap<>();
        chatRepository.addMessage(message.fromUserId(), message.toUserId(), message.message());
        response.put("conversation", 
            chatRepository.getMessages(message.fromUserId(), message.toUserId()));
        response.put("recentConversations", 
            chatRepository.getRecentConversations(message.toUserId()));
        messagingTemplate.convertAndSend("/topic/chats/" + message.toUserId(), response);
    }

    private record UserIdDTO(int userId) {}
    /**
     * Retrieves chats based on the provided user ID.

     * @param userId The user ID.
     */
    @MessageMapping("/chats.get-recent-conversations")
    public void getRecentConversations(@Payload UserIdDTO userId) {
        Map<String, Object> response = new HashMap<>();
        response.put("recentConversations", 
            chatRepository.getRecentConversations(userId.userId()));
        messagingTemplate.convertAndSend("/topic/chats/" + userId.userId(), response);
    }

    private record JoinChatDTO(int fromUserId, int toUserId) {}
    /**
     * Retrieves chats based on the provided user ID.

     * @param joinChatInfo The user ID.
     */
    @MessageMapping("/chats.join")
    public void joinChat(@Payload JoinChatDTO joinChatInfo) {
        Map<String, Object> response = new HashMap<>();
        response.put("conversation", 
            chatRepository.getMessages(joinChatInfo.toUserId(), joinChatInfo.fromUserId()));
        messagingTemplate.convertAndSend("/topic/chats/" + joinChatInfo.fromUserId(), response);
    }
}