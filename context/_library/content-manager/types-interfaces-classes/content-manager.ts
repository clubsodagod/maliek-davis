import mongoose from "mongoose";

export interface IContentService<T> {
    getAll(): Promise<T[]>;
    getBySlug(slug: string): Promise<T | null>;
    create(content: Partial<T>): Promise<T>;
    update(id: mongoose.Types.ObjectId, updates: Partial<T>): Promise<T>;
    delete(id: mongoose.Types.ObjectId): Promise<void>;
}
