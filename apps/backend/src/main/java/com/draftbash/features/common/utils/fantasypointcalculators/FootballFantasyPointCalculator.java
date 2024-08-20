package com.draftbash.features.common.utils.fantasypointcalculators;

import java.util.HashMap;

/**
 * This class calculates the fantasy points for a football player.
 */
public class FootballFantasyPointCalculator {

    private HashMap<String, Double> scoringWeights = new HashMap<>();

    /**
     * Constructor.
     */
    public FootballFantasyPointCalculator(String scoringType) {
        if (scoringType.equals("standard")) {
            scoringWeights.put("receptions", 0.0);
        } else if (scoringType.equals("ppr")) {
            scoringWeights.put("receptions", 1.0);
        } else if (scoringType.equals("half_ppr")) {
            scoringWeights.put("receptions", 0.5);
        }
        scoringWeights.put("passingYards", 0.04);
        scoringWeights.put("passingTouchdowns", 4.0);
        scoringWeights.put("interceptions", -2.0);
        scoringWeights.put("rushingYards", 0.1);
        scoringWeights.put("rushingTouchdowns", 6.0);
        scoringWeights.put("receivingYards", 0.1);
        scoringWeights.put("receivingTouchdowns", 6.0);
        scoringWeights.put("fumblesLost", -2.0);
        scoringWeights.put("twoPointConversions", 2.0);
        scoringWeights.put("shortFieldGoalsMade", 3.0);
        scoringWeights.put("mediumFieldGoalsMade", 4.0);
        scoringWeights.put("longFieldGoalsMade", 5.0);
        scoringWeights.put("fieldGoalsMissed", -1.0);
        scoringWeights.put("extraPointsMade", 1.0);
        scoringWeights.put("extraPointsMissed", -1.0);
        scoringWeights.put("defenseSacks", 1.0);
        scoringWeights.put("defenseInterceptions", 2.0);
        scoringWeights.put("defenseFumblesRecovered", 2.0);
        scoringWeights.put("defenseTouchdowns", 6.0);
        scoringWeights.put("defenseSafeties", 2.0);
        scoringWeights.put("defenseBlockedKicks", 2.0);
    }

    /**
     * Calculates the fantasy points for a kicker.

     * @param shortFieldGoalsMade the number of short field goals made
     * @param mediumFieldGoalsMade the number of medium field goals made
     * @param longFieldGoalsMade the number of long field goals made
     * @param fieldGoalsMissed the number of field goals missed
     * @param extraPointsMade the number of extra points made
     * @param extraPointsMissed the number of extra points missed
     * @return the fantasy points
     */
    public double kickerCalculate(int shortFieldGoalsMade, int mediumFieldGoalsMade, 
            int longFieldGoalsMade, int fieldGoalsMissed, int extraPointsMade, 
            int extraPointsMissed) {
        double fantasyPoints = 0.0;

        fantasyPoints += shortFieldGoalsMade * scoringWeights.get("shortFieldGoalsMade");
        fantasyPoints += mediumFieldGoalsMade * scoringWeights.get("mediumFieldGoalsMade");
        fantasyPoints += longFieldGoalsMade * scoringWeights.get("longFieldGoalsMade");
        fantasyPoints += fieldGoalsMissed * scoringWeights.get("fieldGoalsMissed");
        fantasyPoints += extraPointsMade * scoringWeights.get("extraPointsMade");
        fantasyPoints += extraPointsMissed * scoringWeights.get("extraPointsMissed");
        return fantasyPoints;
    }

    /**
     * Calculates the fantasy points for a defense.

     * @param sacks the number of sacks
     * @param interceptions the number of interceptions
     * @param fumblesRecovered the number of fumbles recovered
     * @param touchdowns the number of touchdowns
     * @param safeties the number of safeties
     * @param blockedKicks the number of blocked kicks
     * @param pointsAllowed the number of points allowed
     * @return the fantasy points
     */
    public double defenseCalculate(int sacks, int interceptions, int fumblesRecovered, 
            int touchdowns, int safeties, int blockedKicks, int pointsAllowed) {

        double fantasyPoints = 0.0;

        fantasyPoints += sacks * scoringWeights.get("defenseSacks");
        fantasyPoints += interceptions * scoringWeights.get("defenseInterceptions");
        fantasyPoints += fumblesRecovered * scoringWeights.get("defenseFumblesRecovered");
        fantasyPoints += touchdowns * scoringWeights.get("defenseTouchdowns");
        fantasyPoints += safeties * scoringWeights.get("defenseSafeties");
        fantasyPoints += blockedKicks * scoringWeights.get("defenseBlockedKicks");
        if (pointsAllowed == 0) {
            fantasyPoints += 10.0;
        } else if (pointsAllowed <= 6) {
            fantasyPoints += 7.0;
        } else if (pointsAllowed <= 13) {
            fantasyPoints += 4.0;
        } else if (pointsAllowed <= 20) {
            fantasyPoints += 1.0;
        } else if (pointsAllowed <= 27) {
            fantasyPoints += 0.0;
        } else if (pointsAllowed <= 34) {
            fantasyPoints -= 1.0;
        } else {
            fantasyPoints -= 4.0;
        }
        return fantasyPoints;
    }

    /**
     * Calculates the fantasy points for a skill player (player that is not a kicker or defense).

     * @param passingYards the number of passing yards
     * @param passingTouchdowns the number of passing touchdowns
     * @param interceptions the number of interceptions
     * @param rushingYards the number of rushing yards
     * @param rushingTouchdowns the number of rushing touchdowns
     * @param receptions the number of receptions
     * @param receivingYards the number of receiving yards
     * @param receivingTouchdowns the number of receiving touchdowns
     * @param fumblesLost the number of fumbles lost
     * @param twoPointConversions the number of two point conversions
     * @return the fantasy points
     */
    public double skillPlayerCalculate(int passingYards, int passingTouchdowns, int interceptions, 
            int rushingYards, int rushingTouchdowns, int receptions, int receivingYards, 
            int receivingTouchdowns, int fumblesLost, int twoPointConversions) {
        double fantasyPoints = 0.0;

        fantasyPoints += passingYards * scoringWeights.get("passingYards");
        fantasyPoints += passingTouchdowns * scoringWeights.get("passingTouchdowns");
        fantasyPoints += interceptions * scoringWeights.get("interceptions");
        fantasyPoints += rushingYards * scoringWeights.get("rushingYards");
        fantasyPoints += rushingTouchdowns * scoringWeights.get("rushingTouchdowns");
        fantasyPoints += receptions * scoringWeights.get("receptions");
        fantasyPoints += receivingYards * scoringWeights.get("receivingYards");
        fantasyPoints += receivingTouchdowns * scoringWeights.get("receivingTouchdowns");
        fantasyPoints += fumblesLost * scoringWeights.get("fumblesLost");
        fantasyPoints += twoPointConversions * scoringWeights.get("twoPointConversions");
        return fantasyPoints;
    }
}
