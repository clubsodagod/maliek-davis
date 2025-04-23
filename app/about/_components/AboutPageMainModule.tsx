/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import React from 'react'
import AboutMainHero from './building-blocks/main-about-hero/AboutMainHero';
import MyMission from './building-blocks/my-mission/MyMission';
import MyCoreValues from './building-blocks/core-values/MyCoreValues';
import MyVision from './building-blocks/vision/MyVision';
import CreatingImpact from './building-blocks/creating-impact/CreatingImpact';
import BeyondBusiness from './building-blocks/beyond-business/BeyondBusiness';


const AboutPageMainModule = ({ }) => {

    return (
        <>
            <AboutMainHero/>
            <MyMission />
            <MyCoreValues />
            <MyVision />
            {/* <CreatingImpact />
            <BeyondBusiness /> */}
        </>
    )
}



export default AboutPageMainModule;