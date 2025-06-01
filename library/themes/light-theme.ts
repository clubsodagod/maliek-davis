"use client";
import { ThemeOptions, createTheme, alpha, getContrastRatio } from '@mui/material/styles';
import { Asap, Genos } from 'next/font/google';

const genos = Genos({
    variable: '--font-genos',
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
});

const asap = Asap({
    variable: '--font-asap',
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
});


export const primaryBase = '#60abe4'; // soft sky blue
export const secondaryBase = '#8f11cc'; // bold violet

const primaryMain = alpha(primaryBase, 1);
const secondaryMain = alpha(secondaryBase, 1);

// This is a light theme for Material-UI, using the Genos font and custom color palette
export const lightTheme: ThemeOptions = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: primaryMain,
            light: alpha(primaryBase, 0.5),
            dark: alpha(primaryBase, 0.9),
            contrastText: getContrastRatio(primaryMain, '#fff') > 4.5 ? '#fff' : '#111',
        },
        secondary: {
            main: secondaryMain,
            light: alpha(secondaryBase, 0.5),
            dark: alpha(secondaryBase, 0.9),
            contrastText: getContrastRatio(secondaryMain, '#fff') > 4.5 ? '#fff' : '#111',
        },
    },
    typography: {
        fontFamily: `${genos.style.fontFamily}, ${asap.style.fontFamily}, "Roboto", "Helvetica", "Arial", sans-serif`,
        h1: {
            fontFamily: genos.style.fontFamily,
            fontWeight: 700,
            lineHeight: 0.75
        },
        h2: {
            fontFamily: genos.style.fontFamily,
            fontWeight: 700,
        },
        h3: {
            fontFamily: genos.style.fontFamily,
            fontWeight: 700,
        },
        h4: {
            fontFamily: genos.style.fontFamily,
            fontWeight: 700,
        },
        h5: {
            fontFamily: genos.style.fontFamily,
            fontWeight: 700,
        },
        h6: {
            fontFamily: genos.style.fontFamily,
            fontWeight: 400,
        },
        body1: {
            fontFamily: asap.style.fontFamily,
            fontWeight: 400,
        },
        body2: {
            fontFamily: asap.style.fontFamily,
            fontWeight: 400,
        },
        overline: {
            fontFamily: asap.style.fontFamily,
            fontWeight: 400,
        },
        subtitle1: {
            fontFamily: asap.style.fontFamily,
            fontWeight: 400,
        },
        subtitle2: {
            fontFamily: asap.style.fontFamily,
            fontWeight: 400,
        },
        caption: {
            fontFamily: asap.style.fontFamily,
            fontWeight: 400,
        },
    },
    spacing: 8,
    direction: 'rtl',
    shape: {
        borderRadius: 4,
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                colorInherit: {
                    backgroundColor: '#232323',
                    color: '#fff',
                },
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: '#fafafa',
                    color: '#212121',
                },
            }
        },
        MuiButton: {
            defaultProps: {
                size: 'large',
            },
            styleOverrides: {
                contained: {
                    background: 'linear-gradient(to right, #60abe4, #8f11cc)',
                    color: '#fafafa',
                },
                root: {
                    textTransform: 'none',
                    fontWeight: 500,
                    borderRadius: 25,

                    // Default transition for smooth effect
                    transition: 'all 0.3s ease',

                    // Target specific button by ID
                    '&#selected-btn': {
                        background: '#000000',
                        backgroundImage: 'linear-gradient(90deg, #60abe4, #8f11cc)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        color: '#fff', // fallback for non-webkit
                        fontWeight: 600,
                        animation: 'gradientShift 3s ease infinite',  
                        boxShadow:"2px 2px 2px #000",      // Pseudo-element for black background
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            inset: 0,
                            backgroundColor: '#000000',
                            zIndex: -1,
                            borderRadius: 25,
                        },
                    },

                    // Optional: keyframes for animated gradient text
                    '@keyframes gradientShift': {
                        '0%': {
                            backgroundPosition: '0% 50%',
                        },
                        '50%': {
                            backgroundPosition: '100% 50%',
                        },
                        '100%': {
                            backgroundPosition: '0% 50%',
                        },
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    ".MuiSelect-root": {
                        color: 'var(--textfield-border-color)',
                        border: "1px solid var(--textfield-border-color)",
                    },
                    ".MuiSelect-select": {
                        color: 'var(--textfield-border-color)',
                        border: "1px solid var(--textfield-border-color)",
                    },
                    ".MuiSelect-outlined": {
                        border: "1px solid var(--textfield-border-color)",
                        color: "var(--textfield-border-color)",
                    },
                    ".MuiSelect-iconOutlined": {
                        color: 'var(--textfield-border-color)',
                    },
                    ".MuiInputLabel-root": {
                        color: 'var(--textfield-border-color)',
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    ".MuiInputLabel-formControl": {
                        color: 'red',
                    },
                    ".MuiInputLabel-root": {
                        color: 'var(--textfield-border-color)',
                    },
                },

            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    ".MuiInputLabel-root": {
                        color: 'var(--textfield-border-color)',
                    },
                    ".MuiOutlinedInput-root": {
                        border: "1px solid var(--textfield-border-color)",
                        color: "var(--textfield-border-color)",
                    },
                    ".MuiTextField-root": {
                        border: "1px solid var(--textfield-border-color)",
                    }
                },
            },
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    ".MuiFormControl-root": {
                        border: "1px solid var(--textfield-border-color)",
                        color: "var(--textfield-border-color)",
                    }
                }
            }
        },
        MuiList: {
            styleOverrides: {
                root: {
                    ".MuiList-root": {
                        listStylePosition: "inside"
                    }
                }
            }
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    ".MuiListItem-root": {
                        listStylePosition: "inside"
                    }
                },
            },
        },
    },
});