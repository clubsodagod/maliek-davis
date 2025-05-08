import { ProcessorStrategyFactory } from "../factories/processor-strategy.factory";

export class FileProcessingService {
    async handle(buffer: Buffer, mimeType: string, filename: string) {
        const strategy = ProcessorStrategyFactory.create(mimeType);
        return strategy.process(buffer, filename);
    }
}
