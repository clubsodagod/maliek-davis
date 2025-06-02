// FormTagInput.tsx
import React, { useState, KeyboardEvent } from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { TextField, Chip, Box, Typography } from "@mui/material";

interface FormTagInputProps<T extends FieldValues> {
    name: Path<T>;
    label: string;
    control: Control<T>;
    placeholder?: string;
    defaultValue?: string[];
}

function FormTagInput<T extends FieldValues>({
    name,
    label,
    control,
    placeholder = "Press enter to add a tag",
    defaultValue = [],
}: FormTagInputProps<T>) {
    const [inputValue, setInputValue] = useState("");

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue as T[Path<T>]}
            render={({ field }) => {
                const addTag = (e: KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter" && inputValue.trim()) {
                        e.preventDefault();
                        if (!field.value.includes(inputValue.trim())) {
                            field.onChange([...field.value, inputValue.trim()]);
                        }
                        setInputValue("");
                    }
                };

                const removeTag = (tagToRemove: string) => {
                    field.onChange(field.value.filter((tag: string) => tag !== tagToRemove));
                };

                return (
                    <Box>
                        <Typography variant="subtitle1" gutterBottom>
                            {label}
                        </Typography>
                        <Box display="flex" flexWrap="wrap" gap={1} mb={1}>
                            {field.value.map((tag: string, idx: number) => (
                                <Chip
                                    key={idx}
                                    label={tag}
                                    onDelete={() => removeTag(tag)}
                                    color="primary"
                                />
                            ))}
                        </Box>
                        <TextField
                            fullWidth
                            variant="filled"
                            placeholder={placeholder}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={addTag}
                        />
                    </Box>
                );
            }}
        />
    );
}

export default FormTagInput;
