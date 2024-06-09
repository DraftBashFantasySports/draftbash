/** @jsxImportSource @emotion/react */
import { ChangeEvent, useState } from "react";
import { css } from "@emotion/react";

interface Props {
    placeholder: string;
    error: string;
    autocomplete: string;
    setValue: (value: string) => void;
}

export function TextInput({ placeholder, error, autocomplete, setValue }: Props) {
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const styles = getStyles();

    return (
        <div css={styles.container}>
            <input
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
            height: "50px",
            fontSize: "16px",
            fontWeight: "500",
            padding: "15px",
            backgroundColor: "white",
            border: "2px solid var(--silver)",
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
