package com.draftbash.features.users.services;

import com.draftbash.features.users.dtos.UserDTO;
import com.draftbash.features.users.interfaces.IUserRepository;
import java.util.List;
import org.springframework.stereotype.Service;

/**
 * Service for retrieving users.
 */
@Service
public class GetUsersService {

    private final IUserRepository userRepository;

    public GetUsersService(IUserRepository appUsersRepository) {
        this.userRepository = appUsersRepository;
    }

    public List<UserDTO> getUsersByUsername(String username, int excludeUserId) {
        return userRepository.getUsersByUsername(username, excludeUserId);
    }
}
