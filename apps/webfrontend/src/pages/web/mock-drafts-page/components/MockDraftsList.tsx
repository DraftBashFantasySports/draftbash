/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { DraftResponse } from "../../../../services/api/responses/DraftResponse";
import { capitalize, getTimestampDifference } from "../../../../utils/helpers";
import { FootballDraftResponse } from "../../../../services/api/responses/FootballDraftResponse";

interface Props {
    drafts: DraftResponse[];
}

export function MockDraftsList({ drafts }: Props) {
    const styles = getStyles();
    return (
        <div css={styles.list}>
            {drafts.map((draft, index) => (
                <div css={styles.draft} key={index}>
                    <div css={styles.footballBackground}>
                        <img src="football.svg" alt="Football" css={styles.footballIcon} />
                    </div>
                    <div>
                        <div css={styles.draftTitleContainer}>
                            <p css={styles.draftFormat}>
                                {draft.teamCount}-Team {capitalize(draft.scoringFormat)}{" "}
                                {capitalize(draft.pickOrderFormat)}
                            </p>
                            {draft.sport === "football" && (
                                <p css={styles.playerPositions}>
                                    {(draft as FootballDraftResponse).quarterbackLimit} QB,{" "}
                                    {(draft as FootballDraftResponse).runningBackLimit} RB,{" "}
                                    {(draft as FootballDraftResponse).wideReceiverLimit} WR,{" "}
                                    {(draft as FootballDraftResponse).tightendLimit} TE,{" "}
                                    {(draft as FootballDraftResponse).kickerLimit} K,{" "}
                                    {(draft as FootballDraftResponse).defenseLimit} DEF,{" "}
                                    {(draft as FootballDraftResponse).flexLimit} FLEX,{" "}
                                    {(draft as FootballDraftResponse).benchLimit} BE
                                </p>
                            )}
                        </div>
                    </div>
                    <div css={styles.timeLimitContainer}>
                        <p css={styles.timerValue}>{draft.pickTimeLimit / 60} Min</p>
                        <p css={styles.timerText}>Timer</p>
                    </div>
                    <p css={styles.createdAt}>{getTimestampDifference(draft.createdAt)}</p>
                </div>
            ))}
        </div>
    );
}

function getStyles() {
    return {
        list: css({
            padding: "20px 0px 20px 0px",
        }),
        draft: css({
            display: "flex",
            alignItems: "center",
            padding: "10px 15px 10px 15px",
            borderBottom: "1px solid var(--silver)",
            cursor: "pointer",
            backgroundColor: "var(--darkGrey3)",
            borderRadius: "10px",
            position: "relative",
            marginBottom: "20px",
        }),
        footballIcon: css({
            width: "33px",
            height: "33px",
        }),
        footballBackground: css({
            backgroundColor: "rgb(60, 180, 140, 0.3)",
            borderRadius: "50%",
            padding: "14px",
            width: "60px",
            height: "60px",
        }),
        draftTitleContainer: css({
            display: "flex",
            flexDirection: "column",
            margin: "0px 13px 0px 13px",
        }),
        draftFormat: css({
            fontSize: "16px",
            fontWeight: "500",
            color: "white",
        }),
        playerPositions: css({
            fontSize: "12px",
            color: "white",
        }),
        timeLimitContainer: css({
            borderLeft: "1px solid white",
            padding: "13px",
        }),
        timerText: css({
            color: "white",
            fontSize: "12px",
            fontWeight: "500",
        }),
        timerValue: css({
            fontSize: "16px",
            color: "white",
        }),
        createdAt: css({
            color: "var(--silver)",
            fontSize: "12px",
            position: "absolute",
            right: "15px",
            top: "15px",
        }),
    };
}
