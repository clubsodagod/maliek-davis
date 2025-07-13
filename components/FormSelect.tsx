import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller, Control, FieldValues, Path, PathValue } from "react-hook-form";

interface FormSelectProps<T extends FieldValues> {
    name: Path<T>;
    label: string;
    options: { label: string; value: string | number | readonly string[] | undefined }[];
    control: Control<T>;
    defaultValue?: PathValue<T, Path<T>>;
    error?: boolean | null;
}

export default function FormSelect<T extends FieldValues>({
    name,
    label,
    options,
    control,
    defaultValue,
}: FormSelectProps<T>) {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={(defaultValue ?? "") as PathValue<T, Path<T>>}
            render={({ field }) => (
                <FormControl fullWidth variant="outlined">
                    <InputLabel
                        variant="outlined"
                        sx={{
                            color: 'var(--label-light-white)',
                            borderRadius: '34px',
                        }}
                    >
                        {label}
                    </InputLabel>
                    <Select
                        variant="outlined"
                        {...field}
                        value={field.value ?? ""}
                        label={label}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '34px',
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
                    >
                        <MenuItem value="" disabled>
                            Select an option
                        </MenuItem>
                        {options.map((opt) => (
                            <MenuItem key={`${opt.value}`} value={opt.value}>
                                {opt.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
        />
    );
}

