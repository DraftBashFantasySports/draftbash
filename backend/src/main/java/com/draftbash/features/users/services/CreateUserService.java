package com.draftbash.features.users.services;

import com.draftbash.features.users.dtos.UserDTO;
import com.draftbash.features.users.exceptions.UserValidationException;
import com.draftbash.features.users.interfaces.IAuthenticationTokenService;
import com.draftbash.features.users.interfaces.IPasswordEncryptionService;
import com.draftbash.features.users.interfaces.IUserRepository;
import java.util.HashMap;
import java.util.Map;
import org.springframework.stereotype.Service;

/**
 * This class is responsible for creating a new user.

 * @param passwordService The password service.
 * @param userRepository The repository for app users.
 * @param authenticationTokenService The authentication token service.
 */
@Service
public class CreateUserService {

    private final IPasswordEncryptionService passwordService;
    private final IAuthenticationTokenService authenticationTokenService;
    private final IUserRepository userRepository;

    /**
     * Constructor for the CreateAppUserService.
     */
    public CreateUserService(IPasswordEncryptionService passwordService,
                                 IUserRepository appUsersRepository,
                                 IAuthenticationTokenService authenticationTokenService) {
        this.passwordService = passwordService;
        this.userRepository = appUsersRepository;
        this.authenticationTokenService = authenticationTokenService;
    }

    /**
     * Creates a new app user.

     * @param user The app user to create.
     * @return The authentication token for the new user.
     */
    public String createUser(UserDTO user) {

        final String USERNAME = user.username();
        final String EMAIL = user.email();
        final String PASSWORD = user.password();

        Map<String, String> errorMap = new HashMap<>();
        errorMap.put("username", null);
        errorMap.put("email", null);
        errorMap.put("password", null);

        // Check if the username, email, and password are provided
        if (USERNAME == null || USERNAME.isEmpty()) {
            errorMap.put("username", "Username is required");
        }
        if (EMAIL == null || EMAIL.isEmpty()) {
            errorMap.put("email", "Email is required");
        }
        if (PASSWORD == null || PASSWORD.isEmpty()) {
            errorMap.put("password", "Password is required");
        }

        if (USERNAME != null && USERNAME.length() < 3) {
            errorMap.put("username", "Username must be at least 3 characters long");
        } else if (USERNAME != null && USERNAME.length() > 25) {
            errorMap.put("username", "Username must be at most 25 characters long");
        } else if (USERNAME != null && !USERNAME.matches("^[a-zA-Z0-9]*$")) {
            errorMap.put("username", "Username must contain only letters and numbers");
        }

        if (PASSWORD != null && PASSWORD.length() < 8) {
            errorMap.put("password", "Password must be at least 8 characters long");
        } else if (PASSWORD != null && PASSWORD.length() > 50) {
            errorMap.put("password", "Password must be at most 25 characters long");
        } else if (PASSWORD != null && !PASSWORD.matches(".*[A-Z].*")) {
            errorMap.put("password", "Password must contain at least 1 uppercase letter");
        } else if (PASSWORD != null && !PASSWORD.matches(".*[a-z].*")) {
            errorMap.put("password", "Password must contain at least 1 lowercase letter");
        } else if (PASSWORD != null && !PASSWORD.matches(".*[0-9].*")) {
            errorMap.put("password", "Password must contain at least 1 number");
        } else if (PASSWORD != null && !PASSWORD.matches(".*[!@#$%^&*].*")) {
            errorMap.put("password", "Password must contain at least 1 special character");
        }

        // Check if the username is already taken
        if (userRepository.getUserByUsername(USERNAME).isPresent()) {
            errorMap.put("username", String.format("Username '%s' already exists", USERNAME));
        }

        // Check if the email is already taken
        if (userRepository.getUserByEmail(user.email()).isPresent()) {
            errorMap.put("email", String.format("Email '%s' already exists", EMAIL));
        }

        if (!errorMap.values().stream().allMatch(error -> error == null)) {
            throw new UserValidationException(errorMap);
        } else {
            final String HASHED_PASSWORD = passwordService.encode(PASSWORD);
            UserDTO userWithHashedPassword = new UserDTO(USERNAME, EMAIL, HASHED_PASSWORD);
            userRepository.createUser(userWithHashedPassword);
            
            return authenticationTokenService.generateToken(userWithHashedPassword);
        }
    }
}
