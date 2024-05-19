package com.draftbash.features.users.services;

import com.draftbash.features.users.interfaces.IPasswordEncryptionService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Service for password related operations.
 */
@Service
public class PasswordEncryptionService implements IPasswordEncryptionService {

    private final BCryptPasswordEncoder bcryptPasswordEncoder;

    public PasswordEncryptionService() {
        this.bcryptPasswordEncoder = new BCryptPasswordEncoder();
    }

    /**
     * Encodes the plain text password using BCrypt algorithm.
     *
     * @param password the plain text password to encode
     * @return the encoded password
     */
    @Override
    public String encode(String password) {
        return bcryptPasswordEncoder.encode(password);
    }

    /**
     * Verifies the raw password against the encoded password stored in the database.

     * @param rawPassword the plain text password to verify
     * @param encodedPassword the encoded password stored in the database
     * @return true if the raw password matches the encoded password, false otherwise
     */
    @Override
    public boolean verify(String rawPassword, String encodedPassword) {
        return bcryptPasswordEncoder.matches(rawPassword, encodedPassword);
    }
}
