
window.PhaserGlobal = { disableWebAudio: true };
var game = new Phaser.Game(870, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var player;
var platforms;
var Buritto;
var cursors;
var jumpButton;
var stateText;
var music;
var boom;
var jump;
var spinning;
var gameover;
var spoken;
var explosions;
var lives;
var Flames;
var firingTimer = 0;
var livingEnemies = [];
var scoreText;
var score = 10;
var scoreString = '';
var map;
var groundlayer;
var burittos;
var liveText;
var jumpTimer = 0;
var winText;
var highScore = 0;

function preload() {
    game.load.tilemap('map', 'assets/images/level7.json', null, Phaser.Tilemap.TILED_JSON);

    game.load.image('achtergrond', 'assets/images/background1.png');
    game.load.image('flame', 'assets/images/flamess.png');
    game.load.image('kaboom', 'assets/images/flamess.png');
    game.load.image('grass1', 'assets/images/grass1.png');
    game.load.spritesheet('buritto', 'assets/images/buritto.png');
    game.load.image('spook', 'assets/images/undertale3.png');

    game.load.audio('backgroundmusic', [ 'assets/audio/undertale.mp3']);
    game.load.audio('spinning', [ 'assets/audio/spinning.mp3']);
    game.load.audio('gameover', [ 'assets/audio/gameover.wav']);
    game.load.audio('boom', [ 'assets/audio/boom.aif', 'assets/audio/boom.ogg']);
    game.load.audio('jump', [ 'assets/audio/jump.mp3']);
    game.load.audio('victory', [ 'assets/audio/victory.mp3']);
    game.load.audio('bite', [ 'assets/audio/bite.mp3']);

    game.load.spritesheet('captain', 'assets/images/cute7.png', 334,334);
}

function create() {

     //  Achtergrond:
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, 'achtergrond');
 
    //map
    map = game.add.tilemap('map');
    map.addTilesetImage('grass1');
   
    groundlayer = map.createLayer('Groundlayer');
    map.setCollisionBetween([0],true);
    groundlayer.resizeWorld();

    //player
    player = game.add.sprite(400,3000, 'captain');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.bounce.set(0.2);
    player.scale.setTo(0.2);
    player.anchor.setTo(0.5, 0.5);
    game.physics.arcade.gravity.y = 500;

burittos = game.add.group();
burittos.enableBody = true;
game.physics.arcade.enable(burittos)
var buritto = burittos.create(700,500,'buritto');
buritto.scale.setTo(0.15);
var buritto = burittos.create(700,50,'buritto');
buritto.scale.setTo(0.15);
var buritto = burittos.create(50,1000,'buritto');
buritto.scale.setTo(0.15);
var buritto = burittos.create(50,1500,'buritto');
buritto.scale.setTo(0.15);
var buritto = burittos.create(650,2000,'buritto');
buritto.scale.setTo(0.15);
var buritto = burittos.create(50,1800,'buritto');
buritto.scale.setTo(0.15);
var buritto = burittos.create(70,2300,'buritto');
buritto.scale.setTo(0.15);
var buritto = burittos.create(600,2650,'buritto');
buritto.scale.setTo(0.15);
var buritto = burittos.create(0,2950,'buritto');
buritto.scale.setTo(0.15);
var buritto = burittos.create(40,2600,'buritto');
buritto.scale.setTo(0.15);



    //music 
    music = game.add.audio('backgroundmusic');
    spinning = game.add.audio('spinning');
    gameover = game.add.audio('gameover');
    boom = game.add.audio('boom');
    jump = game.add.audio('jump');
    victory = game.add.audio('victory');
    bite = game.add.audio('bite');
        music.play();
        spinning.play();
        spinning.pause();

    //The enemy's flames
    Flames = game.add.group();
    Flames.enableBody = true;
    Flames.physicsBodyType = Phaser.Physics.ARCADE;
    Flames.createMultiple(100, 'flame');
    Flames.setAll('anchor.x', 0.5);
    Flames.setAll('anchor.y', 1);
    Flames.setAll('outOfBoundsKill', true);
    Flames.setAll('checkWorldBounds', true);  

    //  Spook
    spoken = game.add.group();
    spoken.enableBody = true;
    spoken.scale.setTo(2);
    spoken.physicsBodyType = Phaser.Physics.ARCADE;
    createSpoken();

    //  Lives
    lives = game.add.group();
    liveText = game.add.text(game.world.width - 100, 0, 'Lives : ', { font: '34px Arial', fill: '#fff' });
    lives.fixedToCamera= true; 

    //score
    scoreString = 'Buritto : ';
    scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#fff' });

    //camera
    game.camera.follow(player);
    scoreText.fixedToCamera= true; 
    liveText.fixedToCamera= true; 

    //controls
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

for (var i = 0; i < 3; i++) 
    {
        var captain = lives.create(game.world.width - 100 + (30 * i), 60, 'captain');
        captain.anchor.setTo(0.2 , 0.4);
        captain.alpha = 0.7;
        captain.scale.setTo(0.1);
    }

    //  An explosion pool
    explosions = game.add.group();
    explosions.createMultiple(30, 'kaboom');
    explosions.forEach(setupSpook, this);

}


