# Stage 1: Build the Spring Boot application
FROM gradle:latest AS BUILD
WORKDIR /usr/app/
COPY . .
RUN gradle build --no-daemon

# Stage 2: Package the Spring Boot application
FROM openjdk:21-jdk-slim
ENV JAR_NAME=usersapi-0.0.1-SNAPSHOT.jar
WORKDIR /usr/app/
COPY --from=BUILD /usr/app/build/libs/$JAR_NAME /usr/app/
EXPOSE 3000
CMD ["java", "-jar", "usersapi-0.0.1-SNAPSHOT.jar"]