import { useLoading } from "../contexts/LoadingContext";
import { FootballDraftCreationRequest } from "../services/api/requests/FootballDraftCreationRequest";

export function useMockDraftCreation() {
    const { setIsLoading } = useLoading();

    const createMockDraft = (draftData: FootballDraftCreationRequest) => {
        setIsLoading(true);
        fetch(`${import.meta.env.VITE_API_URL}/drafts/football-drafts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(draftData),
        })
            .then((response) => {
                if (!response.ok) {
                    setIsLoading(false);
                    throw new Error("Invalid username or password");
                }
                return response.json();
            })
            .then(() => {
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });
    };

    return {
        createMockDraft,
    };
}
