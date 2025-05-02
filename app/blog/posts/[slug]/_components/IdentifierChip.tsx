import React, { FC, JSX } from 'react'
import { Grid2, Typography } from '@mui/material';
import Link from 'next/link';
import { IBlogPostClient } from '@/library/types/blog.types';
import { MotionDiv } from '@/components/motion/MotionDiv';
import { ICategory } from '@/database/models/category.model';

/**
 * `IdentifierChip` is a functional component that renders a clickable chip
 * based on the provided payload. The chip links to a category or subcategory
 * page depending on the type of payload.
 *
 * @param {Object} props - The props object.
 * @param {IBlogPostClient["category"] | IBlogPostClient["meta"]["keywords"] | undefined} props.payload - The payload which can be either a category or a subcategory.
 * @param {IBlogPostClient["category"] | undefined} props.category - The category object, required if the payload is a subcategory.
 *
 * @returns {JSX.Element} A motion-enabled div containing a link-wrapped chip component.
 */

// Function to determine the path and identifier based on the payload type
// If the payload contains subcategories, it is treated as a category
// Otherwise, it is treated as a subcategory and requires the category prop
const IdentifierChip: FC<{
    payload: string | undefined;
    category: ICategory | undefined;
}> = ({
    payload,
    category
}: { payload: string | undefined; category: ICategory | undefined; }): JSX.Element => {

        let identifier;

        let path = "";


        if (category) {

            identifier = category as IBlogPostClient["category"];
            path = `/blog/categories/${category?.slug}/subcategories/${identifier.slug}`.toLowerCase();

        } else {
            identifier = payload as string;
            path = ``.toLowerCase();
        }

        return (
            <MotionDiv
                className=''
            >

                {
                    category && (
                        <Link
                            href={path}
                        >
                            <Typography
                                variant='subtitle1'
                                className='underline'
                            >
                                {typeof identifier === 'object' && !Array.isArray(identifier) ? `#${identifier.name}` : ''}
                            </Typography>
                        </Link>)
                }
                {
                    payload && (
                        <>
                            <Grid2
                                container
                            >
                                {
                                    typeof identifier === "string" &&
                                    <Link
                                        href={path}
                                        className=''
                                    >
                                        <Typography
                                            variant='subtitle1'
                                            className={` underline   break-words`}
                                        >
                                            #{identifier}
                                        </Typography>
                                    </Link>
                                }
                            </Grid2>


                        </>

                    )
                }

            </MotionDiv>

        )
    }

export default IdentifierChip