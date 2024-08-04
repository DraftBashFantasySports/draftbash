export type ChatMessage = {
    fromUserId: number,
    fromUsername: string,
    toUserId: number,
    toUsername: string,
    message: string,
    sentAt: string
};

export type Conversation = {
    fromUserId: number;
    toUserId: number;
    messages: ChatMessage[];
};

export type RecentConversation = {
    fromUserId: number;
    fromUsername: string;
    toUserId: number;
    lastMessage: string;
    lastMessageSentAt: string;
};