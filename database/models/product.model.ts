import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
    name: string;
    slug: string;
    description: string;
    price: number;
    image?: string;
    category?: string;
    stock?: number;
    isActive: boolean;
    launchDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String },
        category: { type: String },
        stock: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true },
        launchDate: { type: Date },
    },
    {
        timestamps: true,
    }
);

const ProductModel =
    mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default ProductModel;
