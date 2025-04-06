"use client";
import React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from '@/library/themes/light-theme';
import Navbar from '../Navbar';

const Providers: React.FC<{
    children: React.ReactNode;
}> = ({
    children
}) => {
        return (
            <AppRouterCacheProvider options={{ enableCssLayer: true }}>
                <ThemeProvider theme={lightTheme}>
                    <Navbar/>
                    
                        {children}
                    
                </ThemeProvider>
            </AppRouterCacheProvider>
        )
    }

export default Providers