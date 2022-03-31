class Form {
  constructor() {
    this.input = createInput("Name");
    this.button = createButton("Play");
    this.greeting = createElement("h3");
    console.log(this.button);
    this.title= createElement("h2");
    this.reset=createButton("Restart")
  }

  esconder(){
    this.greeting.hide();
    this.input.hide();
    this.button.hide();
  }

  display() {
    this.title.html("Car Race Game");
    this.title.position(displayWidth/2-180, 10);//novo

    //ajeita posição dos elementos html
    this.input.position(displayWidth/2-80, displayHeight/2-120);//novo
    this.button.position(displayWidth/2-20, displayHeight/2-50);//novo
    this.reset.position(displayWidth-150,20)
    //quando clicar no botão
    this.button.mousePressed(() => {
      //esconder entrada e botão
      this.input.hide();
      this.button.hide();

      player.name = this.input.value();

      //aumentar o valor do playerCount e atualizar o name do jogador no banco de dados
      playerCount += 1;
      player.index = playerCount; 
      player.update();
      player.updateCount(playerCount);

      //mostrar mensagem de boas-vindas
      this.greeting.html("Olá " + player.name);
      this.greeting.position(displayWidth/2-40, displayHeight/2-120);//novo
    });
    this.reset.mousePressed( () =>{
      player.updateCount(0);
      game.update(0);
      database.ref("players").remove();
      document.location.reload(true)
    })
  }
}