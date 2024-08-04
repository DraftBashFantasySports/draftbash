package com.draftbash.features.drafts.dtos.football;

import com.draftbash.features.drafts.dtos.DraftDTO;

/**
 * This dto contains the draft details of a football draft.
 */
public record FootballDraftDTO(
    int id,
    String type,
    String createdAt,
    FootballDraftSettingsDTO settings
) implements DraftDTO {}
