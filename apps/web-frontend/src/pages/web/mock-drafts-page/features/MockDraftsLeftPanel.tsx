/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { PiGridNineLight } from "react-icons/pi";
import { MockDraftsList } from "../components/MockDraftsList";
import { MockDraftsListSwitch } from "../components/MockDraftsListSwitch";
import { DraftResponse } from "../../../../services/api/responses/DraftResponse";
import { FootballDraftResponse } from "../../../../services/api/responses/FootballDraftResponse";

export function MockDraftsLeftPanel() {
    const [isActiveSelected, setIsActiveSelected] = useState(true);
    const testDraft: FootballDraftResponse = {
        draftId: 1,
        sport: "football",
        pickOrderFormat: "snake",
        scoringFormat: "standard",
        createdAt: "2024-05-29 19:58:53.307663",
        pickTimeLimit: 60,
        teamCount: 10,
        quarterbackLimit: 1,
        runningBackLimit: 2,
        wideReceiverLimit: 2,
        tightendLimit: 1,
        kickerLimit: 1,
        defenseLimit: 1,
        flexLimit: 1,
        benchLimit: 4,
    }
    const [drafts, setDrafts] = useState<DraftResponse[]>([testDraft, testDraft]);
    const styles = getStyles();

    return (
        <div css={styles.panel}>
            <MockDraftsListSwitch onToggle={() => setIsActiveSelected(!isActiveSelected)} />
            {drafts.length > 0 ? (
                <MockDraftsList drafts={drafts} />
            ) : (
                <div>
                    <PiGridNineLight css={styles.draftIcon} />
                    <p css={styles.noDraftsTitle}>No drafts!</p>
                    <p css={styles.noDraftsSubTitle}>Try creating a mock draft.</p>
                </div>
            )}
        </div>
    );
}

function getStyles() {
    return {
        panel: css({
            height: "100%",
            overflow: "auto",
        }),
        noDraftsTitle: css({
            color: "var(--red)",
            textAlign: "center",
            fontSize: "20px",
            fontWeight: "500",
        }),
        noDraftsSubTitle: css({
            color: "var(--silver)",
            textAlign: "center",
            fontSize: "14px",
        }),
        draftIcon: css({
            fontSize: "70px",
            marginTop: "40%",
            width: "100%",
            color: "var(--silver)",
        }),
    };
}
