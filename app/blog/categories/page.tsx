import React from 'react'
import CategoriesMainModule from './_components/CategoriesMainModule'
import { mockCategories } from '@/app/investments/_library/copy'
import { NormalizedCategory } from '@/library/types/blog.types';

const AllCategoriesPage = () => {

    const categories:NormalizedCategory[] = mockCategories;

    return (
        <>
            <CategoriesMainModule 
                categories={categories}
            />
        </>
    )
}

export default AllCategoriesPage