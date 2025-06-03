"use client"

import DynamicCreateModule from '@/app/admin/_components/common/DynamicCreateAdminModule';
import React from 'react'


const CreateBlogPostModule = ({ }) => {

    return (
        <DynamicCreateModule formType={'blog-post'}        
        />
    )
}



export default CreateBlogPostModule;