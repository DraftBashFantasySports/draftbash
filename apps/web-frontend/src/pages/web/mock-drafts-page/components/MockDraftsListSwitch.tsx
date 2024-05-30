/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";

interface Props {
    onToggle: (isActiveSelected: boolean) => void;
}

export function MockDraftsListSwitch({ onToggle }: Props) {
    const [isActiveSelected, setIsActiveSelected] = useState(true);
    const styles = getStyles(isActiveSelected);

    return (
        <div css={styles.container}>
            <div css={styles.slider} />
            <button
                css={styles.button}
                style={{ color: isActiveSelected ? "var(--spaceCadet)" : "var(--silver)" }}
                onClick={() => {
                    onToggle(true);
                    setIsActiveSelected(true);
                }}
                type="button"
            >
                Active
            </button>
            <button
                css={styles.button}
                style={{ color: isActiveSelected ? "var(--silver)" : "var(--spaceCadet)" }}
                onClick={() => {
                    onToggle(false);
                    setIsActiveSelected(false);
                }}
                type="button"
            >
                Finished
            </button>
        </div>
    );
}

function getStyles(isActiveSelected: boolean) {
    return {
        container: css({
            backgroundColor: "var(--spaceCadet)",
            height: "33px",
            display: "flex",
            position: "relative",
            borderRadius: "16px",
            justifyContent: "space-around",
            padding: "3px",
        }),
        slider: css({
            position: "absolute",
            top: "3px",
            bottom: "3px",
            left: isActiveSelected ? "3px" : "calc(50% + 3px)",
            width: "calc(50% - 6px)",
            backgroundColor: "var(--mint)",
            borderRadius: "13px",
            transition: "left 0.3s",
        }),
        button: css({
            position: "relative",
            width: "50%",
            border: "none",
            fontSize: "13px",
            fontWeight: "600",
            backgroundColor: "transparent",
            zIndex: 1,
            cursor: "pointer",
            transition: "color 0.3s",
        }),
    };
}
