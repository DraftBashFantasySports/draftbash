package com.draftbash.features.chats.dtos;

/**
 * This record contains chat message information.
 */
public record ChatMessageDTO(
    int fromUserId,
    String fromUsername,
    int toUserId,
    String toUsername,
    String message,
    String sentAt
) {}
