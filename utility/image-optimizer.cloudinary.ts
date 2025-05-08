import { v2 as cloudinary, UploadApiErrorResponse } from 'cloudinary';
import { Readable } from 'stream';
import dotenv from 'dotenv';
import { ResponseStatus } from '@/context/_library/classes-types-interaces';
import slugify from 'slugify';

// Load env file
dotenv.config();

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET!,
});

export type UploadResponse = { url: string; type: string; name: string } | ResponseStatus;

/**
 * Uploads a file buffer (image/pdf) to Cloudinary and returns the hosted URL.
 */
export async function uploadToCloudinary(
    fileBuffer: Buffer,
    fileName: string,
    folder: string = 'prestige-partner-buyer'
): Promise<UploadResponse> {
    
    return new Promise((resolve) => {
        interface UploadStreamOptions {
            folder: string;
            public_id: string;
            resource_type: 'auto' | 'image' | 'video' | 'raw';
            format?: string;
            transformation: Array<{ fetch_format: string; quality: string }>;
            name: string;
            api_key: string;
        }

        interface UploadResult {
            url: string;
            original_filename: string;
            resource_type: string;
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        interface UploadError {
            message?: string;
        }

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: folder,
                public_id: slugify(fileName),
                resource_type: 'auto',
                format: 'webp', // Optional: applies only to images
                transformation: [{ fetch_format: 'auto', quality: 'auto' }],
                name: fileName,
                api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
            } as UploadStreamOptions,
            (error: UploadApiErrorResponse | undefined, result: UploadResult | undefined) => {
                if (error || !result) {
                    resolve({ error: true, message: error?.message || 'Cloudinary upload failed.' });
                } else {
                    resolve({
                        url: result.url,
                        name: result.original_filename,
                        type: result.resource_type,
                    });
                }
            }
        );

        Readable.from(fileBuffer).pipe(uploadStream);
    });
}
