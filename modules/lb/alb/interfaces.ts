import { ApplicationLoadBalancer } from '@pulumi/awsx/lb';

export interface IApplicationLoadBalancer {
    setName(name: string): void;
    getName(): string;
    setAwsComponent(component: ApplicationLoadBalancer): void;
    getAwsComponent(): ApplicationLoadBalancer;
}

export interface IApplicationLoadBalancerBuilder {
    setName(name: string): IApplicationLoadBalancerBuilder;
    build(): IApplicationLoadBalancer;
}
