import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller, Control, FieldValues, Path, PathValue } from "react-hook-form";

interface FormSelectProps<T extends FieldValues> {
    name: Path<T>;
    label: string;
    options: { label: string; value: string | number | readonly string[] | undefined }[];
    control: Control<T>;
    defaultValue?: PathValue<T, Path<T>>;
    error?: boolean|null;
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
                <FormControl fullWidth variant="filled">
                    <InputLabel
                        variant="outlined"
                        sx={{
                            color: 'var(--label-color)',
                        }}
                    >{label}</InputLabel>
                    <Select
                        variant="outlined"
                        {...field}
                        value={field.value ?? ""}
                        label={label}
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
