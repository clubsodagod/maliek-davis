import React from 'react'
import CategoriesMainModule from './_components/CategoriesMainModule'
import { ICategory } from '@/database/models/category.model';
import { getAllBlogPostCategories } from '@/utility/fetchers/blog.fetcher';

export default async function AllCategoriesPage() {

    const categories = await getAllBlogPostCategories() as unknown as ICategory[];

    return (
        <>
            <CategoriesMainModule 
                categories={categories}
            />
        </>
    )
}
