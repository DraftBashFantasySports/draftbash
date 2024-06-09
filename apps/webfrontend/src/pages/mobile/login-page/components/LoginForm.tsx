/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import { TextInput } from "../../../../components/mobile/text-inputs/TextInput";
import { PasswordInput } from "../../../../components/mobile/text-inputs/PasswordInput";
import { useLogin } from "../../../../hooks/useLogin";

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
                <h2 css={styles.title}>Welcome</h2>
                <p css={styles.subTitle}>Log in to your account</p>
            </div>
            <TextInput
                placeholder="Username/email"
                error=""
                autocomplete="username"
                setValue={handleLoginName}
            />
            <PasswordInput placeholder="Password" error="" setValue={setPassword} />
            <Link css={styles.forgotPasswordLink} to="/frogot-password">
                Forgot Password?
            </Link>
            <button css={styles.loginButton} type="submit">
                Log in
            </button>
            <p css={styles.loginError}>{loginError}</p>
        </form>
    );
}

const getStyles = () => {
    return {
        page: css({
            height: "100vh",
            background: "linear-gradient(to bottom, var(--prussianBlue), var(--mint))",
        }),
        form: css({
            width: "100%",
            height: "100%",
            backgroundColor: "var(--whiteSmoke)",
            borderRadius: "10px",
            padding: "25px",
            display: "flex",
            maxWidth: "400px",
            flexDirection: "column",
            gap: "20px",
        }),
        header: css({
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }),
        title: css({
            fontSize: "25px",
            fontWeight: "500",
            marginBottom: "10px",
        }),
        subTitle: css({
            fontSize: "16px",
            fontWeight: "500",
            color: "var(--grey)",
        }),
        forgotPasswordLink: css({
            color: "var(--indigo)",
            fontWeight: "500",
            fontSize: "16px",
        }),
        loginButton: css({
            backgroundColor: "var(--indigo)",
            color: "white",
            borderRadius: "5px",
            height: "50px",
            border: "none",
            fontSize: "16px",
            fontWeight: "500",
            cursor: "pointer",
        }),
        loginError: css({
            color: "red",
            fontSize: "14px",
            marginTop: "-15px",
        }),
    };
};
