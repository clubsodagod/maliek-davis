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
import { brandLogo, brandLogoWidth } from '@/library/brand.const';
import Image from 'next/image';
import { navigationPaths } from '@/library/navbar-assets';
import Slide from '@mui/material/Slide';
import { useScrollTrigger } from '@mui/material';
import Link from 'next/link';


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

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', minHeight: "100dvh" }} color="#fafafa"  >
            <div
                className='flex items-center justify-center py-3'
            >

                <Link href={'/'} >
                    <Image
                        alt='Maliek Davis brand logo'
                        src={brandLogo}
                        width={9}
                        height={16}
                        sizes='100vw'
                        style={{
                            objectFit: "cover", width: `${brandLogoWidth}px`, height: `auto`
                        }}
                        className="cursor-pointer"
                    />

                </Link>
            </div>
            <div className='px-6'>
                <Divider />
            </div>

            <List>
                {navigationPaths.map((item) => (
                    <ListItem key={item.label} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton sx={{ textAlign: 'left', py: 0 }} href={item.path}>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                        <List>
                            {item.children && item.children.map((child) => {
                                return (
                                    <ListItem key={child.label} sx={{ py: 0, display: "block" }}>
                                        <Link href={child.path}>
                                            <ListItemButton sx={{ textAlign: 'left' }}>
                                                <ListItemText primary={child.label} />
                                            </ListItemButton>
                                        </Link>

                                        {
                                            child.children && child.children.length > 0 &&
                                            <List>
                                                {child.children.map((subChild) => (
                                                    <ListItem key={subChild.label} sx={{ py: 0 }}>
                                                        <Link href={subChild.path}>
                                                            <ListItemButton sx={{ textAlign: 'left' }} >
                                                                <ListItemText primary={subChild.label} />
                                                            </ListItemButton>
                                                        </Link>
                                                    </ListItem>
                                                ))}
                                            </List>
                                        }
                                    </ListItem>

                                )
                            })}
                        </List>
                    </ListItem>
                ))}
            </List>
        </Box>
    );


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <HideOnScroll>
                <AppBar component="nav" sx={{ bgcolor: "#60abe425", backdropFilter: "blur(25px)" }}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <div
                                className='flex items-center justify-center py-3'
                            >

                                <Image
                                    alt='Maliek Davis brand logo'
                                    src={brandLogo}
                                    width={9}
                                    height={16}
                                    sizes='100vw'
                                    style={{
                                        objectFit: "cover", width: `${75}px`, height: `auto`
                                    }}
                                    className='cursor-pointer'
                                />
                            </div>
                        </IconButton>
                        <Link href={'/'} >
                            <Image
                                alt='Maliek Davis brand logo'
                                src={brandLogo}
                                width={9}
                                height={16}
                                sizes='100vw'
                                style={{
                                    objectFit: "cover", width: `${75}px`, height: `auto`
                                }}
                                className="cursor-pointer hidden sm:block "
                            />
                        </Link>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >

                        </Typography>
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            {navigationPaths.map((item) => (
                                <Button key={`${item.label} alt`} sx={{ color: '#fff' }} href={item.path}>
                                    {item.label}
                                </Button>
                            ))}
                        </Box>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>

            <nav>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: "#60abe425", },
                        '& .MuiBackdrop-root': { backdropFilter: "blur(25px)" },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
        </Box>
    );
}

export default Navbar;