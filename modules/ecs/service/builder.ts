import * as pulumi from '@pulumi/pulumi';
import FargateServiceResource from '.';
import { IFargateService, IFargateServiceBuilder } from './interfaces';
import * as awsx from '@pulumi/awsx';
import { TargetGroup } from '@pulumi/aws/alb';

export default class FargateServiceBuilder implements IFargateServiceBuilder {
    private fargateService = new FargateServiceResource();

    public setName(name: string): IFargateServiceBuilder {
        this.fargateService.setName(name);
        return this;
    }

    public setCluster(cluster: pulumi.Input<string> | pulumi.Output<string>): IFargateServiceBuilder {
        this.fargateService.setCluster(cluster);
        return this;
    }

    public setDesiredCount(desiredCount: number): IFargateServiceBuilder {
        this.fargateService.setDesiredCount(desiredCount);
        return this;
    }

    public setContainerName(name: string): IFargateServiceBuilder {
        this.fargateService.setContainerName(name);
        return this;
    }

    public setContainerImage(image: pulumi.Input<string> | pulumi.Output<string>): IFargateServiceBuilder {
        this.fargateService.setContainerImage(image);
        return this;
    }

    public setContainerPort(port: number): IFargateServiceBuilder {
        this.fargateService.setContainerPort(port);
        return this;
    }

    public setIsEssential(isEssential: boolean): IFargateServiceBuilder {
        this.fargateService.setIsEssential(isEssential);
        return this;
    }

    public setCPU(cpu: number): IFargateServiceBuilder {
        this.fargateService.setCPU(cpu);
        return this;
    }

    public setMemory(memory: number): IFargateServiceBuilder {
        this.fargateService.setMemory(memory);
        return this;
    }

    public setTargetGroup(targetGroup: pulumi.Input<TargetGroup> | pulumi.Output<TargetGroup>): IFargateServiceBuilder {
        this.fargateService.setTargetGroup(targetGroup);
        return this;
    }

    public build(): IFargateService {
        if (!this.fargateService.getAwsComponent()) {
            const fargateService = new awsx.ecs.FargateService(this.fargateService.getName(), {
                cluster: this.fargateService.getCluster(),
                assignPublicIp: true,
                desiredCount: this.fargateService.getDesiredCount(),
                deploymentCircuitBreaker: {
                    enable: true,
                    rollback: true,
                },
                taskDefinitionArgs: {
                    container: {
                        name: this.fargateService.getContainerName(),
                        image: this.fargateService.getContainerImage(),
                        cpu: this.fargateService.getCPU(),
                        memory: this.fargateService.getMemory(),
                        essential: this.fargateService.getIsEssential(),
                        portMappings: [
                            {
                                containerPort: this.fargateService.getContainerPort(),
                                targetGroup: this.fargateService.getTargetGroup(),
                            },
                        ],
                    },
                },
            });

            this.fargateService.setAwsComponent(fargateService);
        }
        return this.fargateService;
    }
}
