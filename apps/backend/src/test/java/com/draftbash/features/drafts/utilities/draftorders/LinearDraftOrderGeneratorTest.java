package com.draftbash.features.drafts.utilities.draftorders;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;

import com.draftbash.features.drafts.utils.draftorders.LinearDraftOrderGenerator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

/**
 * This class contains unit tests for the SnakeOrderGeneratorService class.
 */
public class LinearDraftOrderGeneratorTest {

    private LinearDraftOrderGenerator linearDraftOrderGenerator;

    @BeforeEach
    public void setUp() {
        linearDraftOrderGenerator = new LinearDraftOrderGenerator();
    }

    @Test
    public void testGenerate_OddNumberPlayersAndEvenNumberTeams() {
        int[] expectedOrder = {1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4};
        int[] generatedOrder = linearDraftOrderGenerator.generate(4, 3);
        assertArrayEquals(expectedOrder, generatedOrder);
    }

    @Test
    public void testGenerate_OddNumberTeamsAndEvenNumberPlayers() {
        int[] expectedOrder = {1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3};
        int[] generatedOrder = linearDraftOrderGenerator.generate(3, 4);
        assertArrayEquals(expectedOrder, generatedOrder);
    }

    @Test
    public void testGenerate_OddNumberTeamsAndOddNumberPlayers() {
        int[] expectedOrder = {1, 2, 3, 1, 2, 3, 1, 2, 3};
        int[] generatedOrder = linearDraftOrderGenerator.generate(3, 3);
        assertArrayEquals(expectedOrder, generatedOrder);
    }

    @Test
    public void testGenerate_EvenNumberTeamsAndEvenNumberPlayers() {
        int[] expectedOrder = {1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4};
        int[] generatedOrder = linearDraftOrderGenerator.generate(4, 4);
        assertArrayEquals(expectedOrder, generatedOrder);
    }
}
