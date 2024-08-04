import styles from "./PlayerFilter.module.css";
import { useDraftContext } from "contexts/DraftProvider";
import { FootballDraftSettings } from "types/drafts";

export const PlayerFilter = () => {
    const { draftSettings, fantasyTeams, draftUser, setSelectedPosition, selectedPosition  } =
        useDraftContext();
    const footballDraftSettings: FootballDraftSettings = draftSettings as FootballDraftSettings;
    const teamSize =
        footballDraftSettings.benchLimit +
        footballDraftSettings.defenseLimit +
        footballDraftSettings.flexLimit +
        footballDraftSettings.kickerLimit +
        footballDraftSettings.quarterbackLimit +
        footballDraftSettings.runningBackLimit +
        footballDraftSettings.wideReceiverLimit;
    const quarterbackCount = draftUser?.teamNumber
        ? fantasyTeams[draftUser.teamNumber].playerSpots.quarterback.filter(
              (player) => player !== null,
          ).length
        : 0;
    const runningBackCount = draftUser?.teamNumber
        ? fantasyTeams[draftUser.teamNumber].playerSpots.runningBack.filter(
              (player) => player !== null,
          ).length
        : 0;
    const wideReceiverCount = draftUser?.teamNumber
        ? fantasyTeams[draftUser.teamNumber].playerSpots.wideReceiver.filter(
              (player) => player !== null,
          ).length
        : 0;
    const tightEndCount = draftUser?.teamNumber
        ? fantasyTeams[draftUser.teamNumber].playerSpots.tightEnd.filter(
              (player) => player !== null,
          ).length
        : 0;
    const flexCount = draftUser?.teamNumber
        ? fantasyTeams[draftUser.teamNumber].playerSpots.flex.filter((player) => player !== null)
              .length
        : 0;
    const kickerCount = draftUser?.teamNumber
        ? fantasyTeams[draftUser.teamNumber].playerSpots.kicker.filter((player) => player !== null)
              .length
        : 0;
    const defenseCount = draftUser?.teamNumber
        ? fantasyTeams[draftUser.teamNumber].playerSpots.teamDefense.filter(
              (player) => player !== null,
          ).length
        : 0;
    const allCount =
        quarterbackCount +
        runningBackCount +
        wideReceiverCount +
        tightEndCount +
        flexCount +
        kickerCount +
        defenseCount;
    return (
        <div className={styles.positionfilter}>
            <div
                className={`${styles.option} ${selectedPosition == "all" ? styles.selected : ""}`}
                onClick={() => setSelectedPosition("all")}
            >
                <p className={styles.position}>All</p>
                <p className={styles.positioncount}>
                    {allCount}/{teamSize}
                </p>
            </div>
            <div
                className={`${styles.option} ${selectedPosition == "quarterback" ? styles.selected : ""}`}
                onClick={() => setSelectedPosition("quarterback")}
            >
                <p className={styles.position}>QB</p>
                <p className={styles.positioncount}>
                    {quarterbackCount}/{footballDraftSettings.quarterbackLimit}
                </p>
            </div>
            <div
                className={`${styles.option} ${selectedPosition == "runningback" ? styles.selected : ""}`}
                onClick={() => setSelectedPosition("runningback")}
            >
                <p className={styles.position}>RB</p>
                <p className={styles.positioncount}>
                    {runningBackCount}/{footballDraftSettings.runningBackLimit}
                </p>
            </div>
            <div
                className={`${styles.option} ${selectedPosition == "widereceiver" ? styles.selected : ""}`}
                onClick={() => setSelectedPosition("widereceiver")}
            >
                <p className={styles.position}>WR</p>
                <p className={styles.positioncount}>
                    {wideReceiverCount}/{footballDraftSettings.wideReceiverLimit}
                </p>
            </div>
            <div
                className={`${styles.option} ${selectedPosition == "tightend" ? styles.selected : ""}`}
                onClick={() => setSelectedPosition("tightend")}
            >
                <p className={styles.position}>TE</p>
                <p className={styles.positioncount}>
                    {tightEndCount}/{footballDraftSettings.tightEndLimit}
                </p>
            </div>
            <div
                className={`${styles.option} ${selectedPosition == "flex" ? styles.selected : ""}`}
                onClick={() => setSelectedPosition("flex")}
            >
                <p className={styles.position}>FLEX</p>
                <p className={styles.positioncount}>
                    {flexCount}/{footballDraftSettings.flexLimit}
                </p>
            </div>
            <div
                className={`${styles.option} ${selectedPosition == "kicker" ? styles.selected : ""}`}
                onClick={() => setSelectedPosition("kicker")}
            >
                <p className={styles.position}>K</p>
                <p className={styles.positioncount}>
                    {kickerCount}/{footballDraftSettings.kickerLimit}
                </p>
            </div>
            <div
                className={`${styles.option} ${selectedPosition == "defense" ? styles.selected : ""}`}
                onClick={() => setSelectedPosition("defense")}
            >
                <p className={styles.position}>DEF</p>
                <p className={styles.positioncount}>
                    {kickerCount}/{footballDraftSettings.kickerLimit}
                </p>
            </div>
        </div>
    );
};
