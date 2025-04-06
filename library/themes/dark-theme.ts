import { ThemeOptions, createTheme } from '@mui/material/styles';
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


// This is a light theme for Material-UI, using the Genos font and custom color palette
export const lightTheme: ThemeOptions = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#60abe4',
        },
        secondary: {
            main: '#8f11cc',
        },
    },
    typography: {
        fontFamily: `${genos.style.fontFamily}, ${asap.style.fontFamily}, "Roboto", "Helvetica", "Arial", sans-serif`,
        h1: {
            fontFamily: genos.style.fontFamily,
            fontWeight: 700,
        },
        h2: {
            fontFamily: genos.style.fontFamily,
            fontWeight: 600,
        },
        h3: {
            fontFamily: genos.style.fontFamily,
            fontWeight: 500,
        },
        h4: {
            fontFamily: genos.style.fontFamily,
            fontWeight: 400,
        },
        h5:{
            fontFamily: genos.style.fontFamily,
            fontWeight: 400,
        },
        h6: {
            fontFamily: genos.style.fontFamily,
            fontWeight: 400,
        },
        body1: {
            fontFamily: asap.style.fontFamily,
            fontWeight: 400,
        },
        body2:{
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
        caption:{
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
                    backgroundColor: '#689f38',
                    color: '#fff',
                },
            }
        },
    },
});