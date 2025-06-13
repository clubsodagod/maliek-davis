"use server"

import connectToDB from "@/database/connect-to-db.database";
import CategoryModel, { ICategory } from "@/database/models/category.model";

export async function getCategoryBySlug(categorySlug: string): Promise<ICategory | null> {
    try {
        await connectToDB();

        const category = await CategoryModel.findOne({ slug: categorySlug }).lean<ICategory>().exec();

        return category || null;
    } catch (error) {
        console.error(`getCategoryBySlug error [${categorySlug}]:`, error);
        return null;
    }
}