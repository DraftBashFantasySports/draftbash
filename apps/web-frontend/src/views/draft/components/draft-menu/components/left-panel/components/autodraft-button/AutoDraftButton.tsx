import { useDraftContext } from "contexts/DraftProvider";
import styles from "./AutoDraftButton.module.css";

export const AutoDraftButton = () => {
    const { draftUser, toggleAutoDraft } = useDraftContext();
    const isAutoDrafting = draftUser?.isAutodrafting ? true : false;
    return (
        <div className={styles.autodraft}>
            <label>Auto-Draft</label>
            <div
                className={`${styles.autodraftbtn} ${draftUser?.isAutodrafting ? styles.on : styles.off}`}
                onClick={() => toggleAutoDraft(draftUser?.userId ?? 0, !isAutoDrafting)}
            >
                <button type="button" />
            </div>
        </div>
    );
};
