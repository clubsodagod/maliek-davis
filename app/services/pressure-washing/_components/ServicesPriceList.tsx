"use client"

import React from 'react'
import { serviceCards } from '../_library/price-list.const';
import ServiceCard from './ServiceCard';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';


const ServicesPriceList = ({ }) => {

    const sectionRef = React.useRef(null);



    return (

        <div className=" mx-auto">
            <SectionWrapper
                ref={sectionRef}
                id={`pressure-washing`}
                whileInView={{ opacity: 1 }}
                initial={initialHeaderAnimation}
                animate={animateHeaderAnimation}
                transition={transitionHeaderAnimation}
                exit={{ opacity: 0, scaleY: 0 }}
            >
                <div
                    className='flex flex-col justify-center max-w-full h-full grow  sm:px-[12.5vw] gap-10'
                >

                    <h2 className="text-4xl font-semibold text-center">Services</h2>

                    <div className="flex flex-wrap gap-40 gap-y-30 justify-center mt-10">
                        {serviceCards.map((card, idx) => (
                            <ServiceCard
                                key={idx}
                                title={card.title}
                                icon={card.icon}
                                services={card.services}
                            />
                        ))}
                    </div>
                </div>


            </SectionWrapper>
        </div>


    )
}



export default ServicesPriceList;