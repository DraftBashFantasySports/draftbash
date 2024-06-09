/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import { LoginForm } from "./components/LoginForm";

export function LoginPage() {
    const styles = getStyles();
    return (
        <div css={styles.page}>
            <h1 css={styles.draftbashTitle}>
                DraftBash <img src="draftbash.svg" alt="My Icon" width={30} height={30} />
            </h1>
            <LoginForm />
            <Link css={styles.signupLink} to="/signup">
                New to DraftBash? Sign up
            </Link>
        </div>
    );
}

const getStyles = () => {
    return {
        page: css({
            height: "100vh",
            background: "linear-gradient(to bottom, var(--prussianBlue), var(--mint))",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "15px",
        }),
        draftbashTitle: css({
            color: "var(--gold)",
            fontSize: "35px",
            fontWeight: "600",
            marginTop: "20px",
            marginBottom: "10px",
        }),
        signupLink: css({
            color: "var(--gold)",
            fontWeight: "500",
            fontSize: "16px",
            textDecoration: "none",
            marginTop: "25px",
            marginBottom: "0px",
        }),
    };
};
