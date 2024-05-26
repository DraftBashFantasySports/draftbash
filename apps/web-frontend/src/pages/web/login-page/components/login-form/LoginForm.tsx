/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import { TextInput } from "../../../../../components/web/text-inputs/TextInput";
import { PasswordInput } from "../../../../../components/web/text-inputs/PasswordInput";
import { useLogin } from "../../../../../hooks/useLogin";

export function LoginForm() {
    const { loginUser, username, email, password, setPassword, setUsername, setEmail, loginError } =
        useLogin();
    const [isSubmitButtonHovered, setIsSubmitButtonHovered] = useState(false);

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
            <button
                type="submit"
                css={[styles.submitButton, isSubmitButtonHovered && styles.submitButtonHovered]}
                onMouseEnter={() => setIsSubmitButtonHovered(true)}
                onMouseLeave={() => setIsSubmitButtonHovered(false)}
            >
                Login
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
        signupLink: css`
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
        submitButtonHovered: css`
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
            cursor: pointer;
        `,
    };
};
