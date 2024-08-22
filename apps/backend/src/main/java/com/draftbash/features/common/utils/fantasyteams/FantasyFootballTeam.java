package com.draftbash.features.common.utils.fantasyteams;

import com.draftbash.features.drafts.dtos.DraftSettingsDTO;
import com.draftbash.features.drafts.dtos.football.FootballDraftSettingsDTO;
import com.draftbash.features.drafts.interfaces.IFantasyTeam;
import com.draftbash.features.players.dtos.PlayerDTO;
import com.draftbash.features.players.dtos.football.FootballPlayerDTO;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * This class holds the players on a user's football team.

 * @param quarterbackSpotsCount   the number of quarterback spots
 * @param runningBackSpotsCount   the number of running back spots
 * @param wideReceiverSpotsCount  the number of wide receiver spots
 * @param tightEndSpotsCount      the number of tight end spots
 * @param kickerSpotsCount        the number of kicker spots
 * @param teamDefensiveSpotsCount the number of team defense spots
 */
public class FantasyFootballTeam implements IFantasyTeam {
    private HashMap<String, PlayerDTO[]> playerSpots = new HashMap<String, PlayerDTO[]>();
    private List<String> ineligiblePositions = new ArrayList<String>();

    /**
     * Constructor.
     */
    public FantasyFootballTeam(int quarterbackSpotsCount, int runningBackSpotsCount,
            int wideReceiverSpotsCount, int tightEndSpotsCount, int kickerSpotsCount,
            int teamDefensiveSpotsCount, int flexSpotsCount, int benchSpotsCount) {

        playerSpots.put("quarterback", new FootballPlayerDTO[quarterbackSpotsCount]);
        playerSpots.put("runningBack", new FootballPlayerDTO[runningBackSpotsCount]);
        playerSpots.put("wideReceiver", new FootballPlayerDTO[wideReceiverSpotsCount]);
        playerSpots.put("tightEnd", new FootballPlayerDTO[tightEndSpotsCount]);
        playerSpots.put("kicker", new FootballPlayerDTO[kickerSpotsCount]);
        playerSpots.put("teamDefense", new FootballPlayerDTO[teamDefensiveSpotsCount]);
        playerSpots.put("flex", new FootballPlayerDTO[flexSpotsCount]);
        playerSpots.put("bench", new FootballPlayerDTO[benchSpotsCount]);
    }

    public FantasyFootballTeam() {
    }

    /**
     * Sets the size of each player spot on the team.

     * @param settings the draft settings
     */
    public void setPositionLimits(DraftSettingsDTO settings) {
        FootballDraftSettingsDTO footballSettings = (FootballDraftSettingsDTO) settings;
        playerSpots.put("quarterback", new FootballPlayerDTO[footballSettings.quarterbackLimit()]);
        playerSpots.put("runningBack", new FootballPlayerDTO[footballSettings.runningBackLimit()]);
        playerSpots.put("wideReceiver", 
            new FootballPlayerDTO[footballSettings.wideReceiverLimit()]);
        playerSpots.put("tightEnd", new FootballPlayerDTO[footballSettings.tightEndLimit()]);
        playerSpots.put("kicker", new FootballPlayerDTO[footballSettings.kickerLimit()]);
        playerSpots.put("teamDefense", new FootballPlayerDTO[footballSettings.defenseLimit()]);
        playerSpots.put("flex", new FootballPlayerDTO[footballSettings.flexLimit()]);
        playerSpots.put("bench", new FootballPlayerDTO[footballSettings.benchLimit()]);
    }

    /**
     * Sets the size of each player spot on the team.

     * @param quarterbackSpotsCount   the number of quarterback spots
     * @param runningBackSpotsCount   the number of running back spots
     * @param wideReceiverSpotsCount  the number of wide receiver spots
     * @param tightEndSpotsCount      the number of tight end spots
     * @param kickerSpotsCount        the number of kicker spots
     * @param teamDefensiveSpotsCount the number of team defense spots
     * @param flexSpotsCount          the number of flex spots
     * @param benchSpotsCount         the number of bench spots
     */
    public void setPlayerSpotSize(int quarterbackSpotsCount, int runningBackSpotsCount,
            int wideReceiverSpotsCount, int tightEndSpotsCount, int kickerSpotsCount,
            int teamDefensiveSpotsCount, int flexSpotsCount, int benchSpotsCount) {

        playerSpots.put("quarterback", new FootballPlayerDTO[quarterbackSpotsCount]);
        playerSpots.put("runningBack", new FootballPlayerDTO[runningBackSpotsCount]);
        playerSpots.put("wideReceiver", new FootballPlayerDTO[wideReceiverSpotsCount]);
        playerSpots.put("tightEnd", new FootballPlayerDTO[tightEndSpotsCount]);
        playerSpots.put("kicker", new FootballPlayerDTO[kickerSpotsCount]);
        playerSpots.put("teamDefense", new FootballPlayerDTO[teamDefensiveSpotsCount]);
        playerSpots.put("flex", new FootballPlayerDTO[flexSpotsCount]);
        playerSpots.put("bench", new FootballPlayerDTO[benchSpotsCount]);
    }

