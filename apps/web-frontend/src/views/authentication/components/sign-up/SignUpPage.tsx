import styles from "../../AuthenticationPage.module.css";
import { Link } from "react-router-dom";
import { TextInput } from "@components/text-input/TextInput";
import { useCreateUser } from "@hooks/users/useCreateUser";
import { useState } from "react";

export const SignUpPage = () => {
    const {
        createUser,
        validateEmail,
        validateUsername,
        validatePassword,
        usernameError,
        emailError,
        passwordError,
    } = useCreateUser();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createUser({ username: username, email: email, password: password });
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
                <img src="images/confetti.png" alt="Confetti" className={`${styles.confetti}`} />
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
                    <h1>Sign up</h1>
                    <Link to="/sign-in">Sign in</Link>
                </header>
                <p className={`${styles.instructions}`}>Sign in with your username or email</p>
                <form onSubmit={handleOnSubmit}>
                    <TextInput
                        label="Username"
                        placeholder="Username"
                        handleOnChange={(text: string) => {setUsername(text); validateUsername(text);}}
                    />
                    <p className={styles.error}>{usernameError}</p>
                    <TextInput label="Email" placeholder="Email" handleOnChange={(text: string) => { setEmail(text); validateEmail(text); }} />
                    <p className={styles.error}>{emailError}</p>
                    <TextInput
                        label="Password"
                        placeholder="Password"
                        type="password"
                        handleOnChange={(text: string) => { setPassword(text); validatePassword(text); }}
                    />
                    <p className={styles.error}>{passwordError}</p>
                    <button type="submit">Sign up</button>
                </form>
            </section>
        </main>
    );
};
