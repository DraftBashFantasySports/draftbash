import { WebSocketClient } from "../config";
import { Conversation, RecentConversation } from "types/chats";

export class ChatWebSocket {
    private webSocketClient: WebSocketClient;

    private conversation: Conversation = {
        fromUserId: 0,
        toUserId: 0,
        messages: [],
    };

    private recentConversations: RecentConversation[] = [];

    private fromUserId: number | null = null;

    constructor(
        userId: number,
        onUpdate: (conversation: Conversation, recentConversations: RecentConversation[]) => void,
    ) {
        this.webSocketClient = new WebSocketClient();
        this.webSocketClient.connect().then(() => {
            this.webSocketClient.subscribe(`/topic/chats/${userId}`, (msg) => {
                const data = JSON.parse(msg.body);
                if (data.conversation !== undefined && data.conversation.fromUserId === this.fromUserId) {
                    this.conversation = data.conversation;
                }
                if (data.recentConversations !== undefined) {
                    this.recentConversations = data.recentConversations;
                }
                onUpdate(this.conversation, this.recentConversations);
            });
            this.webSocketClient.send(
                "/app/chats.get-recent-conversations",
                {},
                JSON.stringify({ userId: userId }),
            );
        });
    }

    public joinChat(fromUserId: number, toUserId: number): void {
        this.webSocketClient.send(
            "/app/chats.join",
            {},
            JSON.stringify({ fromUserId: fromUserId, toUserId: toUserId }),
        );
    }

    public sendMessage(fromUserId: number, toUserId: number, message: string): void {
        this.webSocketClient.send(
            "/app/chats.send-message",
            {},
            JSON.stringify({ fromUserId: fromUserId, toUserId: toUserId, message: message }),
        );
    }

    public setFromUserId(fromUserId: number): void {
        this.fromUserId = fromUserId;
    }

    public disconnect(): void {
        this.webSocketClient.disconnect();
    }
}
