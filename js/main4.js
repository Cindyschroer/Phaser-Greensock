
window.PhaserGlobal = { disableWebAudio: true };
var game = new Phaser.Game(870, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var player;
var platforms;
var cursors;
var stars;
var jumpButton;
var stateText;
var music;
var boom;
var jump;
var spinning;
var gameover;
var aliens;
var bullets;
var bulletTime = 0;
var explosions;
var lives;
var flame;
var firingTimer = 0;
var livingEnemies = [];
var scoreText;
var score = 10;
var scoreString = '';
var map;
var groundlayer;
var sprite;
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
    game.load.image('buritto', 'assets/images/buritto.png');
    game.load.image('spook', 'assets/images/undertale3.png');

    game.load.spritesheet('captain', 'assets/images/cute7.png', 334,334);

    game.load.audio('backgroundmusic', [ 'assets/audio/undertale.mp3']);
    game.load.audio('spinning', [ 'assets/audio/spinning.mp3']);
    game.load.audio('gameover', [ 'assets/audio/gameover.wav']);
    game.load.audio('boom', [ 'assets/audio/boom.aif']);
    game.load.audio('jump', [ 'assets/audio/jump.mp3']);
    game.load.audio('victory', [ 'assets/audio/victory.mp3']);
    game.load.audio('bite', [ 'assets/audio/bite.mp3']);
}

function create() {

     //  Achtergrond:
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, 'achtergrond');
 
    //map
    map = game.add.tilemap('map');
    map.addTilesetImage('grass1');
    map.setCollisionBetween([0],true);

    groundlayer = map.createLayer('Groundlayer');
    groundlayer.resizeWorld();

   
    game.physics.arcade.enable(groundlayer);
    
    player = game.add.sprite(400,3000, 'captain');
    game.physics.arcade.enable(player);
   
    player.body.collideWorldBounds = true;
    player.body.bounce.set(0.2);
    player.scale.setTo(0.2);
    player.anchor.setTo(0.5, 0.5);
    player.body.collideWorldBounds = true;
    game.physics.arcade.gravity.y = 500;
    player.animations.add('left', [0], 10, true);
    player.animations.add('right', [0], 10, true);
    
    game.camera.follow(player);
    //game.camera.follow(buritto);
    cursors = game.input.keyboard.createCursorKeys();

burittos = game.add.group();
burittos.enableBody = true;
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


    // );
    player.animations.add('left', [0], 10, true);
    player.animations.add('right', [0], 10, true);

    //  Spooky
    aliens = game.add.group();
    aliens.enableBody = true;
    aliens.scale.setTo(2);
    aliens.physicsBodyType = Phaser.Physics.ARCADE;

    createAliens();
    //  Lives
    lives = game.add.group();
    liveText = game.add.text(game.world.width - 100, 0, 'Lives : ', { font: '34px Arial', fill: '#fff' });
     lives.fixedToCamera= true; 

         scoreString = 'Buritto : ';
    scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#fff' });

scoreText.fixedToCamera= true; 
liveText.fixedToCamera= true; 



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

    //  And some controls to play the game with
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


    //  Text
    




}


function createAliens () {

    for (var y = 0; y < 5; y++)
    {
        for (var x = 0; x < 1; x++)
        {
            var alien = aliens.create(x * 48, y * 323, 'spook');
            alien.anchor.setTo(0.5, 0.5);
            alien.animations.add('fly', [ 0, 1, 2, 3 ], 50, true);
            alien.play('fly');
            alien.body.moves = false;
        }
    }

    aliens.x = 100;
    aliens.y = 50;

    //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
    var tween = game.add.tween(aliens).to( { x: 700 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

    //  When the tween loops it calls descend
    tween.onLoop.add(descend, this);
}

function setupSpook (spook) {

    spook.anchor.x = 0.5;
    spook.anchor.y = 0.5;
    spook.animations.add('kaboom');

}

function descend() {

    aliens.y += 10;

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

        player.animations.play('left');
        player.angle += 40;
        

        }
        else if (cursors.right.isDown)
        {
            spinning.resume();
            player.frame = 0;
             player.body.velocity.x = 400;

        player.animations.play('right');
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
    if (jumpButton.isDown && player.body.onFloor()  && game.time.now > jumpTimer)
    {
        jump.play();
        player.body.velocity.y = -450;
        spinning.pause();
        jumpTimer = game.time.now + 0;
    }


        else if (game.time.now > firingTimer)
        {
            enemyFires();
        }

        //  Run collision
        game.physics.arcade.overlap(Flames, player, enemyHitsPlayer, null, this);
        game.physics.arcade.overlap(aliens, player, enemyHitsPlayer, null, this);
       // game.physics.arcade.overlap(player, buritto, PlayerHitsburitto, null, this);
        game.physics.arcade.overlap(player, burittos, collectBuritto, null, this);
    }

}

function render() {

    // for (var i = 0; i < aliens.length; i++)
    // {
    //     game.debug.body(aliens.children[i]);
    // }

}


function collectBuritto (player, buritto) {

    //  When a bullet hits an alien we kill them both
    buritto.kill();
    bite.play();


    //  Increase the score
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


function enemyHitsPlayer (player,bullet,aliens) {
    
    bullet.kill();

    live = lives.getFirstAlive();

    if (live)
    {
           boom.play();
        live.kill();
    }

    //  And create an explosion :)
    var explosion = explosions.getFirstExists(false);
    explosion.reset(player.body.x, player.body.y);
    explosion.play('kaboom', 30, false, true);

    // When the player dies
    if (lives.countLiving() < 3)
    {
        music.pause();
        gameover.play();
        spinning.pause();
        player.kill();
        winText = game.add.text(400,300, 'You DIED! \n Click to restart ', { font: '100px Comicsans', fill: '#fff' });
        winText.anchor.setTo(0.5);
     winText.fixedToCamera= true; 
      winText.visible= true;
     game.input.onTap.addOnce(restart,this);


    }

}


function enemyFires () {

    //  Grab the first bullet we can from the pool
    enemyBullet = Flames.getFirstExists(false);

    livingEnemies.length=0;

    aliens.forEachAlive(function(alien){

        // put every living enemy in an array
        livingEnemies.push(alien);
    });


    if (enemyBullet && livingEnemies.length > 0)
    {
        
        var random=game.rnd.integerInRange(0,livingEnemies.length-1);

        // randomly select one of them
        var shooter=livingEnemies[random];
        // And fire the bullet from this enemy
        enemyBullet.reset(shooter.body.x, shooter.body.y);

        game.physics.arcade.moveToObject(enemyBullet,player,120);
        firingTimer = game.time.now + 2000;
    }

}



function resetBullet (bullet) {

    //  Called if the bullet goes out of the screen
    bullet.kill();

}

function restart () {
    score= 10;
    scoreText.text = scoreString + score;
    //  A new level starts
    winText.visible = false;
    music.play();
    //resets the life count
    lives.callAll('revive');
    //  And brings the aliens back from the dead :)
    aliens.removeAll();
    createAliens();

    //revives the player
    player.reset(400,3000)
    
    //hides the text
    winText.visible = false;
burittos.callAll('revive');


}
















