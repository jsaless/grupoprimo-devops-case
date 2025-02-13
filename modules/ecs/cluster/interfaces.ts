import { Cluster } from '@pulumi/aws/ecs';

export interface ICluster {
    setName(name: string): void;
    getName(): string;
    setAwsComponent(component: Cluster): void;
    getAwsComponent(): Cluster;
}

export interface IClusterBuilder {
    setName(name: string): IClusterBuilder;
    build(): ICluster;
}
