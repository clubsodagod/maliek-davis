import { TextField } from "@mui/material";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

interface FormInputProps<T extends FieldValues = FieldValues> {
    name: Path<T>;
    label: string;
    control: Control<T>;
    type?: string;
    multiline?: boolean;
    rows?: number;
    defaultValue?: T[keyof T];
}

export default function FormInput<T extends FieldValues>({
    name,
    label,
    control,
    type,
    multiline,
    rows,
    defaultValue, // Handle defaultValue dynamically
}: FormInputProps<T>) {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue !== undefined ? defaultValue : ("" as T[keyof T])}
            render={({ field }) => (
                <TextField
                    {...field}
                    fullWidth
                    variant="filled"
                    type={type}
                    label={label}
                    multiline={multiline}
                    rows={rows}
                    InputLabelProps={type === "date" ? { shrink: true } : undefined}
                />
            )}
        />
    );
}

