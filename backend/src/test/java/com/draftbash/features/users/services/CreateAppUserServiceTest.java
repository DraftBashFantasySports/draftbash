package com.draftbash.features.users.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.draftbash.features.users.dtos.UserDTO;
import com.draftbash.features.users.interfaces.IAuthenticationTokenService;
import com.draftbash.features.users.interfaces.IPasswordService;
import com.draftbash.features.users.interfaces.IUserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

/**
 * This class contains unit tests for the CreateAppUserService class.
 */
public class CreateAppUserServiceTest {

    @Mock
    private IPasswordService passwordService;

    @Mock
    private IUserRepository appUsersRepository;

    @Mock
    private IAuthenticationTokenService authenticationTokenService;

    @InjectMocks
    private CreateUserService createAppUserService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreateAppUser_Success() {
        // Arrange
        UserDTO appUser = new UserDTO("testUser", "test@example.com", "password");

        // Mock repository methods
        when(appUsersRepository.getUserByUsername("testUser"))
            .thenReturn(null);
        when(appUsersRepository.getUserByEmail("test@example.com"))
            .thenReturn(null);

        // Mock password service
        when(passwordService
            .encode("password"))
            .thenReturn("hashedPassword");

        // Mock authentication token service
        when(authenticationTokenService
            .generateToken(any(UserDTO.class)))
            .thenReturn("authToken");

        // Act
        String authToken = createAppUserService.createAppUser(appUser);

        // Assert
        assertEquals("authToken", authToken);
        verify(appUsersRepository, times(1))
            .createUser(any(UserDTO.class));
    }

    @Test
    public void testCreateAppUser_UsernameExists() {
        // Arrange
        UserDTO appUser = new UserDTO("existingUser", "test@example.com", "password");

        // Mock repository method to return a user with the same username
        when(appUsersRepository.getUserByUsername("existingUser"))
                .thenReturn(new UserDTO("existingUser", 
                    "test@example.com", "password"));

        // Act and Assert
        assertThrows(IllegalArgumentException.class, 
            () -> createAppUserService.createAppUser(appUser));
        verify(appUsersRepository, never()).createUser(any(UserDTO.class));
    }

    @Test
    public void testCreateAppUser_EmailExists() {
        // Arrange
        UserDTO appUser = new UserDTO("testUser", "existing@example.com", "password");

        // Mock repository method to return a user with the same email
        when(appUsersRepository.getUserByUsername("testUser")).thenReturn(null);
        when(appUsersRepository.getUserByEmail("existing@example.com"))
                .thenReturn(new UserDTO("existingUser", 
                    "existing@example.com", "password"));

        // Act and Assert
        assertThrows(IllegalArgumentException.class, 
            () -> createAppUserService.createAppUser(appUser));
        verify(appUsersRepository, never()).createUser(any(UserDTO.class));
    }
}
