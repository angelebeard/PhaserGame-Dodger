class PlayScene extends Phaser.Scene { 
    //construct new scene 
    constructor() { 
        super('play');     //set this scene's id within superclass constructor
        this.top_score = 100;
        this.winner = 'Top Score';
} 
 
//preload external game assets 
preload() { 
    this.load.path = 'assets/';                                          
    this.load.image( 'background', 'background.png' ); 
    this.load.image( 'player', 'player.png' ); 
    this.load.image( 'enemy', 'enemy.png' );      
    this.load.image( 'player-0', 'player-0.png' );                     
    this.load.image( 'player-1', 'player-1.png' );   
    this.load.image( 'enemy-0', 'enemy-0.png' );                       
    this.load.image( 'enemy-1', 'enemy-1.png' );
    this.load.image( 'projectile', 'projectile.png' );   
} 

//create game data 
create() { 
    this.create_map();   
    this.create_animations();                      
    this.create_player();                       
    this.create_enemies();                     
    this.create_collisions();  
    this.create_hud();
} 

//Update game data 
    update() { 
}

//update game state 
update() { 
    this.update_player(); 
    this.update_score();
    
} 

//Create Game World 
create(){ 
    this.create_map();  
    this.create_player(); {
        this.player = new Player(this); 
    }  
    this.create_enemies();
} 

//Load level 
create_map() { 
    this.background = this.add.tileSprite(640/2, 480/2, 640, 480, 'background');  
}
}

class Player extends Phaser.Physics.Arcade.Sprite { 
    constructor(scene) { 
        super(scene, 300, 200, 'player'); 
        this.depth = 2; 
        this.speed = 200;                                        
        scene.add.existing(this);  
    }    
} 
create_enemies(); { 
    this.enemies = []; 
    
    const event = new Object(); 
    event.delay = 200; 
    event.callback  = this.spawn_enemy; 
    event.callbackScope = this; 
    event.loop = true; 
    this.time.addEvent(event, this); 
}

spawn_enemy(); { 
    const config = {}; 
    config.x = 640 + 32; 
    config.y = Phaser.Math.Between(0, 480) 
    
    const monster =  new Enemy(this, position); 
    this.enemies.push(monster); 
    this.score +=1;
}

//sets up overlap collisions behaviors 
    create_collisions(); { 
    this.physics.add.overlap(this.player,this.enemies,this.game_over,null,this); 
}

game_over(); { 
    if ( this.score >= this.top_score) { 
    this.top_score = this.score; 
    this.physics.pause();                                              
    this.winner = prompt("Winner! Enter you name: ") ?? "Top Score"     
    this.input.keyboard.keys = []  
    }

    this.cameras.main.flash(); 
    this.scene.restart(); 
}

update_background(); {             
    this.background.tilePositionX += 3; 
}

//create animations 
create_animations(scene); { 
    if ( !this.anims.exists('player-move') ){ 

        const anim_player_move = new Object(); 
        anim_player_move.key = 'player-move';                             
        anim_player_move.frames = [{key: 'player-0'}, {key: 'player-1'}];
        anim_player_move.frameRate = 6;                                   
        anim_player_move.repeat = -1;                                     
 
        this.anims.create(anim_player_move);                              
    } 
    if ( !this.anims.exists('enemy-move') ){ 
        const anim_enemy_move = new Object(); 
        anim_enemy_move.key = 'enemy-move';                              //key to register into phaser 
        anim_enemy_move.frames = [{key: 'enemy-0'}, {key: 'enemy-1'}];   //list of image keys for anim 
        anim_enemy_move.frameRate = 6;                                   //speed to play animation 
        anim_enemy_move.repeat = -1;                                     //-1 for infinite loop 
        this.anims.create(anim_enemy_move);    
    }

create_hud(); { 
    this.score = 0; 
    this.score_text = this.add.text(32, 32, ""); 
    this.score_text.depth = 3; 
    this.score_text.setColor( 'rgb(255,255,255)' ); 

    this.top_score_text = this.add.text( 600, 32, "" );                   
    this.top_score_text.depth = 3; 
    this.top_score_text.setOrigin(1,0);
}  

update_score(); { 
    this.score_text.setText("Score: " + this.score); 
    this.top_score_text.setText(`${this.winner}: ${this.top_score}`) ;
} 

class Projectile extends Phaser.Physics.Arcade.Sprite { 
    constructor(scene, position, velocity) ) {
        super(scene, position.x, position.y, 'projectile'); 
        this.depth = 1; 

        scene.add.existing(this); 
        scene.physics.add.existing(this); 
        this.body.velocity.x = velocity.x;  
        this.body.velocity.y = velocity.y;  
} 
 
}

}