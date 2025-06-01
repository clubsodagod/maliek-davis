import React from 'react'
import RealEstateMainModule from './_components/RealEstateMainModule'
import { IBlogPost } from '@/database/models/blog-posts.model';
import { paginatedBlogFetcher } from '@/utility/fetchers/blog.fetcher';




const RealEstatePage = async () => {


    const posts = await paginatedBlogFetcher(0, 0) as unknown as IBlogPost[];
    
    return (
        <>
            <RealEstateMainModule posts={posts} />
        </>
    )
}

export default RealEstatePage