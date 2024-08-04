package com.draftbash.features.drafts.services;

import com.draftbash.features.common.utils.fantasyteams.FantasyTeamFactory;
import com.draftbash.features.drafts.dtos.DraftDTO;
import com.draftbash.features.drafts.dtos.DraftMessageDTO;
import com.draftbash.features.drafts.dtos.DraftPickDTO;
import com.draftbash.features.drafts.dtos.DraftSettingsDTO;
import com.draftbash.features.drafts.dtos.DraftUserDTO;
import com.draftbash.features.drafts.dtos.PlayerDTO;
import com.draftbash.features.drafts.interfaces.IDraftRepository;
import com.draftbash.features.drafts.interfaces.IFantasyTeam;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.ScheduledFuture;

/**
 * This class contains draft room information.
 */
public class DraftRoomService {
    private int timeRemaining;

    private boolean isTimerStopped = false;

    private ScheduledFuture<?> scheduledTask;

    private IDraftRepository draftRepository;

    private List<DraftPickDTO> draftPicks;

    private List<PlayerDTO> players;

    private List<DraftUserDTO> draftUsers;

    private DraftSettingsDTO draftSettings;

    private List<DraftMessageDTO> chatMessages;

    private HashMap<Integer, IFantasyTeam> fantasyTeams = new HashMap<>();

    private int draftId;

    /**
     * This constructor initializes the draft room.
     */
    public DraftRoomService(int draftId, IDraftRepository draftRepository) {
        this.draftRepository = draftRepository;
        this.draftId = draftId;
        this.draftPicks = draftRepository.getDraftPicks(draftId);
        this.players = draftRepository.getPlayers(draftId);
        this.draftSettings = draftRepository.getDraft(draftId).settings();
        this.draftUsers = draftRepository.getDraftUsers(draftId);
        this.timeRemaining = draftSettings.pickTimeLimit();
        this.chatMessages = new ArrayList<>();
    }

    public void addMessage(DraftMessageDTO message) {
        this.chatMessages.add(message);
    }

    public void dequeuePlayer(int userId, int playerId) {
        this.draftRepository.dequeuePlayer(draftId, userId, playerId);
        this.draftUsers = draftRepository.getDraftUsers(draftId);
    }

    /**
     * This method adds a player to the draft room.
     */
    public void enqueuePlayer(int userId, int playerId, int rank) {
        try {
            for (DraftUserDTO user : draftUsers) {
                if (user.userId() == userId) {
                    fantasyTeams.get(user.teamNumber())
                        .addPlayer(players.stream()
                        .filter(p -> p.id() == playerId).findFirst().get());
                }
            }
            this.draftRepository.enqueuePlayer(draftId, userId, playerId, rank);
            this.draftUsers = draftRepository.getDraftUsers(draftId);
        } catch (Exception e) {
            this.draftUsers = draftRepository.getDraftUsers(draftId);
        }
    }

    /**
     * This method adds a player to the draft room.
     */
    public void autoDraft(DraftPickDTO draftPick) {
        HashMap<Integer, IFantasyTeam> teams = getFantasyTeams();
        int teamNumber = draftPick.teamNumber();
        IFantasyTeam team = teams.get(teamNumber);
        List<PlayerDTO> eligiblePlayers = players;
        int range = 3;
        for (int i = 0; i < this.players.size(); i++) {
            try {
                PlayerDTO player = eligiblePlayers.get((int) (Math.random() * (range)));
                DraftPickDTO selectedDraftPick = new DraftPickDTO(
                        draftPick.pickNumber(), draftPick.teamNumber(), player);
                team.addPlayer(player);
                this.draftRepository.pickPlayer(draftId, selectedDraftPick);
                players.remove(player);
                range = 3;
                break;
            } catch (Exception e) {
                eligiblePlayers = team.getEligiblePlayers(players);
                range += 1;
                continue;
            }
        }
        this.players = draftRepository.getPlayers(draftId);
        this.draftPicks = draftRepository.getDraftPicks(draftId);
        this.draftUsers = draftRepository.getDraftUsers(draftId);
    }

