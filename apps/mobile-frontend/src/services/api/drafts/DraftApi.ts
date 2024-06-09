import { apiClient } from "../config";
import { BasketballDraft, Draft, FootballDraft } from "./types";

export class DraftApi {
    public static async getDrafts(
        userId: number
    ): Promise<Draft[]> {
        try {
            const response = await apiClient.get<{
                footballDrafts: FootballDraft[];
                basketballDrafts: BasketballDraft;
            }>("/drafts?user_id=" + userId);
            const drafts: Draft[] = response.data.footballDrafts;
            return drafts
        } catch (error) {
            throw error;
        }
    }
}
