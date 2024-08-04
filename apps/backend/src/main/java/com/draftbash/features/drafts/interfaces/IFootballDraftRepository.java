package com.draftbash.features.drafts.interfaces;

import com.draftbash.features.drafts.dtos.football.FootballDraftCreationRequestDTO;

/**
 * Interface for football draft repositories.
 */
public interface IFootballDraftRepository extends IDraftRepository {
    public void createDraft(FootballDraftCreationRequestDTO draftSettings);
}
