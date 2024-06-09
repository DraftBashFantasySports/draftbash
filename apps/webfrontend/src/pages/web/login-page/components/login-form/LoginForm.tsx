/** @jsxImportSource @emotion/react */
import React from "react";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import { TextInput } from "../../../../../components/web/text-inputs/TextInput";
import { PasswordInput } from "../../../../../components/web/text-inputs/PasswordInput";
import { useLogin } from "../../../../../hooks/useLogin";

export function LoginForm() {
    const { loginUser, username, email, password, setPassword, setUsername, setEmail, loginError } =
        useLogin();

    const handleLoginName = (loginName: React.SetStateAction<string>) => {
        setUsername(loginName);
        setEmail(loginName);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await loginUser({ username, email, password });
    };

    const styles = getStyles();

    return (
        <form css={styles.form} onSubmit={handleSubmit}>
            <div css={styles.header}>
                <h2 css={styles.title}>Login</h2>
                <Link to="/signup" css={styles.signupLink}>
                    Sign up
                </Link>
            </div>
            <p css={styles.subtitle}>Sign up to get started</p>
            <TextInput
                label="username or email"
                placeholder="Enter username or email"
                error=""
                setValue={handleLoginName}
                autocomplete="username/email"
            />
            <PasswordInput
                label="password"
                placeholder="Enter password"
                error={loginError}
                setValue={setPassword}
            />
            <button type="submit" css={styles.submitButton}>
                Login
            </button>
        </form>
    );
}

const getStyles = () => {
    return {
        header: css({
            display: "flex",
            justifyContent: "space-between",
            minWidth: "300px",
            width: "100%",
        }),
        title: css({
            fontSize: "45px",
            color: "black",
        }),
        subtitle: css({
            fontSize: "20px",
            color: "var(--grey)",
            fontWeight: 100,
            backgroundColor: "var(--whiteSmoke)",
            minWidth: "300px",
            width: "100%",
        }),
        signupLink: css({
            fontSize: "20px",
            color: "var(--indigo)",
            fontWeight: 600,
            paddingTop: "20px",
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
        submitButton: css({
            borderRadius: "30px",
            minHeight: "60px",
            background: "linear-gradient(to right, var(--indigo), var(--prussianBlue))",
            color: "white",
            fontSize: "20px",
            fontWeight: 600,
            border: "none",
            minWidth: "300px",
            marginRight: "auto",
            transition: "box-shadow 0.3s",
            cursor: "pointer",
            "&:hover": {
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.4)",
            },
        }),
        submitButtonHovered: css({
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.4)",
            cursor: "pointer",
        }),
    };
};
