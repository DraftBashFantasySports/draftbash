/** @jsxImportSource @emotion/react */
import { useState, ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { css } from "@emotion/react";

interface Props {
    placeholder: string;
    label: string;
    error: string;
    setValue: (value: string) => void;
}

export function PasswordInput({ placeholder, label, error, setValue }: Props) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const inputId = `${label.toLowerCase().replace(/\s/g, "-")}-input`;
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
            <label htmlFor={inputId} css={styles.label}>
                {label}
            </label>
            <div css={styles.inputWrapper}>
                <input
                    id={inputId}
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
                <div data-testid={`${label}-error`} css={styles.error}>
                    {error}
                </div>
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
            minWidth: "300px",
            width: "100%",
        }),
        inputWrapper: css({
            position: "relative",
            width: "100%",
        }),
        input: css({
            borderRadius: "5px",
            width: "100%",
            minHeight: "60px",
            fontSize: "20px",
            padding: "15px",
            paddingRight: "40px", // Make space for the icon
            backgroundColor: "white",
            border: "none",
            boxShadow: "0 3px 6px rgba(0, 0, 0, 0.2)",
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
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.4)",
        }),
        error: css({
            color: "red",
            fontSize: "14px",
            position: "absolute",
            bottom: "-25px",
        }),
    };
};
