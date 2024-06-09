import { useEffect, useState } from "react";
import { DraftApi } from "../../services/api/drafts/DraftApi";
import { Draft } from "../../services/api/drafts/types";
import { useGlobalContext } from "../../context/GlobalProvider";

export const useGetDrafts = () => {
    const [drafts, setDrafts] = useState<Draft[]>([]);
    const { user } = useGlobalContext();

    useEffect(() => {
        if (user) {
            DraftApi.getDrafts(user.id).then((drafts) => {
                setDrafts(drafts);
            });
        }
    }, [user]);

    return {
        drafts,
    };
};
