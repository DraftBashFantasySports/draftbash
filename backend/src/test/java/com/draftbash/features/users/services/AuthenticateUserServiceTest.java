package com.draftbash.features.users.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.draftbash.features.users.dtos.UserDTO;
import com.draftbash.features.users.interfaces.IAuthenticationTokenService;
import com.draftbash.features.users.interfaces.IUserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

/**
 * This class contains unit tests for the AuthenticateUserService class.
 */
public class AuthenticateUserServiceTest {

    @Mock
    private IUserRepository userRepository;

    @Mock
    private IAuthenticationTokenService authenticationTokenService;

    @InjectMocks
    private AuthenticateUserService authenticateUserService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testAuthenticate_Success() {
        // Mock behavior of userRepository
        when(userRepository.getUserByUsername("fakeUsername"))
            .thenReturn(new UserDTO("fakeUsername", "email@example.com", "Password123!"));

        // Mock behavior of authenticationTokenService
        when(authenticationTokenService.generateToken(any(UserDTO.class)))
            .thenReturn("fakeToken");

        // Perform the test
        final String AUTH_TOKEN = authenticateUserService
            .authenticate("fakeUsername", "Password123!");
        
        // Verify the result
        assertEquals("fakeToken", AUTH_TOKEN);
    }

    @Test
    public void testAuthenticate_IncorrectUsername() {
        // Mock behavior of userRepository
        when(userRepository.getUserByUsername("fakeUsername"))
            .thenReturn(null);

        // Verify the result
        assertThrows(
            IllegalArgumentException.class,
            () -> authenticateUserService.authenticate("fakeUsername", "Password123!")
        );
    }

    @Test
    public void testAuthenticate_IncorrectPassword() {
        // Mock behavior of userRepository
        when(userRepository.getUserByUsername("fakeUsername"))
            .thenReturn(new UserDTO("fakeUsername", "email@example.com", "Password123!"));

        // Verify the result
        assertThrows(
            IllegalArgumentException.class,
            () -> authenticateUserService.authenticate("fakeUsername", "IncorrectPassword123!")
        );
        verify(
            authenticationTokenService,
            never()
        ).generateToken(any(UserDTO.class)
        );
    }
}
