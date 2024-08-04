import { Stomp, CompatClient } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export class WebSocketClient {
    private stompClient: CompatClient;

    constructor() {
        this.stompClient = Stomp.over(new SockJS(import.meta.env.VITE_WEBSOCKET_URL));
    }

    public connect(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.stompClient.connect(
                {},
                () => {
                    console.log("Connected to WebSocket");
                    resolve(true);
                },
                (error: unknown) => {
                    console.error("WebSocket connection error:", error);
                    reject(error);
                },
            );
        });
    }

    public subscribe(destination: string, callback: (msg: any) => void): void {
        this.stompClient.subscribe(destination, callback);
    }

    public send(destination: string, headers: any, body: string): void {
        this.stompClient.send(destination, headers, body);
    }

    public disconnect(): void {
        this.stompClient.disconnect();
    }
}
