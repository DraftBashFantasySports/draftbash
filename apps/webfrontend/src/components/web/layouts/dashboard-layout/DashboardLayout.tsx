/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ReactNode } from "react";
import { Sidebar } from "../sidebar/Sidebar";

interface Props {
    leftPanelChildren: ReactNode;
    rightPanelChildren: ReactNode;
    title: string;
    subTitle: string;
}

export function DashboardLayout({ leftPanelChildren, rightPanelChildren, title, subTitle }: Props) {
    const styles = getStyles();
    return (
        <div css={styles.page}>
            <Sidebar />
            <div css={styles.panels}>
                <div css={styles.header}>
                    <h1 css={styles.title}>{title}</h1>
                    <p css={styles.subTitle}>{subTitle}</p>
                </div>
                <div css={styles.leftPanel}>{leftPanelChildren}</div>
                <div css={styles.rightPanel}>{rightPanelChildren}</div>
            </div>
        </div>
    );
}

const getStyles = () => {
    return {
        header: css({
            width: "400px",
            position: "absolute",
            marginLeft: "25px",
        }),
        title: css({
            color: "var(--gold)",
            fontSize: "28px",
        }),
        subTitle: css({
            color: "var(--silver)",
            fontSize: "12px",
            marginTop: "-5px",
        }),
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
            padding: "35px",
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
