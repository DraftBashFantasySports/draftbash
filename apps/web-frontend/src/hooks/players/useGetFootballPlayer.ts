import { useState, useEffect } from "react";
import { PlayerApi } from "services/api/players/PlayerApi";
import { FootballPlayerData } from "types/players";

export function useGetFootballPlayer(playerId: number) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [playerData, setPlayerData] = useState <FootballPlayerData>();

    useEffect(() => {
        // Fetch the football player data when the hook is used
        PlayerApi.getFootballPlayer(playerId).then((response) => {
            setPlayerData(response);
            setIsLoading(false);
        });
    }, [playerId]);

    return {
        playerData,
        isLoading,
    };
}
