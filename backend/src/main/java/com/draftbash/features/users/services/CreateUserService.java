package com.draftbash.features.users.services;

import com.draftbash.features.users.dtos.UserDTO;
import com.draftbash.features.users.interfaces.IAuthenticationTokenService;
import com.draftbash.features.users.interfaces.IPasswordService;
import com.draftbash.features.users.interfaces.IUserRepository;
import org.springframework.stereotype.Service;

/**
 * This class is responsible for creating a new user.

 * @param passwordService The password service.
 * @param appUsersRepository The repository for app users.
 * @param authenticationTokenService The authentication token service.
 */
@Service
public class CreateUserService {

    private final IPasswordService passwordService;
    private final IAuthenticationTokenService authenticationTokenService;
    private final IUserRepository appUsersRepository;

    /**
     * Constructor for the CreateAppUserService.
     */
    public CreateUserService(IPasswordService passwordService,
                                 IUserRepository appUsersRepository,
                                 IAuthenticationTokenService authenticationTokenService) {
        this.passwordService = passwordService;
        this.appUsersRepository = appUsersRepository;
        this.authenticationTokenService = authenticationTokenService;
    }

    /**
     * Creates a new app user.

     * @param appUser The app user to create.
     * @return The authentication token for the new user.
     */
    public String createAppUser(UserDTO appUser) {
        // Check if the username is already taken
        String username = appUser.username();
        if (appUsersRepository.getUserByUsername(appUser.username()) != null) {
            throw new IllegalArgumentException("Username already exists");
        }

        // Check if the email is already taken
        String email = appUser.email();
        if (appUsersRepository.getUserByEmail(appUser.email()) != null) {
            throw new IllegalArgumentException("Email already exists");
        }

        String hashedPassword = passwordService.encode(appUser.password());
        UserDTO appUserWithHashedPassword = new UserDTO(username, email, hashedPassword);
        appUsersRepository.createUser(appUserWithHashedPassword);
        
        return authenticationTokenService.generateToken(appUserWithHashedPassword);
    }
}
