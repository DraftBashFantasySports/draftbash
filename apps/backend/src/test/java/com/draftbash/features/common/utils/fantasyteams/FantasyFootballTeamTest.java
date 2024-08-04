package com.draftbash.features.common.utils.fantasyteams;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.draftbash.features.drafts.dtos.PlayerDTO;
import com.draftbash.features.drafts.dtos.football.FootballPlayerDTO;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Test;

/**
 * This class contains unit tests for the UserTeam class.
 */
public class FantasyFootballTeamTest {

    private FantasyFootballTeam userFootballTeam;

    @Test
    public void testGetEligiblePlayers_WideReceiversIneligible() {
        userFootballTeam = new FantasyFootballTeam(0, 1, 0, 0, 0, 0, 0, 0);
        String[] playerPositions = { "runningBack", "runningBack" };
        int playerId = 1;
        for (String position : playerPositions) {
            try {
                userFootballTeam.addPlayer(new FootballPlayerDTO(
                        playerId, null, 0, 0, 0,
                        null, null, 0, 0, 0, null, 0,
                        position.contains("quarterback"), position.contains("runningBack"),
                        position.contains("wideReceiver"),
                        position.contains("tightEnd"), 
                        position.contains("kicker"), 
                        position.contains("teamDefense"),
                        null, null, null, null, null));
                playerId += 1;
            } catch (IllegalArgumentException e) {
                break;
            }
        }
        List<PlayerDTO> players = new ArrayList<>();
        PlayerDTO wideReceiver = new FootballPlayerDTO(
                3, null, 0, 0, 0,
                null, null, 0, 0, 0, null, 0,
                false, false, true, false, false,
                false, null, null, null, null, null);
        PlayerDTO runningBack = new FootballPlayerDTO(
                4, null, 0, 0, 0,
                null, null, 0, 0, 0, null, 0,
                false, true, false, false, false,
                false, null, null, null, null, null);
        players.add(wideReceiver);
        players.add(runningBack);
        List<PlayerDTO> eligiblePlayers = userFootballTeam.getEligiblePlayers(players);
        players.remove(runningBack);

        assertEquals(players, eligiblePlayers);
    }

    @Test
    public void testAddPlayer_AddQBsWithOneQBSpot() {
        userFootballTeam = new FantasyFootballTeam(1, 1, 1, 1, 1, 1, 1, 1);
        HashMap<String, FootballPlayerDTO[]> expectedPlayers = new HashMap<>();
        expectedPlayers.put("quarterback", new FootballPlayerDTO[1]);
        expectedPlayers.put("runningBack", new FootballPlayerDTO[1]);
        expectedPlayers.put("wideReceiver", new FootballPlayerDTO[1]);
        expectedPlayers.put("tightEnd", new FootballPlayerDTO[1]);
        expectedPlayers.put("kicker", new FootballPlayerDTO[1]);
        expectedPlayers.put("teamDefense", new FootballPlayerDTO[1]);
        expectedPlayers.put("flex", new FootballPlayerDTO[1]);
        expectedPlayers.put("bench", new FootballPlayerDTO[1]);
        expectedPlayers.get("runningBack")[0] = new FootballPlayerDTO(
                1, null, 0, 0, 0, null, null, 0, 0, 0, null, 0,
                false, true, false, false, false, false, null,
                null, null, null, null);
        expectedPlayers.get("wideReceiver")[0] = new FootballPlayerDTO(
                2, null, 0, 0, 0, null, null, 0, 0, 0, null, 0,
                false, false, true, false, false, false, null,
                null, null, null, null);
        expectedPlayers.get("flex")[0] = new FootballPlayerDTO(
                3, null, 0, 0, 0, null, null, 0, 0, 0, null, 0,
                true, false, false, true, false, false, null,
                null, null, null, null);
        expectedPlayers.get("bench")[0] = new FootballPlayerDTO(
                4, null, 0, 0, 0, null, null, 0, 0, 0, null, 0,
                true, false, false, false, false, false,
                null, null, null, null, null);
        expectedPlayers.get("tightEnd")[0] = new FootballPlayerDTO(
                5, null, 0, 0, 0, null, null, 0, 0, 0, null, 0,
                false, false, false, true, false, false,
                null, null, null, null, null);
        expectedPlayers.get("quarterback")[0] = new FootballPlayerDTO(
                6, null, 0, 0, 0, null, null, 0, 0, 0, null, 0,
                true, false, false, true, false, false,
                null, null, null, null, null);
        expectedPlayers.get("kicker")[0] = new FootballPlayerDTO(
                7, null, 0, 0, 0, null, null, 0, 0, 0, null, 0,
                false, false, false, false, true, false,
                null, null, null, null, null);
        expectedPlayers.get("teamDefense")[0] = new FootballPlayerDTO(
                8, null, 0, 0, 0, null, null,
                0, 0, 0, null, 0, false, false, false,
                false, false, true, null, null, null, null, null);
        String[] playerPositions = { 
            "runningBack", "wideReceiver", "quarterback/tightEnd", "quarterback", "tightEnd",
            "quarterback", "kicker", "teamDefense" };
        int playerId = 1;
        for (String position : playerPositions) {
            userFootballTeam.addPlayer(new FootballPlayerDTO(
                    playerId, null, 0, 0, 0,
                    null, null, 0, 0, 0, null, 0,
                    position.contains("quarterback"), position.contains("runningBack"),
                    position.contains("wideReceiver"),
                    position.contains("tightEnd"), 
                    position.contains("kicker"), 
                    position.contains("teamDefense"),
                    null, null, null, null, null));
            playerId += 1;
        }
    }

