import styles from "./NavBar.module.css";
import { Link, useLocation } from "react-router-dom";
import { RiMessage3Line } from "react-icons/ri";
import { PiGridNineLight } from "react-icons/pi";
import { LuPlusCircle } from "react-icons/lu";
import { FaUser } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { useGlobalContext } from "contexts/GlobalProvider";

export const NavBar = () => {
    const { user } = useGlobalContext();
    const currentUrlLocation = useLocation().pathname;
    return (
        <nav>
            <h2>
                <img
                    src="icons/draftbash.svg"
                    alt="DraftBash logo"
                    className={`${styles.icon}`}
                />
                DraftBash
            </h2>
            <ul className={`${styles.pagelinks}`}>
                <li className={`${currentUrlLocation === "/messages" ? styles.selected : ""}`}>
                    <div className={`${styles.selectedindicator}`} />
                    <Link to="/messages">
                        <RiMessage3Line className={`${styles.icon}`} />
                        Messages
                    </Link>
                </li>
                <li className={`${currentUrlLocation === "/mock-drafts" ? styles.selected : ""}`}>
                    <div className={`${styles.selectedindicator}`} />
                    <Link to="/mock-drafts">
                        <PiGridNineLight className={`${styles.icon}`} />
                        Mock Drafts
                    </Link>
                </li>
            </ul>
            <div className={`${styles.leagues}`}>
                <div>
                    <p>Leagues</p>
                    <LuPlusCircle className={`${styles.icon}`} />
                </div>
                <ul>

                </ul>
            </div>
            <div className={`${styles.profile}`}>
                <FaUser className={`${styles.usericon}`} />
                <p>{user?.username}</p>
                <FaGear className={`${styles.gearicon}`} />
            </div>
        </nav>
    );
};
