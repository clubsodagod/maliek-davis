"use client"

import { adminSections } from '@/app/admin/_library/copy.const';
import { MotionDiv } from '@/components/motion/MotionDiv';
import React from 'react'
import { ContentManagerCard } from '../../content-manager/ContentManagerCards';





const AdminSectionCards = ({ }) => {

    return (
        <MotionDiv
            className='w-full h-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-12'
        >
            {
                adminSections.map((s, i) => {
                    return (
                        <ContentManagerCard
                            key={`${s.name} : ${i}`}
                            section={s}
                        />
                    )
                })
            }
        </MotionDiv>
    )
}



export default AdminSectionCards;

