package com.draftbash.features.users.interfaces;

import com.draftbash.features.users.dtos.UserDTO;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Repository;

/**
 * Interface for the AppUsers repository.
 */
@Repository
public interface IUserRepository {

    public void createUser(UserDTO user);

    @Nullable
    public UserDTO getUserByUsername(String username);

    @Nullable
    public UserDTO getUserByEmail(String email);
}
