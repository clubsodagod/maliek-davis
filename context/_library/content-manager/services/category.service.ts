
import CategoryModel, { ICategory } from "@/database/models/category.model";
import mongoose from "mongoose";
import { IContentService } from "../types-interfaces-classes/content-manager";

export class CategoryService implements IContentService<ICategory> {
    async getAll() {
        return CategoryModel.find({});
    }

    async getBySlug(slug: string) {
        return CategoryModel.findOne({ slug });
    }

    async create(content: Partial<ICategory>) {
        return CategoryModel.create(content);
    }

    async update(id: mongoose.Types.ObjectId, updates: Partial<ICategory>) {
        const updated = await CategoryModel.findByIdAndUpdate(id, updates, { new: true });
        if (!updated) {
            throw new Error("Category not found");
        }
        return updated as ICategory;
    }

    async delete(id: mongoose.Types.ObjectId) {
        await CategoryModel.findByIdAndDelete(id);
    }
}
