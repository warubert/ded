# Ded5

O objetivo desse projeto é criar um aplicativo que facilite a criação de fichas de rpg no sistema D&D5.
O principal objetivo é preencher a falta de aplicativos (na verdade não existe nenhum) que façam isso em portugues ( e espanhol mas feito de forma que adicionar outras linguas seja simples).
Outro ponto importante para mim é que o aplicativo possa ser usado de forma offline, visto a relaidade brasileira. Existe uma api da wizards que disponibiliza todas as informações necessárias em ingles,
a minha ideia é utilizar o rxdb para fazer um banco de dados local no device que esta rodando o app enquanto traduzo o conteudo (o que é muita coisa).

O projeto visa a criação de um app hibrido utilizando Ionic (https://ionicframework.com/) com angular, por esse motivo é melhor visualizado em resolução de celulares.
Para demonstração a coleção 'ability-scores' que pode ser encontrada no menu pode ser acessada no banco local com as traduções.
Os demais itens são acessados pela api e apenas mostram o conteúdo selecionado, a ideia é um dia conseguir fazer o mesmo para todas e acrescentar a lógica para a criação de personagens.

## How to Run
Instalando Ionic:
```shell
npm install -g @ionic/cli
```

Instalando dependências:

```shell
npm i
```

Rodando
```shell
ionic serve
```

teste
```shell
npm run test
```
