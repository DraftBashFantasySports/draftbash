package com.draftbash.features.users;

import com.draftbash.features.users.dtos.UserDTO;
import com.draftbash.features.users.exceptions.UserValidationException;
import com.draftbash.features.users.services.CreateUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


/**
 * Controller for handling app user requests.
 */
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final CreateUserService createAppUserService;

    public UserController(CreateUserService createAppUserService) {
        this.createAppUserService = createAppUserService;
    }

    /**
     * Creates a new app user.

     * @param createAppUserRequest The request to create a new app user
     * @return The authentication token for the new user
     */
    @PostMapping("")
    public ResponseEntity<Object> createAppUser(@RequestBody UserDTO createAppUserRequest) {
        try {
            String authenticationToken = createAppUserService.createUser(createAppUserRequest);
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
}