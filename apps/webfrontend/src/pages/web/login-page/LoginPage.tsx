/** @jsxImportSource @emotion/react */
import React from "react";
import { css, keyframes } from "@emotion/react";
import { LoginForm } from "./components/login-form/LoginForm";

export function LoginPage() {
    const styles = getStyles();
    return (
        <div css={styles.page}>
            <div css={styles.leftColumn} className="left-column">
                <h1 css={styles.title} className="title">
                    <img src="draftbash.svg" alt="My Icon" width={50} height={50} /> DraftBash
                </h1>
            </div>
            <LoginForm />
        </div>
    );
}

const getStyles = () => {
    const shimmer = keyframes`
        0% {
            background-position: -200% 0;
        }
        100% {
            background-position: 200% 0;
        }
    `;

    const gradientShift = keyframes`
        0% {
            background-size: 200% 200%;
            background-position: 0% 0%;
        }
        25% {
            background-position: 25% 75%;
        }
        50% {
            background-size: 220% 220%;
            background-position: 50% 50%;
        }
        75% {
            background-position: 75% 25%;
        }
        100% {
            background-size: 200% 200%;
            background-position: 0% 0%;
        }
    `;

    return {
        page: css({
            display: "flex",
            overflow: "hidden",
        }),
        leftColumn: css({
            width: "80%",
            minWidth: "550px",
            background: "linear-gradient(to bottom, var(--prussianBlue), var(--mint))",
            backgroundSize: "200% 200%",
            animation: `${gradientShift} 10s ease-in-out infinite`,
            transition: "width 0.5s, min-width 0.5s",
            "@media (max-width: 1000px)": {
                width: "0 !important",
                minWidth: "0 !important",
            },
        }),
        title: css({
            padding: "80px 80px 80px 120px",
            fontSize: "45px",
            color: "var(--gold)",
            position: "relative",
            overflow: "hidden",
            whiteSpace: "nowrap",
            background:
                "linear-gradient(90deg, var(--gold), var(--gold), white, var(--gold), var(--gold))",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: `${shimmer} 5s linear infinite`,
            "@media (max-width: 1000px)": {
                display: "none",
            },
        }),
    };
};
