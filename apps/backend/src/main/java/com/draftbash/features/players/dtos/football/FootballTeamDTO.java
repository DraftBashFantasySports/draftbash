package com.draftbash.features.players.dtos.football;

/**
 * This dto contains the information for an nfl team.
 */
public record FootballTeamDTO(
    int teamId,
    String teamName,
    String teamCity,
    String teamAbbreviation,
    String conference,
    String division,
    String logoUrl,
    int wins,
    int losses,
    int ties,
    int currentWinStreak,
    int byeWeek
) {}
