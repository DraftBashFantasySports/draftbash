package com.draftbash.features.users.services;

import com.draftbash.features.users.dtos.UserDTO;
import com.draftbash.features.users.interfaces.IAuthenticationTokenService;
import io.jsonwebtoken.Claims;
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
                .setSubject(appUser.username()) // Use username as the subject
                .claim("id", appUser.id()) // Add id as a custom claim
                .claim("username", appUser.username()) // Add username as a custom claim
                .claim("email", appUser.email()) // Add email as a custom claim
                .claim("password", appUser.password()) // Add password as a custom claim
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()))
                .compact();
    }

    /**
     * Verifies the JWT authentication token and returns the claims as a HashMap if valid.
     *
     * @param authenticationToken the JWT authentication token to verify
     * @return a HashMap with user details if the token is valid, null otherwise
     */
    @Override
    public UserDTO verify(String authenticationToken) {
        try {
            Claims claims = Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(secretKey.getBytes()))
                .build()
                .parseClaimsJws(authenticationToken)
                .getBody();
            
            return new UserDTO(
                (Integer) claims.get("id"),
                (String) claims.get("username"),
                (String) claims.get("email"),
                (String) claims.get("password")
            );
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid JWT token");
        }
    }
}