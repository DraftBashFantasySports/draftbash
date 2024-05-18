# Stage 1: Build the Spring Boot application
FROM gradle:latest AS BUILD
WORKDIR /app
COPY . .
RUN gradle build --no-daemon

# Stage 2: Package the Spring Boot application
FROM openjdk:21-jdk-slim
WORKDIR /app
COPY --from=BUILD /app/build/libs/draftbash-0.0.1-SNAPSHOT.jar /app
EXPOSE 8080
CMD ["java", "-jar", "draftbash-0.0.1-SNAPSHOT.jar"]