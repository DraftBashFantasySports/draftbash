package com.draftbash.features.players.dtos;

import com.draftbash.features.players.dtos.football.FootballPlayerDTO;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

/**
 * This interface defines the PlayerDTO.
 */
@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME,
    include = JsonTypeInfo.As.PROPERTY,
    property = "type"
)
@JsonSubTypes({
    @JsonSubTypes.Type(value = FootballPlayerDTO.class, name = "footballPlayer")
})
public interface PlayerDTO {
    int id();

    int rotowireId();

    String type();

    String firstName();

    String lastName();

    int age();

    int height();

    int weight();

    int yearsExperience();

    String injuryStatus();
}
