package com.draftbash.features.drafts.utils.draftorders;

import com.draftbash.features.drafts.interfaces.IDraftOrderGenerator;

/**
 * This class contains the LinearDraftOrderGeneratorService class.
 */
public class LinearDraftOrderGenerator implements IDraftOrderGenerator {

    @Override
    public int[] generate(int teamCount, int playersPerTeam) {
        int[] order = new int[teamCount * playersPerTeam];
        int index = 0;
        for (int i = 1; i <= playersPerTeam; i++) {
            for (int j = 1; j <= teamCount; j++) {
                order[index] = j;
                index++;
            }

        }
        return order;
    }
}
