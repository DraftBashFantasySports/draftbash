package com.draftbash.features.cron;

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
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * Fetches the latest news for football players.
 */
@Component
public class FetchFootballPlayerNews {

    private final IFootballPlayerRepository playerRepository;

    public FetchFootballPlayerNews(IFootballPlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    /**
     * Inserts game logs for football players.
     */
    @Scheduled(cron = "0 */5 * * * *")
    public void insertGameLogs() {
        System.out.println("Fetching player news...");
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
                String injuryStatus = "healthy";
                if (doc.selectFirst(".p-card__injury .is-red") != null) {
                    String injury = doc.selectFirst(".p-card__injury .is-red").text().toLowerCase();
                    if (injury.equals("out")) {
                        injuryStatus = "out";
                    } else if (injury.equals("questionable")) {
                        injuryStatus = "questionable";
                    } else if (injury.equals("doubtful")) {
                        injuryStatus = "doubtful";
                    } else if (injury.equals("suspended")) {
                        injuryStatus = "suspended";
                    } else if (injury.equals("pup-p")) {
                        injuryStatus = "injured_reserve";
                    } else if (injury.equals("ir")) {
                        injuryStatus = "injured_reserve";
                    } else if (injury.equals("probable")) {
                        injuryStatus = "probable";
                    }
                }
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
                playerRepository.updatePlayerInjury(player.id(), injuryStatus);
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
