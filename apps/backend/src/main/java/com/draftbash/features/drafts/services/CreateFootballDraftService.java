package com.draftbash.features.drafts.services;

import com.draftbash.features.drafts.dtos.FootballDraftCreationDTO;
import com.draftbash.features.drafts.interfaces.IDraftOrderGenerator;
import com.draftbash.features.drafts.interfaces.IFootballDraftRepository;
import com.draftbash.features.drafts.utils.draftorders.DraftOrderGeneratorFactory;
import org.springframework.stereotype.Service;

/**
 * This class contains the CreateDraftService class.
 */
@Service
public class CreateFootballDraftService {

    private final IFootballDraftRepository draftRepository;

    private final DraftOrderGeneratorFactory draftOrderGeneratorFactory;

    /**
     * Constructor for the CreateDraftService class.
     */
    public CreateFootballDraftService(IFootballDraftRepository draftRepository) {
        this.draftRepository = draftRepository;
        this.draftOrderGeneratorFactory = new DraftOrderGeneratorFactory();
    }

    /**
     * Creates a draft based on the draft settings.
     */
    public void createDraft(FootballDraftCreationDTO draftSettings) {
        IDraftOrderGenerator draftOrderGenerator = draftOrderGeneratorFactory
                .getDraftOrderGenerator(draftSettings.pickOrderFormat());
        int playersPerTeam = draftSettings.quarterbackLimit() + draftSettings.runningBackLimit()
                + draftSettings.wideReceiverLimit() + draftSettings.tightendLimit() 
                + draftSettings.kickerLimit() + draftSettings.defenseLimit() 
                + draftSettings.flexLimit() + draftSettings.benchLimit();
        int[] draftOrder = draftOrderGenerator.generate(draftSettings.teamCount(), playersPerTeam);
        draftRepository.createDraft(draftSettings, draftOrder);
    }
}
