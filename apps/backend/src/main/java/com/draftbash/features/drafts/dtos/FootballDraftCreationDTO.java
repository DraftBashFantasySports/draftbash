package com.draftbash.features.drafts.dtos;

/**
 * This class contains the FootballDraftCreationDTO class.
 */
public record FootballDraftCreationDTO(
    String sport,
    String pickOrderFormat,
    String scoringFormat,
    int createdByUserId,
    int pickTimeLimit,
    int teamCount,
    int quarterbackLimit,
    int runningBackLimit,
    int wideReceiverLimit,
    int tightendLimit,
    int kickerLimit,
    int defenseLimit,
    int flexLimit,
    int benchLimit
) {}
