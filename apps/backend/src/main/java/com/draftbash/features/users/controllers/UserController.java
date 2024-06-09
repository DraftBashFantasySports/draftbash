package com.draftbash.features.users.controllers;

import com.draftbash.features.users.dtos.UserCreationDTO;
import com.draftbash.features.users.dtos.UserDTO;
import com.draftbash.features.users.exceptions.UserValidationException;
import com.draftbash.features.users.interfaces.IAuthenticationTokenService;
import com.draftbash.features.users.services.AuthenticateUserService;
import com.draftbash.features.users.services.CreateUserService;
import java.util.HashMap;
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

    /**
     * Constructor for the UserController.
     */
    public UserController(CreateUserService createUserService,
            AuthenticateUserService authenticateUserService,
            IAuthenticationTokenService authenticationTokenService) {
        this.createUserService = createUserService;
        this.authenticateUserService = authenticateUserService;
        this.authenticationTokenService = authenticationTokenService;
    }

    /**
     * Creates a new app user.

     * @param createUserRequest The request to create a new app user
     * @return The authentication token for the new user
     */
    @PostMapping("")
    public ResponseEntity<Object> createUser(@RequestBody UserCreationDTO createUserRequest) {
        try {
            final String authenticationToken = createUserService.createUser(createUserRequest);
            final Map<String, String> response = new HashMap<>();
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
            final UserDTO user = authenticationTokenService.verify(token);
            final HashMap<String, Object> response = new HashMap<String, Object>();
            response.put("id", user.id());
            response.put("user", user.username());
            response.put("email", user.email());
        
            return ResponseEntity.ok().body(response);
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
            final String authenticationToken = authenticateUserService.authenticate(
                authenticateUserRequest);
            final UserDTO user = authenticationTokenService.verify(authenticationToken);
            final Map<String, Object> response = new HashMap<>();
            final HashMap<String, Object> userResponse = new HashMap<String, Object>();
            userResponse.put("id", user.id());
            userResponse.put("username", user.username());
            userResponse.put("email", user.email());
            response.put("jwtToken", authenticationToken);
            response.put("user", userResponse);
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
