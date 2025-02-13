import RepositoryBuilder from './modules/ecr/repository/builder';
import ImageBuilder from './modules/ecr/image/builder';
import ClusterBuilder from './modules/ecs/cluster/builder';
import ApplicationLoadBalancer from './modules/lb/alb/builder';
import FargateServiceBuilder from './modules/ecs/service/builder';

import * as consts from './utils/constants';
import { interpolate } from '@pulumi/pulumi';

const repository = new RepositoryBuilder().setName(consts.ecrRepositoryName).setForceDelete(true).build();

const image = new ImageBuilder()
    .setName(consts.imageName)
    .setContext(consts.dockerfileContext)
    .setPlatform('linux/amd64')
    .setRepositoryUrl(repository.getAwsComponent().url)
    .build();

const cluster = new ClusterBuilder().setName(consts.clusterName).build();

const alb = new ApplicationLoadBalancer().setName(consts.applicationLoadBalancerName).build();

new FargateServiceBuilder()
    .setName(consts.serviceName)
    .setCluster(cluster.getAwsComponent().arn)
    .setDesiredCount(consts.desiredCount)
    .setContainerName(consts.containerName)
    .setContainerImage(image.getAwsComponent().imageUri)
    .setCPU(consts.containerCPU)
    .setMemory(consts.containerMemory)
    .setIsEssential(true)
    .setContainerPort(consts.containerPort)
    .setTargetGroup(alb.getAwsComponent().defaultTargetGroup)
    .build();

export const url = interpolate`http://${alb.getAwsComponent().loadBalancer.dnsName}`;
