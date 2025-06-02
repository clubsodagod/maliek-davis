// FormMultiSelect.tsx
import React from "react";
import {
    Autocomplete,
    TextField,
} from "@mui/material";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

interface Option {
    label: string;
    value: string;
}

interface FormMultiSelectProps<T extends FieldValues> {
    name: Path<T>;
    label: string;
    control: Control<T>;
    options: Option[];
    defaultValue?: string[];
}

function FormMultiSelect<T extends FieldValues>({
    name,
    label,
    control,
    options,
    defaultValue = [],
}: FormMultiSelectProps<T>) {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue as T[Path<T>]}
            render={({ field }) => {
                const selectedOptions = options.filter((opt) => field.value?.includes(opt.value));
                return (
                    <Autocomplete
                        multiple
                        options={options}
                        getOptionLabel={(option) => option.label}
                        value={selectedOptions}
                        onChange={(_, selected) => field.onChange(selected.map((opt) => opt.value))}
                        renderInput={(params) => (
                            <TextField {...params} label={label} variant="filled" />
                        )}
                    />
                );
            }}
        />
    );
}

export default FormMultiSelect;
