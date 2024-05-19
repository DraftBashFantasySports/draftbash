package com.draftbash.features.users;

import com.draftbash.features.users.dtos.UserCreationDTO;
import com.draftbash.features.users.dtos.UserDTO;
import com.draftbash.features.users.exceptions.UserValidationException;
import com.draftbash.features.users.interfaces.IAuthenticationTokenService;
import com.draftbash.features.users.services.AuthenticateUserService;
import com.draftbash.features.users.services.CreateUserService;
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
            String authenticationToken = createUserService.createUser(createUserRequest);
            return ResponseEntity.ok().body(authenticationToken);
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
            final UserDTO USER = authenticationTokenService.verify(token);
            return ResponseEntity.ok().body(USER);
        } catch (UserValidationException userValidationErrors) {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body(userValidationErrors.getErrors());
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
            return ResponseEntity.ok().body(authenticationToken);
        } catch (UserValidationException userValidationErrors) {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body(userValidationErrors.getErrors());
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }
}