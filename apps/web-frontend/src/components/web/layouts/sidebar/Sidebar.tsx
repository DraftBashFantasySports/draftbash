/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link, useLocation } from "react-router-dom";
import { RiMessage3Line } from "react-icons/ri";
import { PiGridNineLight } from "react-icons/pi";
import { LuPlusCircle } from "react-icons/lu";
import { FaUser } from "react-icons/fa";
import { useState } from "react";
import { Tooltip } from "../../tool-tips/ToolTip";

export function Sidebar() {
    const location = useLocation();
    const url = location.pathname;
    const [isSidebarHovered, setIsSidebarHovered] = useState(false);
    const [isCreateLeagueHovered, setIsCreateLeagueHovered] = useState(false);

    const styles = getStyles(isSidebarHovered);

    return (
        <div
            css={styles.sidebar}
            onMouseEnter={() => setIsSidebarHovered(true)}
            onMouseLeave={() => setIsSidebarHovered(false)}
        >
            <Tooltip isHovered={isCreateLeagueHovered} styling={{ top: "200px" }}>
                Create League
            </Tooltip>
            <h1 css={styles.title}>
                <img src="draftbash.svg" alt="My Icon" width={60} height={30} />
                DraftBash
            </h1>
            <ul css={styles.linkList}>
                <li>
                    <Link
                        to="/messages"
                        css={[styles.link, url === "/messages" && styles.selectedLink]}
                    >
                        <p css={url === "/messages" ? styles.selectedLinkIndicator : {}} />
                        <RiMessage3Line css={styles.linkIcon} />
                        Messages
                    </Link>
                </li>
                <li>
                    <Link
                        to="/mock-drafts"
                        css={[styles.link, url === "/mock-drafts" && styles.selectedLink]}
                    >
                        <p css={url === "/mock-drafts" ? styles.selectedLinkIndicator : {}} />
                        <PiGridNineLight css={styles.linkIcon} />
                        Mock Drafts
                    </Link>
                </li>
                <li
                    css={styles.leaguesOption}
                    onMouseEnter={() => setIsCreateLeagueHovered(true)}
                    onMouseLeave={() => setIsCreateLeagueHovered(false)}
                >
                    <p css={styles.leaguesOptionText}>Leagues</p>
                    <LuPlusCircle css={styles.addLeagueIcon} />
                    <ul css={styles.leaguesList}>{}</ul>
                </li>
            </ul>
            <div css={styles.userWidgetContainer}>
                <FaUser css={styles.userWidgetIcon} color="white" />
                <p css={styles.userWidgetUsername}>username</p>
            </div>
        </div>
    );
}

const getStyles = (isSideBarHovered: boolean) => {
    return {
        userWidgetContainer: css({
            position: "absolute",
            bottom: "0px",
            backgroundColor: "var(--spaceCadet)",
            width: "100%",
            borderRadius: "20px 20px 0px 0px",
            padding: "20px 10px 0px 20px",
            height: "70px",
        }),
        userWidgetUsername: css({
            color: "white",
            fontWeight: "600",
            width: "175px",
            textAlign: "center",
            transition: "color 0.3s ease",
            "@media(max-width: 1450px)": {
                color: isSideBarHovered ? "white" : "rgba(0,0,0,0)",
            },
        }),
        userWidgetIcon: css({
            color: "white",
            fontSize: "30px",
            position: "absolute",
        }),
        title: css({
            color: "var(--gold)",
            fontSize: "28px",
            padding: "25px 0px 10px 5px",
            width: "100%",
            whiteSpace: "nowrap",
            transition: "color 0.3s ease",
            "@media(max-width: 1450px)": {
                color: isSideBarHovered ? "var(--gold)" : "rgba(0,0,0,0)",
            },
        }),
        sidebar: css({
            display: "flex",
            position: "relative",
            flexDirection: "column",
            height: "100vh",
            minWidth: "240px",
            width: "240px",
            background: "var(--darkGrey4)",
            borderRight: "1px solid var(--darkGrey3)",
            "@media(max-width: 1450px)": {
                minWidth: isSideBarHovered ? "240px" : "68px",
                width: "68px",
            },
            transition: "width 0.5s, min-width 0.5s",
        }),
        linkList: css({
            paddingBottom: "70px",
            overflowY: "auto",
            overflowX: "hidden",
        }),
        link: css({
            display: "block",
            color: "var(--silver)",
            fontSize: "15px",
            fontWeight: "600",
            width: "100%",
            height: "60px",
            textAlign: "center",
            paddingTop: "18px",
            textDecoration: "none",
            position: "relative",
            transition: "color 0.3s ease",
            whiteSpace: "nowrap",
            "&:hover": {
                backgroundColor: "rgba(60, 70, 100, 0.5)",
            },
            "@media(max-width: 1450px)": {
                color: isSideBarHovered ? "var(--silver)" : "rgba(0,0,0,0)",
            },
        }),
        leaguesOption: css({
            color: "var(--silver)",
            fontSize: "15px",
            fontWeight: "600",
            width: "100%",
            height: "60px",
            cursor: "pointer",
            padding: "18px 20px 20px 20px",
            position: "relative",
        }),
        leaguesOptionText: css({
            color: "var(--silver)",
            transition: "color 0.3s ease",
            "@media(max-width: 1450px)": {
                color: isSideBarHovered ? "var(--silver)" : "rgba(0,0,0,0)",
            },
        }),
        leaguesList: css({
            marginTop: "15px",
            borderBottom: "2px solid var(--silver)",
        }),
        addLeagueIcon: css({
            position: "absolute",
            right: "18px",
            top: "16px",
            fontSize: "30px",
            color: "var(--mint)",
        }),
        selectedLink: css({
            backgroundColor: "rgba(60, 70, 100, 0.5)",
            color: "white",
        }),
        selectedLinkIndicator: css({
            backgroundColor: "var(--aqua)",
            width: "5px",
            height: "40px",
            top: "10px",
            borderRadius: "0px 5px 5px 0px",
            position: "absolute",
        }),
        linkIcon: css({
            fontSize: "30px",
            position: "absolute",
            left: "18px",
            top: "15px",
            "@media(max-width: 1450px)": {
                color: "var(--silver)",
            },
        }),
    };
};
