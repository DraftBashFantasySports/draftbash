import { useDraftContext } from "contexts/DraftProvider";
import styles from "./LeftPanel.module.css";
import { FootballPlayer } from "types/players";
import { PlayerFilter } from "./components/player-filter/PlayerFilter";
import { AutoDraftButton } from "./components/autodraft-button/AutoDraftButton";
import { FootballPlayerTable } from "./components/football-player-table/FootballPlayerTable";
import { FaSearch } from "react-icons/fa";

export const LeftPanel = () => {
    const { filteredPlayers, setFilteredPlayers, draftSettings, setSearchName } = useDraftContext();
    const getPlayerTable = () => {
        if (draftSettings.sport === "football") {
            return <FootballPlayerTable players={filteredPlayers as FootballPlayer[]} />;
        }
    };
    const filterPlayersByName = (name: string) => {
        setFilteredPlayers(
            players.filter((player) =>
                (player.firstName + " " + player.lastName)
                    .toLowerCase()
                    .includes(name.toLowerCase()),
            ),
        );
    };
    return (
        <div className={styles.leftpanel}>
            <header>
                <FaSearch className={styles.searchicon} />
                <input
                    placeholder="Find player"
                    className={styles.search}
                    onChange={(e) => setSearchName(e.target.value)}
                />
                <PlayerFilter />
                <AutoDraftButton />
            </header>
            <div className={styles.content}>{getPlayerTable()}</div>
        </div>
    );
};
