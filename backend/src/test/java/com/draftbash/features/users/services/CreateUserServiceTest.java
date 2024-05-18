package com.draftbash.features.users.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.draftbash.features.users.dtos.UserDTO;
import com.draftbash.features.users.exceptions.UserValidationException;
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
 * This class contains unit tests for the CreateAppUserService class.
 */
public class CreateUserServiceTest {

    @Mock
    private IPasswordEncryptionService passwordService;

    @Mock
    private IUserRepository userRepository;

    @Mock
    private IAuthenticationTokenService authenticationTokenService;

    @InjectMocks
    private CreateUserService createUserService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreateUser_Success() {
        // Arrange
        UserDTO user = new UserDTO("try", "test@example.com", "Password123!");

        // Mock repository methods
        when(userRepository.getUserByUsername("try"))
            .thenReturn(Optional.empty());
        when(userRepository.getUserByEmail("test@example.com"))
            .thenReturn(Optional.empty());

        // Mock password service
        when(passwordService
            .encode("password"))
            .thenReturn("hashedPassword");

        // Mock authentication token service
        when(authenticationTokenService
            .generateToken(any(UserDTO.class)))
            .thenReturn("authToken");

        // Act
        String authToken = createUserService.createUser(user);

        // Assert
        assertEquals("authToken", authToken);
        verify(userRepository, times(1))
            .createUser(any(UserDTO.class));
    }

    @Test
    public void testCreateUser_UsernameExists() {
        // Arrange
        UserDTO user = new UserDTO("existingUser", "test@example.com", "Password123!");

        // Mock repository method to return a user with the same username
        when(userRepository.getUserByUsername("existingUser"))
                .thenReturn(Optional.of(new UserDTO("existingUser", 
                    "test@example.com", "password")));

        // Act and Assert
        assertEquals(
            "Username 'existingUser' already exists",
            assertThrows(UserValidationException.class,
                () -> createUserService.createUser(user)).getErrors().get("username")
        );
        verify(userRepository, never()).createUser(any(UserDTO.class));
    }

    @Test
    public void testCreateUser_UsernameMissing() {
        // Arrange
        UserDTO user = new UserDTO(null, "email@example.com", "Password123!");

        // Act and Assert
        assertEquals(
            "Username is required",
            assertThrows(UserValidationException.class,
                () -> createUserService.createUser(user)).getErrors().get("username")
        );
        verify(userRepository, never()).createUser(any(UserDTO.class));
    }

    @Test
    public void testCreateUser_EmailMissing() {
        // Arrange
        UserDTO user = new UserDTO("validUsername", null, "Password123!");

        // Act and Assert
        assertEquals(
            "Email is required",
            assertThrows(UserValidationException.class,
                () -> createUserService.createUser(user)).getErrors().get("email")
        );
        verify(userRepository, never()).createUser(any(UserDTO.class));
    }

    @Test
    public void testCreateUser_PasswordMissing() {
        // Arrange
        UserDTO user = new UserDTO("validUsername", "email@example.com", null);

        // Act and Assert
        assertEquals(
            "Password is required",
            assertThrows(UserValidationException.class,
                () -> createUserService.createUser(user)).getErrors().get("password")
        );
        verify(userRepository, never()).createUser(any(UserDTO.class));
    }

    @Test
    public void testCreateUser_UsernameTooShort() {
        // Arrange
        UserDTO user = new UserDTO("ed", "email@example.com", "Password123!");

        // Act and Assert
        assertEquals(
            "Username must be at least 3 characters long",
            assertThrows(UserValidationException.class,
                () -> createUserService.createUser(user)).getErrors().get("username")
        );
        verify(userRepository, never()).createUser(any(UserDTO.class));
    }

    @Test
    public void testCreateUser_UsernameTooLong() {
        // Arrange
        UserDTO user = new UserDTO(
            "userLongerThan25Characters", "email@example.com", "Password123!");

        // Act and Assert
        assertEquals(
            "Username must be at most 25 characters long",
            assertThrows(UserValidationException.class,
                () -> createUserService.createUser(user)).getErrors().get("username")
        );
        verify(userRepository, never()).createUser(any(UserDTO.class));
    }

    @Test
    public void testCreateUser_UsernameWithInvalidCharacters() {
        // Arrange
        UserDTO user = new UserDTO(
            "@invalid %^user_", "email@example.com", "Password123!");

        // Act and Assert
        assertEquals(
            "Username must contain only letters and numbers",
            assertThrows(UserValidationException.class,
                () -> createUserService.createUser(user)).getErrors().get("username")
        );
        verify(userRepository, never()).createUser(any(UserDTO.class));
    }

    @Test
    public void testCreateUser_PasswordTooShort() {
        // Arrange
        UserDTO user = new UserDTO(
            "validUsername", "email@example.com", "Pas123!");

        // Act and Assert
        assertEquals(
            "Password must be at least 8 characters long",
            assertThrows(UserValidationException.class,
                () -> createUserService.createUser(user)).getErrors().get("password")
        );
        verify(userRepository, never()).createUser(any(UserDTO.class));
    }

    @Test
    public void testCreateUser_PasswordMissingUppercases() {
        // Arrange
        UserDTO user = new UserDTO(
            "validUsername", "email@example.com", "pass123!");

        // Act and Assert
        assertEquals(
            "Password must contain at least 1 uppercase letter",
            assertThrows(UserValidationException.class,
                () -> createUserService.createUser(user)).getErrors().get("password")
        );
        verify(userRepository, never()).createUser(any(UserDTO.class));
    }

    @Test
    public void testCreateUser_PasswordMissingLowercases() {
        // Arrange
        UserDTO user = new UserDTO(
            "validUsername", "email@example.com", "PASS123!");

        // Act and Assert
        assertEquals(
            "Password must contain at least 1 lowercase letter",
            assertThrows(UserValidationException.class,
                () -> createUserService.createUser(user)).getErrors().get("password")
        );
        verify(userRepository, never()).createUser(any(UserDTO.class));
    }

    @Test
    public void testCreateUser_PasswordMissingNumbers() {
        // Arrange
        UserDTO user = new UserDTO(
            "validUsername", "email@example.com", "Password!");

        // Act and Assert
        assertEquals(
            "Password must contain at least 1 number",
            assertThrows(UserValidationException.class,
                () -> createUserService.createUser(user)).getErrors().get("password")
        );
        verify(userRepository, never()).createUser(any(UserDTO.class));
    }

    @Test
    public void testCreateUser_PasswordMissingSpecialCharacters() {
        // Arrange
        UserDTO user = new UserDTO(
            "validUsername", "email@example.com", "Pass1234");

        // Act and Assert
        assertEquals(
            "Password must contain at least 1 special character",
            assertThrows(UserValidationException.class,
                () -> createUserService.createUser(user)).getErrors().get("password")
        );
        verify(userRepository, never()).createUser(any(UserDTO.class));
    }
}