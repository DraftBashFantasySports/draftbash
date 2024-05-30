package com.draftbash.features.drafts.interfaces;

/**
 * Interface for the SnakeOrderGeneratorService class.
 */
public interface IDraftOrderGenerator {
    public int[] generate(int teamCount, int playersPerTeam);
}
