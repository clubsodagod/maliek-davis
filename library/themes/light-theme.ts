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


const primaryBase = '#60abe4'; // soft sky blue
const secondaryBase = '#8f11cc'; // bold violet

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
                size: 'large'
            },
            styleOverrides: {
                contained: {
                    background: 'linear-gradient(to right, #60abe4, #8f11cc)',
                    color: "#fafafa",
                },
                root: {
                    textTransform: 'none',
                    fontWeight: 500,
                    borderRadius: 25,
                },

            }
        },
    },
});