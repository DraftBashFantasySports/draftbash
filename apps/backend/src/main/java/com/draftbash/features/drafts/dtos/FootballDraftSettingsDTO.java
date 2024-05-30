package com.draftbash.features.drafts.dtos;

/**
 * Data Transfer Object for creating a draft.

 * @param sport The sport of the draft.
 * @param draftOrderType The type of draft order.
 * @param scoringType The type of scoring, i.e. PPR, Standard, etc.
 * @param pickTimeLimit The time limit for each pick.
 * @param teamCount The number of teams in the draft.
 * @param quarterbackCount The number of quarterbacks per team.
 * @param runningBackCount The number of running backs per team.
 * @param wideReceiverCount The number of wide receivers per team.
 * @param tightendCount The number of tight ends per team.
 * @param kickerCount The number of kickers per team.
 * @param defenseCount The number of defenses per team.
 * @param flexCount The number of flex players per team.
 * @param benchCount The number of bench players per team.
 */
public record FootballDraftSettingsDTO(
    int draftId,
    String sport,
    String pickOrderFormat,
    String scoringFormat,
    String createdAt,
    int pickTimeLimit,
    int teamCount,
    int quarterbackLimit,
    int runningBackLimit,
    int wideReceiverLimit,
    int tightendLimit,
    int kickerLimit,
    int defenseLimit,
    int flexLimit,
    int benchLimit
) {}
