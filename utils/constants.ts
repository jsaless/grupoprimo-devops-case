import * as pulumi from '@pulumi/pulumi';
import { createNaming } from '@soufantech/pulumi-naming';

const config = new pulumi.Config();

const env = pulumi.getStack();
const projectName = pulumi.getProject();

const n = createNaming({
    radical: projectName,
    suffix: env,
});

export const dockerfileContext = config.require('dockerfileContext');
export const containerCPU = config.requireNumber('containerCPU');
export const containerMemory = config.requireNumber('containerMemory');
export const containerPort = config.requireNumber('containerPort');
export const desiredCount = config.requireNumber('desiredCount');

export const ecrRepositoryName = n('repository');
export const imageName = n('image');
export const containerName = n('container');
export const clusterName = n('cluster');
export const applicationLoadBalancerName = n('alb');
export const serviceName = n('service');
