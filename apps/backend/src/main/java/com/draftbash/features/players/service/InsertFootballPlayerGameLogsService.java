package com.draftbash.features.players.service;

import com.draftbash.features.players.dtos.PlayerNewsDTO;
import com.draftbash.features.players.dtos.football.FootballPlayerDTO;
import com.draftbash.features.players.interfaces.IFootballPlayerRepository;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.nodes.Node;
import org.jsoup.nodes.TextNode;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

/**
 * Service for inserting football player game logs.
 */
@Service
public class InsertFootballPlayerGameLogsService {

    private final IFootballPlayerRepository playerRepository;

    public InsertFootballPlayerGameLogsService(IFootballPlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    /**
     * Inserts game logs for football players.
     */
    public void insertGameLogs() {
        List<FootballPlayerDTO> players = playerRepository.getPlayers();
        for (FootballPlayerDTO player : players) {
            try {
                final String URL = "https://www.rotowire.com/football/player/"
                        + player.firstName().toLowerCase() + "-" + player.lastName().toLowerCase()
                        + "-" + player.rotowireId();

                Document doc = Jsoup.connect(URL).get();
                Element news = doc.selectFirst("#latest-news");
                final String DATE = LocalDate.parse(
                        news.select(".news-update__timestamp").text(),
                        DateTimeFormatter.ofPattern("MMMM d, yyyy")
                    ).toString();

                String analysis = "";
                String fantasyOutlook = "";
                if (doc.selectFirst(".p-card__outlook-text") != null) {
                    StringBuilder extractedFantasyOutlookText = new StringBuilder();
                    StringBuilder extractedAnalysisText = new StringBuilder();
                    for (Node node : doc.selectFirst(".p-card__outlook-text").childNodes()) {
                        if (node instanceof TextNode) {
                            extractedFantasyOutlookText.append(((TextNode) node).text());
                        }
                    }
                    for (Node node : news.selectFirst(".news-update__analysis").childNodes()) {
                        if (node instanceof TextNode) {
                            extractedAnalysisText.append(((TextNode) node).text());
                        }
                    }
                    fantasyOutlook = extractedFantasyOutlookText.toString().trim();
                    analysis = extractedAnalysisText.toString().trim();
                }
                playerRepository.insertPlayerNews(new PlayerNewsDTO(
                        player.id(),
                        news.select(".news-update__headline").text(),
                        news.select(".news-update__news").text(),
                        analysis,
                        fantasyOutlook,
                        URL,
                        DATE));
            } catch (Exception e) {
                e.printStackTrace();
            }
            break;
        }
    }
}