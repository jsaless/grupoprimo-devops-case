import { TargetGroup } from '@pulumi/aws/alb';
import { FargateService } from '@pulumi/awsx/ecs';

export interface IFargateService {
    setName(name: string): void;
    getName(): string;
    setCluster(cluster: string): void;
    getCluster(): string;
    setContainerName(name: string): void;
    getContainerName(): string;
    setContainerImage(image: string): void;
    getContainerImage(): string;
    setContainerPort(port: number): void;
    getContainerPort(): number;
    setIsEssential(isEssential: boolean): void;
    getIsEssential(): boolean;
    setCPU(cpu: number): void;
    getCPU(): number;
    setMemory(memory: number): void;
    getMemory(): number;
    setTargetGroup(targetGroup: TargetGroup): void;
    getTargetGroup(): TargetGroup;
    setAwsComponent(component: FargateService): void;
    getAwsComponent(): FargateService;
}

export interface IFargateServiceBuilder {
    setName(name: string): IFargateServiceBuilder;
    setCluster(cluster: string): IFargateServiceBuilder;
    setContainerName(name: string): IFargateServiceBuilder;
    setContainerImage(image: string): IFargateServiceBuilder;
    setContainerPort(port: number): IFargateServiceBuilder;
    setIsEssential(isEssential: boolean): IFargateServiceBuilder;
    setCPU(cpu: number): IFargateServiceBuilder;
    setMemory(memory: number): IFargateServiceBuilder;
    setTargetGroup(targetGroup: string): IFargateServiceBuilder;
    build(): IFargateService;
}
