import { Image } from '@pulumi/awsx/ecr';
import { IImage } from './interfaces';

export default class ImageResource implements IImage {
    private name!: string;

    private context!: string;

    private platform!: string;

    private repositoryUrl!: string;

    private awsComponent!: Image;

    public setName(name: string): void {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }

    public setContext(context: string): void {
        this.context = context;
    }

    public getContext(): string {
        return this.context;
    }

    public setPlatform(platform: string): void {
        this.platform = platform;
    }

    public getPlatform(): string {
        return this.platform;
    }

    public setRepositoryUrl(url: string): void {
        this.repositoryUrl = url;
    }

    public getRepositoryUrl(): string {
        return this.repositoryUrl;
    }

    public setAwsComponent(component: Image): void {
        this.awsComponent = component;
    }

    public getAwsComponent(): Image {
        return this.awsComponent;
    }
}
