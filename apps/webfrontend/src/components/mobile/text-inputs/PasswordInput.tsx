/** @jsxImportSource @emotion/react */
import { useState, ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { css } from "@emotion/react";

interface Props {
    placeholder: string;
    error: string;
    setValue: (value: string) => void;
}

export function PasswordInput({ placeholder, error, setValue }: Props) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const styles = getStyles();
    return (
        <div css={styles.container}>
            <div css={styles.inputWrapper}>
                <input
                    css={[styles.input, isFocused && styles.focusedInput]}
                    placeholder={placeholder}
                    onChange={handleChange}
                    type={isPasswordVisible ? "text" : "password"}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    autoComplete="new-password"
                />
                <span
                    onClick={togglePasswordVisibility}
                    onKeyDown={togglePasswordVisibility}
                    css={styles.icon}
                    tabIndex={0}
                    role="button"
                >
                    <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
                </span>
            </div>
            {error && (
                <p className="validation-error" css={styles.error}>
                    {error}
                </p>
            )}
        </div>
    );
}

const getStyles = () => {
    return {
        label: css({
            position: "absolute",
            top: "-25px",
            fontSize: "15px",
            color: "var(--grey)",
        }),
        container: css({
            position: "relative",
        }),
        inputWrapper: css({
            position: "relative",
            width: "100%",
        }),
        input: css({
            borderRadius: "5px",
            width: "100%",
            height: "50px",
            fontSize: "16px",
            fontWeight: "500",
            padding: "15px",
            paddingRight: "40px",
            backgroundColor: "white",
            border: "2px solid var(--silver)",
        }),
        icon: css({
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
            color: "grey",
        }),
        focusedInput: css({
            border: "2px solid var(--aqua)",
        }),
        error: css({
            color: "red",
            fontSize: "13px",
            position: "absolute",
            bottom: "-20px",
            whiteSpace: "nowrap",
        }),
    };
};
