import RepositoryResource from '.';
import { IRepositoryBuilder } from './interfaces';
import * as awsx from '@pulumi/awsx';

export default class RepositoryBuilder implements IRepositoryBuilder {
    private repository = new RepositoryResource();

    public setName(name: string): IRepositoryBuilder {
        this.repository.setName(name);
        return this;
    }

    public setForceDelete(forceDelete: boolean): IRepositoryBuilder {
        this.repository.setForceDelete(forceDelete);
        return this;
    }

    public build(): RepositoryResource {
        if (!this.repository.getAwsComponent()) {
            const repository = new awsx.ecr.Repository(this.repository.getName(), {
                name: this.repository.getName(),
                forceDelete: true,
            });

            this.repository.setAwsComponent(repository);
        }

        return this.repository;
    }
}
