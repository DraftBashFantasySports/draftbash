import { useChatContext } from "contexts/ChatProvider";
import styles from "./RightPanel.module.css";

export const RightPanel = () => {
    const { recentConversations, setFromUserId, joinChat } = useChatContext();

    return (
        <div className={styles.rightpanel}>
            <h3>Conversations</h3>
            <ul>
                {recentConversations.map((conversation) => (
                    <li
                        key={conversation.fromUserId}
                        onClick={() => {
                            setFromUserId(conversation.fromUserId);
                            joinChat(conversation.fromUserId);
                        }}
                    >
                        <span className={styles.username}>{conversation.fromUsername}</span>
                        {conversation.lastMessage.includes("Join my draft! /drafts/") ? (
                            <p className={styles.message}>Join my draft! </p>
                        ) : (
                            <p className={styles.message}>{conversation.lastMessage}</p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};
