import { FootballPlayerData } from "types/players";
import { apiClient } from "../config";

export class PlayerApi {
    public static async getFootballPlayer(playerId: number): Promise<FootballPlayerData> {
        try {
            const response = await apiClient.get<FootballPlayerData>(
                `/players?sport=football&player_id=${playerId}`,
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}
