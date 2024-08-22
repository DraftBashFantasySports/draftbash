package com.draftbash.features.common.utils;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.draftbash.features.common.utils.fantasypointcalculators.FootballFantasyPointCalculator;
import org.junit.jupiter.api.Test;

/**
 * This class contains unit tests for the SnakeOrderGeneratorService class.
 */
public class FootballFantasyPointCalculatorTest {

    private FootballFantasyPointCalculator footballFantasyPointCalculator;

    @Test
    public void testSkillPlayerCalculate_StandardScoring() {
        footballFantasyPointCalculator = new FootballFantasyPointCalculator("standard");

        double fantasyPoints = footballFantasyPointCalculator
                .skillPlayerCalculate(0, 0, 0, 50, 1, 10, 100, 1, 1, 1);
        assertEquals(27, fantasyPoints);
    }

    @Test
    public void testSkillPlayerCalculate_PointPerReceptionScoring() {
        footballFantasyPointCalculator = new FootballFantasyPointCalculator("ppr");
        double fantasyPoints = footballFantasyPointCalculator
                .skillPlayerCalculate(0, 0, 0, 50, 1, 10, 100, 1, 1, 1);
        assertEquals(37, fantasyPoints);
    }

    @Test
    public void testSkillPlayerCalculate_HalfPointPerReceptionScoring() {
        footballFantasyPointCalculator = new FootballFantasyPointCalculator("half_ppr");
        double fantasyPoints = footballFantasyPointCalculator
                .skillPlayerCalculate(0, 0, 0, 50, 1, 10, 100, 1, 1, 1);
        assertEquals(32, fantasyPoints);
    }

    @Test
    public void testSkillPlayerCalculate_Quarterback() {
        footballFantasyPointCalculator = new FootballFantasyPointCalculator("standard");
        double fantasyPoints = footballFantasyPointCalculator
                .skillPlayerCalculate(200, 2, 1, 50, 1, 0, 0, 0, 1, 1);
        assertEquals(25, fantasyPoints);
    }

    @Test
    public void testKickerCalculate() {
        footballFantasyPointCalculator = new FootballFantasyPointCalculator("standard");
        double fantasyPoints = footballFantasyPointCalculator
                .kickerCalculate(1, 1, 1, 1, 1, 1);
        assertEquals(11, fantasyPoints);
    }

    @Test
    public void testDefenseCalcullate_0PointsAllowed() {
        footballFantasyPointCalculator = new FootballFantasyPointCalculator("standard");
        double fantasyPoints = footballFantasyPointCalculator
                .defenseCalculate(1, 1, 1, 1, 1, 1, 0);
        assertEquals(25, fantasyPoints);
    }

    @Test
    public void testDefenseCalcullate_6PointsAllowed() {
        footballFantasyPointCalculator = new FootballFantasyPointCalculator("standard");
        double fantasyPoints = footballFantasyPointCalculator
                .defenseCalculate(1, 1, 1, 1, 1, 1, 6);
        assertEquals(22, fantasyPoints);
    }

    @Test
    public void testDefenseCalcullate_13PointsAllowed() {
        footballFantasyPointCalculator = new FootballFantasyPointCalculator("standard");
        double fantasyPoints = footballFantasyPointCalculator
                .defenseCalculate(1, 1, 1, 1, 1, 1, 13);
        assertEquals(19, fantasyPoints);
    }

    @Test
    public void testDefenseCalcullate_20PointsAllowed() {
        footballFantasyPointCalculator = new FootballFantasyPointCalculator("standard");
        double fantasyPoints = footballFantasyPointCalculator
                .defenseCalculate(1, 1, 1, 1, 1, 1, 20);
        assertEquals(16, fantasyPoints);
    }

    @Test
    public void testDefenseCalcullate_27PointsAllowed() {
        footballFantasyPointCalculator = new FootballFantasyPointCalculator("standard");
        double fantasyPoints = footballFantasyPointCalculator
                .defenseCalculate(1, 1, 1, 1, 1, 1, 27);
        assertEquals(15, fantasyPoints);
    }

    @Test
    public void testDefenseCalcullate_34PointsAllowed() {
        footballFantasyPointCalculator = new FootballFantasyPointCalculator("standard");
        double fantasyPoints = footballFantasyPointCalculator
                .defenseCalculate(1, 1, 1, 1, 1, 1, 34);
        assertEquals(14, fantasyPoints);
    }

    @Test
    public void testDefenseCalcullate_35PointsAllowed() {
        footballFantasyPointCalculator = new FootballFantasyPointCalculator("standard");
        double fantasyPoints = footballFantasyPointCalculator
                .defenseCalculate(1, 1, 1, 1, 1, 1, 35);
        assertEquals(11, fantasyPoints);
    }
}
