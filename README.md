# TEMPLATE BACKEND NODEJS NESTJS PRISMA

## 🚀 \*_Sobre o Projeto_

- Projeto de template para backend com NodeJS, NestJS e Prisma.
- Projeto com estrutura de pastas e arquivos pré-definidos.
- Projeto com estrutura de validação e mapeamento pré-definidos.
- Projeto com estrutura de autenticação e autorização pré-definidos.
- Projeto com estrutura de testes pré-definidos.
- Projeto com estrutura de criação de users pré-definidos.

# Estrutura de Validação e Mapeamento no Projeto

## 🔧 **Processo de Validação e Criação de Times**

No projeto, utilizamos uma abordagem baseada em **Clean Architecture** e **DDD (Domain-Driven Design)** para gerenciar a validação e a criação de entidades. A seguir, está o fluxo de como os dados são processados:

1. **Controller**:

   - O controller recebe os dados da requisição e utiliza o **ZodValidationPipe** para validar o corpo da requisição antes de encaminhá-lo para o caso de uso.
   - Caso a validação falhe, uma exceção é lançada com mensagens detalhadas sobre os erros.

2. **Validação com Zod**:

   - Usamos **Zod** para definir os schemas e validar os dados diretamente no controller.
   - Essa abordagem elimina a necessidade de criar classes DTO específicas, simplificando o código e reduzindo a duplicidade.
   - O uso do Zod facilita a integração com ferramentas como Swagger, permitindo a geração automática de documentação baseada nos schemas.

3. **Caso de Uso (UseCase)**:

   - O caso de uso encapsula a lógica de criação de um time por exemplo, garantindo que todas as regras de negócio sejam respeitadas.
   - O resultado do caso de uso é tratado no controller para responder à requisição adequadamente devolvendo um presenter com os dados necessários.

4. **Mapper**:
   - O **Mapper** é usado para converter os dados entre o formato da aplicação (domínio) e o formato do banco de dados (Prisma).

---

## 💡 **Por que não uso DTOs?**

optei por utilizar **Zod** para validação ao invés de classes DTO tradicionais pelos seguintes motivos:

1. **Validação Imediata**:

   - O Zod permite validar e tipar os dados simultaneamente, reduzindo a complexidade do código.

2. **Eliminação de Duplicidade**:

   - Em projetos que utilizam DTOs, é comum que o mesmo esquema precise ser replicado em várias camadas (e.g., no controller e na validação). Com o Zod, o mesmo schema é reutilizado para múltiplos propósitos (validação e geração de documentação).

3. **Integração com Swagger**:

   - Utilizamos a função `toSwaggerSchema` para gerar automaticamente a documentação dos endpoints a partir dos schemas Zod, mantendo a consistência e evitando retrabalho.

4. **Feedback Detalhado de Erros**:

   - O Zod oferece mensagens de erro ricas e fáceis de customizar, que são retornadas diretamente para o cliente em caso de validação inválida.

5. **Manutenção Simplificada**:
   - Alterações no schema de validação são feitas em um único local, reduzindo as chances de inconsistências no código.

---
