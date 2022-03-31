class Player {
  constructor() {
    this.index = null;
    this.distance = 0;
    this.name = null;
  }
  getCount() {
    //pegar informação do numero de jogadores
    var refPlayerCount = database.ref('playerCount');
    refPlayerCount.on("value", function (data) {
      playerCount = data.val();
    });
  }
  //atualizar o numero de jogadores
  updateCount(num) {
    database.ref('/').update({
      playerCount: num
    });
  }
  //atualizar name do jogador
  update() {
    var playerIndex = 'players/player' + this.index;
    database.ref(playerIndex).set({
      name: this.name,
      distance: this.distance
    });
  }
  static getPlayerInfo() {
    var refPlayerInfo = database.ref('players');
    refPlayerInfo.on("value", function (data) {
      allPlayers = data.val();
    });
  }
}