package com.draftbash.features.drafts.controllers;

import com.draftbash.features.drafts.dtos.DraftDTO;
import com.draftbash.features.drafts.dtos.DraftMessageDTO;
import com.draftbash.features.drafts.dtos.DraftPickDTO;
import com.draftbash.features.drafts.dtos.DraftSettingsDTO;
import com.draftbash.features.drafts.dtos.DraftUserDTO;
import com.draftbash.features.drafts.interfaces.IDraftRepository;
import com.draftbash.features.drafts.interfaces.IFantasyTeam;
import com.draftbash.features.drafts.repositories.DraftRepositoryFactory;
import com.draftbash.features.drafts.services.DraftRoomService;
import com.draftbash.features.players.dtos.PlayerDTO;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.stereotype.Controller;

/**
 * Controller for handling draft WebSocket requests.
 */
@Controller
public class DraftWebSocketController {

    private final Map<Integer, DraftRoomService> draftRooms = new ConcurrentHashMap<>();

    private final SimpMessagingTemplate messagingTemplate;

    private final DraftRepositoryFactory draftRepositoryFactory;

    /**
     * Constructor for the DraftWebSocketController class.
     */
    public DraftWebSocketController(SimpMessagingTemplate messagingTemplate,
            DraftRepositoryFactory draftRepositoryFactory) {
        this.messagingTemplate = messagingTemplate;
        ThreadPoolTaskScheduler scheduler = new ThreadPoolTaskScheduler();
        scheduler.setPoolSize(5);
        scheduler.initialize();
        this.draftRepositoryFactory = draftRepositoryFactory;
    }

    private record MessageDTO(DraftMessageDTO message, int draftId) {}
    /**
     * Sends a message in a draft room.

     * @param message The message to send
     */
    @MessageMapping("/drafts.message")
    public void sendMessage(@Payload MessageDTO message) {
        DraftRoomService draftRoom = draftRooms.get(message.draftId());
        Map<String, Object> response = new HashMap<>();
        if (draftRoom != null) {
            draftRoom.addMessage(message.message());
            response.put("messages", draftRoom.getChatMessages());
            messagingTemplate.convertAndSend("/topic/drafts/" + message.draftId(), response);
        }
    }

    private record DequeuedPlayerDTO(int userId, int playerId, int rank, int draftId) {}
    /**
     * Dequeues a player in a draft room.

     * @param dequeuedPlayer The message to dequeue a player
     */
    @MessageMapping("/drafts.dequeue-player")
    public void dequeuePlayer(@Payload DequeuedPlayerDTO dequeuedPlayer) {
        int draftId = dequeuedPlayer.draftId();
        int userId = dequeuedPlayer.userId();
        int playerId = dequeuedPlayer.playerId();
        DraftRoomService draftRoom = draftRooms.get(draftId);
        Map<String, Object> response = new HashMap<>();

        if (draftRoom != null) {
            draftRoom.dequeuePlayer(userId, playerId);
            response.put("draftUsers", draftRoom.getDraftUsers());
            messagingTemplate.convertAndSend("/topic/drafts/" + draftId, response);
        }
    }

    /**
     * Updates the draft settings in a draft room.

     * @param draft The message to update draft settings
     */
    @MessageMapping("/drafts.update-draft-settings")
    public void updateDraftSettings(@Payload DraftDTO draft) {
        DraftRoomService draftRoom = draftRooms.get(draft.id());
        Map<String, Object> response = new HashMap<>();

        if (draftRoom != null) {
            draftRoom.updateDraftSettings(draft);
            response.put("draftUsers", draftRoom.getDraftUsers());
            response.put("draftSettings", draftRoom.getDraftSettings());
            response.put("draftPicks", draftRoom.getDraftPicks());
            response.put("players", draftRoom.getPlayers());
            messagingTemplate.convertAndSend("/topic/drafts/" + draft.id(), response);
        }
    }

