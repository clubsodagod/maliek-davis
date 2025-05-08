import crypto from 'crypto';

// Function to generate the Cloudinary signature
interface CloudinaryParams {
    timestamp: number;
    [key: string]: string | number;
}

export function generateCloudinarySignature(params: CloudinaryParams): string {
    // Remove 'api_key', 'file', 'resource_type', 'cloud_name' from params
    const { ...uploadParams } = params;

    // Sort the parameters by key
    const sortedParams = Object.keys(uploadParams).sort().map(key => `${key}=${uploadParams[key]}`).join('&');

    // Add the timestamp to the string (timestamp is required for signature)
    const signatureString = `${sortedParams}&timestamp=${params.timestamp}&api_secret=${process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET}`;

    // Generate the HMAC-SHA1 signature using your api_secret
    const signature = crypto.createHmac('sha1', process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET!).update(signatureString).digest('hex');

    return signature;
}
