import styles from "./DraftMenu.module.css";
import { LeftPanel } from "./components/left-panel/LeftPanel";
import { RightPanel } from "./components/right-panel/RightPanel";
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";
import { useDraftContext } from "contexts/DraftProvider";

export const DraftMenu = () => {
    const {menuHeight, setMenuHeight} = useDraftContext();
    const incrementHeight = () => {
        if (menuHeight < 2) {
            setMenuHeight(menuHeight + 1);
        }
    }
    const decrementHeight = () => {
        if (menuHeight > 0) {
            setMenuHeight(menuHeight - 1);
        }
    }
    const getHeightLevel = () => {
        if (menuHeight === 0) {
            return styles.closed;
        } else if (menuHeight === 1) {
            return styles.open
        } else if (menuHeight === 2) {
            return styles.full
        }
    }
    return (
        <div className={`${styles.draftmenu} ${getHeightLevel()}`}>
            <LeftPanel />
            <RightPanel />
            <div className={styles.arrows}>
                <RiArrowDownSLine className={styles.arrow} onClick={() => decrementHeight()} />
                <RiArrowUpSLine className={styles.arrow} onClick={() => incrementHeight()} />
            </div>
        </div>
    );
};
