import { FargateService } from '@pulumi/awsx/ecs';
import { IFargateService } from './interfaces';
import { TargetGroup } from '@pulumi/aws/alb';

export default class FargateServiceResource implements IFargateService {
    private name!: string;

    private cluster!: string;

    private containerName!: string;

    private containerImage!: string;

    private containerPort!: number;

    private isEssential!: boolean;

    private cpu!: number;

    private memory!: number;

    private targetGroup!: TargetGroup;

    private awsComponent!: FargateService;

    public setName(name: string): void {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }

    public setCluster(cluster: string): void {
        this.cluster = cluster;
    }

    public getCluster(): string {
        return this.cluster;
    }

    public setContainerName(name: string): void {
        this.containerName = name;
    }

    public getContainerName(): string {
        return this.containerName;
    }

    public setContainerImage(image: string): void {
        this.containerImage = image;
    }

    public getContainerImage(): string {
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

    public setTargetGroup(targetGroup: TargetGroup): void {
        this.targetGroup = targetGroup;
    }

    public getTargetGroup(): TargetGroup {
        return this.targetGroup;
    }

    public setAwsComponent(component: FargateService): void {
        this.awsComponent = component;
    }

    public getAwsComponent(): FargateService {
        return this.awsComponent;
    }
}
