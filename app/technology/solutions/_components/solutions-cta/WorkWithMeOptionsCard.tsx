import { Typography } from '@mui/material';
import React from 'react'
import { partnerWithMeCopy } from '../../_library/copy.const';
import Image from 'next/image';


interface WorkWithMeOptionsCardProps {
    setFormType: (type: number) => void;
    handleClickOpen: () => void;
    desktop?: boolean;
    tablet?: boolean;
    formType?: number;
}


const WorkWithMeOptionsCard:React.FC<WorkWithMeOptionsCardProps> = ({
    desktop, 
    formType, setFormType, 
    handleClickOpen,

}) => {
    return (
        <div
            style={{
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                boxShadow: "1px -6px 8px  #17171747",
            }}
            className='w-screen min-h-[30vh] md:min-h-0 md:h-full   relative -top-14 2xl:-top-30  -left-6   rounded-t-4xl px-6 py-3 flex flex-col gap-6'
        >
            <Typography variant={desktop?"h4":'h5'}  fontWeight={600}  className='text-center'>
                How would you like to work with me?
            </Typography>

            <div
                className='relative w-full h-[125px]'
            >
                <div className="w-screen flex gap-3 2xl:gap-20 overflow-x-auto absolute -left-6 2xl:justify-center">
                    {
                        partnerWithMeCopy.map((s, i) => (
                            <div key={`${s.label} ${i}`} className='flex flex-col items-center justify-center'
                                onClick={() => { setFormType(i); handleClickOpen() }}
                            >
                                <div className="flex flex-col items-center justify-center gap-2 w-[200px] ">
                                    <Image
                                        alt={s.label}
                                        src={s.photo}
                                        width={9} height={16}
                                        sizes='100vw'
                                        className='w-[100px] 2xl:w-[200px]'
                                        style={{
                                            objectFit: "contain"
                                        }}
                                    />
                                    <Typography className='text-center' variant='subtitle1' color={formType===i?"secondary.light":""} fontWeight={formType===i?800:400}>
                                        {s.label}
                                    </Typography>
                                </div>
                            </div>

                        ))
                    }
                </div>
            </div>

        </div>
    )
}

export default WorkWithMeOptionsCard