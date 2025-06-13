"use client";

import React from 'react';
import {
    useMediaQuery,
    Box,
    Typography,
} from '@mui/material';
import MainHeroHeader from '@/components/headers/MainHeroHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import {
    initialHeaderAnimation,
    animateHeaderAnimation,
    transitionHeaderAnimation,
} from '@/library/animations/enter.animations';
import ComponentTransition from '@/components/layout/ComponentTransition';

const WhatIBuy = () => {
    const sectionRef = React.useRef(null);
    const desktop = useMediaQuery(`(min-width:1100px)`);

    const items = [
        {
            label: 'Distressed or outdated homes',
            photo: 'https://images.pexels.com/photos/4947011/pexels-photo-4947011.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        },
        {
            label: 'Inherited or probate properties',
            photo: 'https://images.pexels.com/photos/6841228/pexels-photo-6841228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        },
        {
            label: 'Homes facing foreclosure or with liens',
            photo: 'https://www.moneydigest.com/img/gallery/problematic-things-youll-find-in-a-foreclosed-home/intro-1721575737.jpg',
        },
        {
            label: 'Rental properties with or without tenants',
            photo: 'https://www.rentecdirect.com/blog/wp-content/uploads/2017/12/for-rent-sign.jpg',
        },
        {
            label: 'Vacant, abandoned, or fire-damaged homes',
            photo: 'https://cdn.carrot.com/uploads/sites/42864/2022/11/Selling-a-House-with-Fire-Damage-in-Texas.jpg',
        },
        {
            label: 'Properties with back taxes or title issues',
            photo: 'https://media.licdn.com/dms/image/v2/D4E12AQEkS205yIxFzQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1724683868084?e=2147483647&v=beta&t=Nc9IcTMCzTVNIKOvZXZbTWny0fPNYIuGXE49vvhBjTg',
        },
    ];


    return (
        <SectionWrapper
            id="what-i-buy-section"
            ref={sectionRef}
            whileInView={{ opacity: 1 }}
            initial={initialHeaderAnimation}
            animate={animateHeaderAnimation}
            transition={transitionHeaderAnimation}
            exit={{ opacity: 0, scaleY: 0 }}
            className="bg-gray-50 py-16 px-6"
        >
            <Box className="max-w-4xl mx-auto text-center flex flex-col gap-10">
                <MainHeroHeader
                    headerLabel="What I Buy"
                    headerLabelClassName="md:text-center"
                    taglineClassName="md:text-center"
                    tagline="I purchase all types of properties — in any condition:"
                    size={!desktop ? 'lg' : 'lg'}
                />

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                        gap: 4,
                        mx: 'auto',
                    }}
                >
                    {items.map(({ label, photo }, index) => (
                        <ComponentTransition
                            id={`what-i-buy-item-${index}`}
                            key={`what-i-buy-item-${index}`}
                        >

                            <Box
                                sx={{
                                    boxShadow: 3,
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    backgroundColor: 'white',
                                }}
                            >
                                <Box
                                    sx={{
                                        height: 180,
                                        backgroundImage: `url(${photo})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                />
                                <Box p={2}>
                                    <Typography variant="body1" fontWeight="500" textAlign="center">
                                        {label}
                                    </Typography>
                                </Box>
                            </Box>
                        </ComponentTransition>
                    ))}
                </Box>
            </Box>
        </SectionWrapper>
    );
};

export default WhatIBuy;
