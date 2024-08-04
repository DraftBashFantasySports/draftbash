package com.draftbash.features.drafts.dtos;

import java.util.List;

/**
 * This dto contains the information for a draft user.
 */
public record DraftUserDTO(
    int userId,
    String username,
    int draftId,
    int teamNumber,
    boolean isAdmin,
    boolean isAutodrafting,
    List<QueuedPlayerDTO> playerQueue
) {}
