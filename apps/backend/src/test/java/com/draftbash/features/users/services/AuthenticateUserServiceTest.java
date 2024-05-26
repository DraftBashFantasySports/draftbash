package com.draftbash.features.users.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.draftbash.features.users.dtos.UserCreationDTO;
import com.draftbash.features.users.dtos.UserDTO;
import com.draftbash.features.users.interfaces.IAuthenticationTokenService;
import com.draftbash.features.users.interfaces.IPasswordEncryptionService;
import com.draftbash.features.users.interfaces.IUserRepository;
import java.util.Optional;
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

    @Mock
    private IPasswordEncryptionService passwordEncryptionService;

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
                .thenReturn(Optional.of(
                        new UserDTO(
                                1, "fakeUsername", "email@example.com",
                                "$2a$10$2sfrm2v7hkT/WPWa3mfNQekmMZIa9iW7yZIT77rD9wDPowZggNp0y")));
        when(userRepository.getUserByEmail("email@example.com"))
                .thenReturn(Optional.empty());
        when(passwordEncryptionService.verify(
                "Password123!",
                "$2a$10$2sfrm2v7hkT/WPWa3mfNQekmMZIa9iW7yZIT77rD9wDPowZggNp0y"))
                .thenReturn(true);
        when(authenticationTokenService.generateToken(any(UserDTO.class)))
                .thenReturn("fakeToken");

        // Perform the test
        final String AUTH_TOKEN = authenticateUserService
                .authenticate(new UserCreationDTO(
                        "fakeUsername", "email@example.com", "Password123!"));

        // Verify the result
        assertEquals("fakeToken", AUTH_TOKEN);
        verify(
                authenticationTokenService,
                times(1)).generateToken(any(UserDTO.class));
    }

    @Test
    public void testAuthenticate_IncorrectUsername() {
        // Mock behavior of userRepository
        when(userRepository.getUserByUsername("fakeUsername"))
                .thenReturn(Optional.empty());
        when(userRepository.getUserByEmail("email@example.com"))
                .thenReturn(Optional.empty());

        // Verify the result
        assertThrows(
                IllegalArgumentException.class,
                () -> authenticateUserService.authenticate(
                        new UserCreationDTO(
                            "incorrectUsername", "email@example.com", "Password123!")));
        verify(
                authenticationTokenService,
                never()).generateToken(any(UserDTO.class));
    }

    @Test
    public void testAuthenticate_IncorrectEmail() {
        // Mock behavior of userRepository
        when(userRepository.getUserByUsername("fakeUsername"))
                .thenReturn(Optional.empty());
        when(userRepository.getUserByEmail("email@example.com"))
                .thenReturn(Optional.empty());

        // Verify the result
        assertThrows(
                IllegalArgumentException.class,
                () -> authenticateUserService.authenticate(
                        new UserCreationDTO(
                                "fakeUsername", "incorrectemail@example.com", "Password123!")));
        verify(
                authenticationTokenService,
                never()).generateToken(any(UserDTO.class));
    }

    @Test
    public void testAuthenticate_IncorrectPassword() {
        // Mock behavior of userRepository
        when(userRepository.getUserByUsername("fakeUsername"))
                .thenReturn(Optional.of(
                        new UserDTO(1, "fakeUsername", "email@example.com", "Password123!")));
        when(userRepository.getUserByEmail("email@example.com"))
                .thenReturn(Optional.empty());
        when(passwordEncryptionService.verify(
                "IncorrectPassword123!",
                "$2a$10$2sfrm2v7hkT/WPWa3mfNQekmMZIa9iW7yZIT77rD9wDPowZggNp0y"))
                .thenReturn(false);

        // Verify the result
        assertThrows(
                IllegalArgumentException.class,
                () -> authenticateUserService.authenticate(
                        new UserCreationDTO(
                                "fakeUsername", "email@example.com", "IncorrectPassword123!")));
        verify(
                authenticationTokenService,
                never()).generateToken(any(UserDTO.class));
    }
}
