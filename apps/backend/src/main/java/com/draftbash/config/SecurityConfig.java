package com.draftbash.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

/**
 * This class configures the security settings for the application.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    /**
     * Configures the security settings for the application.
     *
     * @param http The HttpSecurity object to configure the security settings
     * @return The SecurityFilterChain object
     * @throws Exception If an error occurs while configuring the security settings
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authorizeRequests ->
                authorizeRequests
                    .anyRequest().permitAll() // Allow access to all endpoints
            )
            .csrf(csrf -> csrf.disable()); // Disable CSRF protection

        return http.build();
    }
}