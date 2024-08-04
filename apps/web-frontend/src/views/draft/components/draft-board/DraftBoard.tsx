import { useDraftContext } from "contexts/DraftProvider";
import styles from "./DraftBoard.module.css";
import { PickCard } from "./components/pick-card/PickCard";

export const DraftBoard = () => {
    const { draftPicks, draftSettings, claimTeam, draftUsers } = useDraftContext();
    const gridStyle = {
        display: "grid",
        gridTemplateColumns: `repeat(${draftSettings.teamCount}, 1fr)`,
        gap: "3px",
    };
    return (
        <div className={styles.draftboard}>
            <div className={styles.teamclaims}>
                {Array.from({ length: draftSettings.teamCount }, (_, i) => i + 1).map(
                    (teamNumber) => (
                        <div key={teamNumber} className={styles.teamclaim}>
                            {draftUsers.find((user) => user.teamNumber === teamNumber) ? (
                                <h4>{draftUsers.filter((user) => user.teamNumber === teamNumber)[0].username}</h4>
                            ) : (
                                <>
                                    <button type="button" onClick={() => claimTeam(teamNumber)}>
                                        CLAIM
                                    </button>
                                    <h4>Team {teamNumber}</h4>
                                </>
                            )}
                        </div>
                    ),
                )}
            </div>
            <div style={gridStyle}>
                {draftPicks.map((pick) => (
                    <PickCard key={pick.pickNumber} pickNumber={pick.pickNumber} />
                ))}
            </div>
        </div>
    );
};