    private record QueuedPlayersSwapDTO(int draftId, int userId, EnqueuedPlayerDTO firstPlayer, EnqueuedPlayerDTO secondPlayer) {}
    @MessageMapping("/drafts.swap-queued-players")
    public void swapQueuedPlayers(@Payload QueuedPlayersSwapDTO queuedPlayers) {
        int draftId = queuedPlayers.draftId();
        int userId = queuedPlayers.userId();
        DraftRoomService draftRoom = draftRooms.get(draftId);
        Map<String, Object> response = new HashMap<>();

        if (draftRoom != null) {
            draftRoom.enqueuePlayer(
                userId, 
                queuedPlayers.firstPlayer().playerId(), 
                queuedPlayers.firstPlayer().rank()
            );
            draftRoom.enqueuePlayer(
                userId, 
                queuedPlayers.secondPlayer().playerId(), 
                queuedPlayers.secondPlayer().rank()
            );
            response.put("draftUsers", draftRoom.getDraftUsers());
            messagingTemplate.convertAndSend("/topic/drafts/" + draftId, response);
        }
    }

    private record EnqueuedPlayerDTO(int userId, int playerId, int rank, int draftId) {}
    /**
     * Enqueues a player in a draft room.

     * @param enqueuedPlayer The message to enqueue a player
     */
    @MessageMapping("/drafts.enqueue-player")
    public void enqueuePlayer(@Payload EnqueuedPlayerDTO enqueuedPlayer) {
        int draftId = enqueuedPlayer.draftId();
        int userId = enqueuedPlayer.userId();
        int playerId = enqueuedPlayer.playerId();
        int rank = enqueuedPlayer.rank();
        DraftRoomService draftRoom = draftRooms.get(draftId);
        Map<String, Object> response = new HashMap<>();

        if (draftRoom != null) {
            draftRoom.enqueuePlayer(userId, playerId, rank);
            response.put("draftUsers", draftRoom.getDraftUsers());
            messagingTemplate.convertAndSend("/topic/drafts/" + draftId, response);
        }
    }

    private record ToggleAutoDraftDTO(int userId, int draftId, boolean isAutodrafting) {
    }

    /**
     * Toggles auto draft for a user in a draft room.

     * @param activeAutoDraft The message to toggle auto draft
     */
    @MessageMapping("/drafts.toggle-autodraft")
    public void toggleAutoDraft(@Payload ToggleAutoDraftDTO activeAutoDraft) {
        int draftId = activeAutoDraft.draftId();
        int userId = activeAutoDraft.userId();
        DraftRoomService draftRoom = draftRooms.get(draftId);
        Map<String, Object> response = new HashMap<>();

        if (draftRoom != null) {
            draftRoom.toggleAutoDraft(userId, activeAutoDraft.isAutodrafting());
            response.put("draftUsers", draftRoom.getDraftUsers());
            messagingTemplate.convertAndSend("/topic/drafts/" + draftId, response);
            if (activeAutoDraft.isAutodrafting()) {
                draftRoom.setIsTimerStopped(true);
                autoDraft(draftId);
            }
        }
    }

    private record JoinDraftDTO(int draftId, String sport) {}
    /**
     * Joins a draft room.

     * @param joinRoomMessage The message to join a draft room
     */
    @MessageMapping("/drafts.join")
    public void joinRoom(@Payload JoinDraftDTO joinRoomMessage) {
        int draftId = joinRoomMessage.draftId();
        String sport = joinRoomMessage.sport();

        IDraftRepository draftRepository = draftRepositoryFactory.getDraftRepository(sport);

        draftRooms.putIfAbsent(draftId, new DraftRoomService(draftId, draftRepository));

        DraftRoomService draftRoom = draftRooms.get(draftId);

        List<PlayerDTO> players = draftRoom.getPlayers();
        List<DraftPickDTO> draftPicks = draftRoom.getDraftPicks();
        DraftSettingsDTO draftSettings = draftRoom.getDraftSettings();
        List<DraftUserDTO> draftUsers = draftRoom.getDraftUsers();
        HashMap<Integer, IFantasyTeam> fantasyTeams = draftRoom.getFantasyTeams();

        Map<String, Object> response = new HashMap<>();
        response.put("draftPicks", draftPicks);
        response.put("draftSettings", draftSettings);
        response.put("players", players);
        response.put("draftUsers", draftUsers);
        response.put("fantasyTeams", fantasyTeams);

        autoDraft(draftId);
        messagingTemplate.convertAndSend("/topic/drafts/" + draftId, response);
    }

