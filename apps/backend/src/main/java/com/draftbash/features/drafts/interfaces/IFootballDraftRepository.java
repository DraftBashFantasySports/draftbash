package com.draftbash.features.drafts.interfaces;

import com.draftbash.features.drafts.dtos.FootballDraftCreationDTO;
import com.draftbash.features.drafts.dtos.FootballDraftSettingsDTO;
import java.util.List;
import org.springframework.stereotype.Repository;

/**
 * Interface for the Draft repository.
 */
@Repository
public interface IFootballDraftRepository {
    void createDraft(FootballDraftCreationDTO draftSettings, int[] draftOrder);

    List<FootballDraftSettingsDTO> getDrafts(int draftId);
}
