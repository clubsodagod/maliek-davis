import mongoose, { Schema, Document } from "mongoose";
import { ICategory } from "./category.model";
import { IUser } from "./user.model";


/**
 * Mongoose schema for reports.
 */
export const ReportSchema = new Schema<IReport>(
    {
        userId: { type: String, required: true },
        reason: { type: String, required: true },
        reportedAt: { type: Date, required: true },
    },
    { _id: false }

);


export interface IBlogPost extends Document {
    title: string;
    slug: string;
    featuredImg: string;
    featuredVideo: string;
    content: string;
    author: IUser;
    category: ICategory;
    subcategories: mongoose.Types.ObjectId[];
    tags: string[];
    createdAt: Date;
    updatedAt: Date;

    // SEO Enhancements
    metaDescription: string;
    seoKeywords: string[];
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    twitterTitle: string;
    twitterDescription: string;
    twitterImage: string;

    // Metrics Collection
    viewCount: number;
    likeCount: number;
    shareCount: number;
    commentCount: number;

    // Content Prioritization
    expireDate: Date;
    featured: boolean;

    // Miscellaneous
    readingTime: string; // Changed to number for simplicity
    language: string;
    relatedPosts: mongoose.Types.ObjectId[];
    comments: mongoose.Types.ObjectId[];
    upVotes: mongoose.Types.ObjectId[];
    downVotes: mongoose.Types.ObjectId[];
    favorites: mongoose.Types.ObjectId[];
    reactions: mongoose.Types.ObjectId[];
    reports: IReport[];
}

const BlogPostSchema = new Schema<IBlogPost>({

    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    featuredImg: { type: String },
    featuredVideo: { type: String },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    subcategories: [{ type: Schema.Types.ObjectId, ref: "Subcategory" }],
    tags: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

    // SEO Enhancements
    metaDescription: { type: String },
    seoKeywords: [{ type: String }],
    ogTitle: { type: String },
    ogDescription: { type: String },
    ogImage: { type: String },
    twitterTitle: { type: String },
    twitterDescription: { type: String },
    twitterImage: { type: String },

    // Metrics Collection
    viewCount: { type: Number, default: 0 },
    likeCount: { type: Number, default: 0 },
    shareCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },

    // Content Prioritization
    expireDate: { type: Date },
    featured: { type: Boolean, default: false },

    // Miscellaneous
    readingTime: { type: String }, // Expecting reading time in minutes
    language: { type: String, default: "en" },
    relatedPosts: [{ type: Schema.Types.ObjectId, ref: "BlogPost" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment", default: [] }],
    favorites: [{ type: mongoose.Types.ObjectId, ref: "User", default: [] }],
    upVotes: [{ type: mongoose.Types.ObjectId, ref: "User", default: [] }],
    downVotes: [{ type: mongoose.Types.ObjectId, ref: "User", default: [] }],
    reactions: [{ type: mongoose.Types.ObjectId, ref: "Reaction", default: [] }],
    reports: { type: [ReportSchema], default: [] },
});

// Middleware for updating timestamps
BlogPostSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});


// Export the model
const BlogPostModel = mongoose.models.BlogPost || mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);
export default BlogPostModel



/**
 * Interface representing a report.
 */
export interface IReport {
    userId: string;
    reason: string;
    reportedAt: Date;
}

