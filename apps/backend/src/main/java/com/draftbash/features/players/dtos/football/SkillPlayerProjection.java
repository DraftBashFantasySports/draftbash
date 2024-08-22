package com.draftbash.features.players.dtos.football;

/**
 * This dto contains the attributes for an nfl skill player.
 */
public record SkillPlayerProjection(
    int rushAttempts,
    int rushYards,
    int rushTouchdowns,
    int targets,
    int receptions,
    int receivingYards,
    int receivingTouchdowns,
    int passAttempts,
    int passCompletions,
    int passYards,
    int passTouchdowns,
    int interceptions,
    int fumblesLost,
    int twoPointConversions,
    int standardFantasyPoints,
    int pprFantasyPoints,
    int halfPprFantasyPoints
) {}