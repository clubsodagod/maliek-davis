"client"
import { ReactionFormType, ResponseStatus } from "@/context/_library/classes-types-interaces";
import { IBlogPost } from "@/database/models/blog-posts.model";
import { apiUrl } from "@/library/global.const";
import { IBlogPostClient } from "@/library/types/blog.types";
import "dotenv"
import mongoose from "mongoose";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function paginatedBlogFetcher(skip: number, limit: number): Promise<IBlogPostClient[] | { error: boolean; message: string }> {
    try {

        const posts = await fetch(`https://dedicated-server-0wnc.onrender.com/api/articles/get/all`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })

        console.log(posts);


        if (!posts.ok) {
            throw new Error(`${await posts.json().then((res) => res.message)}`)
        }

        const response = await posts.json().then((res) => res.blogPosts) as IBlogPostClient[];

        return response

    } catch (error) {
        return { error: true, message: `Error: ${error}` }
    }
}


export async function getAllBlogPostCategories() {

    try {

        // define categories response object
        const response = await fetch(`https://dedicated-server-0wnc.onrender.com/api/articles/category/get/all`, {
            method: "GET"
        })

        if (!response.ok) {
            throw new Error("There was an error fetching categories.")
        }

        return await response.json().then((res) => res.categories)
    } catch (error) {
        console.error(`An error arose while fetching request: ${error} `)
    }
}

export async function getContentReactions(blogID: mongoose.Types.ObjectId) {
    try {

        const response = await fetch(`${apiUrl}/interactions/reactions/${blogID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`There was an error with your request. Please try again.`)
        } else {
            const data = await response.json().then((res) => res.contentReactions);
            console.log(data)
            return data
        }
    } catch (error) {
        console.warn("Error:", error)
        return {
            error: true, message: `${error}`
        }
    }
}


export async function reactToContent(reaction: ReactionFormType): Promise<ResponseStatus> {
    try {

        const response = await fetch(`${apiUrl}/interactions/react`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ reactionForm: reaction })
        });

        if (!response.ok) {
            throw new Error(`There was an error with your request. Please try again.`)
        } else {
            console.log(await response.json())
            return {
                error: false, message: `Success.`
            }
        }

    } catch (error) {
        console.warn("Error:", error)
        return {
            error: true, message: `${error}`
        }
    }
}


export async function getBlogPostBySlug(blogSlug: string): Promise<IBlogPost | null> {

    try {

        const response = await fetch(`${apiUrl}/articles/get/post-by-slug`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ slug: blogSlug })
        })

        if (!response.ok) {
            throw new Error(`${await response.json().then((res) => res.message)}`)
        }

        const blogPost = await response.json().then((res) => res.blogPost) as IBlogPost;

        return blogPost

    } catch (error) {
        console.error(`There was an unexpected error: ${error}`)
        return null
    }
}