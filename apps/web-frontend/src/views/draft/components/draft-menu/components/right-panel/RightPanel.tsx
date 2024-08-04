import { useState } from "react";
import styles from "./RightPanel.module.css";
import { FootballPlayerQueue } from "./components/player-queue/FootballPlayerQueue";
import { useDraftContext } from "contexts/DraftProvider";
import { FootballPlayerRoster } from "./components/roster/FootballPlayerRoster";
import { Chat } from "./components/chat/Chat";

export const RightPanel = () => {
    const { draftSettings } = useDraftContext();
    const [selectedTab, setSelectedTab] = useState("queue");
    const getTabStyle = () => {
        if (selectedTab === "queue") {
            return styles.queueselected;
        } else if (selectedTab === "roster") {
            return styles.rosterselected;
        } else if (selectedTab === "chat") {
            return styles.chatselected;
        }
    };
    return (
        <div className={styles.rightpanel}>
            <header>
                <h3
                    className={`${getTabStyle()} ${selectedTab === "queue" ? styles.on : ""}`}
                    onClick={() => setSelectedTab("queue")}
                >
                    Queue
                </h3>
                <h3
                    className={`${getTabStyle()} ${selectedTab === "roster" ? styles.on : ""}`}
                    onClick={() => setSelectedTab("roster")}
                >
                    Roster
                </h3>
                <h3
                    className={`${getTabStyle()} ${selectedTab === "chat" ? styles.on : ""}`}
                    onClick={() => setSelectedTab("chat")}
                >
                    Chat
                </h3>
            </header>
            <div className={styles.content}>
                {(selectedTab === "queue" && draftSettings.sport === "football") && <FootballPlayerQueue />}
                {(selectedTab === "roster" && draftSettings.sport === "football") && <FootballPlayerRoster />}
                {(selectedTab === "chat") && <Chat />}
            </div>
        </div>
    );
};
