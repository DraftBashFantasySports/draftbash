/** @jsxImportSource @emotion/react */
import { ChangeEvent, useState } from "react";
import { css } from "@emotion/react";

interface Props {
    placeholder: string;
    label: string;
    error: string;
    autocomplete: string;
    setValue: (value: string) => void;
}

export function TextInput({ placeholder, label, error, autocomplete, setValue }: Props) {
    const inputId = `${label.toLowerCase().replace(/\s/g, "-")}-input`;
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const styles = getStyles();

    return (
        <div css={styles.container}>
            <label htmlFor={inputId} css={styles.label}>
                {label}
            </label>
            <input
                id={inputId}
                css={[styles.input, isFocused && styles.focusedInput]}
                placeholder={placeholder}
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                autoComplete={autocomplete}
            />
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
        input: css({
            borderRadius: "5px",
            width: "100%",
            minHeight: "60px",
            fontSize: "20px",
            padding: "15px",
            backgroundColor: "white",
            border: "none",
            boxShadow: "0 3px 6px rgba(0, 0, 0, 0.2)",
            transition: "box-shadow 0.3s ease-in-out",
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
