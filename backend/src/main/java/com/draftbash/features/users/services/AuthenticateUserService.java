package com.draftbash.features.users.services;

import com.draftbash.features.users.dtos.UserDTO;
import com.draftbash.features.users.interfaces.IAuthenticationTokenService;
import com.draftbash.features.users.interfaces.IUserRepository;
import java.util.Optional;
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
        
        Optional<UserDTO> optionalUser = userRepository.getUserByUsername(username);
        UserDTO user = optionalUser.orElseThrow(
            () -> new IllegalArgumentException("Invalid username or password"));

        return authenticationTokenService.generateToken(user);
    }
}