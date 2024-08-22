package com.draftbash.features.drafts.dtos.football;

import com.draftbash.features.drafts.dtos.QueuedPlayerDTO;
import com.draftbash.features.players.dtos.football.FootballPlayerDTO;

/**
 * This dto contains the attributes for a queued football player.
 */
public record QueuedFootballPlayerDTO(
    int rank,
    int queuedByUserId,
    FootballPlayerDTO player
) implements QueuedPlayerDTO {}