    private record PickPlayerDTO(int draftId, DraftPickDTO draftPick) {
    }

    /**
     * Picks a player in a draft room.

     * @param pickedPlayerData The message to pick a player
     */
    @MessageMapping("/drafts.pick-player")
    public void pickPlayer(@Payload PickPlayerDTO pickedPlayerData) {
        int draftId = pickedPlayerData.draftId();

        DraftRoomService draftRoom = draftRooms.get(draftId);
        Map<String, Object> response = new HashMap<>();

        try {
            draftRoom.pickPlayer(pickedPlayerData.draftPick());
            List<PlayerDTO> players = draftRoom.getPlayers();
            List<DraftPickDTO> draftPicks = draftRoom.getDraftPicks();
            HashMap<Integer, IFantasyTeam> fantasyTeams = draftRoom.getFantasyTeams();

            response.put("draftPicks", draftPicks);
            response.put("players", players);
            response.put("fantasyTeams", fantasyTeams);
            messagingTemplate.convertAndSend("/topic/drafts/" + draftId, response);
            draftRoom.setIsTimerStopped(true);
            autoDraft(draftId);
        } catch (Exception e) {
            response.put("error", "Player cannot be picked");
        }
    }

    private record StartDraftDTO(int draftId) {
    }

    /**
     * Starts a draft room.

     * @param startDraftMessage The message to start a draft room
     */
    @MessageMapping("/drafts.start")
    public void startDraft(@Payload StartDraftDTO startDraftMessage) {
        int draftId = startDraftMessage.draftId();
        DraftRoomService draftRoom = draftRooms.get(draftId);

        if (draftRoom != null) {
            draftRoom.startDraft();
            DraftSettingsDTO draftSettings = draftRoom.getDraftSettings();
            Map<String, Object> response = new HashMap<>();
            response.put("draftSettings", draftSettings);
            response.put("draftUsers", draftRoom.getDraftUsers());
            response.put("timeRemaining", draftRoom.getTimeRemaining());

            messagingTemplate.convertAndSend("/topic/drafts/" + draftId, response);
            autoDraft(draftId);
        }
    }

    private record TeamClaimDTO(int userId, int teamNumber, int draftId) {
    }

    /**
     * Broadcasts the timer for a draft room.

     * @param teamClaim The message to claim a team
     */
    @MessageMapping("/drafts.claim-team")
    public void claimTeam(@Payload TeamClaimDTO teamClaim) {
        int draftId = teamClaim.draftId();
        int userId = teamClaim.userId();
        int teamNumber = teamClaim.teamNumber();
        DraftRoomService draftRoom = draftRooms.get(draftId);

        if (draftRoom != null) {
            draftRoom.claimTeam(userId, teamNumber, draftId);
            List<DraftUserDTO> draftUsers = draftRoom.getDraftUsers();
            Map<String, Object> response = new HashMap<>();
            response.put("draftUsers", draftUsers);

            messagingTemplate.convertAndSend("/topic/drafts/" + draftId, response);
        }
    }

