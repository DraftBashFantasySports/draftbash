import styles from "./MockDraftsToggle.module.css";

type Props = {
    active: boolean;
    handleOnToggle: () => void;
}

export const MockDraftsToggle = ({ active, handleOnToggle }: Props) => {
    return (
        <div className={styles.toggle} onClick={handleOnToggle}>
            <button type="button" className={active ? styles.on : styles.off}>
                {active ? "Active Drafts" : "Finished Drafts"}
            </button>
        </div>
    );
};
