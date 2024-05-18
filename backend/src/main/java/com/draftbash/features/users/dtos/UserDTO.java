package com.draftbash.features.users.dtos;

/**
 * Request to create a new app user.

 * @param username The username of the user.
 * @param email    The email of the user.
 * @param password The password of the user.
 */
public record UserDTO(
    String username,
    String email,
    String password
) {}
