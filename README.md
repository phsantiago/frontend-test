[![Build Status](https://travis-ci.org/phsantiago/frontend-test.svg?branch=PedroSantiago)](https://travis-ci.org/phsantiago/frontend-test)
[Confira o estatico deployado](http://r7.getforge.io/)
# Pedro H. Santiago - Instruções gerais
* `npm run build` para compilar
* `npm start` para servir o compilado
* `npm run lint` para rodar a lint no css e no javascript
* `npm test` para executar os testes automatizados
* `npm run serve` para rodar o servidor de desenvolvimento


### Requisitos obrigatórios
1. Escreva o código com BackboneJS ou VanillaJS  ;)
    
    **Utilizei apenas a ES6 com transpiler por conta da compatibilidade de navegadores, de resto foi tudo puro com algumas ferramentas de programação funcional.**

2. Utilizar um pré-processador CSS de sua preferência.
    
    **Escolhi o SASS, nele usei variáveis e mixins.**

3. Testes e documentação.
    
    **Escrevi testes para a parte do tratamento dos dados, alguns desenvolvi utilizando TDD.**

4. Automação de tarefas. (Gulp? Grunt? Webpack? :D)
    
    **Webpack! Um config para dev e outro para prod.**

5. Semântica Web
    
    **Utilizei tags do HTML5 para semântica e separação do conteúdo.**

6. Template Engines (underscore, mustache, ou outras de sua preferência)
    
    **Utilizei apenas o template string da ES6.**

7. Ser fiel ao .psd.
    
    **Done.**

8. Suporte para IE11 e multiplataforma (crossbrowser web / mobile - Responsivo).
    
    **Fiz mobile first, partes não encaixavam em telas muito pequenas então adaptei da minha forma, espero que gostem.**

9. Não usar geradores como yeoman, angular-cli, create-react-app, etc..
    
    **Done.**

10. Procure manter a estrutura do projeto.
    
    **Mantive a estrutura da pasta public, porém apenas como source, o resultado do compile coloquei na pasta `./dist`**

### Requisitos extras 
1. Acessibilidade
    
    **Em todas imagens coloquei um alt bem descritivo, em partes também utilizei recursos de `aria-hidden` e `role presentation`.**

2. SEO
    
    **Criei meta tags (description, keywords e title) e utilizei `Schema.org`**

3. Performance
   
   **No build de produção configurei scope hoisting, tree shaking, minificação de css, minificação de javascript e compactação de html. Por não ter dependencias o bundle ficou 6.3kb :)**


## Features bonus

* Idependencia do app. Caso caia a conexão ou aconteça algum erro de backend o front tem uma resposta visual para isso, causando melhor experiencia de uso.

![alt text](https://github.com/phsantiago/frontend-test/blob/PedroSantiago/docs/request_error.gif)

* Mobile first, foi desenvolvido primeiro para a menor resolução possível de um dispositivo, as medias queries ficaram para telas maiores.

![alt text](https://github.com/phsantiago/frontend-test/blob/PedroSantiago/docs/media_queries.gif)

* Em conexões que possuem maior lentidão é possível notar uma resposta visual enquanto a requisição do json não é recebida.

![alt text](https://github.com/phsantiago/frontend-test/blob/PedroSantiago/docs/loading.gif)


### Sobre o R7.com
O R7.com é um portal mantido pela Record TV, com quase 9 anos de vida. Possui mais de 50 milhões de visitantes únicos e 200 milhões de pageviews mensalmente e conta coma uma equipe de quase 300 pessoas.

### Teste FrontEnd para o R7.com!
Essa teste consiste em entendermos um pouco mais sobre seus conhecimentos com HTML, CSS,
JavaScript, Código responsivo, suporte a crossbrowser e lógica.

### Orientações
Primeiramente, faça um fork e clone do projeto;
Crie uma branch (pode ser com seu nome mesmo) e depois instale as dependências:

```sh
npm install
```

Após isso, rode a aplicação:
```sh
npm start
```

Depois do seu setup você precisará seguir as seguintes instruções, para construir a aplicação:

1. Desenvolver a página, que tem o seu layout em **a-fazenda.psd**.(A única fonte usada foi a Montserrat, disponível no Google Fonts)
2. Criar um JavaScript que faça a requisição para **/fazenda.json**
  * Apresentar os dados requisitados pelo layout.
  * Calcular a porcentagem de "positives" e "negatives".
  * Ordernar os items do json a partir da porcentagem calculada acima.
3.  **NÃO** alterar o arquivo **fazenda.json**. Em hipótese nenhuma!
4. Se for preciso modificar a estrutura e workflow, atualizar o README.
5. Submeta o Pull Request e envie um email para apinto@rederecord.com.br :D

### Requisitos obrigatórios
1. Escreva o código com BackboneJS ou VanillaJS  ;)
2. Utilizar um pré-processador CSS de sua preferência.
3. Testes e documentação.
4. Automação de tarefas. (Gulp? Grunt? Webpack? :D)
5. Semântica Web
6. Template Engines (underscore, mustache, ou outras de sua preferência)
7. Ser fiel ao .psd.
8. Suporte para IE11 e multiplataforma (crossbrowser web / mobile - Responsivo).
9. Não usar geradores como yeoman, angular-cli, create-react-app, etc..
10. Procure manter a estrutura do projeto.

### Requisitos extras 
1. Acessibilidade
2. SEO
3. Performance

<sub>Os dados presentes neste teste são totalmente fictícios.</sub>

[![Analytics](https://ga-beacon.appspot.com/UA-69832529-2/read-me)](https://github.com/igrigorik/ga-beacon)