function createSpoken () {

    for (var y = 0; y < 5; y++)
    {
        for (var x = 0; x < 1; x++)
        {
            var spook = spoken.create(x * 0, y * 323, 'spook');
            spook.anchor.setTo(0.5, 0.5);
            spook.body.moves = false;
        }
    }

    spoken.x = 100;
    spoken.y = 50;

    //  Greensock animatie
    var tween = game.add.tween(spoken).to( { x: 700 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
    tween.onLoop.add(descend, this);
}

function setupSpook (spook) {

   spook.animations.add('kaboom');

}

function descend() {

    spoken.y += 10;

}

function update() {
    game.physics.arcade.collide(player, groundlayer);
    game.physics.arcade.collide(burittos, groundlayer);

    if (player.alive)
    {
        //  Reset the player, then check for movement keys
        player.body.velocity.x =0;

        if (cursors.left.isDown)
        {
            spinning.resume();
            player.frame = 0;
            player.body.velocity.x = -400;

        player.angle += 40;
        

        }
        else if (cursors.right.isDown)
        {
            spinning.resume();
            player.frame = 0;
             player.body.velocity.x = 400;

        player.angle += 40;
        
        }
        else
    {
        //  Stilstaan
        player.animations.stop();
        spinning.pause();

        player.frame = 1;
        player.angle += 0;
    }
    
    //  Springen, wanneer pijltje naar boven is ingedrukt EN player staat op een platform
    if (jumpButton.isDown && player.body.onFloor())
    {
        jump.play();
        player.body.velocity.y = -450;
        spinning.pause();
    }


        else if (game.time.now > firingTimer)
        {
            enemyFires();
        }

        //  Run collision
        game.physics.arcade.overlap(Flames, player, enemyHitsPlayer, null, this);
        game.physics.arcade.overlap(spoken, player, enemyHitsPlayer, null, this);
        game.physics.arcade.overlap(player, burittos, collectBuritto, null, this);
    }

}

function collectBuritto (player, Buritto) {
    Buritto.kill();
    bite.play();

    score += -1;
    scoreText.text = scoreString + score;

  if (score == 0)
    {
        music.pause();
        victory.play();
        spinning.pause();
        player.kill();
        
        winText = game.add.text(400,300, 'You Win! \n Click to restart ', { font: '100px Comicsans', fill: '#fff' });
        winText.anchor.setTo(0.5);
        winText.fixedToCamera= true; 
        winText.visible= true;
        
        game.input.onTap.addOnce(restart,this);
    }
}


function enemyHitsPlayer (player,vlam,spoken) {
    
    vlam.kill();

    live = lives.getFirstAlive();

    if (live)
    {
        boom.play();
        live.kill();
    }

    // When the player dies
    if (lives.countLiving() < 1)
    {
        music.pause();
        gameover.play();
        spinning.pause();
        player.kill();
        //burittos.callAll('kill');
     winText = game.add.text(400,300, 'You DIED! \n Click to restart ', { font: '100px Comicsans', fill: '#fff' });
     winText.anchor.setTo(0.5);
     winText.fixedToCamera= true; 
     winText.visible= true;

     game.input.onTap.addOnce(restart,this);


    }

}


function enemyFires () {

    //  Eerst vlam
    flame = Flames.getFirstExists(false);


    spoken.forEachAlive(function(spook){

        // Array van vlammen
        livingEnemies.push(spook);
    });


    if (flame && livingEnemies.length > 0)
    {
        
        var random=game.rnd.integerInRange(0,livingEnemies.length-1);

        // Random spook, die vlammen werpt
        var shooter=livingEnemies[random];
        // Werpt vlam naar beneden
        flame.reset(shooter.body.x, shooter.body.y);

        game.physics.arcade.moveToObject(flame,player,120);
        firingTimer = game.time.now + 4000;
    }

}



function resetBullet (vlam) {

    //  Vlam uit beeld
   vlam.kill();

}

function restart () {
    score= 10;
    scoreText.text = scoreString + score;
    winText.visible = false;
    music.play();
    lives.callAll('revive');
    spoken.removeAll();
    createSpoken();
    player.reset(400,3000)
    winText.visible = false;
    burittos.callAll('revive');

}
















