import styles from "../AuthenticationPage.module.css";
import { Link } from "react-router-dom";
import { TextInput } from "@components/text-input/TextInput";
import { useSignInUser } from "@hooks/users/useSignInUser";
import { useState } from "react";
import { MessageSocket } from "services/websockets/messages/MessageSocket";

export const SignInPage = () => {
    const messageSocket = new MessageSocket(1);
    const { signInUser, isLoading, error } = useSignInUser();
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const setName = (name: string) => {
        setUsername(name);
        setEmail(name);
    };
    const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(isLoading, error);
        signInUser({ username: username, email: email, password: password });
    };
    return (
        <main>
            <section className={`${styles.leftcolumn}`}>
                <h2>
                    <img
                        src="icons/draftbash.svg"
                        alt="DraftBash logo"
                        className={`${styles.logoicon}`}
                    />
                    DraftBash
                </h2>
                <img
                    src="images/confetti.png"
                    alt="Confetti"
                    className={`${styles.confetti}`}
                />
                <p className={`${styles.slogan}`}>
                    Make fantasy sport dreams come true with{" "}
                    <b>
                        DraftBash{" "}
                        <img
                            src="images/underline.png"
                            alt="Underline"
                            className={`${styles.underline}`}
                        />
                    </b>
                </p>
                <p className={`${styles.description}`}>
                    Where party meets sport: have a fantasy sport bash with DraftBash
                </p>
            </section>
            <section className={`${styles.rightcolumn}`}>
                <header>
                    <h1>Sign in</h1>
                    <Link to="/sign-up">Sign up</Link>
                </header>
                <p className={`${styles.instructions}`}>Sign in with your username or email</p>
                <form onSubmit={handleOnSubmit}>
                    <TextInput
                        label="Username or email"
                        placeholder="Username or email"
                        handleOnChange={setName}
                    />
                    <TextInput
                        label="Password"
                        placeholder="Password"
                        type="password"
                        handleOnChange={setPassword}
                    />
                    <button type="submit">Sign in</button>
                </form>
            </section>
        </main>
    );
};
