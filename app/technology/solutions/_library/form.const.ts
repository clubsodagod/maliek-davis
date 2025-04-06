import { SolutionsCTAFormsMap } from "@/library/types/cta-form.types";

export const solutionsCTAForms: SolutionsCTAFormsMap = {
    "0": {
        "title": "Schedule a Consultation",
        "description": "Let's explore your goals and align on a tech-powered strategy.",
        "additionalSections": [
            {
                "title": "",
                "fields": [
                    {
                        "name": "name",
                        "label": "Full Name",
                        "type": "text",
                        "required": true,
                        "validation": {
                            "minLength": 2,
                            "maxLength": 100,
                            "message": "This field must be between 2 and 100 characters."
                        }
                    },
                    {
                        "name": "email",
                        "label": "Email Address",
                        "type": "email",
                        "required": true,
                        "validation": {
                            "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
                            "message": "Please enter a valid email address."
                        }
                    },
                    {
                        "name": "phone",
                        "label": "Phone Number",
                        "type": "tel",
                        "validation": {
                            "pattern": "^\\+?[0-9\\s\\-().]{7,15}$",
                            "message": "Please enter a valid phone number."
                        }
                    },
                    {
                        "name": "message",
                        "label": "Message",
                        "type": "textarea",
                        "multiline": true,
                        "rows": 3,
                        "validation": {
                            "maxLength": 500,
                            "message": "Please limit your message to 500 characters."
                        }
                    }
                ]
            },
            {
                "title": "Consultation Details",
                "fields": [
                    {
                        "name": "preferredDate",
                        "label": "Preferred Date",
                        "type": "date",
                        "required": true
                    },
                    {
                        "name": "preferredTime",
                        "label": "Preferred Time",
                        "type": "text"
                    },
                    {
                        "name": "topic",
                        "label": "Consultation Topic",
                        "type": "text"
                    }
                ]
            }
        ]
    },
    "1": {
        "title": "Work With Me (Employer)",
        "description": "Let me learn about the opportunity you're offering.",
        "additionalSections": [
            {
                "title": "",
                "fields": [
                    {
                        "name": "name",
                        "label": "Full Name",
                        "type": "text",
                        "required": true,
                        "validation": {
                            "minLength": 2,
                            "maxLength": 100,
                            "message": "This field must be between 2 and 100 characters."
                        }
                    },
                    {
                        "name": "email",
                        "label": "Email Address",
                        "type": "email",
                        "required": true,
                        "validation": {
                            "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
                            "message": "Please enter a valid email address."
                        }
                    },
                    {
                        "name": "phone",
                        "label": "Phone Number",
                        "type": "tel",
                        "validation": {
                            "pattern": "^\\+?[0-9\\s\\-().]{7,15}$",
                            "message": "Please enter a valid phone number."
                        }
                    },
                    {
                        "name": "message",
                        "label": "Message",
                        "type": "textarea",
                        "multiline": true,
                        "rows": 3,
                        "validation": {
                            "maxLength": 500,
                            "message": "Please limit your message to 500 characters."
                        }
                    }
                ]
            },
            {
                "title": "Opportunity Information",
                "fields": [
                    {
                        "name": "companyName",
                        "label": "Company Name",
                        "type": "text",
                        "required": true,
                        "validation": {
                            "minLength": 2,
                            "maxLength": 100,
                            "message": "This field must be between 2 and 100 characters."
                        }
                    },
                    {
                        "name": "roleTitle",
                        "label": "Role Title",
                        "type": "text"
                    },
                    {
                        "name": "workType",
                        "label": "Work Type",
                        "type": "select",
                        "options": [
                            "Full-time",
                            "Part-time",
                            "Contract",
                            "Freelance",
                            "Internship"
                        ]
                    },
                    {
                        "name": "employmentModel",
                        "label": "Employment Model",
                        "type": "select",
                        "options": [
                            "Remote",
                            "On-site",
                            "Hybrid"
                        ]
                    }
                ]
            },
            {
                "title": "Compensation & Details",
                "fields": [
                    {
                        "name": "startDate",
                        "label": "Proposed Start Date",
                        "type": "date"
                    },
                    {
                        "name": "duration",
                        "label": "Estimated Duration",
                        "type": "text"
                    },
                    {
                        "name": "compensation",
                        "label": "Compensation / Salary Offer",
                        "type": "text"
                    },
                    {
                        "name": "benefits",
                        "label": "Benefits",
                        "type": "textarea",
                        "multiline": true,
                        "rows": 3,
                        "validation": {
                            "maxLength": 500,
                            "message": "Please limit your message to 500 characters."
                        }
                    },
                    {
                        "name": "equityOrBonuses",
                        "label": "Equity or Bonuses",
                        "type": "text"
                    },
                    {
                        "name": "schedule",
                        "label": "Schedule / Time Zone",
                        "type": "text"
                    }
                ]
            },
            {
                "title": "About the Company",
                "fields": [
                    {
                        "name": "website",
                        "label": "Company Website",
                        "type": "text"
                    },
                    {
                        "name": "companyBackground",
                        "label": "Company Background",
                        "type": "textarea",
                        "multiline": true,
                        "rows": 4,
                        "validation": {
                            "maxLength": 500,
                            "message": "Please limit your message to 500 characters."
                        }
                    },
                    {
                        "name": "projectDescription",
                        "label": "Project or Role Description",
                        "type": "textarea",
                        "multiline": true,
                        "rows": 4,
                        "validation": {
                            "maxLength": 500,
                            "message": "Please limit your message to 500 characters."
                        }
                    },
                    {
                        "name": "techStack",
                        "label": "Tech Stack (comma-separated)",
                        "type": "text"
                    },
                    {
                        "name": "teamStructure",
                        "label": "Team Structure / Reporting Line",
                        "type": "text"
                    },
                    {
                        "name": "reasonForContact",
                        "label": "What made you reach out to me?",
                        "type": "textarea",
                        "multiline": true,
                        "rows": 3,
                        "validation": {
                            "maxLength": 500,
                            "message": "Please limit your message to 500 characters."
                        }
                    }
                ]
            }
        ]
    },
    "2": {
        "title": "Project-Based Work",
        "description": "Let's define your project needs and see how I can help you build it.",
        "additionalSections": [
            {
                "title": "",
                "fields": [
                    {
                        "name": "name",
                        "label": "Full Name",
                        "type": "text",
                        "required": true,
                        "validation": {
                            "minLength": 2,
                            "maxLength": 100,
                            "message": "This field must be between 2 and 100 characters."
                        }
                    },
                    {
                        "name": "email",
                        "label": "Email Address",
                        "type": "email",
                        "required": true,
                        "validation": {
                            "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
                            "message": "Please enter a valid email address."
                        }
                    },
                    {
                        "name": "phone",
                        "label": "Phone Number",
                        "type": "tel",
                        "validation": {
                            "pattern": "^\\+?[0-9\\s\\-().]{7,15}$",
                            "message": "Please enter a valid phone number."
                        }
                    },
                    {
                        "name": "message",
                        "label": "Message",
                        "type": "textarea",
                        "multiline": true,
                        "rows": 3,
                        "validation": {
                            "maxLength": 500,
                            "message": "Please limit your message to 500 characters."
                        }
                    }
                ]
            },
            {
                "title": "Project Overview",
                "fields": [
                    {
                        "name": "projectName",
                        "label": "Project Name",
                        "type": "text",
                        "required": true,
                        "validation": {
                            "minLength": 2,
                            "maxLength": 100,
                            "message": "This field must be between 2 and 100 characters."
                        }
                    },
                    {
                        "name": "goals",
                        "label": "Goals",
                        "type": "textarea",
                        "multiline": true,
                        "rows": 3,
                        "validation": {
                            "maxLength": 500,
                            "message": "Please limit your message to 500 characters."
                        }
                    },
                    {
                        "name": "budgetRange",
                        "label": "Estimated Budget",
                        "type": "text"
                    },
                    {
                        "name": "timeline",
                        "label": "Expected Timeline",
                        "type": "text"
                    }
                ]
            }
        ]
    },
    "3": {
        "title": "Custom Tech Roadmap",
        "description": "Get personalized technical guidance to scale your ideas effectively.",
        "additionalSections": [
            {
                "title": "",
                "fields": [
                    {
                        "name": "name",
                        "label": "Full Name",
                        "type": "text",
                        "required": true,
                        "validation": {
                            "minLength": 2,
                            "maxLength": 100,
                            "message": "This field must be between 2 and 100 characters."
                        }
                    },
                    {
                        "name": "email",
                        "label": "Email Address",
                        "type": "email",
                        "required": true,
                        "validation": {
                            "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
                            "message": "Please enter a valid email address."
                        }
                    },
                    {
                        "name": "phone",
                        "label": "Phone Number",
                        "type": "tel",
                        "validation": {
                            "pattern": "^\\+?[0-9\\s\\-().]{7,15}$",
                            "message": "Please enter a valid phone number."
                        }
                    },
                    {
                        "name": "message",
                        "label": "Message",
                        "type": "textarea",
                        "multiline": true,
                        "rows": 3,
                        "validation": {
                            "maxLength": 500,
                            "message": "Please limit your message to 500 characters."
                        }
                    }
                ]
            },
            {
                "title": "Your Current Setup",
                "fields": [
                    {
                        "name": "currentStack",
                        "label": "Current Tech Stack",
                        "type": "text"
                    },
                    {
                        "name": "companySize",
                        "label": "Company Size",
                        "type": "text"
                    },
                    {
                        "name": "priorities",
                        "label": "Top Priorities (comma-separated)",
                        "type": "text"
                    }
                ]
            }
        ]
    },
    "4": {
        "title": "Let\u2019s Connect",
        "description": "Open to meaningful connections and creative synergy.",
        "additionalSections": [
            {
                "title": "",
                "fields": [
                    {
                        "name": "name",
                        "label": "Full Name",
                        "type": "text",
                        "required": true,
                        "validation": {
                            "minLength": 2,
                            "maxLength": 100,
                            "message": "This field must be between 2 and 100 characters."
                        }
                    },
                    {
                        "name": "email",
                        "label": "Email Address",
                        "type": "email",
                        "required": true,
                        "validation": {
                            "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
                            "message": "Please enter a valid email address."
                        }
                    },
                    {
                        "name": "phone",
                        "label": "Phone Number",
                        "type": "tel",
                        "validation": {
                            "pattern": "^\\+?[0-9\\s\\-().]{7,15}$",
                            "message": "Please enter a valid phone number."
                        }
                    },
                    {
                        "name": "message",
                        "label": "Message",
                        "type": "textarea",
                        "multiline": true,
                        "rows": 3,
                        "validation": {
                            "maxLength": 500,
                            "message": "Please limit your message to 500 characters."
                        }
                    }
                ]
            },
            {
                "title": "Networking",
                "fields": [
                    {
                        "name": "reasonForContact",
                        "label": "What would you like to connect about?",
                        "type": "textarea",
                        "multiline": true,
                        "rows": 4,
                        "required": true,
                        "validation": {
                            "maxLength": 500,
                            "message": "Please limit your message to 500 characters."
                        }
                    },
                    {
                        "name": "website",
                        "label": "Your Website or Portfolio",
                        "type": "text"
                    }
                ]
            }
        ]
    }
};
