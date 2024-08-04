package com.draftbash.features.drafts.dtos;

/**
 * This dto contains the information for a queued player.
 */
public interface QueuedPlayerDTO {
    int rank();

    int queuedByUserId();

    PlayerDTO player();
}
