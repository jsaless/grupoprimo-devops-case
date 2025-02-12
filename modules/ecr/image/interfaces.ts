import { Image } from '@pulumi/awsx/ecr';

export interface IImage {
    setName(name: string): void;
    getName(): string;
    setContext(context: string): void;
    getContext(): string;
    setPlatform(platform: string): void;
    getPlatform(): string;
    setRepositoryUrl(url: string): void;
    getRepositoryUrl(): string;
    setAwsComponent(component: Image): void;
    getAwsComponent(): Image;
}

export interface IImageBuilder {
    setName(name: string): IImageBuilder;
    setContext(context: string): IImageBuilder;
    setPlatform(platform: string): IImageBuilder;
    setRepositoryUrl(url: string): IImageBuilder;
    build(): IImage;
}
