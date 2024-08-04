package com.draftbash.features.chats.dtos;

import java.util.List;

/**
 * This record contains conversation information.
 */
public record ConversationDTO(
    int fromUserId,
    int toUserId,
    List<ChatMessageDTO> messages
) {}
