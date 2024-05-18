package com.draftbash.features.users.services;

import com.draftbash.features.users.dtos.UserDTO;
import com.draftbash.features.users.interfaces.IAuthenticationTokenService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.util.Date;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

/**
 * This class is responsible for generating and verifying JWT authentication tokens.

 */
@Service
public class AuthenticationTokenService implements IAuthenticationTokenService {

    private static final long EXPIRATION_TIME = 86400000; // 24 hours in milliseconds

    @Value("${spring.jwt.secret-key}")
    private String secretKey;

    public AuthenticationTokenService() {
        System.out.println("Secret Key: " + secretKey);
    }

    @Override
    public String generateToken(UserDTO appUser) {
        return Jwts.builder()
        .setSubject(appUser.toString())
        .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
        .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()))
        .compact();
    }

    /**
     * Verifies the jwt authentication token.

     * @param authenticationToken the jwt authentication token to verify
     * @return true if the token is valid, false otherwise
     */
    @Override
    public boolean verify(String authenticationToken) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(secretKey.getBytes()))
                .build()
                .parseClaimsJws(authenticationToken);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
