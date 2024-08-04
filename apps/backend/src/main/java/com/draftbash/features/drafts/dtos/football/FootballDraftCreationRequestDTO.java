package com.draftbash.features.drafts.dtos.football;

/**
 * This dto contains the draft details for creating a football draft.
 */
public record FootballDraftCreationRequestDTO(
    int createdByUserId,
    FootballDraftSettingsDTO settings
) {}
