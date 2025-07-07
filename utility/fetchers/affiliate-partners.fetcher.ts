/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { ResponseStatus } from "@/context/_library/classes-types-interaces";
import connectToDB from "@/database/connect-to-db.database";
import { AffiliatePartnerModel, IAffiliatePartnerForm } from "@/database/models/affiliate-partner.model";
import { CategoryModel } from "@/database/models/category.model";
import slugify from "slugify";

export async function submitAffiliatePartner(form: IAffiliatePartnerForm): Promise<ResponseStatus> {
    try {
        await connectToDB();

        // Validate and sanitize category ObjectIds
        const validCategories = await CategoryModel.find({
            _id: { $in: form.categories },
        });

        const categoryIds = validCategories.map((cat) => cat._id);

        // Create new affiliate partner entry
        const newPartner = new AffiliatePartnerModel({
            name: form.name,
            slug: slugify(form.name.toLowerCase(), {
                lower: true,
                strict: true,
                trim: true,
            }),
            companyName: form.companyName,
            description: form.description,
            tagline: form.tagline,
            websiteUrl: form.websiteUrl,
            logoUrl: form.logoUrl,

            email: form.email,
            contactName: form.contactName,

            categories: categoryIds,
            active: form.active,

            customLinks: form.customLinks,

            affiliateCode: form.affiliateCode,
            integrationType: form.integrationType,

            notes: form.notes,

        });

        await newPartner.save();

        return {
            success: true,
            error: false,
            message: "Affiliate partner created successfully.",
            data: newPartner._id.toString(),
        };
    } catch (err: any) {
        console.error("[submitAffiliatePartner]", err);
        return {
            success: false,
            error: true,
            message: "Failed to submit affiliate partner. Please try again.",
        };
    }
}
