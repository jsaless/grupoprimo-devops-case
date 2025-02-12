import { ApplicationLoadBalancer } from '@pulumi/awsx/lb';
import { IApplicationLoadBalancer } from './interfaces';

export default class ApplicationLoadBalancerResource implements IApplicationLoadBalancer {
    private name!: string;

    private awsComponent!: ApplicationLoadBalancer;

    public setName(name: string): void {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }

    public setAwsComponent(component: ApplicationLoadBalancer): void {
        this.awsComponent = component;
    }

    public getAwsComponent(): ApplicationLoadBalancer {
        return this.awsComponent;
    }
}
