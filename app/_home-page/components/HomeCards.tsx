"use client"

import ComponentTransition from '@/components/layout/ComponentTransition';
import { MotionDiv } from '@/components/motion/MotionDiv';
import { Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react'
import Link from 'next/link';

type HeroCardType = {
    label: string;
    photo: string;
    path: string;
}

const heroCards: HeroCardType[] = [
    {
        label: "Technology & Innovation",
        photo: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1744145213/DALL_E_2025-03-12_23.52.30_-_A_high-resolution_3D-styled_abstract_design_featuring_a_liquid_metal_and_carbon_blob_loosely_forming_the_concept_of_community_and_forward_thinking._T_fsckzk.webp",
        path: "/technology"
    },
    {
        label: "Real Estate, Investments & Finance",
        photo: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586750/DALL_E_2025-03-12_08.06.01_-_A_high-resolution_3D-styled_abstract_design_featuring_a_liquid_metal_and_carbon_blob_loosely_forming_the_shape_of_a_luxury_single-family_home._The_st_gutqjj.webp",
        path: "/investments"
    },
    {
        label: "Blog",
        photo: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1744145356/bfhxgiu3kmwni98wkvif_yn20fc.webp",
        path: "/blog"
    }
];


const HomeCards = ({ }) => {

    return (
        <ComponentTransition
            id="home-cards"
        >
            <MotionDiv className=" flex justify-between relative -left-6 px-6 md:gap-10 ">

                {
                    heroCards.map((c, i) => {
                        return (
                            <div
                                key={`${c.label} ${i}`}
                            >
                                <HomeCard
                                    item={c}
                                />
                            </div>
                        )
                    })
                }
            </MotionDiv>

        </ComponentTransition>
    )
}



export default HomeCards;


export const HomeCard: React.FC<{ item: HeroCardType }> = ({ item }) => {

    return (
        <MotionDiv className='flex flex-col gap-3 justify-center items-center mt-20'
            onClick={() => { }}
        >
            <Link
                href={item.path}
            >
                <MotionDiv className='w-[200px] h-[200px]'>
                    <Image alt={`${item.label}`}
                        src={item.photo}
                        sizes='100vw'
                        width={9}
                        height={16}
                        className='w-full h-full rounded-4xl'
                    />
                </MotionDiv>
            </Link>

            <Link
                href={item.path}
            >
                <Typography variant="subtitle1"
                    fontWeight={600}
                    className="w-full text-center"
                >
                    {item.label}
                </Typography>
            </Link>


        </MotionDiv>
    )
}