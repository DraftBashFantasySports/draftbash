package com.draftbash.features.drafts.controllers;

import com.draftbash.features.drafts.dtos.DraftDTO;
import com.draftbash.features.drafts.dtos.football.FootballDraftCreationRequestDTO;
import com.draftbash.features.drafts.repositories.FootballDraftRepository;
import java.util.ArrayList;
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

    private final FootballDraftRepository footballDraftRepository;

    public DraftController(
            FootballDraftRepository draftRepository) {
        this.footballDraftRepository = draftRepository;
    }

    /**
     * Gets the draft settings for a user.

     * @param userId The user ID to get the draft settings for
     * @return The draft settings for the user
     */
    @GetMapping("")
    public ResponseEntity<List<DraftDTO>> getUserDrafts(
            @RequestParam(name = "user_id", required = true) String userId) {
        List<DraftDTO> footballDrafts = footballDraftRepository
                .getDrafts(Integer.parseInt(userId));
        List<DraftDTO> drafts = new ArrayList<DraftDTO>(footballDrafts);
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
            @RequestBody FootballDraftCreationRequestDTO createDraftRequest) {
        try {
            footballDraftRepository.createDraft(createDraftRequest);
            return ResponseEntity.ok().body("Draft created successfully.");
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }
}
