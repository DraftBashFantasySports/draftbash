package com.draftbash.features.gamelogs.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

/**
 * Service for inserting football player game logs.
 */
public class InsertFootballPlayerGameLogsService {

    private record GamesPlayedDTO(Body body) {
        private static record Body(Schedule[] schedule) {
            private static record Schedule(
                String gameID
            ) {}
        }
    }

    /**
     * Inserts game logs for football players.
     */
    public void insertGameLogs() {
        try {
            String[] nflTeamAbbreviations = {
                "ARI", "ATL", "BAL", "BUF", "CAR", "CHI", "CIN",
                "CLE", "DAL", "DEN", "DET", "GB", "HOU", "IND", "JAX",
                "KC", "LAC", "LAR", "LV", "MIA", "MIN", "NE", "NO",
                "NYG", "NYJ", "PHI", "PIT", "SEA", "SF", "TB", "TEN", "WAS"
            };

            for (String teamAbbreviation : nflTeamAbbreviations) {
                HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(
                        "https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLTeamSchedule?teamAbv=" 
                        + teamAbbreviation + "&season=2023"))
                    .header("X-RapidAPI-Host", 
                        "tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com")
                    .header("X-RapidAPI-Key", "e45bd97bdfmshb48c2586ca7c41dp18cbf0jsna262466a0556")
                    .method("GET", HttpRequest.BodyPublishers.noBody())
                    .build();
                try {
                    HttpResponse<String> response = HttpClient
                        .newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
                    ObjectMapper objectMapper = new ObjectMapper();

                    GamesPlayedDTO myResponse = objectMapper.readValue(
                        response.body(), GamesPlayedDTO.class);

                    System.out.println("Value: " + myResponse.body());
                } catch (IOException e) {
                    e.printStackTrace();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                break;
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}