import mongoose, { ObjectId, Schema, Model, Document, model } from "mongoose";


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


// Define the Category Schema
const categorySchema = new Schema<ICategory>({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
        required: true,
    },
    tagline: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    subcategories: [{
        type: Schema.Types.ObjectId,
        ref: 'Subcategory',
    }],
    photo: {
        type: String,
        required: true,
        default: 'https://images.pexels.com/photos/17483867/pexels-photo-17483867/free-photo-of-an-artist-s-illustration-of-artificial-intelligence-ai-this-image-represents-how-machine-learning-is-inspired-by-neuroscience-and-the-human-brain-it-was-created-by-novoto-studio-as-par.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    video: {
        type: String,
        default: 'https://videos.pexels.com/video-files/18069830/18069830-uhd_2560_1440_24fps.mp4'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});



// Define the Category model
export const CategoryModel: Model<ICategory> = mongoose.models.Category || model<ICategory>('Category', categorySchema);

export default CategoryModel