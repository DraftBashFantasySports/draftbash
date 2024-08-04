package com.draftbash.features.users.services;

import com.draftbash.features.users.dtos.UserCreationDTO;
import com.draftbash.features.users.dtos.UserCredentialsDTO;
import com.draftbash.features.users.exceptions.UserValidationException;
import com.draftbash.features.users.interfaces.IAuthenticationTokenService;
import com.draftbash.features.users.interfaces.IPasswordEncryptionService;
import com.draftbash.features.users.interfaces.IUserRepository;
import java.util.HashMap;
import java.util.Map;
import org.springframework.stereotype.Service;

/**
 * This class is responsible for creating a new user.

 * @param passwordService            The password service.
 * @param userRepository             The repository for app users.
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
    public String createUser(UserCreationDTO user) {

        Map<String, String> errorMap = new HashMap<>();
        errorMap.put("username", null);
        errorMap.put("email", null);
        errorMap.put("password", null);

        // Check if the username, email, and password are provided
        if (user.username() == null || user.username().isEmpty()) {
            errorMap.put("username", "Username is required");
        }
        if (user.email() == null || user.email().isEmpty()) {
            errorMap.put("email", "Email is required");
        }
        if (user.password() == null || user.password().isEmpty()) {
            errorMap.put("password", "Password is required");
        }

        if (user.username() != null && user.username().length() < 3) {
            errorMap.put("username", "Username must be at least 3 characters long");
        } else if (user.username() != null && user.username().length() > 25) {
            errorMap.put("username", "Username must be at most 25 characters long");
        } else if (user.username() != null && !user.username().matches("^[a-zA-Z0-9]*$")) {
            errorMap.put("username", "Username must contain only letters and numbers");
        }

        if (user.email() != null
                && !user.email().matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")) {
            errorMap.put("email", "Email must be a valid email address");
        }

        if (user.password() != null && user.password().length() < 8) {
            errorMap.put("password", "Password must be at least 8 characters long");
        } else if (user.password() != null && user.password().length() > 50) {
            errorMap.put("password", "Password must be at most 25 characters long");
        } else if (user.password() != null && !user.password().matches(".*[A-Z].*")) {
            errorMap.put("password", "Password must contain at least 1 uppercase letter");
        } else if (user.password() != null && !user.password().matches(".*[a-z].*")) {
            errorMap.put("password", "Password must contain at least 1 lowercase letter");
        } else if (user.password() != null && !user.password().matches(".*[0-9].*")) {
            errorMap.put("password", "Password must contain at least 1 number");
        } else if (user.password() != null && !user.password().matches(".*[!@#$%^&*].*")) {
            errorMap.put("password", "Password must contain at least 1 special character");
        }

        // Check if the username is already taken
        if (userRepository.getUserByUsername(user.username()).isPresent()) {
            errorMap.put(
                    "username", "Username already exists");
        }

        // Check if the email is already taken
        if (userRepository.getUserByEmail(user.email()).isPresent()) {
            errorMap.put("email", "Email already exists");
        }

        if (!errorMap.values().stream().allMatch(error -> error == null)) {
            throw new UserValidationException(errorMap);
        }
        final String hashedPassword = passwordService.encode(user.password());

        final int userId = userRepository.createUser(new UserCreationDTO(
                user.username(), user.email(), hashedPassword));

        return authenticationTokenService.generateToken(
                new UserCredentialsDTO(userId, user.username(), user.email(), hashedPassword));
    }
}
