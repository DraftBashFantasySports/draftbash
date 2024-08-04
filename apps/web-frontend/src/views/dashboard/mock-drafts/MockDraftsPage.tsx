import styles from "./MockDraftsPage.module.css";
import { DashboardLayout } from "../DashboardLayout";
import { MockDraftsToggle } from "./components/mock-drafts-toggle/MockDraftsToggle";
import { useState } from "react";
import { MockDraftItem } from "./components/mock-draft-item/MockDraftItem";
import { Draft } from "types/drafts";
import { PiGridNineLight } from "react-icons/pi";
import { useGetMockDrafts } from "@hooks/mock-drafts/useGetMockDrafts";
import { useCreateMockDrafts } from "@hooks/mock-drafts/useCreateMockDraft";

export const MockDraftsPage = () => {
    const [isActiveDrafts, setIsActiveDrafts] = useState(true);
    const { mockDrafts } = useGetMockDrafts();
    const { createFootballDraft } = useCreateMockDrafts();
    const defaultFootballDraftSettings = {
        teamCount: 10,
        scoringFormat: "ppr",
        pickOrderFormat: "snake",
        pickTimeLimit: 60,
        sport: "football",
        quarterbackLimit: 1,
        runningBackLimit: 2,
        wideReceiverLimit: 2,
        tightEndLimit: 1,
        kickerLimit: 1,
        defenseLimit: 1,
        flexLimit: 2,
        benchLimit: 4,
        isDraftStarted: false
    };

    return (
        <>
            <DashboardLayout
                header={
                    <div className={styles.heading}>
                        <h1>Mock Drafts</h1>
                        <p>Practice your draft strategies</p>
                    </div>
                }
                leftPanel={
                    <div className={styles.leftpanel}>
                        <MockDraftsToggle
                            active={isActiveDrafts}
                            handleOnToggle={() => setIsActiveDrafts(!isActiveDrafts)}
                        />
                        {mockDrafts.length > 0 ? (
                            <ul>
                                {mockDrafts.map((draft: Draft) => (
                                    <li key={draft.id}>
                                        <MockDraftItem draft={draft} />
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className={styles.nodrafts}>
                                <PiGridNineLight className={styles.icon} />
                                <h4>No drafts available</h4>
                                <p>Create your own or join your friend's</p>
                            </div>
                        )}
                    </div>
                }
                rightPanel={
                    <div className={styles.rightpanel}>
                        <PiGridNineLight className={styles.icon} />
                        <h3>Mock Drafts</h3>
                        <p>Practice your draft strategies</p>
                        <button
                            type="button"
                            className={styles.footballdraftbtn}
                            onClick={() => createFootballDraft(defaultFootballDraftSettings)}
                        >
                            Create Football Draft
                        </button>
                        <button type="button" className={styles.basketballdraftbtn}>
                            Create Basketball Draft
                        </button>
                    </div>
                }
            />
        </>
    );
};
