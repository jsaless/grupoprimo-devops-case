import ApplicationLoadBalancerResource from '.';
import { IApplicationLoadBalancer, IApplicationLoadBalancerBuilder } from './interfaces';
import * as awsx from '@pulumi/awsx';

export default class ApplicationLoadBalancerBuilder implements IApplicationLoadBalancerBuilder {
    private loadBalancer = new ApplicationLoadBalancerResource();

    public setName(name: string): IApplicationLoadBalancerBuilder {
        this.loadBalancer.setName(name);
        return this;
    }

    public build(): IApplicationLoadBalancer {
        if (!this.loadBalancer.getAwsComponent()) {
            const loadBalancer = new awsx.lb.ApplicationLoadBalancer(this.loadBalancer.getName(), {
                name: this.loadBalancer.getName(),
            });

            this.loadBalancer.setAwsComponent(loadBalancer);
        }

        return this.loadBalancer;
    }
}
