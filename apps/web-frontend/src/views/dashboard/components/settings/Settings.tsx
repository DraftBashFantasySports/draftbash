import styles from "./Settings.module.css";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useGlobalContext } from "contexts/GlobalProvider";
import { FaGear } from "react-icons/fa6";
import { TokenStorage } from "services/security/TokenStorage";
import { useNavigate } from "react-router-dom";

export const Settings = () => {
    const { user } = useGlobalContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const closeModal = (event: React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
        const target = event.target as HTMLDialogElement;
        if (target.tagName === "DIALOG") {
            setIsModalOpen(false);
        }
    };

    const logout = () => {
        TokenStorage.removeToken();
        navigate("/sign-in");
    };

    return (
        <>
            <div className={`${styles.profile}`}
                onClick={() => setIsModalOpen(true)} 
            >
                <FaUser className={`${styles.usericon}`} />
                <p>{user?.username}</p>
                <FaGear className={`${styles.gearicon}`} />
            </div>
            {isModalOpen && (
                <dialog className={styles.modal} open={isModalOpen} onClick={closeModal}>
                    <div className={styles.content}>
                        <p className={styles.logout} onClick={() => logout()}>Logout</p>
                    </div>
                </dialog>
            )}
        </>
    );
};