import styles from "./PickCard.module.css";
import { useDraftContext } from "contexts/DraftProvider";
import { FaArrowDownLong, FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { FootballPlayer } from "types/players";
import { getFootballPlayerPosition } from "@utils/helpers";

type Props = {
    pickNumber: number;
};

export const PickCard = ({ pickNumber }: Props) => {
    const { draftSettings, draftPicks, setIsPlayerModalOpen, setSelectedPlayerId } = useDraftContext();
    const getPickNumberOfRound = (pick: number) => {
        const teamCount = draftSettings.teamCount;
        const round = Math.ceil(pick / teamCount);
        const pickNumber = pick % teamCount === 0 ? teamCount : pick % teamCount;
        if (draftSettings.pickOrderFormat === "snake") {
            return round % 2 === 0 ? teamCount - pickNumber + 1 : pickNumber;
        } else {
            return pickNumber;
        }
    };
    const getPick = () => {
        const teamCount = draftSettings.teamCount;
        const round = Math.ceil(pickNumber / teamCount);
        let pickIndex = pickNumber;
        if (draftSettings.pickOrderFormat === "snake") {
            pickIndex = pickNumber % teamCount === 0 ? teamCount : pickNumber % teamCount;
            pickIndex = round % 2 === 0 ? teamCount - pickIndex + 1 : pickIndex;
            pickIndex = (teamCount * Math.floor((pickNumber - 1) / teamCount)) + pickIndex;
        }
        return draftPicks[pickIndex - 1];
    }
    const draftPick = getPick();
    const viewPlayer = () => {
        if (draftPick.player) {
            setIsPlayerModalOpen(true);
            setSelectedPlayerId(draftPick.player.id);
        }
    };
    const getPosition = () => {
        if (draftPick.player) {
            const footballPlayer = draftPick.player as FootballPlayer;
            if (footballPlayer.isQuarterback) {
                return styles.quarterback;
            } else if (footballPlayer.isRunningBack) {
                return styles.runningback;
            } else if (footballPlayer.isWideReceiver) {
                return styles.widereceiver;
            } else if (footballPlayer.isTightEnd) {
                return styles.tightend;
            } else if (footballPlayer.isKicker) {
                return styles.kicker;
            } else if (footballPlayer.isTeamDefense) {
                return styles.defense;
            } else {
                return "";
            }
        }
    };
    const getDirectionArrow = () => {
        const teamCount = draftSettings.teamCount;
        const pickNumberOfRound = getPickNumberOfRound(pickNumber);
        const round = Math.ceil(draftPick.pickNumber / teamCount);
        if (draftSettings.pickOrderFormat === "linear") {
            return <FaArrowRightLong className={styles.arrow} />;
        } else if ((round - 1) * teamCount + pickNumberOfRound == draftPicks.length) {
            return "";
        } else if (pickNumberOfRound % teamCount === 0) {
            return <FaArrowDownLong className={styles.arrow} />;
        } else if (Math.ceil(draftPick.pickNumber / teamCount) % 2 === 0) {
            return <FaArrowLeftLong className={styles.arrow} />;
        } else {
            return <FaArrowRightLong className={styles.arrow} />;
        }
    };
    return (
        <div
            key={draftPick.pickNumber}
            className={`${styles.card} ${getPosition()} ${draftPick.player ? styles.drafted : ""}`}
            onClick={viewPlayer}
        >
            {draftPick.player && (
                <>
                    <div className={styles.playerinfo}>
                        <p className={styles.playername}>
                            {draftPick.player.firstName[0]}. {draftPick.player.lastName}
                        </p>
                        <p>
                            {getFootballPlayerPosition(
                                (draftPick.player as FootballPlayer).isQuarterback,
                                (draftPick.player as FootballPlayer).isRunningBack,
                                (draftPick.player as FootballPlayer).isWideReceiver,
                                (draftPick.player as FootballPlayer).isTightEnd,
                                (draftPick.player as FootballPlayer).isKicker,
                                (draftPick.player as FootballPlayer).isTeamDefense
                            )} -{" "}
                            {(draftPick.player as FootballPlayer).team.teamAbbreviation}
                        </p>
                    </div>
                    <img
                        src={
                            (draftPick.player as FootballPlayer).isTeamDefense
                                ? (draftPick.player as FootballPlayer).team.logoUrl
                                : draftPick.player.headshotUrl
                        }
                        alt="NFL player headshot"
                    />
                </>
            )}
            <span>
                {Math.ceil(draftPick.pickNumber / draftSettings.teamCount)}.
                {getPickNumberOfRound(pickNumber)}
            </span>
            {getDirectionArrow()}
        </div>
    );
};
