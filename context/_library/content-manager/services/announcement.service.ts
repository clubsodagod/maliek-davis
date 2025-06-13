
import AnnouncementModel, { IAnnouncement } from "@/database/models/announcement.model";
import mongoose from "mongoose";
import { IContentService } from "../types-interfaces-classes/content-manager";

export class AnnouncementService implements IContentService<IAnnouncement> {
    async getAll() {
        return AnnouncementModel.find({});
    }

    async getBySlug(slug: string) {
        return AnnouncementModel.findOne({ slug });
    }

    async create(content: Partial<IAnnouncement>) {
        return AnnouncementModel.create(content);
    }

    async update(id: mongoose.Types.ObjectId, updates: Partial<IAnnouncement>) {
        return AnnouncementModel.findByIdAndUpdate(id, updates, { new: true });
    }

    async delete(id: mongoose.Types.ObjectId) {
        await AnnouncementModel.findByIdAndDelete(id);
    }
}
