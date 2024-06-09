export interface FootballDraftCreationRequest {
    sport: string;
    draftOrderType: string;
    createdByUserId: number;
    pickTimeLimit: number;
    teamCount: number;
    quarterbackCount: number;
    runningBackCount: number;
    wideReceiverCount: number;
    tightEndCount: number;
    kickerCount: number;
    flexCount: number;
    benchCount: number;
}
