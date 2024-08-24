package com.draftbash.features.players.controllers;

import com.draftbash.features.players.interfaces.IFootballPlayerRepository;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller for handling app user requests.
 */
@RestController
@RequestMapping("/api/v1/players")
public class PlayerController {

    private final IFootballPlayerRepository footballPlayerRepository;

    public PlayerController(
            IFootballPlayerRepository footballPlayerRepository) {
        this.footballPlayerRepository = footballPlayerRepository;
    }

    /**
     * Gets the player information for a given player.
     */
    @GetMapping("")
    public ResponseEntity<Map<String, Object>> getFootballPlayer(
            @RequestParam(name = "player_id", required = true) int playerId,
            @RequestParam(name = "sport", required = true) String sport) {
        Map<String, Object> playerInformation = null;
        if (sport.equalsIgnoreCase("football")) {
            playerInformation = footballPlayerRepository.getPlayer(playerId);
        }
        return ResponseEntity.ok().body(playerInformation);
    }
}
