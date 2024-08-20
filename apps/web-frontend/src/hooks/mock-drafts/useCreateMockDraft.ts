import { DraftApi } from "services/api/drafts/DraftApi";
import { DraftSettings } from "types/drafts";
import { useGlobalContext } from "contexts/GlobalProvider";
import { useNavigate } from "react-router-dom";

export const useCreateMockDrafts = () => {
    const { user } = useGlobalContext();
    const navigate = useNavigate();

    const createFootballDraft = async (settings: DraftSettings): Promise<void> => {
        try {
            if (user) {
                const draftId: number = await DraftApi.createFootballDraft({
                    createdByUserId: user.id,
                    settings: settings,
                });
                navigate(`/draft/${settings.sport}/${draftId}`);
            }
        } catch (error) {
            throw error
        }
    };

    return {
        createFootballDraft,
    };
};
