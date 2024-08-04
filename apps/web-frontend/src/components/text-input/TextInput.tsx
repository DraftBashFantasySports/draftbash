import styles from "./TextInput.module.css";
import { ChangeEvent, useState } from "react";

interface Props {
    placeholder: string;
    label: string;
    type?: string;
    handleOnChange: (input: string) => void;
}

export const TextInput = ({ placeholder, label, type = "text", handleOnChange }: Props) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className={`${styles.textinput}`}>
            <label>{label}</label>
            <input
                type={showPassword ? "password" : "text"}
                placeholder={placeholder}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    handleOnChange(event.target.value);}
                }
            />
            {type === "password" && (
                <img
                    src={`icons/${showPassword ? "eyehide" : "eye"}.png`}
                    alt="Show password"
                    onClick={() => setShowPassword(!showPassword)}
                />
            )}
        </div>
    );
};
