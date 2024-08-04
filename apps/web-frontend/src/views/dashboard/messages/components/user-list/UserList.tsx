import styles from "./UserList.module.css";
import { useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import { useGetUsersByUsername } from "@hooks/users/useGetUsersByUsername";
import { User } from "types/users";
import { useGlobalContext } from "contexts/GlobalProvider";
import { useChatContext } from "contexts/ChatProvider";

export const UserList = () => {
    const { user } = useGlobalContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchedUsers, setSearchedUsers] = useState<User[]>([]);
    const { getUsersByUsername } = useGetUsersByUsername();
    const { joinChat, setFromUserId } = useChatContext();
    const [searchTimeout, setSearchTimeout] = useState<number | undefined>(undefined);

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

    const handleChatClick = (userId: number) => {
        setFromUserId(userId);
        joinChat(userId);
        setIsModalOpen(false);
    };

    const closeModal = (event: React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
        const target = event.target as HTMLDialogElement;
        if (target.tagName === "DIALOG") {
            setIsModalOpen(false);
        }
    };

    return (
        <>
            <FaPlus
                className={styles.plusicon}
                onClick={() => {
                    setIsModalOpen(true);
                }}
                type="button"
            />
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
                                        <button
                                            type="button"
                                            onClick={() => handleChatClick(searchedUser.id)}
                                        >
                                            CHAT
                                        </button>
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
