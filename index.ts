import RepositoryBuilder from './modules/ecr/repository/builder';
import ImageBuilder from './modules/ecr/image/builder';
import ClusterBuilder from './modules/ecs/cluster/builder';
import ApplicationLoadBalancer from './modules/lb/alb/builder';
import FargateServiceBuilder from './modules/ecs/service/builder';

const repository = new RepositoryBuilder().setName('ecr-repository').setForceDelete(true).build();

const image = new ImageBuilder()
    .setName('docker-image')
    .setContext('./app')
    .setPlatform('linux/amd64')
    .setRepositoryUrl(repository.getAwsComponent().url)
    .build();

const cluster = new ClusterBuilder().setName('ecs-cluster').build();

const alb = new ApplicationLoadBalancer().setName('alb').build();

new FargateServiceBuilder()
    .setName('fargate-service')
    .setCluster(cluster.getAwsComponent().arn)
    .setDesiredCount(3)
    .setContainerName('web-app')
    .setContainerImage(image.getAwsComponent().imageUri)
    .setCPU(128)
    .setMemory(512)
    .setIsEssential(true)
    .setContainerPort(80)
    .setTargetGroup(alb.getAwsComponent().defaultTargetGroup)
    .build();

export const url = alb.getAwsComponent().loadBalancer.dnsName;
