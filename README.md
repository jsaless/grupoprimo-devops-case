# grupoprimo-devops-case

Esse projeto tem como objetivo atender e responder os seguintes tópicos:

- Como fez o IaC
- Como criou os pipelines de CI/CD para automatizar o deploy seguro do app
- Como faz o rollout sem o downtime
- Como iria monitorar esse ambiente
- Como iria validar práticas de segurança para implementar no pipeline

## Arquitetura

### Diagrama

> **Observação:** Insira aqui o diagrama da arquitetura que ilustra a interação entre os serviços e a estrutura de deploy.

### Serviços

Nessa stack estamos utilizando os seguintes serviços:

- **ECS:** Orquestração e gerenciamento dos containers da aplicação.
- **ECR:** Repositório privado para armazenar as imagens Docker.
- **ELB:** Balanceamento de carga para distribuir o tráfego de forma eficiente.
- **IAM:** Gerenciamento de identidade e acesso, garantindo que apenas usuários e serviços autorizados possam interagir com os recursos.
- **CloudWatch:** Monitoramento e logging dos recursos e aplicações em execução.

### Rollout

Para garantir um deploy sem downtime, adotamos uma estratégia robusta que utiliza:

- **ECS Deployment Circuit Breaker:** Permite interromper a implantação caso detecte falhas, prevenindo atualizações incompletas ou instáveis.
- **Rollback on Failures:** Em caso de falha durante o deploy, o sistema automaticamente reverte para a versão anterior.
- **Rolling Update (ECS):** As tasks são atualizadas gradualmente, garantindo que parte do serviço esteja sempre em operação enquanto as novas versões são implantadas.

## IaC

A infraestrutura foi definida como código utilizando o **Pulumi**. Essa abordagem nos permite:

- **Versionamento e Reprodutibilidade:** Todas as configurações de infraestrutura são gerenciadas e versionadas, facilitando a replicação do ambiente.
- **Integração com a AWS:** O Pulumi se integra diretamente com os serviços AWS, permitindo a criação e manutenção de recursos como ECS, ECR, ELB, IAM e CloudWatch de maneira eficiente.
- **Flexibilidade:** A utilização do Pulumi possibilita escrever a infraestrutura em linguagens de programação familiares, o que torna a manutenção e evolução do código mais ágil.

## CI/CD

O pipeline de CI/CD foi implementado com **GitHub Actions**, garantindo um deploy seguro e automatizado. Para isso, foram criados dois workflows:

1. **Pipeline para Pull Requests:**

    - Realiza o login utilizando as credenciais da AWS.
    - Baixa as dependências do projeto.
    - Executa validações de lint no código.
    - Realiza uma pré-visualização (preview) das alterações que serão aplicadas na stack, permitindo identificar mudanças antes da aplicação.

2. **Pipeline para Push na Branch Main:**
    - Executa as mesmas etapas de validação presentes no pipeline de PR.
    - Aplica efetivamente todas as alterações na stack, garantindo que o deploy seja seguro e consistente.

## Monitoramento

O monitoramento da aplicação e infraestrutura é realizado através do **CloudWatch**, que oferece:

- **Logs Integrados:** Coleta e centraliza os logs das aplicações e dos serviços, facilitando a identificação de problemas.
- **Métricas de Performance:** Acompanhamento das métricas de uso das tasks no ECS, permitindo insights sobre a performance e a saúde do ambiente.
- **Alertas e Notificações:** Configuração de alarmes para monitorar comportamentos anormais e reagir de forma proativa a possíveis incidentes.

## Segurança

Para validar as práticas de segurança no pipeline, adotamos as seguintes medidas:

- **Uso de GitHub Secrets:** As credenciais da AWS e do Pulumi são armazenadas de forma segura nos GitHub Secrets, evitando exposição de dados sensíveis.
- **Autenticação Segura:** O pipeline utiliza essas credenciais para autenticar e interagir com a conta AWS, garantindo que somente operações autorizadas sejam realizadas.
- **Validação Contínua:** Etapas de lint e outras verificações automatizadas ajudam a detectar vulnerabilidades ou códigos que não seguem as melhores práticas antes do deploy.
