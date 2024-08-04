package com.draftbash.features.drafts.dtos;

/**
 * This record contains draft message information.
 */
public record DraftMessageDTO(
    int fromUserId,
    String fromUsername,
    String message
) {}
