import { DraftApi } from "services/api/drafts/DraftApi";
import { DraftSettings } from "types/drafts";
import { useGlobalContext } from "contexts/GlobalProvider";

export const useCreateMockDrafts = () => {
    const { user } = useGlobalContext();

    const createFootballDraft = async (settings: DraftSettings): Promise<void> => {
        try {
            if (user) {
                await DraftApi.createFootballDraft({
                    createdByUserId: user.id,
                    settings: settings,
                });
            }
        } catch (error) {
            throw error;
        }
    };

    return {
        createFootballDraft,
    };
};
