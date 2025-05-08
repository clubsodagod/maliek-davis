// strategies/IProcessorStrategy.ts
export interface IProcessorStrategy {
    process(buffer: Buffer, filename: string): Promise<{ url: string }>;
}
