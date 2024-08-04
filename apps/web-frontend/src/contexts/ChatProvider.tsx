import { createContext, useContext, useState, useEffect } from "react";
import { useGlobalContext } from "./GlobalProvider";
import { ChatMessage, RecentConversation } from "types/chats";
import { ChatWebSocket } from "services/websockets/chats/ChatWebSocket";

type ChatContextType = {
    messages: ChatMessage[];
    recentConversations: RecentConversation[];
    fromUserId: number | null;
    setFromUserId: (fromUserId: number) => void;
    joinChat: (toUserId: number) => void;
    sendMessage: (message: string) => void;
};

const ChatContext = createContext<ChatContextType>({
    messages: [],
    fromUserId: null,
    recentConversations: [],
    setFromUserId: () => {},
    joinChat: () => {},
    sendMessage: () => {}
});
export const useChatContext = () => useContext(ChatContext);

interface Props {
    children: React.ReactNode;
}

export const ChatProvider = ({ children }: Props) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [recentConversations, setRecentConversations] = useState<RecentConversation[]>([]);
    const [fromUserId, setFromUserId] = useState<number | null>(null);
    const [chatWebSocket, setChatWebSocket] = useState<ChatWebSocket | null>(null);
    const { user } = useGlobalContext();

    const joinChat = (toUserId: number) => {
        if (chatWebSocket !== null) {
            setFromUserId(toUserId);
            chatWebSocket.setFromUserId(toUserId);
            chatWebSocket.joinChat(user?.id ?? 0, toUserId);
        }   
    }

    const sendMessage = (message: string) => {
        if (chatWebSocket !== null && fromUserId !== null) {
            //chatWebSocket.sendMessage(user?.id ?? 0, fromUserId, message);
            const newMessages = [...messages, {
                fromUserId: user?.id ?? 0,
                fromUsername: user?.username ?? "",
                toUserId: fromUserId,
                toUsername: "",
                message: message,
                sentAt: new Date().toISOString()}
            ];
            console.log(newMessages);
            setMessages(newMessages);
        }
    }

    useEffect(() => {
        const draftSocket = new ChatWebSocket(
            user?.id ?? 0,
            (newConversation, newRecentConversations) => {
                setMessages(newConversation.messages);
                setRecentConversations(newRecentConversations);
            }
        );

        setChatWebSocket(draftSocket);

        return () => {
            draftSocket.disconnect();
        };
    }, [user]);

    return (
        <ChatContext.Provider
            value={{
                messages,
                fromUserId,
                recentConversations,
                setFromUserId,
                joinChat,
                sendMessage
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};
