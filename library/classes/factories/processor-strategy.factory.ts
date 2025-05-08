// factory/ProcessorStrategyFactory.ts

import { ImageToWebpStrategy } from "@/library/interfaces/strategies/concrete/image-to-webp.strategy";
import { PdfToWebpStrategy } from "@/library/interfaces/strategies/concrete/pdf-to-webp.strategy";
import { IProcessorStrategy } from "@/library/interfaces/strategies/processor.strategy";



export class ProcessorStrategyFactory {
  static create(mimeType: string): IProcessorStrategy {
    if (mimeType === 'application/pdf') return new PdfToWebpStrategy();
    if (mimeType.startsWith('image/')) return new ImageToWebpStrategy();
    throw new Error(`Unsupported MIME type: ${mimeType}`);
  }
}
