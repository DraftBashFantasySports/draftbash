package com.draftbash.features.players.dtos.football;

/**
 * This dto contains the attributes for an nfl kicker.
 */
public record KickerProjection(
    int shortFieldGoalsMade,
    int mediumFieldGoalsMade,
    int longFieldGoalsMade,
    int fieldGoalsAttempted,
    int extraPointsMade,
    int extraPointsAttempted,
    int fantasyPoints
) {}