import MainHeroHeader from '@/components/headers/MainHeroHeader'
import LeftFloatImgTextHero from '@/components/image/LeftFloatImgTextHero'
import SectionWrapper from '@/components/wrappers/SectionWrapper'
import { brandName } from '@/library/brand.const'
import { programmerImg } from '@/library/image.cdn'
import { Button } from '@mui/material'
import React from 'react'

const MainHomeHero = () => {
    return (
            <SectionWrapper
            >
                        <MainHeroHeader
                            headerLabel={brandName}
                            tagline={''}
                            size='xl'
                        />
                <div className='max-w-full w-full h-full'>
                    <LeftFloatImgTextHero
                        imgPT='0'
                        heroText='Engineering the Future: Technology, Finance, and Innovation Unleashed'
                        photo={programmerImg}
                        pt='pt-[100px]'
                        rounded='rounded-[90px]'
                        imgWidth='w-[250px]'
                        objectFit='cover'
                    />
                    <div
                        className='section-btn-ctn flex gap-3 pt-6 min-w-full'
                    >
                        <Button variant='contained' color='primary' href={'/about'}>
                            About Me
                        </Button>
                        <Button variant='outlined' href={'/contact'}>
                            Let&apos;s Connect
                        </Button>
                    </div>
                </div>

            </SectionWrapper>


    )
}

export default MainHomeHero