package com.draftbash.features.drafts.utils.draftorders;

import com.draftbash.features.drafts.interfaces.IDraftOrderGenerator;

/**
 * This class contains the DraftOrderGeneratorFactory class.
 */
public class DraftOrderGeneratorFactory {

    /**
     * Returns the appropriate draft order generator based on the draft type.

     * @param draftType The type of draft order generator to return.
     * @return The draft order generator.
     */
    public IDraftOrderGenerator getDraftOrderGenerator(String draftType) {
        switch (draftType.toLowerCase()) {
            case "snake":
                return new SnakeDraftOrderGenerator();
            case "linear":
                return new LinearDraftOrderGenerator();
            default:
                throw new IllegalArgumentException("Unknown draft type: " + draftType);
        }
    }
}
