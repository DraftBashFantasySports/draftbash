package com.draftbash.features.drafts.dtos;

/**
 * This dto contains the settings for a draft.
 */
public interface DraftSettingsDTO {
    String pickOrderFormat();

    String scoringFormat();

    int pickTimeLimit();

    int teamCount();

    String sport();

    boolean isDraftStarted();
}
