"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import React from 'react'
import AccessFormCard from '../common/AccessFormCard';


const MainLoginModule = ({ }) => {

    const sectionRef = React.useRef<HTMLDivElement>(null);

    return (
        <>
            <SectionWrapper
                id='admin-login-section'
                ref={sectionRef}
                whileInView={{ opacity: 1 }}
                initial={initialHeaderAnimation}
                animate={animateHeaderAnimation}
                transition={transitionHeaderAnimation}
                exit={{ opacity: 0, scaleY: 0 }}
            >

                <MainHeroHeader
                    headerLabel={'Admin Login'}
                    tagline={`Let's Get You Back to Work!`}
                    size='lg'
                    center="md:text-center"
                />


                <div
                    className=' md:px-[12vw] lg:px-[15vw] 2xl:px-[20vw] 2xl:pt-30'
                >

                    <AccessFormCard label={'Login'} open={false} index={0}
                    />
                </div>

            </SectionWrapper>
        </>
    )
}



export default MainLoginModule;