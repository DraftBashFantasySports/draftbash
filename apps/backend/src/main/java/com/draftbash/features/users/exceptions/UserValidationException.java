package com.draftbash.features.users.exceptions;

import java.util.Map;

/**
 * Exception thrown when user validation fails.
 */
public class UserValidationException extends IllegalArgumentException {

    private Map<String, String> errors;

    public UserValidationException(Map<String, String> errors) {
        super("Validation failed");
        this.errors = errors;
    }

    public Map<String, String> getErrors() {
        return errors;
    }
}