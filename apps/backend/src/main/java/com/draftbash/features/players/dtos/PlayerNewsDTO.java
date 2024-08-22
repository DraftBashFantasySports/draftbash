package com.draftbash.features.players.dtos;

/**
 * Stores the player news data.
 */
public record PlayerNewsDTO(
    int playerId,
    String headline,
    String summary,
    String analysis,
    String fantasyOutlook,
    String url,
    String date
) {}
