import { useChatContext } from "contexts/ChatProvider";
import styles from "./LeftPanel.module.css";
import { RiMessage3Line } from "react-icons/ri";
import { useState } from "react";
import { Link } from "react-router-dom";
import { timeSince } from "@utils/time";

export const LeftPanel = () => {
    const { messages, sendMessage, fromUserId } = useChatContext();
    const [chatMessage, setChatMessage] = useState("");
    return (
        <div className={styles.leftpanel}>
            {fromUserId != null ? (
                <form
                    className={styles.chat}
                    onSubmit={(e) => {
                        e.preventDefault();
                        sendMessage(chatMessage);
                        setChatMessage("");
                    }}
                >
                    <ul>
                        {messages.map((message, index) => (
                            <li key={index}>
                                <span className={styles.username}>{message.fromUsername}</span>
                                <span className={styles.time}>{timeSince(message.sentAt)}</span>
                                {message.message.includes("Join my draft! /drafts/") ? (
                                    <p className={styles.message}>
                                        Join my draft!{" "}
                                        <Link
                                            to={`/draft/${message.message.split("/")[2]}/${message.message.split("/")[3]}`}
                                            className={styles.draftlink}
                                        >
                                            JOIN
                                        </Link>
                                    </p>
                                ) : (
                                    <p className={styles.message}>{message.message}</p>
                                )}
                            </li>
                        ))}
                    </ul>
                    <div className={styles.input}>
                        <input
                            placeholder="Enter Message"
                            value={chatMessage}
                            onChange={(e) => setChatMessage(e.target.value)}
                        />
                        <button type="submit">SEND</button>
                    </div>
                </form>
            ) : (
                <div className={styles.nochat}>
                    <RiMessage3Line className={`${styles.chaticon}`} />
                    <h3>Chat</h3>
                    <p>Start a chat</p>
                </div>
            )}
        </div>
    );
};
