class Player {
  constructor() {
    this.index = null;
    this.distance = 0;
    this.name = null;
    this.color = null;//color choice
    this.rank = 0
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
      distance: this.distance,
      color: this.color,
      rank: this.rank
    });//color choice
  }
  static getPlayerInfo() {
    var refPlayerInfo = database.ref('players');
    refPlayerInfo.on("value", function (data) {
      allPlayers = data.val();
    });
  }
  getCarsAtEnd() {
    database.ref("carsAtEnd").on("value", function (data) {
      rank = data.val()
    })
    this.rank = rank
  }
  static updateCarsAtEnd(num) {
    database.ref("/").update({
      carsAtEnd:num
    })
  }
}