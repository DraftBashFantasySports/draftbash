package com.draftbash.features.drafts.interfaces;

import com.draftbash.features.drafts.dtos.DraftSettingsDTO;
import com.draftbash.features.players.dtos.PlayerDTO;

import java.util.HashMap;
import java.util.List;

/**
 * This interface contains the methods for a fantasy team.
 */
public interface IFantasyTeam {
    public void addPlayer(PlayerDTO player);
    
    public void setPositionLimits(DraftSettingsDTO draftSettings);

    public HashMap<String, PlayerDTO[]> getPlayerSpots();

    public List<PlayerDTO> getEligiblePlayers(List<PlayerDTO> players);
}
