package com.draftbash.features.users.services;

import com.draftbash.features.users.dtos.UserDTO;
import com.draftbash.features.users.interfaces.IAuthenticationTokenService;
import com.draftbash.features.users.interfaces.IUserRepository;
import org.springframework.stereotype.Service;

/**
 * This class is responsible for authenticating the user.
 */
@Service
public class AuthenticateUserService {

    private final IAuthenticationTokenService authenticationTokenService;
    private final IUserRepository userRepository;

    public AuthenticateUserService(IAuthenticationTokenService authenticationTokenService,
                                    IUserRepository userRepository) {
        this.authenticationTokenService = authenticationTokenService;
        this.userRepository = userRepository;
    }

    /**
     * Authenticates the user.
     *
     * @param username the username of the user
     * @param password the password of the user
     * @return the authentication token
     */
    public String authenticate(String username, String password) {
        
        UserDTO user = userRepository.getUserByUsername(username);

        if (user == null || !user.password().equals(password)) {
            throw new IllegalArgumentException("Invalid username or password");
        } else {
            return authenticationTokenService.generateToken(user);
        }
    }
}