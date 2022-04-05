class Form {
  constructor() {
    this.input = createInput("Name");
    this.button = createButton("Play");
    this.greeting = createElement("h3");
    console.log(this.button);
    this.title= createElement("h2");
    this.reset=createButton("Restart");
    this.color_choice = createRadio();//color choice
    this.color_choice_txt = createElement('h4', "choose the color of your car:")
  }

  esconder(){
    this.greeting.hide();
    this.input.hide();
    this.button.hide();
    this.color_choice.hide();//color choice
    this.color_choice_txt.hide();//color choice
  }

  display() {
    this.title.html("Car Race Game");
    this.title.position(displayWidth/2-180, 10);//novo

    this.color_choice.option("white","white");//color choice
    this.color_choice.option("red","red");//color choice
    this.color_choice.option("blue","blue");//color choice
    this.color_choice.option("black","black");//color choice
    this.color_choice.selected("white");//color choice
    this.color_choice.position(displayWidth/2-100,displayHeight/2-65);//color choice
    this.color_choice_txt.position(displayWidth/2-90,displayHeight/2-115);//color choice

    //ajeita posição dos elementos html
    this.input.position(displayWidth/2-80, displayHeight/2-150);//novo
    this.button.position(displayWidth/2-20, displayHeight/2-20);//novo
    this.reset.position(displayWidth-150,20)
    //quando clicar no botão
    this.button.mousePressed(() => {
      //esconder entrada e botão
      this.input.hide();
      this.button.hide();
      this.color_choice.hide();//color choice
      this.color_choice_txt.hide();//color choice

      player.name = this.input.value();
      player.color = this.color_choice.value();//color choice

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
      Player.updateCarsAtEnd(0)
      database.ref("players").remove();
      document.location.reload(true)
    })
  }
}