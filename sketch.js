var database;
var gameState = 0;
var playerCount = 0;
var form, player, game;
var allPlayers;
var cars, car1, car2, car3, car4;
var car1Img, car2Img, car3Img, car4Img, ground, track;
var bg;
var rank

function preload() {
  car1Img = loadImage("images/car1.png");//novo
  car2Img = loadImage("images/car2.png");//novo
  car3Img = loadImage("images/car3.png");//novo
  car4Img = loadImage("images/car4.png");//novo
  ground = loadImage("images/ground.png");//novo
  track = loadImage("images/track.jpg");//novo
  bg = loadImage("images/fundo.png"); //novo
}

function setup() {
  database = firebase.database();
  createCanvas(displayWidth-20, displayHeight-120);
  game = new Game();
  game.getState();
  game.start();
}

function draw() {
  background(bg);
  //atualizar o estado de jogo para um quando houver 4 jogadores
  if(playerCount >= 4&&gameState===0){
    game.update(1);
  }

  //limpa a tela e começa o jogo se o modo de jogo for 1
  if(gameState === 1){
    clear();
    game.play();
  }
  if (gameState===2) {
    game.end()
    drawSprites();
  }
}