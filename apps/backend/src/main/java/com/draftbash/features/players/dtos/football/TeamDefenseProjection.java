package com.draftbash.features.players.dtos.football;

/**
 * This dto contains the attributes for an nfl team defense.
 */
public record TeamDefenseProjection(
    int sacks,
    int interceptions,
    int fumbleRecoveries,
    int touchdowns,
    int safeties,
    int blockedKicks,
    int pointsAgainst,
    int fantasyPoints
) {}