import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from "next/server";

type BuyerFormData = {
    fullName: string;
    email: string;
    phone: string;
    companyName: string;
    marketAreas: string[];
    propertyTypes: string[];
    priceRange: { min: number; max: number };
    preferredCloseTime: string;
    fundingSource: string;
    volumeGoalPerMonth: number;
    notes: string;
    proofOfFundsFile: string | null; // base64 string expected
};

// Configure Cloudinary (use environment variables in production)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: NextRequest) {
    try {
        const data: BuyerFormData = await req.json();
        console.log('[Prestige Buyer Form Data]', data);

        if (!data.fullName || !data.email || !data.phone) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        let uploadedProofUrl = null;

        // Handle file upload if exists
        if (data.proofOfFundsFile) {
            const uploadResponse = await cloudinary.uploader.upload(data.proofOfFundsFile, {
                folder: 'proof_of_funds',
                resource_type: 'image', // or 'auto' if it could be PDF, etc.
            });
            uploadedProofUrl = uploadResponse.secure_url;
            console.log('[Cloudinary Upload]', uploadResponse);
        }

        // Example: Save to DB, send email, etc.
        console.log('[Prestige Buyer Form]', {
            ...data,
            proofOfFundsFile: uploadedProofUrl,
        });

        return NextResponse.json({
            message: 'Form submitted successfully',
            proofOfFundsUrl: uploadedProofUrl,
        });
    } catch (error) {
        console.error('[Prestige Buyer Error]', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
