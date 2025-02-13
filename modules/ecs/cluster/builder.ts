import ClusterResource from '.';
import { IClusterBuilder } from './interfaces';
import * as aws from '@pulumi/aws';

export default class ClusterBuilder implements IClusterBuilder {
    private cluster = new ClusterResource();

    public setName(name: string): IClusterBuilder {
        this.cluster.setName(name);
        return this;
    }

    public build(): ClusterResource {
        if (!this.cluster.getAwsComponent()) {
            const cluster = new aws.ecs.Cluster(this.cluster.getName(), {
                name: this.cluster.getName(),
            });

            this.cluster.setAwsComponent(cluster);
        }

        return this.cluster;
    }
}
