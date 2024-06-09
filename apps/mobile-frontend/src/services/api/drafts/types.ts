export type FootballDraft = {
    draftId: number;
    sport: string;
    pickOrderFormat: string;
    scoringFormat: string;
    createdAt: string;
    pickTimeLimit: number;
    teamCount: number;
    quarterbackLimit: number;
    runningBackLimit: number;
    wideReceiverLimit: number;
    tightendLimit: number;
    kickerLimit: number;
    defenseLimit: number;
    flexLimit: number;
    benchLimit: number;
};

export type BasketballDraft = {
    draftId: number;
    sport: string;
    pickOrderFormat: string;
    scoringFormat: string;
    createdAt: string;
    pickTimeLimit: number;
    teamCount: number;
    pointGuardLimit: number;
    shootingGuardLimit: number;
    smallForwardLimit: number;
    powerForwardLimit: number;
    centerLimit: number;
    utilityLimit: number;
    benchLimit: number;
};

export type Draft = FootballDraft | BasketballDraft;