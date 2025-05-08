/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

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
import { ContactFormType, IFormField } from '@/library/types/cta-form.types';
import { submitCTAForm } from '@/utility/fetchers/contact.fetchers';
import { IContactFormClient } from '@/database/models/cta-forms.model';
import { type } from 'os';
import { log } from 'console';


interface SolutionsCTAFormProps extends MotionDivProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    formType: number;
}
const contactFormTypeMap: ContactFormType[] = [
    "consultation",
    "employer",
    "project",
    "tech_roadmap",
    "networking",
];

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

    async function handleSubmit() {
        const isLastSection = formSection === solutionsCTAForms[formType]?.additionalSections.length - 1;
    
        if (!isSectionComplete) return;
    
        if (isLastSection) {
            try {
                await submitCTAForm(formValues as unknown as IContactFormClient);
                handleClose(); // Close dialog after successful submit
            } catch (error) {
                console.error("Form submission failed:", error);
                // Optionally handle error feedback to the user here
            }
        } else {
            setFormSection(formSection + 1);
        }
    };

    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        console.log(formValues);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        const contactType = contactFormTypeMap[formType];

        // Only set if not already set
        setFormValues(prev => {
            

            return {
                ...prev,
                type: contactType,
            };
        });
        console.log("formType", formType);
    }, [formType]); // ✅ Only run when formType changes


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
                            padding: 3,
                            borderRadius: "24px",
                            bgcolor: "#00000017"
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

                            <TextField
                                variant="filled"
                                key={`${field.name} ${i} ${field.type}`}
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
                        type="button"
                        onClick={handleSubmit}
                    >
                        {formSection === solutionsCTAForms[formType]?.additionalSections.length - 1 ? "Submit" : "Next"}
                    </Button>
                </DialogActions>
            </Dialog>
        </MotionDiv>
    );
}


export default SolutionsCTAForm;