    public HashMap<String, PlayerDTO[]> getPlayerSpots() {
        return playerSpots;
    }

    /**
     * Gets the players on the team.

     * @return the players on the team
     */
    public List<PlayerDTO> getEligiblePlayers(List<PlayerDTO> players) {
        List<PlayerDTO> eligiblePlayers = new ArrayList<PlayerDTO>();
        for (PlayerDTO player : players) {
            FootballPlayerDTO footballPlayer = (FootballPlayerDTO) player;
            boolean isPlayerEligible = false;
            if (footballPlayer.isQuarterback() && !ineligiblePositions.contains("quarterback")) {
                isPlayerEligible = true;
            }
            if (footballPlayer.isWideReceiver() && !ineligiblePositions.contains("wideReceiver")) {
                isPlayerEligible = true;
            }
            if (footballPlayer.isRunningBack() && !ineligiblePositions.contains("runningBack")) {
                isPlayerEligible = true;
            }
            if (footballPlayer.isTightEnd() && !ineligiblePositions.contains("tightEnd")) {
                isPlayerEligible = true;
            }
            if (footballPlayer.isKicker() && !ineligiblePositions.contains("kicker")) {
                isPlayerEligible = true;
            }
            if (footballPlayer.isTeamDefense() && !ineligiblePositions.contains("teamDefense")) {
                isPlayerEligible = true;
            }
            if (isPlayerEligible) {
                eligiblePlayers.add(player);
            }
        }
        return eligiblePlayers;
    }

    /**
     * Adds a player to the user's team.

     * @param player the player to add
     */
    public void addPlayer(PlayerDTO player) {
        boolean isAdded = false;
        FootballPlayerDTO footballPlayer = (FootballPlayerDTO) player;
        if (footballPlayer.isQuarterback()) {
            for (int i = 0; i < playerSpots.get("quarterback").length; i++) {
                if (playerSpots.get("quarterback")[i] == null) {
                    playerSpots.get("quarterback")[i] = player;
                    isAdded = true;
                    break;
                } else if (shiftPlayer(playerSpots.get("quarterback")[i], "quarterback", i)) {
                    playerSpots.get("quarterback")[i] = player;
                    isAdded = true;
                    break;
                }
            }
        }
        if (footballPlayer.isWideReceiver() && !isAdded) {
            for (int i = 0; i < playerSpots.get("wideReceiver").length; i++) {
                if (playerSpots.get("wideReceiver")[i] == null) {
                    playerSpots.get("wideReceiver")[i] = player;
                    isAdded = true;
                    break;
                } else if (shiftPlayer(playerSpots.get("wideReceiver")[i], "wideReceiver", i)) {
                    playerSpots.get("wideReceiver")[i] = player;
                    isAdded = true;
                    break;
                }
            }
        }
        if (footballPlayer.isRunningBack() && !isAdded) {
            for (int i = 0; i < playerSpots.get("runningBack").length; i++) {
                if (playerSpots.get("runningBack")[i] == null) {
                    playerSpots.get("runningBack")[i] = player;
                    isAdded = true;
                    break;
                } else if (shiftPlayer(playerSpots.get("runningBack")[i], "runningBack", i)) {
                    playerSpots.get("runningBack")[i] = player;
                    isAdded = true;
                    break;
                }
            }
        }
        if (footballPlayer.isTightEnd() && !isAdded) {
            for (int i = 0; i < playerSpots.get("tightEnd").length; i++) {
                if (playerSpots.get("tightEnd")[i] == null) {
                    playerSpots.get("tightEnd")[i] = player;
                    isAdded = true;
                    break;
                } else if (shiftPlayer(playerSpots.get("tightEnd")[i], "tightEnd", i)) {
                    playerSpots.get("tightEnd")[i] = player;
                    isAdded = true;
                    break;
                }
            }
        }
        if (footballPlayer.isKicker() && !isAdded) {
            for (int i = 0; i < playerSpots.get("kicker").length; i++) {
                if (playerSpots.get("kicker")[i] == null) {
                    playerSpots.get("kicker")[i] = player;
                    isAdded = true;
                    break;
                } else if (shiftPlayer(playerSpots.get("kicker")[i], "kicker", i)) {
                    playerSpots.get("kicker")[i] = player;
                    isAdded = true;
                    break;
                }
            }
        }
        if (footballPlayer.isTeamDefense() && !isAdded) {
            for (int i = 0; i < playerSpots.get("teamDefense").length; i++) {
                if (playerSpots.get("teamDefense")[i] == null) {
                    playerSpots.get("teamDefense")[i] = player;
                    isAdded = true;
                    break;
                } else if (shiftPlayer(playerSpots.get("teamDefense")[i], "teamDefense", i)) {
                    playerSpots.get("teamDefense")[i] = player;
                    isAdded = true;
                    break;
                }
            }
        }
        if ((footballPlayer.isRunningBack() || footballPlayer.isWideReceiver()
                || footballPlayer.isTightEnd()) && !isAdded) {
            for (int i = 0; i < playerSpots.get("flex").length; i++) {
                if (playerSpots.get("flex")[i] == null) {
                    playerSpots.get("flex")[i] = player;
                    isAdded = true;
                    break;
                } else if (shiftPlayer(playerSpots.get("flex")[i], "flex", i)) {
                    playerSpots.get("flex")[i] = player;
                    isAdded = true;
                    break;
                }
            }
        }
        if (!isAdded) {
            for (int i = 0; i < playerSpots.get("bench").length; i++) {
                if (playerSpots.get("bench")[i] == null) {
                    playerSpots.get("bench")[i] = player;
                    isAdded = true;
                    break;
                } else if (shiftPlayer(playerSpots.get("bench")[i], "bench", i)) {
                    playerSpots.get("bench")[i] = player;
                    isAdded = true;
                    break;
                }
            }
        }
        if (!isAdded) {
            if (footballPlayer.isQuarterback()) {
                ineligiblePositions.add("quarterback");
            }
            if (footballPlayer.isWideReceiver()) {
                ineligiblePositions.add("wideReceiver");
            }
            if (footballPlayer.isRunningBack()) {
                ineligiblePositions.add("runningBack");
            }
            if (footballPlayer.isTightEnd()) {
                ineligiblePositions.add("tightEnd");
            }
            if (footballPlayer.isKicker()) {
                ineligiblePositions.add("kicker");
            }
            if (footballPlayer.isTeamDefense()) {
                ineligiblePositions.add("teamDefense");
            }
            throw new IllegalArgumentException("No spot available for player.");
        }
    }

