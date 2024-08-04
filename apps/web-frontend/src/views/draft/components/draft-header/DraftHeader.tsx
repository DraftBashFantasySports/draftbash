import styles from "./DraftHeader.module.css";
import { RiArrowLeftSLine } from "react-icons/ri";
import { Invites } from "./components/invites/Invites";
import { useDraftContext } from "contexts/DraftProvider";
import { BasketballDraftSettings, FootballDraftSettings } from "types/drafts";
import { formatTime } from "@utils/time";
import { FootballDraftConfiguration } from "./components/football-draft-configuration/FootballDraftConfiguration";

export const DraftHeader = () => {
    const { draftSettings, startDraft, timeRemaining, isDraftOver } = useDraftContext();
    const getRoundCount = () => {
        if (draftSettings.sport === "football") {
            const footballDraftSettings = draftSettings as FootballDraftSettings;
            return (
                footballDraftSettings.benchLimit +
                footballDraftSettings.defenseLimit +
                footballDraftSettings.kickerLimit +
                footballDraftSettings.flexLimit +
                footballDraftSettings.tightEndLimit +
                footballDraftSettings.wideReceiverLimit +
                footballDraftSettings.runningBackLimit +
                footballDraftSettings.quarterbackLimit
            );
        } else if (draftSettings.sport === "basketball") {
            const basketballDraftSettings = draftSettings as BasketballDraftSettings;
            return (
                basketballDraftSettings.benchLimit +
                basketballDraftSettings.utilityLimit +
                basketballDraftSettings.forwardLimit +
                basketballDraftSettings.guardLimit +
                basketballDraftSettings.centerLimit +
                basketballDraftSettings.powerForwardLimit +
                basketballDraftSettings.smallForwardLimit +
                basketballDraftSettings.shootingGuardLimit +
                basketballDraftSettings.pointGuardLimit
            );
        }
    };
    return (
        <header className={styles.draftheader}>
            <RiArrowLeftSLine className={styles.arrowicon} />
            <div className={styles.title}>
                <h1>
                    {draftSettings.teamCount}-team {draftSettings.scoringFormat}{" "}
                    {draftSettings.pickOrderFormat}
                </h1>
                <p>
                    {getRoundCount()} Rounds · {draftSettings.pickTimeLimit / 60} Min Per Pick ·{" "}
                    {draftSettings.sport}
                </p>
            </div>
            <div className={styles.status}>
            {draftSettings.isDraftStarted && !isDraftOver ? (
                <p>{formatTime(timeRemaining)}</p>
            ) : isDraftOver ? (
                <p>DRAFT OVER</p>
            ) : (
                <button type="button" className={styles.startdraftbtn} onClick={() => startDraft()}>
                    START DRAFT
                </button>
            )}
            </div>
            <div className={styles.settings}>
                <Invites />
                <FootballDraftConfiguration />
            </div>
        </header>
    );
};
