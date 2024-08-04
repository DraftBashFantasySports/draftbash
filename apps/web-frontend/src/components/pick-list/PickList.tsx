import styles from './PickList.module.css';
import React, { useEffect, useState } from 'react';

type Props = {
    options: string[] | number[];
    label: string;
    defaultValue: string | number;
    handleOnChange: (value: string | number) => void;
};

export const PickList = ({ options, label, defaultValue, handleOnChange }: Props) => {
    const [selectedValue, setSelectedValue] = useState<string | number>(defaultValue);

    useEffect(() => {
        setSelectedValue(defaultValue);
    }, [defaultValue]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = e.target.value;
        setSelectedValue(newValue);
        handleOnChange(newValue);
    };
    return (
        <div className={styles.picklist}>
            <label htmlFor={label}>{label}</label>
            <select id={label} name={label} value={selectedValue} onChange={handleChange}>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};