    private boolean shiftPlayer(PlayerDTO player, String position, int index) {
        boolean isMoved = false;
        FootballPlayerDTO footballPlayer = (FootballPlayerDTO) player;
        if (footballPlayer.isQuarterback()) {
            for (int i = 0; i < playerSpots.get("quarterback").length; i++) {
                if (playerSpots.get("quarterback")[i] == null) {
                    playerSpots.get("quarterback")[i] = player;
                    isMoved = true;
                    break;
                }
            }
        }
        if (footballPlayer.isWideReceiver() && !isMoved) {
            for (int i = 0; i < playerSpots.get("wideReceiver").length; i++) {
                if (playerSpots.get("wideReceiver")[i] == null) {
                    playerSpots.get("wideReceiver")[i] = player;
                    isMoved = true;
                    break;
                }
            }
        }
        if (footballPlayer.isRunningBack() && !isMoved) {
            for (int i = 0; i < playerSpots.get("runningBack").length; i++) {
                if (playerSpots.get("runningBack")[i] == null) {
                    playerSpots.get("runningBack")[i] = player;
                    isMoved = true;
                    break;
                }
            }
        }
        if (footballPlayer.isTightEnd() && !isMoved) {
            for (int i = 0; i < playerSpots.get("tightEnd").length; i++) {
                if (playerSpots.get("tightEnd")[i] == null) {
                    playerSpots.get("tightEnd")[i] = player;
                    isMoved = true;
                    break;
                }
            }
        }
        if (footballPlayer.isKicker() && !isMoved) {
            for (int i = 0; i < playerSpots.get("kicker").length; i++) {
                if (playerSpots.get("kicker")[i] == null) {
                    playerSpots.get("kicker")[i] = player;
                    isMoved = true;
                    break;
                }
            }
        }
        if (footballPlayer.isTeamDefense() && !isMoved) {
            for (int i = 0; i < playerSpots.get("teamDefense").length; i++) {
                if (playerSpots.get("teamDefense")[i] == null) {
                    playerSpots.get("teamDefense")[i] = player;
                    isMoved = true;
                    break;
                }
            }
        }
        if ((footballPlayer.isRunningBack() || footballPlayer.isWideReceiver()
                || footballPlayer.isTightEnd())
                && !isMoved) {
            for (int i = 0; i < playerSpots.get("flex").length; i++) {
                if (playerSpots.get("flex")[i] == null) {
                    playerSpots.get("flex")[i] = player;
                    isMoved = true;
                    break;
                }
            }
        }
        if (!isMoved) {
            for (int i = 0; i < playerSpots.get("bench").length; i++) {
                if (playerSpots.get("bench")[i] == null) {
                    playerSpots.get("bench")[i] = player;
                    isMoved = true;
                    break;
                }
            }
        }
        return isMoved;
    }
}
