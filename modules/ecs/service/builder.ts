import FargateServiceResource from '.';
import { IFargateService, IFargateServiceBuilder } from './interfaces';
import * as awsx from '@pulumi/awsx';

export default class FargateServiceBuilder implements IFargateServiceBuilder {
    private fargateService = new FargateServiceResource();

    public setName(name: string): IFargateServiceBuilder {
        this.setName(name);
        return this;
    }

    public setCluster(cluster: string): IFargateServiceBuilder {
        this.setCluster(cluster);
        return this;
    }

    public setContainerName(name: string): IFargateServiceBuilder {
        this.setContainerName(name);
        return this;
    }

    public setContainerImage(image: string): IFargateServiceBuilder {
        this.setContainerImage(image);
        return this;
    }

    public setContainerPort(port: number): IFargateServiceBuilder {
        this.setContainerPort(port);
        return this;
    }

    public setIsEssential(isEssential: boolean): IFargateServiceBuilder {
        this.setIsEssential(isEssential);
        return this;
    }

    public setCPU(cpu: number): IFargateServiceBuilder {
        this.setCPU(cpu);
        return this;
    }

    public setMemory(memory: number): IFargateServiceBuilder {
        this.setMemory(memory);
        return this;
    }

    public setTargetGroup(targetGroup: string): IFargateServiceBuilder {
        this.setTargetGroup(targetGroup);
        return this;
    }

    public build(): IFargateService {
        if (!this.fargateService.getAwsComponent()) {
            const fargateService = new awsx.ecs.FargateService(this.fargateService.getName(), {
                cluster: this.fargateService.getCluster(),
                assignPublicIp: true,
                taskDefinitionArgs: {
                    container: {
                        name: this.fargateService.getContainerName(),
                        image: this.fargateService.getContainerImage(),
                        cpu: 128,
                        memory: 512,
                        essential: true,
                        portMappings: [
                            {
                                containerPort: 80,
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
