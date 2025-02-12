import { Repository } from '@pulumi/awsx/ecr';
import { IRepository } from './interfaces';

export default class RepositoryResource implements IRepository {
    private name!: string;

    private forceDelete!: boolean;

    private awsComponent!: Repository;

    public setName(name: string): void {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }

    public setForceDelete(forceDelete: boolean): void {
        this.forceDelete = forceDelete;
    }

    public getForceDelete(): boolean {
        return this.forceDelete;
    }

    public setAwsComponent(component: Repository): void {
        this.awsComponent = component;
    }

    public getAwsComponent(): Repository {
        return this.awsComponent;
    }
}
