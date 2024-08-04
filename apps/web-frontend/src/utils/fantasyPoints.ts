export function calculateFootballDefenseFantasyPoints(
    pointsAllowed: number,
    sacks: number,
    interceptions: number,
    fumblesRecovered: number,
    safeties: number,
    touchdowns: number,
    blockedKicks: number,
) {
    let pointsAllowedWeight: number = 0;
    if (pointsAllowed === 0) {
        pointsAllowedWeight = 10;
    } else if (pointsAllowed < 7) {
        pointsAllowedWeight = 7;
    } else if (pointsAllowed < 14) {
        pointsAllowedWeight = 4;
    } else if (pointsAllowed < 21) {
        pointsAllowedWeight = 1;
    } else if (pointsAllowed < 28) {
        pointsAllowedWeight = 0;
    } else if (pointsAllowed < 35) {
        pointsAllowedWeight = -1;
    } else {
        pointsAllowedWeight = -4;
    }
    const fantasyPoints: number =
        pointsAllowedWeight +
        sacks * 1 +
        interceptions * 2 +
        fumblesRecovered * 2 +
        safeties * 2 +
        touchdowns * 6 +
        blockedKicks * 2;
    return fantasyPoints;
}

export function calculateFootballKickerFantasyPoints(
    shortFieldsGoalsMade: number,
    mediumFieldsGoalsMade: number,
    longFieldsGoalsMade: number,
    extraPointsMade: number,
    fieldsGoalsMissed: number,
    extraPointsMissed: number,
) {
    const fantasyPoints: number =
        shortFieldsGoalsMade * 3 +
        mediumFieldsGoalsMade * 4 +
        longFieldsGoalsMade * 5 +
        extraPointsMade -
        fieldsGoalsMissed -
        extraPointsMissed;
    return fantasyPoints;
}

export function calculateFootballSkillPlayerFantasyPoints(
    scoringFormat: string,
    rushYards: number,
    rushTouchdowns: number,
    receptions: number,
    receivingYards: number,
    receivingTouchdowns: number,
    fumblesLost: number,
    twoPointConversions: number,
    passYards: number,
    passTouchdowns: number,
    interceptions: number,
) {
    let receptionWeight: number = 0;
    if (scoringFormat === "ppr") {
        receptionWeight = 1;
    } else if (scoringFormat === "half-ppr") {
        receptionWeight = 0.5;
    }
    const fantasyPoints: number =
        rushYards / 10 +
        rushTouchdowns * 6 +
        receptions * receptionWeight +
        receivingYards / 10 +
        receivingTouchdowns * 6 -
        fumblesLost * 2 +
        twoPointConversions * 2 +
        passYards / 25 +
        passTouchdowns * 4 -
        interceptions * 2;
    return fantasyPoints;
}
