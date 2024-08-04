package com.draftbash.features.users.controllers;

import com.draftbash.features.users.dtos.UserCreationDTO;
import com.draftbash.features.users.dtos.UserCredentialsDTO;
import com.draftbash.features.users.dtos.UserDTO;
import com.draftbash.features.users.exceptions.UserValidationException;
import com.draftbash.features.users.interfaces.IAuthenticationTokenService;
import com.draftbash.features.users.services.AuthenticateUserService;
import com.draftbash.features.users.services.CreateUserService;
import com.draftbash.features.users.services.GetUsersService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller for handling app user requests.
 */
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final CreateUserService createUserService;

    private final AuthenticateUserService authenticateUserService;

    private final IAuthenticationTokenService authenticationTokenService;

    private final GetUsersService getUsersService;

    /**
     * Constructor for the UserController.
     */
    public UserController(CreateUserService createUserService,
            AuthenticateUserService authenticateUserService,
            IAuthenticationTokenService authenticationTokenService,
            GetUsersService getUsersService) {
        this.createUserService = createUserService;
        this.authenticateUserService = authenticateUserService;
        this.authenticationTokenService = authenticationTokenService;
        this.getUsersService = getUsersService;
    }

    /**
     * Retrieves users by username.

     * @param username The username to search for
     * @param excludeUserId The user ID to exclude from the search
     * @return The users with the specified username
     */
    @GetMapping("")
    public ResponseEntity<Object> getUsersByUsername(
        @RequestParam(name = "username", required = true) String username,
        @RequestParam(name = "exclude_user_id", required = true) int excludeUserId) {
        try {
            List<UserDTO> users = getUsersService.getUsersByUsername(username, excludeUserId);
            final HashMap<String, Object> response = new HashMap<String, Object>();
            response.put("users", users);
        
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    /**
     * Creates a new app user.

     * @param createUserRequest The request to create a new app user
     * @return The authentication token for the new user
     */
    @PostMapping("")
    public ResponseEntity<Object> createUser(@RequestBody UserCreationDTO createUserRequest) {
        try {
            String authenticationToken = createUserService.createUser(createUserRequest);
            Map<String, String> response = new HashMap<>();
            response.put("jwtToken", authenticationToken);
            return ResponseEntity.ok().body(response);
        } catch (UserValidationException userValidationErrors) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(userValidationErrors.getErrors());
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    /**
     * Verifies a user's authentication token.

     * @param token The authentication token to verify
     * @return The user associated with the token
     */
    @GetMapping("tokens")
    public ResponseEntity<Object> verifyToken(
        @RequestParam(name = "token", required = true) String token) {
        try {
            UserCredentialsDTO user = authenticationTokenService.verify(token);
            return ResponseEntity.ok().body(new UserDTO(user.id(), user.username(), user.email()));
        } catch (IllegalArgumentException userValidationErrors) {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body(userValidationErrors.getMessage());
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    /**
     * Authenticates a user.

     * @param authenticateUserRequest The request to authenticate a user
     * @return The authentication token for the user
     */
    @PostMapping("tokens")
    public ResponseEntity<Object> authenticateUser(
            @RequestBody UserCreationDTO authenticateUserRequest) {
        try {
            String authenticationToken = authenticateUserService.authenticate(
                authenticateUserRequest);
            UserCredentialsDTO user = authenticationTokenService.verify(authenticationToken);
            Map<String, Object> response = new HashMap<>();
            response.put("jwtToken", authenticationToken);
            response.put("user", new UserDTO(user.id(), user.username(), user.email()));
            return ResponseEntity.ok().body(response);
        } catch (IllegalArgumentException userValidationErrors) {
            Map<String, String> response = new HashMap<>();
            response.put("authenticationError", userValidationErrors.getMessage());
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body(response);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }
}
