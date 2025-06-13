import BlogPostModel, { IBlogPost } from "@/database/models/blog-posts.model";
import mongoose from "mongoose";
import { IContentService } from "../types-interfaces-classes/content-manager";


export class BlogPostService implements IContentService<IBlogPost> {
    async getAll() {
        return BlogPostModel.find({});
    }

    async getBySlug(slug: string) {
        return BlogPostModel.findOne({ slug });
    }

    async create(content: Partial<IBlogPost>) {
        return BlogPostModel.create(content);
    }

    async update(id: mongoose.Types.ObjectId, updates: Partial<IBlogPost>) {
        return BlogPostModel.findByIdAndUpdate(id, updates, { new: true });
    }

    async delete(id: mongoose.Types.ObjectId) {
        await BlogPostModel.findByIdAndDelete(id);
    }
}
