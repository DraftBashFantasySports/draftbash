package com.draftbash.features.users.services;

import com.draftbash.features.users.dtos.UserCreationDTO;
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

     * @param user The user to authenticate.
     * @return the authentication token
     */
    public String authenticate(UserCreationDTO user) {

        boolean isUsernameMatching = userRepository.getUserByUsername(user.username()).isPresent();
        boolean isEmailMatching = userRepository.getUserByEmail(user.email()).isPresent();
        
        // Check if the username or email exists
        if (!isUsernameMatching && !isEmailMatching) {
            throw new IllegalArgumentException("Invalid username/email or password");
        }

        // Get the matched user.
        Optional<UserDTO> matchedUser = userRepository.getUserByUsername(
            user.username());
        if (!matchedUser.isPresent()) {
            matchedUser = userRepository.getUserByEmail(user.email());
        }

        // Check if the password is correct
        if (!matchedUser.get().password().equals(user.password())) {
            throw new IllegalArgumentException("Invalid username/email or password");
        }
        return authenticationTokenService.generateToken(matchedUser.get());
    }
}