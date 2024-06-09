/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import { SignupForm } from "./components/SignupForm";

export function SignupPage() {
    const styles = getStyles();
    return (
        <div css={styles.page}>
            <h1 css={styles.draftbashTitle}>
                DraftBash <img src="draftbash.svg" alt="My Icon" width={30} height={30} />
            </h1>
            <SignupForm />
            <Link css={styles.signupLink} to="/login">
                Have an account? Log in
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
            justifyContent: "flex-start",
            alignItems: "center",
            padding: "15px",
            overflow: "auto",
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
        }),
    };
};
