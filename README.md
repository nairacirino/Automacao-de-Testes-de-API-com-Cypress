# AUTOMAÇÃO DE TESTE DE API USANDO CYPRESS

## SUMARIO

   * [Descrição do Projeto](#DESCRIÇÃO-DO-PROJETO)
   * [Linguagens e Ferramentas Utilizadas](#LINGUAGENS-E-FERRAMENTAS-UTILIZADAS)
   * [Etapas de Construção do Projeto](#ETAPAS-DE-CONSTRUÇÃO-DO-PROJETO)
   * [Licença e Restrições](#LICENÇA-E-RESTRIÇÕES)

## DESCRIÇÃO DO PROJETO

Projeto criado em um desafio de automação proposto no programa Reset, da CWI. 

O objetivo do desafio era implementar cenários de testes para a API de Product Review do WooCommerce, cenários esses que deveriam incluir testes de acceptance e schema para: 

* Criar uma product review com POST; 
* Editar a product review criada com PUT; 
* Deletar a product review criada com DELETE. 

## LINGUAGENS E FERRAMENTAS UTILIZADAS

Fiz os testes manuais preliminares utilizando o Postman.

Os scripts de testes foram criados utilizando <b>Cypresss</b> e <b>JavaScript</b>.

Para geração de reports, foi utilizado o plugin Allure Reports.

O versionamento do código foi feito utilizando o Git e Github através do GitKraken.

## ETAPAS DE CONSTRUÇÃO DO PROJETO

Iniciei o projeto completando o planejamento do teste:

* Objetivo e tipo de teste já foram definidos no próprio desafio: implementar cenários de testes de acceptance e schema para criar, editar e deletar uma Product Review utilizando a API do WooCommerce.
* Escopo: os entregáveis/evidências foram definidos também no desafio. Para definir a massa de dados necessária, utilizei a documentação da API, disponível para consulta <a href="https://woocommerce.github.io/woocommerce-rest-api-docs/?shell#product-reviews">aqui</a>.
* Riscos: o principal risco identificado foi a indisponibilidade do site ou quebra de alguma biblioteca utilizada na construção do teste. 
* Estimativa: estimei 2 dias para construção do teste, 1 dia para refatoramento e documentação.
* Métricas/Acompanhamento: não se aplica ao projeto em questão.

Iniciei a modelagem do teste com a criação da estrutura do projeto: criação da pasta do projeto, instalação e configuração dos módulos.

A princípio, criei um arquivo para cada método da API a ser testado, mas posteriormente unifiquei todos os métodos em uma única spec englobando a API como um todo. 

Criei então a massa de dados que seria necessária para o teste utilizando os dados da documentação da API.

Fiz testes manuais utilizando o Postman para mapear todos os retornos dos cenários planejados.

Escrevi então os scripts de teste e criei os Allure Reports.

Uma vez escrito e funcionando como esperado, refatorei o código para dar maior clareza e aderência aos padrões e boas práticas do framework.

## LICENÇA E RESTRIÇÕES

Projeto criado sob a licença CC0 1.0 Universal - Dedicação ao Domínio Público. Saiba mais sobre esse tipo de licença <a href='https://creativecommons.org/publicdomain/zero/1.0/deed.pt_BR'>aqui</a>. Mas se estiver com preguiça, em resumo, sob esta licença estou renunciando a todos os meus direitos de autor e/ou de direitos conexos referentes ao trabalho, em todo o mundo, na medida permitida por lei.

Você pode copiar, modificar, distribuir e executar o trabalho, mesmo para fins comerciais, sem pedir minha autorização e sem atribuição de créditos. 

Vale ressaltar: apenas a criação do teste é de minha autoria. Não tenho qualquer propriedade intelectual sobre o desafio original, frameworks e padrões utilizados.
