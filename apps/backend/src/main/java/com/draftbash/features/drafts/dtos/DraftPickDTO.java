package com.draftbash.features.drafts.dtos;

import com.draftbash.features.players.dtos.PlayerDTO;

/**
 * This interface is used to mark a record as a DraftDTO. This is used for polymorphism.
 */
public record DraftPickDTO(
    int pickNumber,
    int teamNumber,
    PlayerDTO player) {}
