import styles from "./FootballDraftConfiguration.module.css";
import { FaGear } from "react-icons/fa6";
import { RadioInput } from "@components/radio-input/RadioInput";
import { useState } from "react";
import { FootballDraftSettings } from "types/drafts";
import { PickList } from "@components/pick-list/PickList";
import { useDraftContext } from "contexts/DraftProvider";
import { capitalizeFootballScoringType } from "@utils/helpers";

export const FootballDraftConfiguration = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { draftSettings, updateDraftSettings, draftId } = useDraftContext();
    const footballDraftSettings = draftSettings as FootballDraftSettings;
    const [settings, setSettings] = useState<FootballDraftSettings>({
        sport: "football",
        teamCount: 10,
        scoringFormat: "standard",
        pickOrderFormat: "snake",
        pickTimeLimit: 60,
        isDraftStarted: false,
        benchLimit: 4,
        defenseLimit: 1,
        kickerLimit: 1,
        flexLimit: 2,
        tightEndLimit: 1,
        wideReceiverLimit: 2,
        runningBackLimit: 2,
        quarterbackLimit: 1,
    });

    const closeModal = (event: React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
        const target = event.target as HTMLDialogElement;
        if (target.tagName === "DIALOG") {
            setIsModalOpen(false);
        }
    };

    return (
        <>
            <FaGear className={styles.settingsicon} onClick={() => setIsModalOpen(true)} />
            {isModalOpen && (
                <dialog className={styles.modal} open={isModalOpen} onClick={closeModal}>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            updateDraftSettings({
                                id: draftId,
                                type: "football",
                                createdAt: "",
                                settings: settings,
                            });
                            setIsModalOpen(false);
                        }}
                    >
                        <header>
                            <h3>Draft Configuration</h3>
                            <p>Customize your draft settings below</p>
                        </header>
                        <div className={styles.settings}>
                            <RadioInput
                                label="Draft Type"
                                options={["Snake", "Linear"]}
                                defaultValue="Snake"
                                handleOnChange={(value) =>
                                    setSettings({
                                        ...settings,
                                        pickOrderFormat: (value as string).toLowerCase(),
                                    })
                                }
                            />
                            <RadioInput
                                label="Scoring"
                                options={["PPR", "Standard", "Half-PPR"]}
                                defaultValue={capitalizeFootballScoringType(
                                    footballDraftSettings.scoringFormat,
                                )}
                                handleOnChange={(value) =>
                                    setSettings({
                                        ...settings,
                                        scoringFormat: (value as string).toLowerCase(),
                                    })
                                }
                            />
                            <PickList
                                label="Team Count"
                                options={[8, 10, 12, 14, 16]}
                                defaultValue={footballDraftSettings.teamCount}
                                handleOnChange={(value) =>
                                    setSettings({ ...settings, teamCount: value as number })
                                }
                            />
                            <PickList
                                label="Pick Clock"
                                options={["30 seconds", "60 seconds", "90 seconds", "120 seconds"]}
                                defaultValue={`${footballDraftSettings.pickTimeLimit} seconds`}
                                handleOnChange={(value) =>
                                    setSettings({
                                        ...settings,
                                        pickTimeLimit: Number((value as string).split(" ")[0]),
                                    })
                                }
                            />
                        </div>
                        <div>
                            <h4>Position Limits</h4>
                            <div className={styles.positionlimits}>
                                <PickList
                                    label="QB"
                                    options={[0, 1]}
                                    defaultValue={footballDraftSettings.quarterbackLimit}
                                    handleOnChange={(value) =>
                                        setSettings({
                                            ...settings,
                                            quarterbackLimit: value as number,
                                        })
                                    }
                                />
                                <PickList
                                    label="RB"
                                    options={[0, 1, 2]}
                                    defaultValue={footballDraftSettings.runningBackLimit}
                                    handleOnChange={(value) =>
                                        setSettings({
                                            ...settings,
                                            runningBackLimit: value as number,
                                        })
                                    }
                                />
                                <PickList
                                    label="WR"
                                    options={[0, 1, 2]}
                                    defaultValue={footballDraftSettings.wideReceiverLimit}
                                    handleOnChange={(value) =>
                                        setSettings({
                                            ...settings,
                                            wideReceiverLimit: value as number,
                                        })
                                    }
                                />
                                <PickList
                                    label="TE"
                                    options={[0, 1, 2]}
                                    defaultValue={footballDraftSettings.tightEndLimit}
                                    handleOnChange={(value) =>
                                        setSettings({ ...settings, tightEndLimit: value as number })
                                    }
                                />
                                <PickList
                                    label="K"
                                    options={[0, 1]}
                                    defaultValue={footballDraftSettings.kickerLimit}
                                    handleOnChange={(value) =>
                                        setSettings({ ...settings, kickerLimit: value as number })
                                    }
                                />
                                <PickList
                                    label="DEF"
                                    options={[0, 1]}
                                    defaultValue={footballDraftSettings.defenseLimit}
                                    handleOnChange={(value) =>
                                        setSettings({ ...settings, defenseLimit: value as number })
                                    }
                                />
                                <PickList
                                    label="FLEX"
                                    options={[0, 1, 2]}
                                    defaultValue={footballDraftSettings.flexLimit}
                                    handleOnChange={(value) =>
                                        setSettings({ ...settings, flexLimit: value as number })
                                    }
                                />
                                <PickList
                                    label="BE"
                                    options={[0, 1, 2, 3, 4]}
                                    defaultValue={footballDraftSettings.benchLimit}
                                    handleOnChange={(value) =>
                                        setSettings({ ...settings, benchLimit: value as number })
                                    }
                                />
                            </div>
                        </div>
                        <button type="submit">Update</button>
                    </form>
                </dialog>
            )}
        </>
    );
};
