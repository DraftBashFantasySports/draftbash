package com.draftbash.features.players.interfaces;

import com.draftbash.features.players.dtos.PlayerNewsDTO;
import com.draftbash.features.players.dtos.football.FootballPlayerDTO;
import java.util.List;
import java.util.Map;

/**
 * Repository for football players.
 */
public interface IFootballPlayerRepository {
    public void insertPlayerNews(PlayerNewsDTO news);

    public List<FootballPlayerDTO> getPlayers();

    public void updatePlayerInjury(int playerId, String injuryStatus);

    public Map<String, Object> getPlayer(int playerId);
}
