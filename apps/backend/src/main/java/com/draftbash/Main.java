package com.draftbash;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Main class to start the Spring Boot application
 */
@SpringBootApplication
@EnableScheduling
@RestController
public class Main {

    /**
     * Main method to start the Spring Boot application.

     * @param args The command line arguments.
     */
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    @GetMapping("/")
    public String home() {
        return "Draftbash API";
    }

    /**
     * Handles CORS configuration for the application.
     */
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                    .allowedOrigins("http://localhost:5173", "https://draftbashfantasy.com", "https://red-mushroom-0ba148410.5.azurestaticapps.net")
                    .allowedMethods("GET", "POST", "PUT", "DELETE");
            }
        };
    }
}
