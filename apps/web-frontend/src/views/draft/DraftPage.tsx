import styles from "./DraftPage.module.css";
import { DraftHeader } from "./components/draft-header/DraftHeader";
import { DraftBoard } from "./components/draft-board/DraftBoard";
import { DraftMenu } from "./components/draft-menu/DraftMenu";
import { DraftProvider, useDraftContext } from "contexts/DraftProvider";

const DraftPageContent = () => {
    const { menuHeight } = useDraftContext();

    const getHeightLevel = () => {
        if (menuHeight === 0) {
            return styles.closed;
        } else if (menuHeight === 1) {
            return styles.open;
        } else if (menuHeight === 2) {
            return styles.full;
        }
    };

    return (
        <main className={`${styles.draftpage} ${getHeightLevel()}`}>
            <DraftHeader />
            <div className={styles.body}>
                <DraftBoard />
            </div>
            <DraftMenu />
        </main>
    );
};

export const DraftPage = () => {
    return (
        <DraftProvider>
            <DraftPageContent />
        </DraftProvider>
    );
}