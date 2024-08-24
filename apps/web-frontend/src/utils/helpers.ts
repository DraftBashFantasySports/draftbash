
export const formatInjuryStatus = (injuryStatus: string | undefined) => {
    if (injuryStatus === "healthy") {
        return "Healthy"
    } else if (injuryStatus === "out") {
        return "OUT";
    } else if (injuryStatus === "doubful") {
        return "DOUBT";
    } else if (injuryStatus === "questionable") {
        return "DTD";
    } else if (injuryStatus === "probable") {
        return "PROB";
    } else if (injuryStatus === "injured_reserve") {
        return "IR";
    } else {
        return "Healthy";
    }
}

export const capitalizeFootballScoringType = (scoringType: string) => {
    if (scoringType === "standard") {
        return "Standard";
    } else if (scoringType === "ppr") {
        return "PPR";
    } else if (scoringType === "half-ppr") {
        return "Half-PPR";
    } else {
        return scoringType;
    }
}

export const getFootballPlayerPosition = (
    isQuarterback: boolean,
    isRunningBack: boolean,
    isWideReceiver: boolean,
    isTightEnd: boolean,
    isKicker: boolean,
    isTeamDefense: boolean,
) => {
    let position = "";
    if (isQuarterback) {
        position += "QB";
    }
    if (isRunningBack) {
        position += "RB";
    }
    if (isWideReceiver) {
        position += "WR";
    }
    if (isTightEnd) {
        position += "TE";
    }
    if (isKicker) {
        position += "K";
    }
    if (isTeamDefense) {
        position += "DEF";
    }
    return position;
};
