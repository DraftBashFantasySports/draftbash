package com.draftbash.features.drafts.dtos;

public class DraftRoom {
    private boolean draftStarted;

    public boolean isDraftStarted() {
        return draftStarted;
    }

    public void startDraft() {
        draftStarted = true;
    }

    public void stopDraft() {
        draftStarted = false;
    }
}