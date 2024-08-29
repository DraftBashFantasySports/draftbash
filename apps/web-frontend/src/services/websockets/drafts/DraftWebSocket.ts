import {
    Draft,
    DraftMessage,
    DraftPick,
    DraftSettings,
    DraftUser,
    FantasyTeam,
} from "types/drafts";
import { WebSocketClient } from "../config";
import { Player } from "types/players";

export class DraftWebSocket {
    private webSocketClient: WebSocketClient;

    private draftPicks: DraftPick[] = [];

    private players: Player[] = [];

    private draftUsers: DraftUser[] = [];

    private fantasyTeams: FantasyTeam[] = [];

    private timeRemaining: number = 0;

    private messages: DraftMessage[] = [];

    private draftSettings: DraftSettings = {
        pickOrderFormat: "snake",
        scoringFormat: "standard",
        pickTimeLimit: 60,
        teamCount: 10,
        sport: "football",
        isDraftStarted: false,
    };

    constructor(
        sport: string,
        draftId: number,
        onUpdate: (
            picks: DraftPick[],
            settings: DraftSettings,
            players: Player[],
            draftUsers: DraftUser[],
            timerRemaining: number,
            fantasyTeams: FantasyTeam[],
            messages: DraftMessage[],
        ) => void,
    ) {
        this.webSocketClient = new WebSocketClient();
        this.webSocketClient.connect().then(() => {
            this.webSocketClient.subscribe(`/topic/drafts/${draftId}`, (msg) => {
                const data = JSON.parse(msg.body);
                if (data.timeRemaining !== undefined) {
                    this.timeRemaining = data.timeRemaining;
                }
                if (data.messages !== undefined) {
                    this.messages = data.messages;
                }
                if (data.fantasyTeams !== undefined) {
                    this.fantasyTeams = data.fantasyTeams;
                }
                if (data.draftPicks !== undefined) {
                    this.draftPicks = data.draftPicks;
                }
                if (data.draftSettings !== undefined) {
                    this.draftSettings = data.draftSettings;
                }
                if (data.players !== undefined) {
                    this.players = data.players;
                }
                if (data.draftUsers !== undefined) {
                    this.draftUsers = data.draftUsers;
                }
                onUpdate(
                    this.draftPicks,
                    this.draftSettings,
                    this.players,
                    this.draftUsers,
                    this.timeRemaining,
                    this.fantasyTeams,
                    this.messages,
                );
            });
            this.webSocketClient.send(
                "/app/drafts.join",
                {},
                JSON.stringify({ draftId: draftId, sport: sport }),
            );
        });
    }

    public sendDraftInvite(fromUserId: number, toUserId: number, message: string): void {
        this.webSocketClient.send(
            "/app/chats.send-message",
            {},
            JSON.stringify({ fromUserId: fromUserId, toUserId: toUserId, message: message }),
        );
    }

    public sendMessage(message: DraftMessage, draftId: number): void {
        this.webSocketClient.send(
            "/app/drafts.message",
            {},
            JSON.stringify({ message: message, draftId: draftId }),
        );
    }

    public dequeuePlayer(userId: number, draftId: number, playerId: number): void {
        this.webSocketClient.send(
            "/app/drafts.dequeue-player",
            {},
            JSON.stringify({ userId: userId, draftId: draftId, playerId: playerId }),
        );
    }

    public updateDraftSettings(draft: Draft): void {
        this.webSocketClient.send("/app/drafts.update-draft-settings", {}, JSON.stringify(draft));
    }

    public swapQueuedPlayers(
        userId: number,
        draftId: number,
        firstPlayer: { playerId: number; rank: number },
        secondPlayer: { playerId: number; rank: number },
    ): void {
        this.webSocketClient.send(
            "/app/drafts.swap-queued-players",
            {},
            JSON.stringify({
                userId: userId,
                draftId: draftId,
                firstPlayer: firstPlayer,
                secondPlayer: secondPlayer,
            }),
        );
    }

    public enqueuePlayer(userId: number, draftId: number, playerId: number, rank: number): void {
        this.webSocketClient.send(
            "/app/drafts.enqueue-player",
            {},
            JSON.stringify({ userId: userId, draftId: draftId, playerId: playerId, rank: rank }),
        );
    }

    public toggleAutoDraft(userId: number, draftId: number, isAutodrafting: boolean): void {
        this.webSocketClient.send(
            "/app/drafts.toggle-autodraft",
            {},
            JSON.stringify({ userId: userId, draftId: draftId, isAutodrafting: isAutodrafting }),
        );
    }

    public startDraft(draftId: number): void {
        this.webSocketClient.send("/app/drafts.start", {}, JSON.stringify({ draftId: draftId }));
    }

    public pickPlayer(draftId: number, draftPick: DraftPick): void {
        this.webSocketClient.send(
            "/app/drafts.pick-player",
            {},
            JSON.stringify({ draftId: draftId, draftPick: draftPick }),
        );
    }

    public claimTeam(userId: number, teamNumber: number, draftId: number): void {
        this.webSocketClient.send(
            "/app/drafts.claim-team",
            {},
            JSON.stringify({ draftId: draftId, userId: userId, teamNumber: teamNumber }),
        );
    }

    public getPicks(): DraftPick[] {
        return this.draftPicks;
    }

    public getDraftSettings(): DraftSettings {
        return this.draftSettings;
    }

    public getPlayers(): Player[] {
        return this.players;
    }

    public getDraftUsers(): DraftUser[] {
        return this.draftUsers;
    }

    public disconnect(): void {
        this.webSocketClient.disconnect();
    }
}
