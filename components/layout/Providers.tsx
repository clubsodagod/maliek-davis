"use client";
import React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from '@/library/themes/light-theme';
import Navbar from '../Navbar';
import AppServiceProvider from '@/context/AppContext';
import AuthProvider from './AuthProvider';

const Providers: React.FC<{
    children: React.ReactNode;
}> = ({
    children
}) => {
        return (
            <AppRouterCacheProvider options={{ enableCssLayer: true }}>
                <AuthProvider>
                    <ThemeProvider theme={lightTheme}>
                        <AppServiceProvider>
                            <Navbar />

                            {children}
                        </AppServiceProvider>
                    </ThemeProvider>
                </AuthProvider>

            </AppRouterCacheProvider>
        )
    }

export default Providers