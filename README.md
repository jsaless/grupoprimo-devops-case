# grupoprimo-devops-case

Esse projeto tem como objetivo atender e responder os seguintes tópicos:

- Como criar a IaC
- Como criar os pipelines de CI/CD para automatizar o deploy seguro do app
- Como realizar o rollout sem downtime
- Como monitorar esse ambiente
- Como validar práticas de segurança para implementar no pipeline

## Requisitos

### Configuração Local

Para executar e desenvolver o projeto em sua máquina local, siga os passos abaixo:

1. **Instalar Node.js:**

    - Baixe e instale a versão LTS do [Node.js](https://nodejs.org/).
    - Verifique a instalação executando no terminal:
        ```bash
        node -v
        npm -v
        ```

2. **Instalar Pulumi CLI:**

    - Siga as instruções na [documentação oficial do Pulumi](https://www.pulumi.com/docs/get-started/install/) para instalar o Pulumi CLI.
    - Após a instalação, verifique a versão com:
        ```bash
        pulumi version
        ```

3. **Configurar Conta no Pulumi Cloud:**

    - Crie uma conta em [Pulumi Cloud](https://app.pulumi.com/signup).
    - Obtenha seu token de acesso (PULUMI_ACCESS_TOKEN) que será utilizado para autenticar a CLI com o Pulumi Cloud.

4. **Configurar Conta na AWS:**

    - Crie uma conta na [AWS](https://aws.amazon.com/).
    - No console da AWS, acesse o IAM e gere as chaves de acesso (Access Key ID e Secret Access Key) para a criação e gerenciamento dos recursos.
    - Configure as credenciais localmente:
        - Usando o AWS CLI:
            ```bash
            aws configure
            ```
        - **Ou** definindo as seguintes variáveis de ambiente:
            - `AWS_ACCESS_KEY_ID`
            - `AWS_SECRET_ACCESS_KEY`
            - `AWS_REGION` (ex.: `us-east-1`)

5. **Clonar o Repositório:**
    - Clone o projeto utilizando:
        ```bash
        git clone <url-do-repositório>
        ```

### Configuração no GitHub

Para que o pipeline de CI/CD funcione corretamente via GitHub Actions, é necessário configurar os seguintes segredos no repositório:

1. **AWS_ACCESS_KEY_ID:**

    - Navegue até a página do repositório no GitHub.
    - Acesse **Settings > Secrets and variables > Actions**.
    - Clique em **New repository secret** e insira:
        - **Name:** `AWS_ACCESS_KEY_ID`
        - **Value:** _Sua chave de acesso AWS_

2. **AWS_SECRET_ACCESS_KEY:**

    - Crie um novo segredo com:
        - **Name:** `AWS_SECRET_ACCESS_KEY`
        - **Value:** _Sua chave secreta AWS_

3. **AWS_REGION:**

    - Crie um novo segredo com:
        - **Name:** `AWS_REGION`
        - **Value:** _Região da AWS desejada (ex.: `us-east-1`)_

4. **PULUMI_ACCESS_TOKEN:**
    - Crie um novo segredo com:
        - **Name:** `PULUMI_ACCESS_TOKEN`
        - **Value:** _Token de acesso gerado no Pulumi Cloud_

Após seguir estes passos, seu ambiente local estará preparado para desenvolver e testar o projeto, e o pipeline do GitHub Actions estará configurado para realizar deploys automatizados de forma segura.

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

## Observações

- Para esse projeto estamos utilizando o padrão de projetos [Builder](https://refactoring.guru/pt-br/design-patterns/builder), que nos permite abstrair toda a construção do recurso para o usuário, e deixar apenas os atributos que desejamos que sejam configurados.
- Estamos utilizando a biblioteca `@pulumi/awsx` para simplificar a construção de uma infraestrutura ECS, onde é criado os Target Groups, a TaskExecution Role, Policies e etc... Tudo por baixo dos panos sem a gente se preocupar
