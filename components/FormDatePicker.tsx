// FormDatePicker.tsx
import React from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface FormDatePickerProps<T extends FieldValues> {
    name: Path<T>;
    label: string;
    control: Control<T>;
}

function FormDatePicker<T extends FieldValues>({
    name,
    label,
    control,
}: FormDatePickerProps<T>) {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={null as unknown as T[Path<T>]}
            render={({ field }) => (
                <DatePicker
                    label={label}
                    value={field.value || null}
                    onChange={(date) => field.onChange(date)}
                    slotProps={{
                        textField: { fullWidth: true, variant: "filled" }
                    }}
                />
            )}
        />
    );
}

export default FormDatePicker;
