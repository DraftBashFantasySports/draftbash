package com.draftbash.features.users.interfaces;

import com.draftbash.features.users.dtos.UserCreationDTO;
import com.draftbash.features.users.dtos.UserCredentialsDTO;
import com.draftbash.features.users.dtos.UserDTO;
import java.util.List;
import java.util.Optional;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Repository;

/**
 * Interface for the AppUsers repository.
 */
@Repository
public interface IUserRepository {

    public int createUser(UserCreationDTO user);

    public List<UserDTO> getUsersByUsername(String username, int excludeUserId);

    @Nullable
    public Optional<UserCredentialsDTO> getUserByUsername(String username);

    @Nullable
    public Optional<UserCredentialsDTO> getUserByEmail(String email);
}
