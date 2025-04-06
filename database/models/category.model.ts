import mongoose, { ObjectId, Document, } from "mongoose";


// Define an interface for the Category model
export interface ICategory extends Document {
    _id: ObjectId;
    name: string;
    slug: string;
    tagline: string;
    description: string;
    subcategories: mongoose.Types.ObjectId[];
    photo: string;
    video?: string;
    createdAt: Date;
    updatedAt: Date;
}