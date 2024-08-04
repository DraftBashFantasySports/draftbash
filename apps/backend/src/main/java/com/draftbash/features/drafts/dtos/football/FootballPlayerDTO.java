package com.draftbash.features.drafts.dtos.football;

import com.draftbash.features.drafts.dtos.PlayerDTO;

/**
 * This dto contains the limits for each position in a football draft.
 */
public record FootballPlayerDTO(
    int id,
    String type,
    int standardAdp,
    int pprAdp,
    int halfPprAdp,
    String firstName,
    String lastName,
    int age,
    int height,
    int weight,
    String injuryStatus,
    int yearsExperience,
    boolean isQuarterback,
    boolean isRunningBack,
    boolean isWideReceiver,
    boolean isTightEnd,
    boolean isKicker,
    boolean isTeamDefense,
    String headshotUrl,
    FootballTeamDTO team,
    SkillPlayerProjection skillPlayerProjection,
    KickerProjection kickerProjection,
    TeamDefenseProjection teamDefenseProjection
) implements PlayerDTO {}
