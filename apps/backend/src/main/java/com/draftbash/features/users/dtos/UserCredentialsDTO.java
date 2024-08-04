package com.draftbash.features.users.dtos;

/**
 * This record contains user credentials information.
 */
public record UserCredentialsDTO(
    int id,
    String username,
    String email,
    String password
) {}