    private void autoDraft(int draftId) {
        DraftRoomService draftRoom = draftRooms.get(draftId);
        Map<String, Object> response = new HashMap<>();
        if (draftRoom != null && draftRoom.getIsActive()) {
            for (DraftPickDTO draftPick : draftRoom.getDraftPicks()) {
                if (draftPick.player() != null) {
                    continue;
                }
                boolean isAutoDrafting = true;
                boolean isAddingQueuedPlayer = false;
                for (DraftUserDTO user : draftRoom.getDraftUsers()) {
                    if (user.teamNumber() == draftPick.teamNumber()) {
                        try {
                            Thread.sleep(1000);
                        } catch (Exception e) {
                            System.out.println(e.getMessage());
                        }
                        for (int i = 0; i < user.playerQueue().size(); i++) {
                            try {
                                draftRoom.dequeuePlayer(
                                    user.userId(), user.playerQueue().get(i).player().id());
                                draftRoom.pickPlayer(new DraftPickDTO(
                                    draftPick.pickNumber(),
                                    draftPick.teamNumber(),
                                    user.playerQueue().get(0).player()));
                                                        response.put("draftUsers", draftRoom.getDraftUsers());
                                isAddingQueuedPlayer = true;
                                break;
                            } catch (Exception e) {
                                continue;
                            }
                        }
                        if (!user.isAutodrafting()) {
                            isAutoDrafting = false;
                        }
                        response.put("draftUsers", draftRoom.getDraftUsers());
                        response.put("draftPicks", draftRoom.getDraftPicks());
                        response.put("players", draftRoom.getPlayers());
                        response.put("fantasyTeams", draftRoom.getFantasyTeams());
                        response.put("timeRemaining", 
                            draftRoom.getDraftSettings().pickTimeLimit());
                        messagingTemplate.convertAndSend("/topic/drafts/" + draftId, response);
                        break;
                    }
                }
                if (isAddingQueuedPlayer) {
                    continue;
                }
                if (!isAutoDrafting) {
                    break;
                }
                try {
                    Thread.sleep(1000);
                    draftRoom.autoDraft(draftPick);
                    response.put("draftUsers", draftRoom.getDraftUsers());
                    response.put("draftPicks", draftRoom.getDraftPicks());
                    response.put("players", draftRoom.getPlayers());
                    response.put("fantasyTeams", draftRoom.getFantasyTeams());
                    response.put("timeRemaining", draftRoom.getDraftSettings().pickTimeLimit());
                    messagingTemplate.convertAndSend("/topic/drafts/" + draftId, response);
                } catch (Exception e) {
                    draftRoom.autoDraft(draftPick);
                    response.put("draftUsers", draftRoom.getDraftUsers());
                    response.put("draftPicks", draftRoom.getDraftPicks());
                    response.put("players", draftRoom.getPlayers());
                    response.put("fantasyTeams", draftRoom.getFantasyTeams());
                    response.put("timeRemaining", draftRoom.getDraftSettings().pickTimeLimit());
                    messagingTemplate.convertAndSend("/topic/drafts/" + draftId, response);
                    System.out.println(e.getMessage());
                }
            }
            try {
                Thread.sleep(1000);
                if (draftRoom.getDraftPicks().get(draftRoom.getDraftPicks().size() - 1)
                        .player() == null) {
                    response.put("timeRemaining", draftRoom.getDraftSettings().pickTimeLimit());
                    messagingTemplate.convertAndSend("/topic/drafts/" + draftId, response);
                    startTimer(draftId);
                } else {
                    response.put("timeRemaining", draftRoom.getDraftSettings().pickTimeLimit());
                    messagingTemplate.convertAndSend("/topic/drafts/" + draftId, response);
                    draftRoom.setIsTimerStopped(true);
                }
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    private void startTimer(int draftId) {
        DraftRoomService draftRoom = draftRooms.get(draftId);
        Map<String, Object> response = new HashMap<>();
        int timeRemaining = draftRoom.getDraftSettings().pickTimeLimit();
        draftRoom.setIsTimerStopped(false);
        for (int i = 1; i <= draftRoom.getDraftSettings().pickTimeLimit(); i++) {
            if (draftRoom.getIsTimerStopped()) {
                break;
            }
            try {
                Thread.sleep(1000);
                timeRemaining -= 1;
                response.put("timeRemaining", timeRemaining);
                draftRoom.setTimeRemaining(timeRemaining);
                messagingTemplate.convertAndSend("/topic/drafts/" + draftId, response);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        if (timeRemaining <= 0) {
            DraftPickDTO currentDraftPick = null;
            for (DraftPickDTO draftPick : draftRoom.getDraftPicks()) {
                if (draftPick.player() == null) {
                    currentDraftPick = draftPick;
                    break;
                }
            }
            for (DraftUserDTO user : draftRoom.getDraftUsers()) {
                if (currentDraftPick != null 
                    && user.teamNumber() == currentDraftPick.teamNumber()) {
                        
                    draftRoom.toggleAutoDraft(user.userId(), true);
                    response.put("draftUsers", draftRoom.getDraftUsers());
                    messagingTemplate.convertAndSend("/topic/drafts/" + draftId, response);
                    autoDraft(draftId);
                    break;
                }
            }
            draftRoom.setTimeRemaining(timeRemaining);
        }
    }
}
