import { DraftResponse } from "./DraftResponse";

export interface FootballDraftResponse extends DraftResponse {
    quarterbackLimit: number;
    runningBackLimit: number;
    wideReceiverLimit: number;
    tightendLimit: number;
    kickerLimit: number;
    defenseLimit: number;
    flexLimit: number;
    benchLimit: number;
}
