/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { RxTriangleLeft } from "react-icons/rx";

interface Props {
    children: React.ReactNode;
    isHovered: boolean;
    styling: object;
}

export function Tooltip({ children, isHovered, styling }: Props) {
    const styles = getStyles(isHovered, styling);
    return (
        <div css={styles.toolTip}>
            <RxTriangleLeft css={styles.toolTipPointer} />
            {children}
        </div>
    );
}

const getStyles = (isHovered: boolean, styling: object) => {
    return {
        toolTip: css({
            backgroundColor: "var(--grey)",
            position: "absolute",
            color: "white",
            right: "-150px", // Positioned outside the parent element
            fontWeight: "500",
            fontSize: "15px",
            top: "0px",
            padding: "10px",
            borderRadius: "5px",
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.3s ease",
            zIndex: 1, // Ensure the tooltip is above other content
            ...styling,
        }),
        toolTipPointer: css({
            position: "absolute",
            left: "-17px",
            top: "5px",
            fontSize: "30px",
            color: "var(--grey)",
        }),
    };
};
