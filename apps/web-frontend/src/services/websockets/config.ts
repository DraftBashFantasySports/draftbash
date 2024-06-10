import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export const webSocketClient = Stomp.over(new SockJS(import.meta.env.VITE_WEBSOCKET_URL));