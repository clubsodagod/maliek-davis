import { IAnnouncement } from "@/database/models/announcement.model";
import { IBlogPost } from "@/database/models/blog-posts.model";
import { ICategory } from "@/database/models/category.model";
import { CaseStudyService } from "../case-study";
import { IContentService } from "../types-interfaces-classes/content-manager";
import { AnnouncementService } from "./announcement.service";
import { BlogPostService } from "./blog-post.service";
import { CategoryService } from "./category.service";
import { CaseStudyDocument } from "@/database/models/case-study.model";

export interface IContentManagerService {
    blogPost: IContentService<IBlogPost>;
    caseStudy: IContentService<CaseStudyDocument>;
    announcement: IContentService<IAnnouncement>;
    category: IContentService<ICategory>;
}

export class ContentManagerService implements IContentManagerService {
    blogPost: IContentService<IBlogPost>;
    caseStudy: IContentService<CaseStudyDocument>;
    announcement: IContentService<IAnnouncement>;
    category: IContentService<ICategory>;

    constructor() {
        this.blogPost = new BlogPostService();
        this.caseStudy = new CaseStudyService();
        this.announcement = new AnnouncementService();
        this.category = new CategoryService();
    }
}
