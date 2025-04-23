import React from 'react'
import BlogPageMainModule from './_components/BlogPageMainModule'
import { allPostsMockRealEstate } from '../investments/_library/copy'

const BlogPage = () => {
    return (
        <BlogPageMainModule posts={allPostsMockRealEstate}/>
    )
}

export default BlogPage