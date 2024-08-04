import { BasketballDraftSettings, Draft, FootballDraftSettings } from "types/drafts";
import styles from "./MockDraftItem.module.css";
import { ReactElement } from "react";
import { timeSince } from "utils/time";
import { useNavigate } from "react-router-dom";

type Props = {
    draft: Draft;
};

export const MockDraftItem = ({ draft }: Props) => {
    const navigate = useNavigate();
    const displayDraftSettings = (draft: Draft): ReactElement | undefined => {
        if (draft.settings.sport === "football") {
            const footballSettings = draft.settings as FootballDraftSettings;
            return (
                <p>
                    {footballSettings.quarterbackLimit} QB, {footballSettings.runningBackLimit} RB,{" "}
                    {footballSettings.wideReceiverLimit} WR, {footballSettings.tightendLimit} TE, 2
                    FLEX (W/R/T), {footballSettings.kickerLimit} K, {footballSettings.defenseLimit}{" "}
                    DEF, {footballSettings.benchLimit} BE
                </p>
            );
        } else if (draft.settings.sport === "basketball") {
            const basketballSettings = draft.settings as BasketballDraftSettings;
            return (
                <p>
                    {basketballSettings.pointGuardLimit} PG, {basketballSettings.shootingGuardLimit}{" "}
                    SG, {basketballSettings.smallForwardLimit} SF,{" "}
                    {basketballSettings.powerForwardLimit} PF,
                    {basketballSettings.centerLimit} C, {basketballSettings.guardLimit} G,{" "}
                    {basketballSettings.forwardLimit} F, {basketballSettings.utilityLimit} UTIL,{" "}
                    {basketballSettings.benchLimit} BE
                </p>
            );
        }
        return undefined;
    };

    return (
        <article
            className={styles.mockdraftitem}
            onClick={() => navigate(`/draft/${draft.settings.sport}/${draft.id}`)}
        >
            <img
                src={`icons/${draft.settings.sport.toLowerCase()}.svg`}
                alt="Sport Icon"
                className={styles.icon}
            />
            <div className={styles.settings}>
                <h4>
                    {draft.settings.teamCount}-team {draft.settings.scoringFormat}{" "}
                    {draft.settings.pickOrderFormat}
                </h4>
                {displayDraftSettings(draft)}
            </div>
            <div className={styles.meta}>
                <p className={styles.status}>PRE-START</p>
                <p className={styles.timestamp}>{timeSince(draft.createdAt)}</p>
            </div>
        </article>
    );
};
