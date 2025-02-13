import { Image } from '@pulumi/awsx/ecr';
import * as pulumi from '@pulumi/pulumi';
export interface IImage {
    setName(name: string): void;
    getName(): string;
    setContext(context: string): void;
    getContext(): string;
    setPlatform(platform: string): void;
    getPlatform(): string;
    setRepositoryUrl(url: pulumi.Input<string> | pulumi.Output<string>): void;
    getRepositoryUrl(): pulumi.Input<string> | pulumi.Output<string>;
    setAwsComponent(component: Image): void;
    getAwsComponent(): Image;
}

export interface IImageBuilder {
    setName(name: string): IImageBuilder;
    setContext(context: string): IImageBuilder;
    setPlatform(platform: string): IImageBuilder;
    setRepositoryUrl(url: pulumi.Input<string> | pulumi.Output<string>): IImageBuilder;
    build(): IImage;
}
