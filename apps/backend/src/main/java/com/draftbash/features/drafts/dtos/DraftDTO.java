package com.draftbash.features.drafts.dtos;

import com.draftbash.features.drafts.dtos.football.FootballDraftDTO;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

/**
 * This interface is used to mark a record as a DraftDTO. This is used for polymorphism.
 */
@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME,
    include = JsonTypeInfo.As.PROPERTY,
    property = "type"
)
@JsonSubTypes({
    @JsonSubTypes.Type(value = FootballDraftDTO.class, name = "football")
})
public interface DraftDTO {
    int id();

    String type();

    String createdAt();
    
    DraftSettingsDTO settings();
}
