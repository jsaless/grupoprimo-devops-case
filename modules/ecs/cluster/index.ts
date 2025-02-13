import { Cluster } from '@pulumi/aws/ecs';
import { ICluster } from './interfaces';

export default class ClusterResource implements ICluster {
    private name!: string;

    private awsComponent!: Cluster;

    public setName(name: string): void {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }

    public setAwsComponent(component: Cluster): void {
        this.awsComponent = component;
    }

    public getAwsComponent(): Cluster {
        return this.awsComponent;
    }
}
