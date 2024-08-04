package com.draftbash.features.common.utils.fantasyteams;

import com.draftbash.features.drafts.interfaces.IFantasyTeam;

/**
 * This class contains the FantasyTeamFactory class.
 */
public class FantasyTeamFactory {

    /**
     * Returns the appropriate fantasy team based on the team type.

     * @param teamType The type of fantasy team to return.
     * @return The fantasy team.
     */
    public IFantasyTeam getFantasyTeam(String teamType) {
        switch (teamType.toLowerCase()) {
            case "football":
                return new FantasyFootballTeam();
            default:
                throw new IllegalArgumentException("Unknown team type: " + teamType);
        }
    }
}
