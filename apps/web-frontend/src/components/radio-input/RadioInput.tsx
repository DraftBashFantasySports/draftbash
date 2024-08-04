import styles from './RadioInput.module.css';
import React, { useEffect, useState } from "react";

type Props = {
    options: string[] | number[];
    label: string;
    defaultValue: string | number;
    handleOnChange: (value: string | number) => void;
};

export const RadioInput = ({ options, label, defaultValue, handleOnChange }: Props) => {
    const [selectedValue, setSelectedValue] = useState<string | number>(defaultValue);

    useEffect(() => {
        setSelectedValue(defaultValue);
    }, [defaultValue]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setSelectedValue(newValue);
        handleOnChange(newValue);
    };

    return (
        <div className={styles.radioinput}>
            <p>{label}</p>
            {options.map((option) => (
                <label key={option}>
                    <input
                        type="radio"
                        name={label}
                        value={option}
                        checked={option === selectedValue}
                        onChange={handleChange}
                    />
                    {option}
                </label>
            ))}
        </div>
    );
};