/** @jsxImportSource @emotion/react */
import React from "react";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import { TextInput } from "../../../../../components/web/text-inputs/TextInput";
import { PasswordInput } from "../../../../../components/web/text-inputs/PasswordInput";
import { useSignup } from "../../../../../hooks/useSignup";

export function SignupForm() {
    const {
        createUser,
        username,
        email,
        password,
        setPassword,
        setUsername,
        setEmail,
        setConfirmPassword,
        passwordError,
        usernameError,
        emailError,
        passwordRules,
    } = useSignup();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await createUser({ username, email, password });
    };

    const isButtonDisabled = !(
        passwordError === "" &&
        password.length !== 0 &&
        usernameError === "" &&
        username.length !== 0 &&
        emailError === "" &&
        email.length !== 0
    );

    const styles = getStyles();
    return (
        <form css={styles.form} onSubmit={handleSubmit}>
            <div css={styles.header}>
                <h2 css={styles.title}>Sign up</h2>
                <Link to="/login" css={styles.loginLink}>
                    Login
                </Link>
            </div>
            <p css={styles.subtitle}>Sign up to get started</p>
            <TextInput
                label="username"
                placeholder="Enter username"
                error={usernameError}
                setValue={setUsername}
                autocomplete="username"
            />
            <TextInput
                label="email"
                placeholder="Enter email"
                error={emailError}
                setValue={setEmail}
                autocomplete="email"
            />
            <PasswordInput
                label="password"
                placeholder="Enter password"
                error={passwordError}
                setValue={setPassword}
            />
            <PasswordInput
                label="confirm password"
                placeholder="Confirm password"
                error=""
                setValue={setConfirmPassword}
            />
            <ul css={styles.passwordList}>
                {Object.entries(passwordRules).map(([message, condition]) => (
                    <li css={styles.passwordListItem} key={message}>
                        <i css={styles.passwordCheckmark}>{condition && "✔"}</i>
                        {message}
                    </li>
                ))}
            </ul>
            <button css={styles.submitButton} disabled={isButtonDisabled} type="submit">
                Sign Up
            </button>
        </form>
    );
}

const getStyles = () => {
    return {
        header: css`
            display: flex;
            justify-content: space-between;
        `,
        title: css`
            font-size: 45px;
            color: black;
        `,
        subtitle: css`
            font-size: 20px;
            color: var(--grey);
            font-weight: 100;
        `,
        loginLink: css`
            font-size: 20px;
            color: var(--indigo);
            font-weight: 600;
            padding-top: 20px;
        `,
        form: css`
            display: flex;
            background-color: var(--whiteSmoke);
            flex-direction: column;
            width: 100%;
            min-width: 880px;
            height: 100vh;
            overflow: auto;
            padding: 100px 250px 100px 250px;
            gap: 60px;
        `,
        passwordList: css`
            list-style-type: none;
            padding: 0;
        `,
        passwordListItem: css`
            font-size: 15px;
            color: var(--grey);
            position: relative;
        `,
        passwordCheckmark: css`
            color: var(--mint);
            font-size: 8px;
            font-weight: 600;
            position: absolute;
            left: -15px;
            top: 2px;
        `,
        submitButton: css`
            border-radius: 30px;
            min-height: 60px;
            background: linear-gradient(to right, var(--indigo), var(--prussianBlue));
            color: white;
            font-size: 20px;
            font-weight: 600;
            border: none;
            width: 300px;
            transition: box-shadow 0.3s;
            cursor: pointer;
            &:hover {
                box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
            }
        `,
    };
};
