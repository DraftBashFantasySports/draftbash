/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { RxTriangleRight } from "react-icons/rx";

interface Props {
    rules: { [key: string]: boolean };
}

export function PasswordRules({ rules }: Props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const styles = getStyles();

    const handleMouseEnter = () => {
        setIsModalVisible(true);
    };

    const handleMouseLeave = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <button
                css={styles.infoButton}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => setIsModalVisible(!isModalVisible)}
                type="button"
            >
                I
            </button>
            {isModalVisible && (
                <ul css={styles.passwordList}>
                    {Object.entries(rules).map(([message, condition]) => (
                        <li
                            css={[styles.passwordListItem, condition ? styles.rulePassed : {}]}
                            key={message}
                        >
                            {message}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}

const getStyles = () => {
    return {
        passwordList: css({
            position: "fixed",
            backgroundColor: "var(--grey)",
            zIndex: 5,
            padding: "5px 5px 5px 5px",
            borderRadius: "10px",
            left: "calc(50% - 157px)",
            top: "130px",
        }),
        passwordListItem: css({
            display: "flex",
            alignItems: "center",
            marginBottom: "5px",
            fontSize: "14px",
            color: "silver",
        }),
        passwordCheckmark: css({
            marginRight: "8px",
            color: "var(--green)",
        }),
        infoButton: css({
            position: "absolute",
            right: "50px",
            top: "218px",
            fontSize: "14px",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            textAlign: "center",
            backgroundColor: "var(--indigo)",
            color: "white",
            cursor: "pointer",
            border: "none",
        }),
        rulePassed: css({
            color: "var(--mint)",
        }),
    };
};
