/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MotionDivProps } from '@/library/types/motion.types';
import { MotionDiv } from '@/components/motion/MotionDiv';
import { solutionsCTAForms } from '../../_library/form.const';
import { Typography, MenuItem } from '@mui/material';
import { IFormField } from '@/library/types/cta-form.types';


interface SolutionsCTAFormProps extends MotionDivProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    formType: number;
}

const SolutionsCTAForm: React.FC<SolutionsCTAFormProps> = ({
    open,
    setOpen,
    formType,
    ...props
}) => {

    const formTitle = () => {
        switch (formType) {
            case 0:
                return "Schedule a Consultation";
            case 1:
                return "Employment";
            case 2:
                return "Project-Based Work";
            case 3:
                return "Get A Custom Tech Roadmap";
            case 4:
                return "Networking";
            default:
                break;
        }
    }


    const handleClose = () => {
        setOpen(false);
    };

    const [formSection, setFormSection] = React.useState<number>(0);
    const [formValues, setFormValues] = React.useState<Record<string, unknown>>({});
    const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});
    const [completedFields, setCompletedFields] = React.useState<Set<string>>(new Set());

    const handleChange = (field: IFormField, value: string) => {
        setFormValues(prev => ({ ...prev, [field.name]: value }));

        let error = "";
        const validation = field.validation;

        if (field.required && !value.trim()) {
            error = "This field is required.";
        } else if (validation?.pattern && !new RegExp(validation.pattern).test(value)) {
            error = validation.message || "Invalid format.";
        } else if (validation?.minLength && value.length < validation.minLength) {
            error = validation.message || `Minimum length is ${validation.minLength}`;
        } else if (validation?.maxLength && value.length > validation.maxLength) {
            error = validation.message || `Maximum length is ${validation.maxLength}`;
        }

        setFormErrors(prev => ({ ...prev, [field.name]: error }));

        setCompletedFields(prev => {
            const updated = new Set(prev);
            if (error) {
                updated.delete(field.name);
            } else {
                updated.add(field.name);
            }
            return updated;
        });
    };

    const currentFields = solutionsCTAForms[formType]?.additionalSections[formSection]?.fields ?? [];

    // Only count required fields toward progress
    const requiredFields = currentFields.filter(field => field.required);
    const isSectionComplete = requiredFields.every(field => completedFields.has(field.name));

    return (
        <MotionDiv
            {...props}
        >
            <Dialog
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        component: 'form',
                        sx: {
                            backgroundColor: "transparent",
                            padding: 3,
                            borderRadius: "24px",
                        },
                        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries((formData as any).entries());
                            const email = formJson.email;
                            console.log(email);
                            handleClose();
                        },
                    },
                    backdrop: {
                        sx: {
                            backdropFilter: 'blur(25px)',
                            bgcolor: "transparent"
                        }
                    }
                }}
            >
                <DialogTitle
                    sx={{
                        p: 0
                    }}
                >{formTitle()}</DialogTitle>
                <DialogContent
                    sx={{
                        p: 0
                    }}
                >
                    <DialogContentText>
                        Success starts with Masterminding & Alignment!
                    </DialogContentText>

                    <Typography variant="h6">{solutionsCTAForms[formType]?.title}</Typography>
                    {
                        solutionsCTAForms[formType]?.additionalSections[formSection].fields.map((field, i) => (
                            <>

                                <TextField
                                    variant="filled"
                                    key={`${field.name} ${i}`}
                                    name={field.name}
                                    label={field.label}
                                    type={field.type === "textarea" ? "text" : field.type}
                                    multiline={field.multiline}
                                    rows={field.rows}
                                    required={field.required}
                                    select={field.type === "select"}
                                    fullWidth
                                    onChange={(e) => handleChange(field, e.target.value)}
                                    error={Boolean(formErrors[field.name])}
                                    helperText={formErrors[field.name]}
                                    value={formValues[field.name] || ""}
                                >
                                    {field.type === "select" &&
                                        field.options?.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                </TextField>
                            </>
                        ))

                    }

                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    {
                        formSection > 0 &&
                        <Button
                            onClick={() => {
                                setFormSection(formSection - 1);
                            }}
                        >
                            Previous
                        </Button>
                    }
                    <Button
                        disabled={!isSectionComplete}
                        onClick={()=>{
                            if (formSection < solutionsCTAForms[formType]?.additionalSections.length - 1) {
                                setFormSection(formSection + 1);
                            } else {
                                return
                            }
                        }}
                    >
                        Next
                    </Button>
                </DialogActions>
            </Dialog>
        </MotionDiv>
    );
}


export default SolutionsCTAForm;