package com.draftbash.features.users.dtos;

/**
 * Data transfer object for user creation request data.

 * @param username The username of the user.
 * @param email    The email of the user.
 * @param password The password of the user.
 */
public record UserCreationDTO(
    String username,
    String email,
    String password
) {}
