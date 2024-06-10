import { webSocketClient } from "../config";

export class MessageSocket {

    constructor() {
        webSocketClient.connect({}, () => {
            console.log("Connected to websocket");
            webSocketClient.subscribe("/topic/messages", (msg) => {
                if (msg.body) {
                    console.log(msg.body)
                }
            });
            webSocketClient.send(
                "/app/messages.sendMessage",
                {},
                JSON.stringify({ content: "Hello, world!", senderId: 1 }),
            );
        });
    }
}
