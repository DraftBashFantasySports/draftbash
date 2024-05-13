plugins {
    java
    id("checkstyle")
    id("org.springframework.boot") version "3.2.5"
    id("io.spring.dependency-management") version "1.1.4"
}

dependencies {
    implementation("com.puppycrawl.tools:checkstyle:10.3.1")
}

checkstyle {
    configFile = file("src/main/resources/checkstyle.xml")
    isIgnoreFailures = false
    toolVersion = "10.3.1"
}

group = "com.draftbash"
version = "0.0.1-SNAPSHOT"

java {
    sourceCompatibility = JavaVersion.VERSION_21
    targetCompatibility = JavaVersion.VERSION_21
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
}

tasks.withType<Test> {
    useJUnitPlatform()
}