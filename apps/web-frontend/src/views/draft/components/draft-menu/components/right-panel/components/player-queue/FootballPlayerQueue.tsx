import React, { useEffect, useState } from "react";
import { useDraftContext } from "contexts/DraftProvider";
import styles from "./PlayerQueue.module.css";
import { getFootballPlayerPosition } from "@utils/helpers";
import { FootballPlayer } from "types/players";

export const FootballPlayerQueue = () => {
    const { draftUser, enqueuePlayer, dequeuePlayer } = useDraftContext();
    const [playerQueue, setPlayerQueue] = useState(draftUser?.playerQueue || []);
    const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
    const [startIndex, setStartIndex] = useState<number | null>(null);

    useEffect(() => {
        setPlayerQueue(draftUser?.playerQueue || []);
    }, [draftUser?.playerQueue]);

    const onDragStart = (index: number) => {
        setDraggingIndex(index);
        setStartIndex(index);
    };

    const onDragOver = (index: number) => {
        if (!(draggingIndex === null || draggingIndex === index)) {
            const updatedQueue = [...playerQueue];
            const draggedItem = updatedQueue.splice(draggingIndex, 1)[0];
            updatedQueue.splice(index, 0, draggedItem);
            setDraggingIndex(index);
            setPlayerQueue(updatedQueue);
        }
    };

    const onDragEnd = () => {
        const endIndex = draggingIndex;
        setDraggingIndex(null);
        if (startIndex !== null && endIndex !== null && draftUser) {
            enqueuePlayer(
                draftUser?.userId ?? 0,
                draftUser?.draftId ?? 0,
                draftUser?.playerQueue[startIndex].player.id,
                endIndex + 1,
            );
            enqueuePlayer(
                draftUser?.userId ?? 0,
                draftUser?.draftId ?? 0,
                draftUser?.playerQueue[endIndex].player.id,
                startIndex + 1,
            );
        }
    };

    const getPositionStyles = (
        isQuarterback: boolean,
        isRunningBack: boolean,
        isWideReceiver: boolean,
        isTightEnd: boolean,
        isKicker: boolean,
        isTeamDefense: boolean,
    ) => {
        if (isQuarterback) {
            return styles.quarterback;
        }
        if (isRunningBack) {
            return styles.runningback;
        }
        if (isWideReceiver) {
            return styles.widereceiver;
        }
        if (isTightEnd) {
            return styles.tightend;
        }
        if (isKicker) {
            return styles.kicker;
        }
        if (isTeamDefense) {
            return styles.defense;
        }
    };

    return (
        <div className={styles.playerqueue}>
            <h4>Player</h4>
            <ul>
                {playerQueue.map((queuedPlayer, index) => (
                    <li
                        key={index}
                        draggable
                        onDragStart={() => onDragStart(index)}
                        onDragOver={() => onDragOver(index)}
                        onDragEnd={onDragEnd}
                        className={draggingIndex === index ? styles.dragging : ""}
                    >
                        <p className={styles.playername}>
                            {queuedPlayer.player.firstName} {queuedPlayer.player.lastName}
                        </p>
                        <div className={styles.playerinfo}>
                            <p
                                className={`${styles.position} ${getPositionStyles(
                                    (queuedPlayer.player as FootballPlayer).isQuarterback,
                                    (queuedPlayer.player as FootballPlayer).isRunningBack,
                                    (queuedPlayer.player as FootballPlayer).isWideReceiver,
                                    (queuedPlayer.player as FootballPlayer).isTightEnd,
                                    (queuedPlayer.player as FootballPlayer).isKicker,
                                    (queuedPlayer.player as FootballPlayer).isTeamDefense,
                                )}`}
                            >
                                {getFootballPlayerPosition(
                                    (queuedPlayer.player as FootballPlayer).isQuarterback,
                                    (queuedPlayer.player as FootballPlayer).isRunningBack,
                                    (queuedPlayer.player as FootballPlayer).isWideReceiver,
                                    (queuedPlayer.player as FootballPlayer).isTightEnd,
                                    (queuedPlayer.player as FootballPlayer).isKicker,
                                    (queuedPlayer.player as FootballPlayer).isTeamDefense,
                                )}
                            </p>
                            <p className={styles.playerteam}>
                                {(queuedPlayer.player as FootballPlayer).team.teamAbbreviation}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() =>
                                dequeuePlayer(
                                    draftUser?.userId ?? 0,
                                    draftUser?.draftId ?? 0,
                                    queuedPlayer.player.id
                                )
                            }
                        >
                            REMOVE
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
