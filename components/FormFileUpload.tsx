import React from 'react';
import {
    Box,
    Typography,
    Button,
    FormHelperText,
    FormControl,
} from '@mui/material';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';

interface FormFileUploadProps<T extends FieldValues = FieldValues> {
    name: Path<T>;
    label: string;
    control: Control<T>;
    multiple?: boolean;
    accept?: string;
}

export default function FormFileUpload<T extends FieldValues>({
    name,
    label,
    control,
    multiple = false,
    accept = ".pdf,image/*",
}: FormFileUploadProps<T>) {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={undefined}
            render={({ field, fieldState }) => (
                <FormControl fullWidth error={!!fieldState.error}>
                    <Typography variant="subtitle1" mb={1}>
                        {label}
                    </Typography>

                    <Button
                        variant="outlined"
                        component="label"
                        sx={{ textTransform: 'none' }}
                    >
                        {multiple ? 'Upload Files' : 'Upload File'}
                        <input
                            type="file"
                            hidden
                            multiple={multiple}
                            accept={accept}
                            onChange={(e) => {
                                const files = e.target.files;
                                if (files) {
                                    const value = multiple ? Array.from(files) : files[0];
                                    field.onChange(value);
                                }
                            }}
                        />
                    </Button>

                    {/* File Preview */}
                    {field.value && (
                        <Box mt={2}>
                            {multiple ? (
                                (field.value as File[]).map((file, index) => (
                                    <Typography variant="body2" key={index}>
                                        {file.name}
                                    </Typography>
                                ))
                            ) : (
                                <Typography variant="body2">{(field.value as File).name}</Typography>
                            )}
                        </Box>
                    )}

                    <FormHelperText>{fieldState.error?.message}</FormHelperText>
                </FormControl>
            )}
        />
    );
}
