import ImageResource from '.';
import { IImageBuilder } from './interfaces';
import * as awsx from '@pulumi/awsx';

export default class ImageBuilder implements IImageBuilder {
    private image = new ImageResource();

    public setName(name: string): IImageBuilder {
        this.image.setName(name);
        return this;
    }

    public setContext(context: string): IImageBuilder {
        this.image.setContext(context);
        return this;
    }

    public setPlatform(platform: string): IImageBuilder {
        this.image.setPlatform(platform);
        return this;
    }

    public setRepositoryUrl(url: string): IImageBuilder {
        this.image.setRepositoryUrl(url);
        return this;
    }

    public build(): ImageResource {
        if (!this.image.getAwsComponent()) {
            const loadBalancer = new awsx.ecr.Image(this.image.getName(), {
                context: this.image.getContext(),
                platform: this.image.getPlatform(),
                repositoryUrl: this.image.getRepositoryUrl(),
            });

            this.image.setAwsComponent(loadBalancer);
        }

        return this.image;
    }
}
