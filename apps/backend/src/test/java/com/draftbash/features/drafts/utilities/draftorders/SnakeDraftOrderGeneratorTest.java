package com.draftbash.features.drafts.utilities.draftorders;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;

import com.draftbash.features.drafts.utils.draftorders.SnakeDraftOrderGenerator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;


/**
 * This class contains unit tests for the SnakeOrderGeneratorService class.
 */
public class SnakeDraftOrderGeneratorTest {

    private SnakeDraftOrderGenerator snakeDraftOrderGenerator;

    @BeforeEach
    public void setUp() {
        snakeDraftOrderGenerator = new SnakeDraftOrderGenerator();
    }

    @Test
    public void testGenerate_OddNumberPlayersAndEvenNumberTeams() {
        int[] expectedOrder = {1, 2, 3, 4, 4, 3, 2, 1, 1, 2, 3, 4};
        int[] generatedOrder = snakeDraftOrderGenerator.generate(4, 3);
        assertArrayEquals(expectedOrder, generatedOrder);
    }

    @Test
    public void testGenerate_OddNumberTeamsAndEvenNumberPlayers() {
        int[] expectedOrder = {1, 2, 3, 3, 2, 1, 1, 2, 3, 3, 2, 1};
        int[] generatedOrder = snakeDraftOrderGenerator.generate(3, 4);
        assertArrayEquals(expectedOrder, generatedOrder);
    }

    @Test
    public void testGenerate_OddNumberTeamsAndOddNumberPlayers() {
        int[] expectedOrder = {1, 2, 3, 3, 2, 1, 1, 2, 3};
        int[] generatedOrder = snakeDraftOrderGenerator.generate(3, 3);
        assertArrayEquals(expectedOrder, generatedOrder);
    }

    @Test
    public void testGenerate_EvenNumberTeamsAndEvenNumberPlayers() {
        int[] expectedOrder = {1, 2, 3, 4, 4, 3, 2, 1, 1, 2, 3, 4, 4, 3, 2, 1};
        int[] generatedOrder = snakeDraftOrderGenerator.generate(4, 4);
        assertArrayEquals(expectedOrder, generatedOrder);
    }
}
