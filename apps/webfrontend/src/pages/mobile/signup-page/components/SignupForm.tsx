/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { TextInput } from "../../../../components/mobile/text-inputs/TextInput";
import { PasswordInput } from "../../../../components/mobile/text-inputs/PasswordInput";
import { useSignup } from "../../../../hooks/useSignup";
import { PasswordRules } from "./PasswordRules";

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

    const isSubmitDisabled: boolean = !(
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
            <h2 css={styles.title}>Create Account</h2>
            <TextInput
                placeholder="Username"
                error={usernameError}
                autocomplete="username"
                setValue={setUsername}
            />
            <TextInput
                placeholder="Email"
                error={emailError}
                autocomplete="email"
                setValue={setEmail}
            />
            <PasswordRules rules={passwordRules} />
            <PasswordInput placeholder="Password" error={passwordError} setValue={setPassword} />
            <PasswordInput placeholder="Confirm Password" error="" setValue={setConfirmPassword} />
            <button css={styles.loginButton} type="submit" disabled={isSubmitDisabled}>
                Sign up
            </button>
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
            maxHeight: "500px",
            flexDirection: "column",
            gap: "25px",
            position: "relative",
        }),
        title: css({
            fontSize: "25px",
            fontWeight: "500",
            textAlign: "center",
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
        }),
    };
};
