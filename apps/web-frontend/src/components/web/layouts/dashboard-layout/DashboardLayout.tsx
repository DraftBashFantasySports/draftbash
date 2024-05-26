/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ReactNode } from "react";
import { Sidebar } from "../sidebar/Sidebar";

interface Props {
    leftPanelChildren?: ReactNode;
    rightPanelChildren?: ReactNode;
}

export function DashboardLayout({ leftPanelChildren, rightPanelChildren }: Props) {
    const styles = getStyles();
    return (
        <div css={styles.page}>
            <Sidebar />
            <div css={styles.panels}>
                <div css={styles.leftPanel}>{leftPanelChildren}</div>
                <div css={styles.rightPanel}>{rightPanelChildren}</div>
            </div>
        </div>
    );
}

const getStyles = () => {
    return {
        page: css({
            display: "flex",
            backgroundColor: "var(--darkGrey5)",
        }),
        panels: css({
            display: "flex",
            padding: "25px",
            width: "100%",
            gap: "25px",
            overflow: "auto",
        }),
        leftPanel: css({
            backgroundColor: "var(--darkGrey2)",
            width: "50%",
            height: "calc(100% - 80px)",
            marginTop: "auto",
            borderRadius: "15px",
            border: "1px solid var(--darkGrey)",
            minWidth: "800px",
            "@media(max-width: 1300px)": {
                minWidth: "500px",
                width: "800px",
            },
        }),
        rightPanel: css({
            backgroundColor: "var(--darkGrey2)",
            width: "50%",
            height: "calc(100% - 80px)",
            marginTop: "auto",
            borderRadius: "15px",
            border: "1px solid var(--darkGrey)",
            minWidth: "350px",
        }),
    };
};
