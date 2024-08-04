import styles from "./Invites.module.css";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useGetUsersByUsername } from "@hooks/users/useGetUsersByUsername";
import { User } from "types/users";
import { useGlobalContext } from "contexts/GlobalProvider";
import { useDraftContext } from "contexts/DraftProvider";

export const Invites = () => {
    const { user } = useGlobalContext();
    const { sendDraftInvite, draftSettings, draftId } = useDraftContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchedUsers, setSearchedUsers] = useState<User[]>([]);
    const { getUsersByUsername } = useGetUsersByUsername();
    const [searchTimeout, setSearchTimeout] = useState<number | undefined>(undefined);
    const [invitedUsers, setInvitedUsers] = useState<number[]>([]); // State to track invited users

    const searchUsers = async (username: string) => {
        if (username.length >= 3) {
            const users: User[] = await getUsersByUsername(username, user?.id ?? 0);
            setSearchedUsers(users);
        } else {
            setSearchedUsers([]);
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const username = event.target.value;
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        const timeout = window.setTimeout(() => {
            searchUsers(username);
        }, 300);
        setSearchTimeout(timeout);
    };

    const handleInviteClick = (userId: number) => {
        setInvitedUsers((prev) => [...prev, userId]);
        sendDraftInvite(
            user?.id ?? 0,
            userId,
            `Join my draft! /drafts/${draftSettings.sport}/${draftId}`
        );
    };

    const closeModal = (event: React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
        const target = event.target as HTMLDialogElement;
        if (target.tagName === "DIALOG") {
            setIsModalOpen(false);
        }
    };

    return (
        <>
            <button
                className={styles.invitesbtn}
                onClick={() => {
                    setIsModalOpen(true);
                }}
                type="button"
            >
                SEND INVITES
            </button>
            {isModalOpen && (
                <dialog className={styles.modal} open={isModalOpen} onClick={closeModal}>
                    <div className={styles.content}>
                        <header>
                            <FaSearch className={styles.searchicon} />
                            <input
                                placeholder="Search users"
                                type="text"
                                onChange={handleSearchChange}
                            />
                        </header>
                        {searchedUsers.length > 0 ? (
                            <ul>
                                {searchedUsers.map((searchedUser) => (
                                    <li key={searchedUser.id}>
                                        <p>{searchedUser.username}</p>
                                        {invitedUsers.includes(searchedUser.id) ? (
                                            <span className={styles.sent}>Sent!</span>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => handleInviteClick(searchedUser.id)}
                                            >
                                                INVITE
                                            </button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className={styles.emptysearch}>
                                <FaSearch className={styles.searchicon} />
                                <p>Find user</p>
                            </div>
                        )}
                    </div>
                </dialog>
            )}
        </>
    );
};