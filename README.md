# Simulador de Sistemas Fotovoltaicos
Projeto desenvolvido na Faculdade de Engenharia Elétrica e Computação da UNICAMP com o intuito de realizar uma simulação de um sistema fotovoltaico em um determinado local definido pelo usuário.

# Como executar o projeto na sua máquina

### Requerimentos

  - Node.js instalado na sua máquina
  - WampServer ou XAMPP para você acessar seu endereço http://localhost:4200
  
### Passo-a-passo

Execute os comandos abaixo no prompt de comandos.

```sh
$ cd \
$ cd wamp64\www\
$ git clone https://github.com/enricorocheti/simulador_fotovoltaico.git
$ cd simulador_fotovoltaico
$ npm install
$ npm install @angular/cli
$ npm install --save angular2-csv@0.2.5
$ cd ../
$ npm install -g @angular/cli
```

O projeto então estará pronto para ser executado, basta você executar o comando abaixo e depois acessar a ferramenta através do endereço http://localhost:4200/home/simulator.

```sh
$ ng serve
```
