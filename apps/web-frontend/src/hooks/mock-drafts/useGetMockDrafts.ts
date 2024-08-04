import { useEffect, useState } from "react";
import { DraftApi } from "services/api/drafts/DraftApi";
import { Draft } from "types/drafts";
import { useGlobalContext } from "contexts/GlobalProvider";

export const useGetMockDrafts = () => {
    const [mockDrafts, setMockDrafts] = useState<Draft[]>([]);
    const { user } = useGlobalContext();

    useEffect(() => {
        if (user) {
            DraftApi.getDrafts(user.id).then((drafts) => {
                setMockDrafts(drafts);
            });
        }
    }, [user]);

    return {
        mockDrafts,
    };
};
