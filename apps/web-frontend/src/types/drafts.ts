import { Player } from "./players";

export type FootballDraftSettings = DraftSettings & {
    quarterbackLimit: number;
    runningBackLimit: number;
    wideReceiverLimit: number;
    tightEndLimit: number;
    kickerLimit: number;
    defenseLimit: number;
    flexLimit: number;
    benchLimit: number;
};

export type FootballDraftCreationRequest = {
    createdByUserId: number;
    settings: DraftSettings;
};

export type BasketballDraftSettings = DraftSettings & {
    pointGuardLimit: number;
    shootingGuardLimit: number;
    smallForwardLimit: number;
    powerForwardLimit: number;
    centerLimit: number;
    guardLimit: number;
    forwardLimit: number;
    utilityLimit: number;
    benchLimit: number;
};

export type DraftSettings = {
    pickOrderFormat: string;
    scoringFormat: string;
    pickTimeLimit: number;
    teamCount: number;
    sport: string;
    isDraftStarted: boolean;
};

export type Draft = {
    id: number;
    type: string;
    createdAt: string;
    settings: DraftSettings;
};

export type QueuedPlayer = {
    rank: number;
    queuedByUserId: number;
    player: Player;
};

export type DraftUser = {
    userId: number;
    teamNumber: number;
    draftId: number;
    username: string;
    isAutodrafting: boolean;
    playerQueue: QueuedPlayer[];
};

export type DraftPick = {
    pickNumber: number;
    teamNumber: number;
    player: Player;
}

export type FantasyTeam = {
    playerSpots: {
        bench: Player[];
        quarterback: Player[];
        runningBack: Player[];
        wideReceiver: Player[];
        tightEnd: Player[];
        kicker: Player[];
        teamDefense: Player[];
        flex: Player[];
    }
}

export type DraftMessage = {
    fromUserId: number,
    fromUsername: string,
    message: string
};
