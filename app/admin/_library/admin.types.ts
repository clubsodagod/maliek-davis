import { IAnnouncement } from "@/database/models/announcement.model";
import { IBlogPost } from "@/database/models/blog-posts.model";
import { CaseStudyDocument } from "@/database/models/case-study.model";
import { ICategory } from "@/database/models/category.model";
import { ISubcategory } from "@/database/models/subcategory.model";

export type FormType = "announcement" | "category" | "subcategory" | "blog-post" | "case-study";

export interface AnnouncementWrapper {
    type: "announcement";
    payload: IAnnouncement;
}

export interface BlogPostWrapper {
    type: "blog-post";
    payload: IBlogPost;
}

export interface CaseStudyWrapper {
    type: "case-study";
    payload: CaseStudyDocument;
}

export interface CategoryWrapper {
    type: "category";
    payload: ICategory;
}

export interface SubcategoryWrapper {
    type: "subcategory";
    payload: ISubcategory;
}

export type ContentItem =
    | AnnouncementWrapper
    | BlogPostWrapper
    | CaseStudyWrapper
    | CategoryWrapper
    | SubcategoryWrapper;
