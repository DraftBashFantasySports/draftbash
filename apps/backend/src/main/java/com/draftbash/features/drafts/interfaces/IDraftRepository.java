package com.draftbash.features.drafts.interfaces;

import com.draftbash.features.drafts.dtos.DraftDTO;
import com.draftbash.features.drafts.dtos.DraftPickDTO;
import com.draftbash.features.drafts.dtos.DraftUserDTO;
import com.draftbash.features.players.dtos.PlayerDTO;

import java.util.List;

/**
 * This interface contains methods for draft repository.
 */
public interface IDraftRepository {
    public void startDraft(int draftId);

    public DraftDTO getDraft(int draftId);

    public List<DraftDTO> getDrafts(int userId);
    
    public List<DraftPickDTO> getDraftPicks(int draftId);

    public List<PlayerDTO> getPlayers(int draftId);

    public void claimTeam(int userId, int teamNumber, int draftId);

    public List<DraftUserDTO> getDraftUsers(int draftId);

    public void pickPlayer(int draftId, DraftPickDTO draftPick);

    public void toggleAutoDraft(int userId, int draftId, boolean isAutodrafting);

    public void enqueuePlayer(int draftId, int enqueuedByUserId, int playerId, int rank);

    public void dequeuePlayer(int draftId, int dequeuedByUserId, int playerId);

    public void updateDraftSettings(DraftDTO draft);
}
