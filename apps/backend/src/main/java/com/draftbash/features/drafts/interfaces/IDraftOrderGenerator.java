package com.draftbash.features.drafts.interfaces;

/**
    * Interface for draft order generators.
 */
public interface IDraftOrderGenerator {
    public int[] generate(int teamCount, int playersPerTeam);
}
