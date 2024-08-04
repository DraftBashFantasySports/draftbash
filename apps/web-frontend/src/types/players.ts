export type Player = {
    id: number;
    type: string;
    firstName: string;
    lastName: string;
    age: number;
    height: number;
    weight: number;
    injuryStatus: string;
    headshotUrl: string;
    jerseyNumber: number;
};

export type SkillPlayerProjection = {
    rushAttempts: number;
    rushYards: number;
    rushTouchdowns: number;
    targets: number;
    receptions: number;
    receivingYards: number;
    receivingTouchdowns: number;
    passAttempts: number;
    passCompletions: number;
    passYards: number;
    passTouchdowns: number;
    interceptions: number;
    fumblesLost: number;
    twoPointConversions: number;
    standardFantasyPoints: number;
    pprFantasyPoints: number;
    halfPprFantasyPoints: number;
}

export type TeamDefenseProjection = {
    sacks: number;
    interceptions: number;
    fumbleRecoveries: number;
    safeties: number;
    returnTouchdowns: number;
    defensiveTouchdowns: number;
    blockedKicks: number;
    pointsAllowed: number;
    fantasyPoints: number;
}

export type KickerProjection = {
    fieldGoalsMade: number;
    extraPointsMade: number;
    fieldsGoalsAttempted: number;
    extraPointsAttempted: number;
    fantasyPoints: number;
}

export type FootballTeam = {
    id: number;
    teamName: string;
    teamAbbreviation: string;
    teamCity: string;
    byeWeek: number;
    division: string;
    wins: number;
    losses: number;
    ties: number;
    currentWinStreak: number;
    logoUrl: string;
    conference: string;
}

export type FootballPlayer = Player & {
    standardAdp: number;
    pprAdp: number;
    halfPprAdp: number;
    isQuarterback: boolean;
    isRunningBack: boolean;
    isWideReceiver: boolean;
    isTightEnd: boolean;
    isKicker: boolean;
    isTeamDefense: boolean;
    skillPlayerProjection: SkillPlayerProjection;
    teamDefenseProjection: TeamDefenseProjection;
    kickerProjection: KickerProjection;
    team: FootballTeam;
};