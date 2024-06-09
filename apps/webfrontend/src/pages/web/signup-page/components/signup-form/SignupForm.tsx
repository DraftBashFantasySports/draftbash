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
        header: css({
            display: "flex",
            justifyContent: "space-between",
            minWidth: 300,
            width: "100%",
        }),
        title: css({
            fontSize: 45,
            color: "black",
        }),
        subtitle: css({
            fontSize: 20,
            color: "var(--grey)",
            fontWeight: 100,
            minWidth: 300,
            width: "100%",
        }),
        loginLink: css({
            fontSize: 20,
            color: "var(--indigo)",
            fontWeight: 600,
            paddingTop: 20,
        }),
        form: css({
            display: "flex",
            backgroundColor: "var(--whiteSmoke)",
            flexDirection: "column",
            height: "100vh",
            overflow: "auto",
            padding: "100px",
            width: "100%",
            alignItems: "center",
            gap: "60px",
        }),
        passwordList: css({
            listStyleType: "none",
            minWidth: 300,
            width: "100%",
        }),
        passwordListItem: css({
            fontSize: "16px",
            gap: "5px",
        }),
        passwordCheckmark: css({
            color: "var(--mint)",
            fontSize: 8,
            fontWeight: 600,
            position: "absolute",
            left: -15,
            top: 2,
        }),
        submitButton: css({
            borderRadius: 30,
            minHeight: 60,
            background: "linear-gradient(to right, var(--indigo), var(--prussianBlue))",
            color: "white",
            fontSize: 20,
            fontWeight: 600,
            border: "none",
            minWidth: 300,
            marginRight: "auto",
            transition: "box-shadow 0.3s",
            cursor: "pointer",
            "&:hover": {
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.4)",
            },
        }),
    };
};
