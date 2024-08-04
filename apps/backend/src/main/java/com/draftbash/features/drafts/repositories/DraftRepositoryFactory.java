package com.draftbash.features.drafts.repositories;

import com.draftbash.features.drafts.interfaces.IDraftRepository;
import com.draftbash.features.drafts.interfaces.IFootballDraftRepository;
import org.springframework.stereotype.Repository;

/**
 * This class contains the DraftOrderGeneratorFactory class.
 */
@Repository
public class DraftRepositoryFactory {

    private final IFootballDraftRepository footballDraftRepository;

    public DraftRepositoryFactory(IFootballDraftRepository footballDraftRepository) {
        this.footballDraftRepository = footballDraftRepository;
    }

    /**
     * Returns the appropriate draft order generator based on the draft type.

     * @param sport The spo
     * @return The draft order generator.
     */
    public IDraftRepository getDraftRepository(String sport) {
        switch (sport.toLowerCase()) {
            case "football":
                return footballDraftRepository;
            default:
                throw new IllegalArgumentException("Unknown sport type: " + sport);
        }
    }
}
