import { apiClient } from "../config";
import { Draft, FootballDraftCreationRequest } from "types/drafts";

export class DraftApi {
    public static async getDrafts(userId: number): Promise<Draft[]> {
        try {
            const response = await apiClient.get<Draft[]>("/drafts?user_id=" + userId);
            const drafts: Draft[] = response.data;
            return drafts;
        } catch (error) {
            throw error;
        }
    }

    public static async createFootballDraft(request: FootballDraftCreationRequest, ): Promise<void> {
        try {
            await apiClient.post("/drafts/football-drafts", request);
        } catch (error) {
            throw error;
        }
    }
}
