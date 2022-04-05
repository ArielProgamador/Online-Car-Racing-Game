class Game {
    constructor() {}
    //pegar estado de jogo
    getState() {
        var gameState = database.ref("gameState");
        gameState.on("value", function (data) {
            gameState = data.val();
        });
    }

    //atualizar estado de jogo
    update(state) {
        database.ref('/').update({
            gameState: state
        });
        gameState = state;
    }

    //iniciar o jogo
    async start() {
        if (gameState === 0) {
            player = new Player();
            var refplayerCount = await database.ref('playerCount').once("value");
            if (refplayerCount.exists()){
                playerCount = refplayerCount.val();
                player.getCount();
            }
            form = new Form();
            form.display();
        }
        car1 = createSprite(400,displayHeight/2);
        car2 = createSprite(600,displayHeight/2);
        car3 = createSprite(800,displayHeight/2);
        car4 = createSprite(1000,displayHeight/2);
        car1.addImage('white',car1Img);
        car1.addImage('red',car2Img);
        car1.addImage('blue',car3Img);
        car1.addImage('black',car4Img);
        car2.addImage('white',car1Img);
        car2.addImage('red',car2Img);
        car2.addImage('blue',car3Img);
        car2.addImage('black',car4Img);
        car3.addImage('white',car1Img);
        car3.addImage('red',car2Img);
        car3.addImage('blue',car3Img);
        car3.addImage('black',car4Img);
        car4.addImage('white',car1Img);
        car4.addImage('red',car2Img);
        car4.addImage('blue',car3Img);
        car4.addImage('black',car4Img);
    
        car1.scale=1.5;
        car2.scale=1.5;
        car3.scale=1.5;
        car4.scale=1.5;
        cars = [car1, car2, car3, car4];
    }

    //estado de jogo jogar
    play() {
        form.esconder();
        Player.getPlayerInfo();
        player.getCarsAtEnd();

        if (allPlayers !== undefined) {
            background(ground);
            image(track,0,-displayHeight*3.5,displayWidth,displayHeight*5);

            //index ada matriz de carros
            var index = 0;

            var x = 250;
            var y;


            // deixar o texto do jogador atual vermelho
            for (var jgdr in allPlayers) {

                index += 1;
                x += 300;

                y = displayHeight - allPlayers[jgdr].distance;

                cars[index-1].x = x;
                cars[index-1].y = y;

                //color choice
                switch (allPlayers[jgdr].color) {
                    case "white":
                        cars[index-1].changeImage('white',car1Img);
                        break;
                    case "red":
                        cars[index-1].changeImage('red',car2Img);
                        break;
                    case "blue":
                        cars[index-1].changeImage('blue', car3Img);
                        break;
                    case "black":
                        cars[index-1].changeImage('black', car4Img);
                        break;
                    default:
                        console.error("could not identify the color of the player " + allPlayers[jgdr] + " on the database");
                        break;
                }

                if (index === player.index) {
                    fill("red");
                    ellipse(x,y,100,100)
                    camera.position.x = displayWidth/2;
                    camera.position.y = cars[index-1].y;
                }
            }
            drawSprites();
        }

        if (keyDown(UP_ARROW) && player.index !== null) {
            player.distance += 50;
            if (player.distance>displayHeight*4.5-100) {
                player.distance=displayHeight*4.5-100;
                
            }
            player.update();
        }
        if (player.distance===displayHeight*4.5-100) {
            player.rank+=1
            player.update()
            Player.updateCarsAtEnd(player.rank)
            gameState=2
            game.update(2)

        }
       
    }
     end() {
        Player.getPlayerInfo();

        if (allPlayers !== undefined) {
            background(ground)
            image(track,0,-displayHeight*3.5,displayWidth,displayHeight*5)
            //index ada matriz de carros
            var index = 0;

            var x = 250;
            var y;
            
            for (var jgdr in allPlayers) {

                index += 1;
                x += 300;

                y = displayHeight - allPlayers[jgdr].distance;

                cars[index-1].x = x;
                cars[index-1].y = y;

                if (index === player.index) {
                    cars[index - 1].shapeColor = "red";
                    camera.position.x = displayWidth/2;
                    camera.position.y = cars[index-1].y;
                }
            }
        }
        form.title.html("GREAT JOB")
        console.log(player.rank)
        var textrank=createElement("h1")
        textrank.html("AMAZING! Your rank is: "+player.rank)
        textrank.position(displayWidth/2-300,displayHeight/2+60)
    }
}
