import { uploadToCloudinary } from "@/utility/image-optimizer.cloudinary";
import { IProcessorStrategy } from "../processor.strategy";

export class PdfToWebpStrategy implements IProcessorStrategy {
  async process(buffer: Buffer, filename: string) {
    const upload = await uploadToCloudinary(buffer, filename, "prestige-partner-buyer") as { url: string };
    return { url: upload.url };
  }
}
