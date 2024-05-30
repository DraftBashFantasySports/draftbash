package com.draftbash.features.drafts.utils.draftorders;

import com.draftbash.features.drafts.interfaces.IDraftOrderGenerator;

/**
 * This class contains the SnakeDraftOrderGeneratorService class.
 */
public class SnakeDraftOrderGenerator implements IDraftOrderGenerator {

    @Override
    public int[] generate(int teamCount, int playersPerTeam) {
        int[] order = new int[teamCount * playersPerTeam];
        int index = 0;
        for (int i = 1; i <= playersPerTeam; i++) {
            if (i % 2 == 1) {
                for (int j = 1; j <= teamCount; j++) {
                    order[index] = j;
                    index++;
                }
            } else {
                for (int j = teamCount; j >= 1; j--) {
                    order[index] = j;
                    index++;
                }
            }
        }
        return order;
    }
}
