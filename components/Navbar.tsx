"use client"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { brandLogo, brandLogoAlt, brandLogoWidth, lunchBoxLogo } from '@/library/brand.const';
import Image from 'next/image';
import { navigationPaths } from '@/library/navbar-assets';
import Slide from '@mui/material/Slide';
import { useScrollTrigger } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MotionDiv } from './motion/MotionDiv';
import { wobbleAnimation } from '@/library/global.const';

const drawerWidth = 240;

function HideOnScroll({ children }: { children: React.ReactElement }) {
    const trigger = useScrollTrigger();
    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

const Navbar: React.FC<{ children?: React.ReactNode }> = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const pathname = usePathname() || '/';

    const isLunchBoxRoute =
        pathname === '/the-lunch-box' || pathname.includes('/the-lunch-box');

    // If on Lunch Box pages, show Lunch Box logo and hide nav items.
    const navItems = isLunchBoxRoute ? [] : navigationPaths;

    const desktopLogoSrc = isLunchBoxRoute ? lunchBoxLogo : brandLogoAlt;
    const mobileLogoSrc = isLunchBoxRoute ? lunchBoxLogo : brandLogo;

    const handleDrawerToggle = () => setMobileOpen(prev => !prev);

    const drawer = (
        <Box onClick={handleDrawerToggle}
            sx={{ minHeight: '100dvh', textAlign: 'center' }}>
            <div className='flex items-center justify-center py-3'>
                <Link href={'/'}>
                    <Image
                        alt={isLunchBoxRoute ? 'The Lunch Box logo' : 'Maliek Davis brand logo'}
                        src={desktopLogoSrc}
                        width={9}
                        height={16}
                        sizes='100vw'
                        style={{ objectFit: 'cover', width: `${brandLogoWidth}px`, height: 'auto' }}
                        className="cursor-pointer"
                    />
                </Link>
            </div>
            <div className='px-6'><Divider /></div>

            <List>
                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <ListItem key={item.label} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton sx={{ textAlign: 'left', py: 0 }} href={item.path}>
                                <ListItemText>
                                    <Typography
                                        variant='h6'
                                        fontWeight={600}
                                        fontSize={"1.35rem"}
                                        className={isActive ? 'animate-gradient w-fit flex items-center' : 'w-fit flex items-center'}>
                                        {item.label}
                                    </Typography>
                                </ListItemText>
                            </ListItemButton>

                            <List>
                                {item.children && item.children.map((child) => {
                                    const childActive = pathname === child.path;
                                    return (
                                        <ListItem key={child.label} sx={{ py: 0, display: "block" }}>
                                            <Link href={child.path}>
                                                <ListItemButton sx={{ textAlign: 'left' }}>
                                                    <ListItemText>
                                                        <Typography
                                                            variant='subtitle2'
                                                            fontSize={"1rem"}
                                                            className={childActive ? 'animate-gradient w-fit flex items-center' : 'w-fit flex items-center'}>
                                                            {child.label}
                                                        </Typography>
                                                    </ListItemText>
                                                </ListItemButton>
                                            </Link>

                                            {child.children && child.children.length > 0 && (
                                                <List>
                                                    {child.children.map((subChild) => {
                                                        const subActive = pathname === subChild.path;
                                                        return (
                                                            <ListItem key={subChild.label} sx={{ py: 0 }}>
                                                                <Link href={subChild.path}>
                                                                    <ListItemButton sx={{ textAlign: 'left' }}>
                                                                        <ListItemText className={subActive ? 'animate-gradient w-fit flex items-center' : 'w-fit flex items-center'}>
                                                                            <Typography
                                                                                variant='subtitle2'
                                                                                fontSize={"0.95rem"}
                                                                                className={subActive ? 'animate-gradient w-fit flex items-center' : 'w-fit flex items-center'}>
                                                                                {subChild.label}
                                                                            </Typography>
                                                                        </ListItemText>
                                                                    </ListItemButton>
                                                                </Link>
                                                            </ListItem>
                                                        )
                                                    })}
                                                </List>
                                            )}
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </ListItem>
                    )
                })}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', justifyContent: "center", width: "100%" }}>
            <CssBaseline />
            <HideOnScroll>
                <AppBar
                    component="nav"
                    sx={(theme) => ({
                        backdropFilter: "blur(25px)",
                        backgroundColor: theme.palette.mode === "dark" ? "#FAFAFA95" : "#2323239e",
                        color: theme.palette.mode === "dark" ? "#232323" : "#232323",
                        width: "97.5%",
                        left: "1.25%",
                    })}
                    className="rounded-[75px] mt-5 px-2 left-[1.25vw]"
                >
                    <Toolbar>
                        {/* Mobile: hamburger + brand */}
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { md: 'none' } }}
                        >
                            <div className='flex items-center justify-center py-3'>
                                <Image
                                    alt={isLunchBoxRoute ? 'The Lunch Box logo' : 'Maliek Davis brand logo'}
                                    src={mobileLogoSrc}
                                    width={9}
                                    height={16}
                                    sizes='100vw'
                                    style={{ objectFit: "cover", width: `85px`, height: `auto` }}
                                    className='cursor-pointer'
                                />
                            </div>
                        </IconButton>

                        {/* Desktop logo */}
                        <Link href={'/'}>
                            <Image
                                alt={isLunchBoxRoute ? 'The Lunch Box logo' : 'Maliek Davis brand logo'}
                                src={desktopLogoSrc}
                                width={9}
                                height={16}
                                sizes='100vw'
                                style={{ objectFit: "cover", width: `100px`, height: `auto` }}
                                className="cursor-pointer hidden md:block "
                            />
                        </Link>

                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }} />

                        {/* Desktop nav items (empty on Lunch Box routes) */}
                        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                            {navItems.map((item) => {
                                const isActive = pathname === item.path;
                                return (
                                    <Link key={`${item.label} alt`} href={item.path}>
                                        <MotionDiv
                                            {...(isActive ? wobbleAnimation : {})}
                                            className='inline-flex items-center justify-center px-4 py-2 rounded-lg'
                                        >
                                            <Typography
                                                sx={(theme) => ({
                                                    color: isActive
                                                        ? 'transparent'
                                                        : theme.palette.mode === 'dark'
                                                            ? '#232323'
                                                            : '#FAFAFA',
                                                    fontSize: '1.5rem',
                                                    fontWeight: isActive ? 700 : 100,
                                                    backgroundImage: isActive
                                                        ? 'linear-gradient(47deg, #bf40ff 21%, #fafafa 67%, #69beff 81%)'
                                                        : undefined,
                                                    backgroundSize: isActive ? '600% 600%' : undefined,
                                                    animation: isActive ? 'gradientShift 6s ease infinite' : undefined,
                                                    backgroundClip: isActive ? 'text' : undefined,
                                                    WebkitBackgroundClip: isActive ? 'text' : undefined,
                                                    WebkitTextFillColor: isActive ? 'transparent' : undefined,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    width: 'fit-content',
                                                    transition: 'color 0.3s ease',
                                                    '&:hover': {
                                                        color: theme.palette.mode === 'dark' ? '#a855f7' : '#2563eb',
                                                    },
                                                })}
                                                variant="subtitle1"
                                                component={Button}
                                            >
                                                {item.label}
                                            </Typography>
                                        </MotionDiv>
                                    </Link>
                                )
                            })}
                        </Box>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>

            <nav>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={(theme) => ({
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            backgroundColor: theme.palette.mode === "dark" ? "#FAFAFA95" : "#2323239e",
                            color: theme.palette.mode === "dark" ? "#232323" : "#FAFAFA",
                        },
                        '& .MuiBackdrop-root': { backdropFilter: "blur(25px)" },
                    })}
                >
                    {drawer}
                </Drawer>
            </nav>
        </Box>
    );
}

export default Navbar;
