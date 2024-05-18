package com.draftbash.features.users.interfaces;

import org.springframework.stereotype.Service;

/**
 * Interface for the Password service.
 */
@Service
public interface IPasswordService {
    public String encode(String password);

    public boolean verify(String password, String hashedPassword);
}
