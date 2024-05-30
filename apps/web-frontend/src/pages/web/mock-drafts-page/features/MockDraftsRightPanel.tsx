/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PiGridNineLight } from "react-icons/pi";

export function MockDraftsRightPanel() {
    const styles = getStyles();
    return (
        <div css={styles.panel}>
            <PiGridNineLight css={styles.draftIcon} />
            <p css={styles.title}>Mock Drafts</p>
            <p css={styles.subTitle}>Practice your draft strategies</p>
            <div css={styles.buttons}>
                <button css={styles.footballButton} type="button">
                    Create NFL Mock Draft
                </button>
            </div>
        </div>
    );
}

function getStyles() {
    return {
        panel: css({
            height: "100%",
            overflow: "auto",
        }),
        draftIcon: css({
            fontSize: "150px",
            marginTop: "30%",
            width: "100%",
            color: "white",
        }),
        title: css({
            color: "white",
            fontSize: "24px",
            fontWeight: "300",
            textAlign: "center",
        }),
        subTitle: css({
            color: "white",
            fontSize: "16px",
            textAlign: "center",
        }),
        buttons: css({
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
        }),
        footballButton: css({
            backgroundColor: "var(--mint)",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
            width: "250px",
        }),
    };
}
