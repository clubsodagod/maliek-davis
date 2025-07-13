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
    error?: boolean|null;
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
                    variant="outlined"
                    type={type}
                    label={label}
                    multiline={multiline}
                    rows={rows}
                    InputLabelProps={type === "date" ? { shrink: true } : undefined}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '34px',
                                color:"red"
                            },
                            '& .MuiOutlinedInput-input': {
                                borderRadius: '34px',
                                color:"var(--label-light-white)"
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'var(--label-light-white)',
                                borderRadius: '34px',
                                borderWidth: '2px',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#8f11cc',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#60abe4',
                            },
                            '& .MuiSelect-select': {
                                padding: '12px 16px',
                            },
                        }}
                />
            )}
        />
    );
}

