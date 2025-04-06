import MainHeroHeader from '@/components/headers/MainHeroHeader'
import SectionWrapper from '@/components/wrappers/SectionWrapper'
import { brandName } from '@/library/brand.const'
import { programmerImg } from '@/library/image.cdn'
import { Button } from '@mui/material'
import Image from 'next/image'
import React from 'react'

const MainHomeHero = () => {
    return (
            <SectionWrapper
            >
                <div
                    className='grow'
                />

                <div
                    className='flex flex-col gap-3 min-h-full pb-12 md:items-center xl:justify-center'
                >
                    <div
                        className="w-full xl:w-1/2 h-full absolute  left-0 top-0 xl:left-[25%] overflow-hidden flex flex-col justify-end "
                    >
                        <Image
                            alt="Main hero Image of Maliek Davis"
                            src={programmerImg}
                            width={9}
                            height={16}
                            sizes='100vw'
                            className=''
                            style={{
                                objectFit: 'cover',
                                objectPosition: 'center',
                                width: '100%',
                                height: '80%',
                            }}
                        />
                    </div>
                    <div
                        className="gradient-transparency-overlay"
                    />
                    <div
                        className='w-full grow'
                    />
                    <div className="z-1">
                        <MainHeroHeader
                            headerLabel={brandName}
                            tagline={'Engineering the Future: Technology, Finance, and Innovation Unleashed'}
                        />
                    </div>

                    <div
                        className='section-btn-ctn flex gap-3 mt-auto'
                    >
                        <Button variant='contained' color='primary' href={'/technology/portfolio'}>
                            Explore Work
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