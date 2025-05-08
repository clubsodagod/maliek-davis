import { NextRequest, NextResponse } from 'next/server';
import { FileProcessingService } from '@/library/classes/services/file-processing.service';

export const config = {
    api: {
        bodyParser: false, // disable body parsing so Next.js doesn't conflict with FormData
    },
};


export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: true, message: 'No file uploaded' }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const mimeType = file.type;
        const originalFilename = file.name;

        const processor = new FileProcessingService();
        const result = await processor.handle(buffer, mimeType, originalFilename);
        console.log(result, 'File Processing Result');
        return NextResponse.json({ error: false, ...result }, { status: 200 });

    } catch (error) {
        console.error('[Upload Error]', error);
        return NextResponse.json(
            {
                error: true,
                message: error instanceof Error ? error.message : 'Something went wrong',
            },
            { status: 500 }
        );
    }
}
