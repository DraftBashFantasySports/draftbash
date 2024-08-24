import styles from "./FootballPlayerCard.module.css";
import { RxCross1 } from "react-icons/rx";
import { useGetFootballPlayer } from "@hooks/players/useGetFootballPlayer";
import { formatDate } from "@utils/time";
import { formatInjuryStatus } from "@utils/helpers";

type Props = { playerId: number; isModalOpen: boolean; setIsModalOpen: (isOpen: boolean) => void };

export const FootballPlayerCard = (props: Props) => {
    const { playerData, isLoading } = useGetFootballPlayer(props.playerId);
    let age = "N/A";
    if (playerData?.player?.age) {
        age = playerData.player.age.toString();
    }
    let weight = "N/A";
    if (playerData?.player?.weight) {
        weight = playerData.player.weight.toString() + " lbs";
    }
    let newsDate = "";
    if (playerData?.news && playerData?.news.date != undefined) {
        newsDate = formatDate(playerData.news.date);
    }
    let height = "N/A";
    if (playerData?.player && playerData?.player.height) {
        height = `${Math.floor(playerData?.player.height / 12)}'${playerData?.player.height % 12}"`;
    }

    const getInjuryStatusStyle = (status: string | undefined) => {
        if (status === "healthy" || status == null) {
            return styles.healthy;
        } else if (status === "questionable") {
            return styles.questionable;
        } else {
            return styles.out;
        }
    };

    const closeModal = (event: React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
        const target = event.target as HTMLDialogElement;
        if (target.tagName === "DIALOG") {
            props.setIsModalOpen(false);
        }
    };

    return (
        <>
            {props.isModalOpen && (
                <dialog className={styles.modal} open={props.isModalOpen} onClick={closeModal}>
                    <div className={styles.playerbio}>
                        <header>
                            {playerData?.player?.isRunningBack && (
                                <p className={styles.runningback}>RB</p>
                            )}{" "}
                            {playerData?.player?.isWideReceiver && (
                                <p className={styles.widereceiver}>WR</p>
                            )}{" "}
                            {playerData?.player?.isTightEnd && (
                                <p className={styles.tightend}>TE</p>
                            )}{" "}
                            {playerData?.player?.isQuarterback && (
                                <p className={styles.quarterback}>QB</p>
                            )}{" "}
                            {playerData?.player?.isKicker && <p className={styles.kicker}>K</p>}{" "}
                            {playerData?.player?.isTeamDefense && (
                                <p className={styles.defense}>DEF</p>
                            )}{" "}
                            <RxCross1
                                className={styles.exit}
                                onClick={() => props.setIsModalOpen(false)}
                            />
                        </header>
                        <div className={styles.content}>
                            <div className={styles.info}>
                                <div className={styles.profile}>
                                    <img
                                        src={playerData?.player?.team?.logoUrl ?? ""}
                                        alt="team"
                                        className={styles.teamimage}
                                    />
                                    {playerData?.player?.headshotUrl && (
                                        <img
                                            src={
                                                playerData?.player?.headshotUrl
                                                    ? playerData?.player?.headshotUrl
                                                    : "/images/default-player.png"
                                            }
                                            alt="player"
                                            className={styles.playerimage}
                                        />
                                    )}
                                    <div className={styles.details}>
                                        <h3>
                                            {playerData?.player?.firstName}{" "}
                                            {playerData?.player?.lastName}
                                        </h3>
                                        <p>
                                            {playerData?.player?.team?.teamCity}{" "}
                                            {playerData?.player?.team?.teamName}
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className={`${styles.injurystatus} ${getInjuryStatusStyle(playerData?.player?.injuryStatus)}`}
                                >
                                    <p>{formatInjuryStatus(playerData?.player?.injuryStatus)}</p>
                                </div>
                                <ul className={styles.bio}>
                                    <li>
                                        Bye Week <b>{playerData?.player?.team?.byeWeek}</b>
                                    </li>
                                    <li>
                                        Age <b>{age}</b>
                                    </li>
                                    <li>
                                        Height <b>{height}</b>
                                    </li>
                                    <li>
                                        Weight <b>{weight}</b>
                                    </li>
                                </ul>
                            </div>
                            <article className={styles.fantasyoutlook}>
                                <h3>Fantasy Outlook</h3>
                                {playerData?.news?.fantasyOutlook ? (
                                    <p>{playerData?.news?.fantasyOutlook}</p>
                                ) : (
                                    <p>No fantasy outlook available</p>
                                )}
                            </article>
                        </div>
                        <div className={styles.news}>
                            <article>
                                {playerData?.news?.headline ? (
                                    <>
                                        <h3>{playerData?.news?.headline}</h3>
                                        <p className={styles.date}>{newsDate}</p>
                                        <p>{playerData?.news?.summary}</p>
                                        <h4>Analysis</h4>
                                        <p>{playerData?.news?.analysis}</p>
                                        <a href={playerData?.news?.url} target="_blank">
                                            Rotowire Link
                                        </a>
                                    </>
                                ) : (
                                    <p>No news available</p>
                                )}
                            </article>
                        </div>
                    </div>
                </dialog>
            )}
        </>
    );
};
