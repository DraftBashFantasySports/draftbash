package com.draftbash;

import java.util.List;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Main class to start the Spring Boot application.
 */
@SpringBootApplication
@RestController
public class Main {

    /**
     * Main method to start the Spring Boot application.
     *
     * @param args The command line arguments.
     */
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    @GetMapping("/")
    public String root() {
        return "DraftBash API.";
    }

    /**
     * Retrieves a greeting message.

     * @return The greeting message.
     */
    @GetMapping("/greet")
    public GreetResponse greet() {
        return new GreetResponse(
            "Hello, Draftbash Users!",
            List.of("Java", "Kotlin", "Spring Boot"),
            new Person("Draftbash", 20, 3000.47)
        );
    }

    record Person(String name, int age, double money) {}

    record GreetResponse(
        String message,
        List<String> favProgrammingLanguages,
        Person person
    ) {}
}
