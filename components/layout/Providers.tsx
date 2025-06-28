"use client";
import React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from '@/library/themes/light-theme';
import Navbar from '../Navbar';
import AppServiceProvider from '@/context/AppContext';
import AuthProvider from './AuthProvider';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Toaster } from 'react-hot-toast';


const Providers: React.FC<{
    children: React.ReactNode;
}> = ({
    children
}) => {
        return (
            <AppRouterCacheProvider options={{ enableCssLayer: true }}>
                <AuthProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <ThemeProvider theme={lightTheme}>
                            <AppServiceProvider>
                                <Navbar />
                                <Toaster 
                                    position="top-right"
                                />

                                {children}
                            </AppServiceProvider>
                        </ThemeProvider>
                    </LocalizationProvider>

                </AuthProvider>

            </AppRouterCacheProvider>
        )
    }

export default Providers