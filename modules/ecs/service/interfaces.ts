import { TargetGroup } from '@pulumi/aws/alb';
import { FargateService } from '@pulumi/awsx/ecs';
import * as pulumi from '@pulumi/pulumi';

export interface IFargateService {
    setName(name: string): void;
    getName(): string;
    setCluster(cluster: pulumi.Input<string> | pulumi.Output<string>): void;
    getCluster(): pulumi.Input<string> | pulumi.Output<string>;
    setDesiredCount(desiredCount: number): void;
    getDesiredCount(): number;
    setContainerName(name: string): void;
    getContainerName(): string;
    setContainerImage(image: pulumi.Input<string> | pulumi.Output<string>): void;
    getContainerImage(): pulumi.Input<string> | pulumi.Output<string>;
    setContainerPort(port: number): void;
    getContainerPort(): number;
    setIsEssential(isEssential: boolean): void;
    getIsEssential(): boolean;
    setCPU(cpu: number): void;
    getCPU(): number;
    setMemory(memory: number): void;
    getMemory(): number;
    setTargetGroup(targetGroup: pulumi.Input<TargetGroup> | pulumi.Output<TargetGroup>): void;
    getTargetGroup(): pulumi.Input<TargetGroup> | pulumi.Output<TargetGroup>;
    setAwsComponent(component: FargateService): void;
    getAwsComponent(): FargateService;
}

export interface IFargateServiceBuilder {
    setName(name: string): IFargateServiceBuilder;
    setCluster(cluster: pulumi.Input<string> | pulumi.Output<string>): IFargateServiceBuilder;
    setDesiredCount(desiredCount: number): IFargateServiceBuilder;
    setContainerName(name: string): IFargateServiceBuilder;
    setContainerImage(image: pulumi.Input<string> | pulumi.Output<string>): IFargateServiceBuilder;
    setContainerPort(port: number): IFargateServiceBuilder;
    setIsEssential(isEssential: boolean): IFargateServiceBuilder;
    setCPU(cpu: number): IFargateServiceBuilder;
    setMemory(memory: number): IFargateServiceBuilder;
    setTargetGroup(targetGroup: pulumi.Input<TargetGroup> | pulumi.Output<TargetGroup>): IFargateServiceBuilder;
    build(): IFargateService;
}
