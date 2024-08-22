package com.draftbash.features.players.interfaces;

import com.draftbash.features.players.dtos.PlayerNewsDTO;
import com.draftbash.features.players.dtos.football.FootballPlayerDTO;
import java.util.List;

/**
 * Repository for football players.
 */
public interface IFootballPlayerRepository {
    public void insertPlayerNews(PlayerNewsDTO news);

    public List<FootballPlayerDTO> getPlayers();
}
