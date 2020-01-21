let config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 650,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload() {

    this.load.image('road', 'Assets/road.png');
    this.load.image('title', 'Assets/TitleScreen.png');
    this.load.image('streetCone', 'Assets/streetcone.png');
    this.load.image('carRectangle', 'Assets/Audi.png');
    this.load.image('opponent', 'Assets/Police.png');
    this.load.image('tutorial','Assets/tutorialControlsGame.png');

    this.load.audio('horn', 'Audio/carhorn.mp3');
    this.load.audio('running', 'Audio/carRunning.mp3');
    this.load.audio('highway', 'Audio/Highway.mp3');
    this.load.audio('crash', 'Audio/CarCrash.mp3');
    this.load.audio('background', 'Audio/BackgroundMusic.mp3');

}

let player;
let opponent;
let opponent2;
let opponent3;
let cone1;
let cone2;
let time = 0;
let timeText;
let lives = 3;
let livesText;
let title;

let soundGame1;
let soundCrash;
let soundHorn;


function create() {

    //setting the sound/////////////////////////////////////////////////////////////////////////
    soundGame1 = this.sound.add('background');
    soundHorn = this.sound.add('horn');
    soundCrash = this.sound.add('crash');

    soundGame1.play();

    //setting the background///////////////////////////////////////////////////////////////////
    this.tilesprite = this.add.tileSprite(500, 325, 1250, 800, 'road');

    //setting the objects//////////////////////////////////////////////////////////////////////

    player = this.physics.add.sprite(430, 600, 'carRectangle');

    player.setCollideWorldBounds(true);

    cone1 = this.physics.add.sprite(-50,-50, 'streetCone');
    cone1.setCollideWorldBounds(false);

    cone2 = this.physics.add.sprite(-50,-50, 'streetCone');
    cone2.setCollideWorldBounds(false);

    opponent = this.physics.add.sprite(-50,-1000, 'opponent');
    opponent.setCollideWorldBounds(false);


    opponent2 = this.physics.add.sprite(-50,-1000, 'opponent');
    opponent2.setCollideWorldBounds(false);

    opponent3 = this.physics.add.sprite(-50,-50, 'opponent');
    opponent3.setCollideWorldBounds(false);

    livesText = this.add.text(840, 600, 'Live: 3', {fontSize: '32px', fill: '#000'});
    timeText = this.add.text(16, 16, 'Time: 0', {fontSize: '32px', fill: '#000'});

    //checking for hit////////////////////////////////////////////////////////////////////////////

    this.physics.add.collider(player,opponent).collideCallback = hit;
    this.physics.add.collider(player,opponent2).collideCallback = hit1;
    this.physics.add.collider(player,opponent3).collideCallback = hit2;
    this.physics.add.collider(player,cone1).collideCallback = hit3;
    this.physics.add.collider(player,cone2).collideCallback = hit4;

    title = this.physics.add.sprite(500,300,'title');


}

function hit(){

    lives -=1;
    opponent.setPosition(-100,-100);
    livesText.setText('Live: ' + lives );
    soundCrash.play();


}
function hit1(){

    lives -=1;
    opponent2.setPosition(-100,-100);
    livesText.setText('Live: ' + lives );
    soundCrash.play();
}
function hit2(){

    lives -=1;
    opponent3.setPosition(-100,-100);
    livesText.setText('Live: ' + lives );
    soundCrash.play();
}
function hit3(){

    lives -=1;
    cone1.setPosition(-100,-100);
    livesText.setText('Live: ' + lives );
    soundCrash.play();
}
function hit4(){

    lives -=1;
    cone2.setPosition(-100,-100);
    livesText.setText('Live: ' + lives );
    soundCrash.play();
}




function update() {
    let cursors = this.input.keyboard.createCursorKeys();

    if (cursors.left.isDown && !cursors.down.isDown) {

        player.setVelocityX(-600);
        player.setAngle(-30);

    }
    else if (cursors.right.isDown && !cursors.down.isDown) {
        player.setVelocityX(600);
        player.setAngle(30);

    }
    else {
        player.setVelocityX(0);
        player.setAngle(0);
    }

    if (cursors.up.isDown) {

        this.tilesprite.tilePositionY -= 10;
        player.setVelocityY(-300);

    }
    else if (cursors.down.isDown && cursors.left.isDown && cursors.right.isDown) {
        this.tilesprite.tilePositionY -= 5;
        player.setVelocityY(300);
        player.setAngle(0);
    }
    else if (cursors.down.isDown) {
        this.tilesprite.tilePositionY -= 7;
        player.setVelocityY(300);
        player.setAngle(0);
    }
    else if (cursors.space.isDown ) {
        soundHorn.play();
    }

    else {
        player.setVelocityY(0);
        this.tilesprite.tilePositionY -= 10;

    }


    /*if(!(this.tilesprite.tilePositionY % Phaser.Math.Between(1200, 1500))){
        opponent.setPosition(250,-50);
    }

    if(!(this.tilesprite.tilePositionY % Phaser.Math.Between(1200, 3000))){
        opponent2.setPosition(450,-50);
    }

    if(!(this.tilesprite.tilePositionY % Phaser.Math.Between(2000, 2500))){
        opponent3.setPosition(650,-50);
    }*/


    if(time > 360){

        if(time >0 && time%115===0){
            opponent.setPosition(250 + Phaser.Math.Between(-25, 25),-50);
        }

        if(time >0 && time%394===0){
            opponent2.setPosition(470,-50);
        }

        if(time >0 && time%145===0){
            opponent3.setPosition(690 + Phaser.Math.Between(-25, 25),-50);
        }

        if(time >0 && time%300===0){
            cone1.setPosition(60,-50);
        }

        if(time >0 && time%300===0){
            cone2.setPosition(900,-50);
        }



        opponent.setVelocityY(Phaser.Math.Between(200, 800));
        opponent.setVelocityX(0);

        opponent2.setVelocityY(Phaser.Math.Between(200, 800));
        opponent2.setVelocityX(0);

        opponent3.setVelocityY(Phaser.Math.Between(200, 800));
        opponent3.setVelocityX(0);

        cone1.setVelocityY(130);
        cone1.setVelocityX(0);
        cone2.setVelocityY(130);
        cone2.setVelocityX(0);
    }



    if(lives>0){
        time += 1;
        timeText.setText('Time: ' + Math.floor(time/60) );
    }


    if(lives === 0){
        opponent.setVelocityY(0);
        opponent2.setVelocityY(0);
        opponent3.setVelocityY(0);
        player.setVelocityY(0);
        cone1.setVelocityY(0);
        cone2.setVelocityY(0);
        this.tilesprite.tilePositionY = 0;
        //timeText.setText('You survived:' + Math.floor(time/60)+' seconds' );
        timeText = this.add.text(30, 300, 'You survived: ' + Math.floor(time/60) + ' seconds', {fontSize: '60px', fill: '#000'});
        soundGame1.stop();
    }

    if(time/60 > 1){
        title.destroy();
    }

}