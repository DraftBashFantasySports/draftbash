package com.draftbash.features.users.interfaces;

import com.draftbash.features.users.dtos.UserDTO;
import org.springframework.stereotype.Service;

/**
 * This interface represents the contract for an authentication token service.
 */
@Service
public interface IAuthenticationTokenService {

    public String generateToken(UserDTO appUser);

    public UserDTO verify(String authenticationToken);
}
