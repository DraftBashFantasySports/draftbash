import { useDraftContext } from "contexts/DraftProvider";
import styles from "./Chat.module.css";
import { useState } from "react";

export const Chat = () => {
    const { menuHeight, draftUser, messages, sendMessage } = useDraftContext();
    const [draftMessage, setDraftMessage] = useState("");
    const getHeightLevel = () => {
        if (menuHeight === 0) {
            return styles.closed;
        } else if (menuHeight === 1) {
            return styles.open;
        } else if (menuHeight === 2) {
            return styles.full;
        }
    };
    return (
        <form
            className={`${styles.chat} ${getHeightLevel()}`}
            onSubmit={(e) => {
                e.preventDefault();
                sendMessage({
                    fromUsername: draftUser?.username || "",
                    fromUserId: draftUser?.userId || 0,
                    message: draftMessage,
                });
                setDraftMessage("");
            }}
        >
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>
                        <span className={styles.username}>{message.fromUsername}</span> <p>{message.message}</p>
                    </li>
                ))}
            </ul>
            <div className={styles.input}>
                <input
                    placeholder="Enter Message"
                    value={draftMessage}
                    onChange={(e) => setDraftMessage(e.target.value)}
                />
                <button type="submit">SEND</button>
            </div>
        </form>
    );
};
