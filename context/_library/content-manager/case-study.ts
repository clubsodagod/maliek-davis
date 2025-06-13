
import mongoose from "mongoose";
import CaseStudy, { CaseStudyDocument } from "@/database/models/case-study.model";
import { IContentService } from "./types-interfaces-classes/content-manager";
import connectToDB from "@/database/connect-to-db.database";

export class CaseStudyService implements IContentService<CaseStudyDocument> {
    async getAll() {
        await connectToDB()
        return CaseStudy.find({});
    }

    async getBySlug(slug: string) {
        await connectToDB()
        return CaseStudy.findOne({ slug });
    }

    async create(content: Partial<CaseStudyDocument>) {
        await connectToDB()
        return CaseStudy.create(content);
    }

    async update(id: mongoose.Types.ObjectId, updates: Partial<CaseStudyDocument>) {
        await connectToDB()
        return CaseStudy.findByIdAndUpdate(id, updates, { new: true });
    }

    async delete(id: mongoose.Types.ObjectId) {
        await connectToDB()
        await CaseStudy.findByIdAndDelete(id);
    }
}
