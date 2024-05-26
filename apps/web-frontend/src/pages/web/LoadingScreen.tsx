/** @jsxImportSource @emotion/react */
import React from "react";
import { css, keyframes } from "@emotion/react";
import { useLoading } from "../../contexts/LoadingContext";

export function LoadingScreen() {
    const { isLoading } = useLoading();

    if (!isLoading) {
        return null;
    }

    const styles = getStyles();
    return (
        <div css={styles.container}>
            <p css={styles.text} className="loading-text" />
        </div>
    );
}

function getStyles() {
    const loadingAnimation = keyframes`
        0% { content: 'Loading'; }
        25% { content: 'Loading.'; }
        50% { content: 'Loading..'; }
        75% { content: 'Loading...'; }
    `;

    return {
        container: css({
            backgroundColor: "var(--prussianBlue)",
            opacity: "0.9",
            width: "100%",
            height: "100vh",
            zIndex: "1000",
            position: "fixed",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "opacity 0.5s ease-in-out",
        }),
        text: css({
            color: "white",
            fontSize: "24px",
            fontWeight: "bold",
            "&::after": {
                content: "'Loading'",
                animation: `${loadingAnimation} 1s infinite`,
            },
        }),
    };
}

export default LoadingScreen;