    /**
     * Starts the draft.
     */
    public void startDraft() {
        draftRepository.startDraft(draftId);
        draftSettings = draftRepository.getDraft(draftId).settings();
        for (DraftUserDTO draftUser : draftUsers) {
            if (draftUser.teamNumber() == 0) {
                int randomTeamNumber = (int) (Math.random() * draftSettings.teamCount()) + 1;
                claimTeam(draftUser.userId(), randomTeamNumber, draftId);
            }
        }
    }

    /**
    * Starts the draft.
    */
    public void updateDraftSettings(DraftDTO draft) {
        draftRepository.updateDraftSettings(draft);
        this.draftSettings = draftRepository.getDraft(draftId).settings();
        this.draftUsers = draftRepository.getDraftUsers(draftId);
        this.draftPicks = draftRepository.getDraftPicks(draftId);
        this.players = draftRepository.getPlayers(draftId);
    }

    /**
     * This method adds a player to the draft room.

     * @param draftPick The player to add
     */
    public void pickPlayer(DraftPickDTO draftPick) {
        int teamNumber = draftPick.teamNumber();
        HashMap<Integer, IFantasyTeam> teams = getFantasyTeams();
        IFantasyTeam team = teams.get(teamNumber);
        try {
            team.addPlayer(draftPick.player());
            this.draftRepository.pickPlayer(draftId, draftPick);
            this.draftPicks = draftRepository.getDraftPicks(draftId);
            this.players = draftRepository.getPlayers(draftId);
            this.draftUsers = draftRepository.getDraftUsers(draftId);
        } catch (Exception e) {
            throw new IllegalArgumentException("Player already picked");
        }
    }

    /**
     * This method gets the fantasy teams in the draft.

     * @return The fantasy teams
     */
    public HashMap<Integer, IFantasyTeam> getFantasyTeams() {
        for (int i = 1; i <= draftSettings.teamCount(); i++) {
            IFantasyTeam team = new FantasyTeamFactory().getFantasyTeam(draftSettings.sport());
            team.setPositionLimits(draftSettings);
            for (DraftPickDTO pick : draftPicks) {
                try {
                    if (pick.teamNumber() == i) {
                        if (pick.player() != null) {
                            team.addPlayer(pick.player());
                        }
                    }
                } catch (Exception e) {
                    break;
                }
            }
            fantasyTeams.put(i, team);
        }
        return fantasyTeams;
    }

    public void claimTeam(int userId, int teamNumber, int draftId) {
        this.draftRepository.claimTeam(userId, teamNumber, draftId);
        this.draftUsers = draftRepository.getDraftUsers(draftId);
    }

    public List<DraftUserDTO> getDraftUsers() {
        return this.draftUsers;
    }

    public void toggleAutoDraft(int userId, boolean isAutodrafting) {
        this.draftRepository.toggleAutoDraft(userId, draftId, isAutodrafting);
        this.draftUsers = draftRepository.getDraftUsers(draftId);
    }

    public DraftSettingsDTO getDraftSettings() {
        return this.draftSettings;
    }

    public List<PlayerDTO> getPlayers() {
        return this.players;
    }

    public List<DraftMessageDTO> getChatMessages() {
        return this.chatMessages;
    }

    public List<DraftPickDTO> getDraftPicks() {
        return this.draftPicks;
    }

    public int getTimeRemaining() {
        return timeRemaining;
    }

    public void setTimeRemaining(int timeRemaining) {
        this.timeRemaining = timeRemaining;
    }

    public boolean getIsActive() {
        return this.draftSettings.isDraftStarted();
    }

    public ScheduledFuture<?> getScheduledTask() {
        return scheduledTask;
    }

    public void setScheduledTask(ScheduledFuture<?> scheduledTask) {
        this.scheduledTask = scheduledTask;
    }

    public boolean getIsTimerStopped() {
        return isTimerStopped;
    }

    public void setIsTimerStopped(boolean isTimerStopped) {
        this.isTimerStopped = isTimerStopped;
    }
}