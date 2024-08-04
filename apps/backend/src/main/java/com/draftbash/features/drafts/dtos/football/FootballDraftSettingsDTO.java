package com.draftbash.features.drafts.dtos.football;

import com.draftbash.features.drafts.dtos.DraftSettingsDTO;

/**
 * This dto contains the limits for each position in a football draft.
 */
public record FootballDraftSettingsDTO(
    String pickOrderFormat, 
    String scoringFormat,
    int pickTimeLimit,
    int teamCount,
    String sport,
    int quarterbackLimit,
    int runningBackLimit,
    int wideReceiverLimit,
    int tightEndLimit,
    int kickerLimit,
    int defenseLimit,
    int flexLimit,
    int benchLimit,
    boolean isDraftStarted) implements DraftSettingsDTO {}
