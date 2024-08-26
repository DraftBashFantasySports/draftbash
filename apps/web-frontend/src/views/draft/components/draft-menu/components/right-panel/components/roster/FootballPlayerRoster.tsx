import styles from "./PlayerRoster.module.css";
import { useDraftContext } from "contexts/DraftProvider";
import { getFootballPlayerPosition } from "@utils/helpers";
import { useState } from "react";
import { FootballPlayer, Player } from "types/players";

export const FootballPlayerRoster = () => {
    const { draftUsers, draftUser, fantasyTeams, setIsPlayerModalOpen, setSelectedPlayerId } =
        useDraftContext();
    const [selectedTeam, setSelectedTeam] = useState(fantasyTeams[draftUser?.teamNumber || 1]);
    const [selectedTeamNumber, setSelectedTeamNumber] = useState(draftUser?.teamNumber || 1);
    const getTeamName = (teamNumber: number) => {
        const username = draftUsers.find((user) => user.teamNumber === teamNumber)?.username;
        if (username) {
            return username;
        } else {
            return `Team ${teamNumber}`;
        }
    };
    const viewPlayer = (player: Player | null) => {
        console.log(player);
        if (player) {
            setIsPlayerModalOpen(true);
            setSelectedPlayerId(player.id);
        }
    };
    return (
        <div className={styles.playerroster}>
            <select
                value={selectedTeamNumber}
                onChange={(e) => {
                    setSelectedTeam(fantasyTeams[Number(e.target.value)]);
                    setSelectedTeamNumber(Number(e.target.value));
                }}
            >
                {Object.keys(fantasyTeams).map((teamNumber) => (
                    <option key={teamNumber} value={teamNumber}>
                        {getTeamName(Number(teamNumber))}
                    </option>
                ))}
            </select>
            <ul>
                {selectedTeam.playerSpots.quarterback.map((player, index) => (
                    <li
                        key={index}
                        className={styles.quarterback}
                        onClick={() => viewPlayer(player)}
                    >
                        <label>QB</label>
                        {player ? (
                            <>
                                <img
                                    src={
                                        (player as FootballPlayer).isTeamDefense
                                            ? (player as FootballPlayer).team.logoUrl
                                            : player.headshotUrl
                                    }
                                    alt="NFL player headshot"
                                />
                                <div className={styles.playerinfo}>
                                    <p className={styles.playername}>
                                        {player.firstName} {player.lastName}
                                    </p>
                                    <p className={styles.position}>
                                        {getFootballPlayerPosition(
                                            (player as FootballPlayer).isQuarterback,
                                            (player as FootballPlayer).isRunningBack,
                                            (player as FootballPlayer).isWideReceiver,
                                            (player as FootballPlayer).isTightEnd,
                                            (player as FootballPlayer).isKicker,
                                            (player as FootballPlayer).isTeamDefense,
                                        )}{" "}
                                        - {(player as FootballPlayer).team.teamAbbreviation}
                                    </p>
                                </div>
                            </>
                        ) : (
                            <p className={styles.empty}>Empty</p>
                        )}
                    </li>
                ))}
                {selectedTeam.playerSpots.runningBack.map((player, index) => (
                    <li
                        key={index}
                        className={styles.runningback}
                        onClick={() => viewPlayer(player)}
                    >
                        <label>RB</label>
                        {player ? (
                            <>
                                <img
                                    src={
                                        (player as FootballPlayer).isTeamDefense
                                            ? (player as FootballPlayer).team.logoUrl
                                            : player.headshotUrl
                                    }
                                    alt="NFL player headshot"
                                />
                                <div className={styles.playerinfo}>
                                    <p className={styles.playername}>
                                        {player.firstName} {player.lastName}
                                    </p>
                                    <p className={styles.position}>
                                        {getFootballPlayerPosition(
                                            (player as FootballPlayer).isQuarterback,
                                            (player as FootballPlayer).isRunningBack,
                                            (player as FootballPlayer).isWideReceiver,
                                            (player as FootballPlayer).isTightEnd,
                                            (player as FootballPlayer).isKicker,
                                            (player as FootballPlayer).isTeamDefense,
                                        )}{" "}
                                        - {(player as FootballPlayer).team.teamAbbreviation}
                                    </p>
                                </div>
                            </>
                        ) : (
                            <p className={styles.empty}>Empty</p>
                        )}
                    </li>
                ))}
                {selectedTeam.playerSpots.wideReceiver.map((player, index) => (
                    <li
                        key={index}
                        className={styles.widereceiver}
                        onClick={() => viewPlayer(player)}
                    >
                        <label>WR</label>
                        {player ? (
                            <>
                                <img
                                    src={
                                        (player as FootballPlayer).isTeamDefense
                                            ? (player as FootballPlayer).team.logoUrl
                                            : player.headshotUrl
                                    }
                                    alt="NFL player headshot"
                                />
                                <div className={styles.playerinfo}>
                                    <p className={styles.playername}>
                                        {player.firstName} {player.lastName}
                                    </p>
                                    <p className={styles.position}>
                                        {getFootballPlayerPosition(
                                            (player as FootballPlayer).isQuarterback,
                                            (player as FootballPlayer).isRunningBack,
                                            (player as FootballPlayer).isWideReceiver,
                                            (player as FootballPlayer).isTightEnd,
                                            (player as FootballPlayer).isKicker,
                                            (player as FootballPlayer).isTeamDefense,
                                        )}{" "}
                                        - {(player as FootballPlayer).team.teamAbbreviation}
                                    </p>
                                </div>
                            </>
                        ) : (
                            <p className={styles.empty}>Empty</p>
                        )}
                    </li>
                ))}
                {selectedTeam.playerSpots.tightEnd.map((player, index) => (
                    <li key={index} className={styles.tightend} onClick={() => viewPlayer(player)}>
                        <label>TE</label>
                        {player ? (
                            <>
                                <img
                                    src={
                                        (player as FootballPlayer).isTeamDefense
                                            ? (player as FootballPlayer).team.logoUrl
                                            : player.headshotUrl
                                    }
                                    alt="NFL player headshot"
                                />
                                <div className={styles.playerinfo}>
                                    <p className={styles.playername}>
                                        {player.firstName} {player.lastName}
                                    </p>
                                    <p className={styles.position}>
                                        {getFootballPlayerPosition(
                                            (player as FootballPlayer).isQuarterback,
                                            (player as FootballPlayer).isRunningBack,
                                            (player as FootballPlayer).isWideReceiver,
                                            (player as FootballPlayer).isTightEnd,
                                            (player as FootballPlayer).isKicker,
                                            (player as FootballPlayer).isTeamDefense,
                                        )}{" "}
                                        - {(player as FootballPlayer).team.teamAbbreviation}
                                    </p>
                                </div>
                            </>
                        ) : (
                            <p className={styles.empty}>Empty</p>
                        )}
                    </li>
                ))}
                {selectedTeam.playerSpots.flex.map((player, index) => (
                    <li key={index} className={styles.flex} onClick={() => viewPlayer(player)}>
                        <label>
                            <p>W</p>
                            <p>R</p>
                            <p>T</p>
                        </label>
                        {player ? (
                            <>
                                <img
                                    src={
                                        (player as FootballPlayer).isTeamDefense
                                            ? (player as FootballPlayer).team.logoUrl
                                            : player.headshotUrl
                                    }
                                    alt="NFL player headshot"
                                />
                                <div className={styles.playerinfo}>
                                    <p className={styles.playername}>
                                        {player.firstName} {player.lastName}
                                    </p>
                                    <p className={styles.position}>
                                        {getFootballPlayerPosition(
                                            (player as FootballPlayer).isQuarterback,
                                            (player as FootballPlayer).isRunningBack,
                                            (player as FootballPlayer).isWideReceiver,
                                            (player as FootballPlayer).isTightEnd,
                                            (player as FootballPlayer).isKicker,
                                            (player as FootballPlayer).isTeamDefense,
                                        )}{" "}
                                        - {(player as FootballPlayer).team.teamAbbreviation}
                                    </p>
                                </div>
                            </>
                        ) : (
                            <p className={styles.empty}>Empty</p>
                        )}
                    </li>
                ))}
                {selectedTeam.playerSpots.kicker.map((player, index) => (
                    <li key={index} className={styles.kicker} onClick={() => viewPlayer(player)}>
                        <label>K</label>
                        {player ? (
                            <>
                                <img
                                    src={
                                        (player as FootballPlayer).isTeamDefense
                                            ? (player as FootballPlayer).team.logoUrl
                                            : player.headshotUrl
                                    }
                                    alt="NFL player headshot"
                                />
                                <div className={styles.playerinfo}>
                                    <p className={styles.playername}>
                                        {player.firstName} {player.lastName}
                                    </p>
                                    <p className={styles.position}>
                                        {getFootballPlayerPosition(
                                            (player as FootballPlayer).isQuarterback,
                                            (player as FootballPlayer).isRunningBack,
                                            (player as FootballPlayer).isWideReceiver,
                                            (player as FootballPlayer).isTightEnd,
                                            (player as FootballPlayer).isKicker,
                                            (player as FootballPlayer).isTeamDefense,
                                        )}{" "}
                                        - {(player as FootballPlayer).team.teamAbbreviation}
                                    </p>
                                </div>
                            </>
                        ) : (
                            <p className={styles.empty}>Empty</p>
                        )}
                    </li>
                ))}
                {selectedTeam.playerSpots.teamDefense.map((player, index) => (
                    <li
                        key={index}
                        className={styles.teamdefense}
                        onClick={() => viewPlayer(player)}
                    >
                        <label>DEF</label>
                        {player ? (
                            <>
                                <img
                                    src={
                                        (player as FootballPlayer).isTeamDefense
                                            ? (player as FootballPlayer).team.logoUrl
                                            : player.headshotUrl
                                    }
                                    alt="NFL player headshot"
                                />
                                <div className={styles.playerinfo}>
                                    <p className={styles.playername}>
                                        {player.firstName} {player.lastName}
                                    </p>
                                    <p className={styles.position}>
                                        {getFootballPlayerPosition(
                                            (player as FootballPlayer).isQuarterback,
                                            (player as FootballPlayer).isRunningBack,
                                            (player as FootballPlayer).isWideReceiver,
                                            (player as FootballPlayer).isTightEnd,
                                            (player as FootballPlayer).isKicker,
                                            (player as FootballPlayer).isTeamDefense,
                                        )}{" "}
                                        - {(player as FootballPlayer).team.teamAbbreviation}
                                    </p>
                                </div>
                            </>
                        ) : (
                            <p className={styles.empty}>Empty</p>
                        )}
                    </li>
                ))}
                {selectedTeam.playerSpots.bench.map((player, index) => (
                    <li key={index} className={styles.bench} onClick={() => viewPlayer(player)}>
                        <label>BE</label>
                        {player ? (
                            <>
                                <img
                                    src={
                                        (player as FootballPlayer).isTeamDefense
                                            ? (player as FootballPlayer).team.logoUrl
                                            : player.headshotUrl
                                    }
                                    alt="NFL player headshot"
                                />
                                <div className={styles.playerinfo}>
                                    <p className={styles.playername}>
                                        {player.firstName} {player.lastName}
                                    </p>
                                    <p className={styles.position}>
                                        {getFootballPlayerPosition(
                                            (player as FootballPlayer).isQuarterback,
                                            (player as FootballPlayer).isRunningBack,
                                            (player as FootballPlayer).isWideReceiver,
                                            (player as FootballPlayer).isTightEnd,
                                            (player as FootballPlayer).isKicker,
                                            (player as FootballPlayer).isTeamDefense,
                                        )}{" "}
                                        - {(player as FootballPlayer).team.teamAbbreviation}
                                    </p>
                                </div>
                            </>
                        ) : (
                            <p className={styles.empty}>Empty</p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};
