package com.draftbash.features.chats.dtos;

/**
 * This record contains recent conversation information.
 */
public record RecentConversationDTO(
    int fromUserId,
    String fromUsername,
    String lastMessage,
    String lastMessageSentAt
) {}
