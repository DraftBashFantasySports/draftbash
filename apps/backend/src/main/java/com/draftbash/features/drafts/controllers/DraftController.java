package com.draftbash.features.drafts.controllers;

import com.draftbash.features.drafts.dtos.FootballDraftCreationDTO;
import com.draftbash.features.drafts.dtos.FootballDraftSettingsDTO;
import com.draftbash.features.drafts.interfaces.IFootballDraftRepository;
import com.draftbash.features.drafts.services.CreateFootballDraftService;
import java.util.HashMap;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller for handling app user requests.
 */
@RestController
@RequestMapping("/api/v1/drafts")
public class DraftController {

    private final CreateFootballDraftService createFootballDraftService;

    private final IFootballDraftRepository footballDrafRepository;

    public DraftController(
            CreateFootballDraftService createFootballDraftService,
            IFootballDraftRepository draftRepository) {
        this.createFootballDraftService = createFootballDraftService;
        this.footballDrafRepository = draftRepository;
    }

    /**
     * Gets the draft settings for a user.

     * @param userId The user ID to get the draft settings for
     * @return The draft settings for the user
     */
    @GetMapping("")
    public ResponseEntity<Object> getUserDrafts(
            @RequestParam(name = "user_id", required = true) String userId) {
        List<FootballDraftSettingsDTO> footballDrafts = footballDrafRepository
            .getDrafts(Integer.parseInt(userId));
        final HashMap<String, Object> drafts = new HashMap<String, Object>();
        drafts.put("footballDrafts", footballDrafts);
        return ResponseEntity.ok().body(drafts);
    }

    /**
     * Creates a new football draft.
     *
     * @param createDraftRequest The request to create a new football draft
     * @return The response for the new draft
     */
    @PostMapping("football-drafts")
    public ResponseEntity<Object> createDraft(
            @RequestBody FootballDraftCreationDTO createDraftRequest) {
        try {
            createFootballDraftService.createDraft(createDraftRequest);
            return ResponseEntity.ok().body("Draft created successfully.");
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }
}
