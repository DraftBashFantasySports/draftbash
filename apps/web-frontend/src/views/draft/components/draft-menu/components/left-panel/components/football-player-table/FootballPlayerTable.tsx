import styles from "./FootballPlayerTable.module.css";
import { useDraftContext } from "contexts/DraftProvider";
import { FootballPlayer } from "types/players";
import { formatInjuryStatus, getFootballPlayerPosition } from "@utils/helpers";
import { FootballDraftSettings } from "types/drafts";

type Props = {
    players: FootballPlayer[];
};

export const FootballPlayerTable = (props: Props) => {
    const {
        draftSettings,
        pickPlayer,
        currentPick,
        draftUser,
        enqueuePlayer,
        draftId,
        setIsPlayerModalOpen,
        setSelectedPlayerId,
    } = useDraftContext();

    const getCurrentQueueRank = (): number => {
        if (draftUser?.playerQueue) {
            if (draftUser.playerQueue.length === 0) {
                return 1;
            } else {
                return draftUser.playerQueue.length + 1;
            }
        } else {
            return 1;
        }
    };
    const getRanking = (player: FootballPlayer) => {
        if (
            draftSettings &&
            (draftSettings as FootballDraftSettings).scoringFormat === "standard"
        ) {
            return player.standardAdp;
        }
        if (
            draftSettings &&
            (draftSettings as FootballDraftSettings).scoringFormat === "half_ppr"
        ) {
            return player.halfPprAdp;
        }
        if (draftSettings && (draftSettings as FootballDraftSettings).scoringFormat === "ppr") {
            return player.pprAdp;
        }
    };
    const getFantasyPoints = (player: FootballPlayer) => {
        if (player.isTeamDefense) {
            return player.teamDefenseProjection.fantasyPoints;
        } else if (player.isKicker) {
            return player.kickerProjection.fantasyPoints;
        } else if ((draftSettings as FootballDraftSettings).scoringFormat === "standard") {
            return player.skillPlayerProjection.standardFantasyPoints;
        } else if ((draftSettings as FootballDraftSettings).scoringFormat === "half_ppr") {
            return player.skillPlayerProjection.halfPprFantasyPoints;
        } else if ((draftSettings as FootballDraftSettings).scoringFormat === "ppr") {
            return player.skillPlayerProjection.pprFantasyPoints;
        } else {
            return 0;
        }
    };
    const getInjuryStatusStyle = (status: string | undefined) => {
        if (status === "healthy" || status == null) {
            return styles.healthy;
        } else if (status === "questionable") {
            return styles.questionable;
        } else {
            return styles.out;
        }
    };
    const getPositionStyles = (player: FootballPlayer) => {
        if (player.isQuarterback) {
            return styles.quarterback;
        }
        if (player.isRunningBack) {
            return styles.runningback;
        }
        if (player.isWideReceiver) {
            return styles.widereceiver;
        }
        if (player.isTightEnd) {
            return styles.tightend;
        }
        if (player.isKicker) {
            return styles.kicker;
        }
        if (player.isTeamDefense) {
            return styles.defense;
        }
    };
    return (
        <table className={styles.footballplayertable}>
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th style={{ borderRight: "1px solid var(--black)" }}></th>
                    <th colSpan={2} style={{ borderRight: "1px solid var(--black)" }}>
                        FPTS
                    </th>
                    <th colSpan={3} style={{ borderRight: "1px solid var(--black)" }}>
                        RUSHING
                    </th>
                    <th colSpan={3} style={{ borderRight: "1px solid var(--black)" }}>
                        RECEIVING
                    </th>
                    <th colSpan={3}>PASSING</th>
                </tr>
                <tr>
                    <th>RK</th>
                    <th>Player</th>
                    <th style={{ borderRight: "1px solid var(--black)" }}>BYE</th>
                    <th>PTS</th>
                    <th style={{ borderRight: "1px solid var(--black)" }}>AVG</th>
                    <th>ATT</th>
                    <th>YDS</th>
                    <th style={{ borderRight: "1px solid var(--black)" }}>TD</th>
                    <th>TAR</th>
                    <th>YDS</th>
                    <th style={{ borderRight: "1px solid var(--black)" }}>TD</th>
                    <th>ATT</th>
                    <th>YDS</th>
                    <th>TD</th>
                </tr>
            </thead>
            <tbody>
                {props.players.map((player, index) => (
                    <tr
                        key={index}
                        onClick={() => {
                            setIsPlayerModalOpen(true);
                            setSelectedPlayerId(player.id);
                        }}
                    >
                        <td>
                            {draftUser?.teamNumber === currentPick?.teamNumber &&
                            draftSettings.isDraftStarted ? (
                                <button
                                    type="button"
                                    className={styles.addbtn}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        pickPlayer({
                                            player: player,
                                            teamNumber: currentPick?.teamNumber ?? 0,
                                            pickNumber: currentPick?.pickNumber ?? 0,
                                        });
                                    }}
                                >
                                    ADD
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className={styles.queuebtn}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        enqueuePlayer(
                                            draftUser?.userId ?? 0,
                                            draftId,
                                            player.id,
                                            getCurrentQueueRank(),
                                        );
                                    }}
                                >
                                    QUEUE
                                </button>
                            )}
                            <p className={styles.ranking}>{getRanking(player as FootballPlayer)}</p>
                        </td>
                        <td>
                            <p className={styles.playername}>
                                {player.firstName} {player.lastName}{" "}
                                {player.yearsExperience === 0 && <b className={styles.rookie}>R</b>}
                            </p>
                            <p
                                className={`${styles.position} ${getPositionStyles(player as FootballPlayer)}`}
                            >
                                {getFootballPlayerPosition(
                                    (player as FootballPlayer).isQuarterback,
                                    (player as FootballPlayer).isRunningBack,
                                    (player as FootballPlayer).isWideReceiver,
                                    (player as FootballPlayer).isTightEnd,
                                    (player as FootballPlayer).isKicker,
                                    (player as FootballPlayer).isTeamDefense,
                                )}
                            </p>
                            <p className={styles.team}>
                                {(player as FootballPlayer).team.teamAbbreviation}
                            </p>
                            {player.injuryStatus && player.injuryStatus != "healthy" && (
                                <p
                                    className={`${styles.injurystatus} ${getInjuryStatusStyle(player.injuryStatus)}`}
                                >
                                    {formatInjuryStatus((player as FootballPlayer).injuryStatus)}
                                </p>
                            )}
                        </td>
                        <td>{(player as FootballPlayer).team.byeWeek}</td>
                        <td>{getFantasyPoints(player as FootballPlayer)}</td>
                        <td>{(getFantasyPoints(player as FootballPlayer) / 17).toFixed(1)}</td>
                        <td>{(player as FootballPlayer).skillPlayerProjection.rushAttempts}</td>
                        <td>{(player as FootballPlayer).skillPlayerProjection.rushYards}</td>
                        <td>{(player as FootballPlayer).skillPlayerProjection.rushTouchdowns}</td>
                        <td>{(player as FootballPlayer).skillPlayerProjection.targets}</td>
                        <td>{(player as FootballPlayer).skillPlayerProjection.receivingYards}</td>
                        <td>
                            {(player as FootballPlayer).skillPlayerProjection.receivingTouchdowns}
                        </td>
                        <td>{(player as FootballPlayer).skillPlayerProjection.passAttempts}</td>
                        <td>{(player as FootballPlayer).skillPlayerProjection.passYards}</td>
                        <td>{(player as FootballPlayer).skillPlayerProjection.passTouchdowns}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