    @Test
    public void testAddPlayer_AddQBsWithTwoQBSpots() {
        userFootballTeam = new FantasyFootballTeam(2, 0, 0, 1, 0, 0, 1, 1);
        HashMap<String, PlayerDTO[]> expectedPlayers = new HashMap<>();
        expectedPlayers.put("quarterback", new FootballPlayerDTO[2]);
        expectedPlayers.put("runningBack", new FootballPlayerDTO[0]);
        expectedPlayers.put("wideReceiver", new FootballPlayerDTO[0]);
        expectedPlayers.put("tightEnd", new FootballPlayerDTO[1]);
        expectedPlayers.put("kicker", new FootballPlayerDTO[0]);
        expectedPlayers.put("teamDefense", new FootballPlayerDTO[0]);
        expectedPlayers.put("flex", new FootballPlayerDTO[1]);
        expectedPlayers.put("bench", new FootballPlayerDTO[1]);
        expectedPlayers.get("quarterback")[1] = new FootballPlayerDTO(
                1, null, 0, 0, 0,
                null, null, 0, 0, 0, null, 0,
                true, false, false,
                false, false, false, null, null, null, null, null);
        expectedPlayers.get("tightEnd")[0] = new FootballPlayerDTO(
                2, null, 0, 0, 0,
                null, null, 0, 0, 0, null, 0,
                true, false, false,
                true, false, false, null, null, null, null, null);
        expectedPlayers.get("bench")[0] = new FootballPlayerDTO(
                3, null, 0, 0, 0,
                null, null, 0, 0, 0, null, 0,
                true, false, false,
                false, false, false, null, null, null, null, null);
        expectedPlayers.get("flex")[0] = new FootballPlayerDTO(
                4, null, 0, 0, 0,
                null, null, 0, 0, 0, null, 0,
                true, false, false,
                true, false, false, null, null, null, null, null);
        expectedPlayers.get("quarterback")[0] = new FootballPlayerDTO(
                5, null, 0, 0, 0,
                null, null, 0, 0, 0, null, 0,
                true, false, false,
                false, false, false, null, null, null, null, null);
        String[] playerPositions = { 
            "quarterback", "quarterback/tightEnd", "quarterback", 
            "quarterback/tightEnd", "quarterback" };
        int playerId = 1;
        for (String position : playerPositions) {
            userFootballTeam.addPlayer(new FootballPlayerDTO(
                    playerId, null, 0, 0, 0,
                    null, null, 0, 0, 0, null, 0,
                    position.contains("quarterback"), 
                    position.contains("runningBack"),
                    position.contains("wideReceiver"),
                    position.contains("tightEnd"), 
                    position.contains("kicker"), 
                    position.contains("teamDefense"),
                    null, null, null, null, null));
            playerId += 1;
        }
        assertTrue(areHashMapsEqual(expectedPlayers, userFootballTeam.getPlayerSpots()));
    }

    @Test
    public void testAddPlayer_AddTwoQbsWithOneQBSpot() {
        userFootballTeam = new FantasyFootballTeam(1, 0, 0, 0, 0, 0, 0, 0);
        String[] playerPositions = { "quarterback", "quarterback" };
        boolean isAddingError = false;
        int playerId = 1;
        for (String position : playerPositions) {
            try {
                userFootballTeam.addPlayer(new FootballPlayerDTO(
                        playerId, null, 0, 0, 0,
                        null, null, 0, 0, 0, null, 0,
                        position.contains("quarterback"), position.contains("runningBack"),
                        position.contains("wideReceiver"),
                        position.contains("tightEnd"), 
                        position.contains("kicker"), 
                        position.contains("teamDefense"),
                        null, null, null, null, null));
            } catch (IllegalArgumentException e) {
                isAddingError = true;
            }
            playerId += 1;
        }
        assertTrue(isAddingError);
    }

    private boolean areHashMapsEqual(Map<String, PlayerDTO[]> map1,
            Map<String, PlayerDTO[]> map2) {
        if (map1.size() != map2.size()) {
            return true;
        }
        for (String key : map1.keySet()) {
            for (int i = 0; i < map1.get(key).length; i++) {
                if (map1.get(key)[i].id() != map2.get(key)[i].id()) {
                    return false;
                }
            }
        }
        return true;
    }
}