import { FargateService } from '@pulumi/awsx/ecs';
import { IFargateService } from './interfaces';
import { TargetGroup } from '@pulumi/aws/alb';
import * as pulumi from '@pulumi/pulumi';

export default class FargateServiceResource implements IFargateService {
    private name!: string;

    private cluster!: pulumi.Input<string> | pulumi.Output<string>;

    private desiredCount!: number;

    private containerName!: string;

    private containerImage!: pulumi.Input<string> | pulumi.Output<string>;

    private containerPort!: number;

    private isEssential!: boolean;

    private cpu!: number;

    private memory!: number;

    private targetGroup!: pulumi.Input<TargetGroup> | pulumi.Output<TargetGroup>;

    private awsComponent!: FargateService;

    public setName(name: string): void {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }

    public setCluster(cluster: pulumi.Input<string> | pulumi.Output<string>): void {
        this.cluster = cluster;
    }

    public getCluster(): pulumi.Input<string> | pulumi.Output<string> {
        return this.cluster;
    }

    public setDesiredCount(desiredCount: number): void {
        this.desiredCount = desiredCount;
    }

    public getDesiredCount(): number {
        return this.desiredCount;
    }

    public setContainerName(name: string): void {
        this.containerName = name;
    }

    public getContainerName(): string {
        return this.containerName;
    }

    public setContainerImage(image: pulumi.Input<string> | pulumi.Output<string>): void {
        this.containerImage = image;
    }

    public getContainerImage(): pulumi.Input<string> | pulumi.Output<string> {
        return this.containerImage;
    }

    public setContainerPort(port: number): void {
        this.containerPort = port;
    }

    public getContainerPort(): number {
        return this.containerPort;
    }

    public setIsEssential(isEssential: boolean): void {
        this.isEssential = isEssential;
    }

    public getIsEssential(): boolean {
        return this.isEssential;
    }

    public setCPU(cpu: number): void {
        this.cpu = cpu;
    }

    public getCPU(): number {
        return this.cpu;
    }

    public setMemory(memory: number): void {
        this.memory = memory;
    }

    public getMemory(): number {
        return this.memory;
    }

    public setTargetGroup(targetGroup: pulumi.Input<TargetGroup> | pulumi.Output<TargetGroup>): void {
        this.targetGroup = targetGroup;
    }

    public getTargetGroup(): pulumi.Input<TargetGroup> | pulumi.Output<TargetGroup> {
        return this.targetGroup;
    }

    public setAwsComponent(component: FargateService): void {
        this.awsComponent = component;
    }

    public getAwsComponent(): FargateService {
        return this.awsComponent;
    }
}
