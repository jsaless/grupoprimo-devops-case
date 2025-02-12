import { Repository } from '@pulumi/awsx/ecr';

export interface IRepository {
    setName(name: string): void;
    getName(): string;
    setForceDelete(forceDelete: boolean): void;
    getForceDelete(): boolean;
    setAwsComponent(component: Repository): void;
    getAwsComponent(): Repository;
}

export interface IRepositoryBuilder {
    setName(name: string): IRepositoryBuilder;
    setForceDelete(forceDelete: boolean): IRepositoryBuilder;
    build(): IRepository;
}
