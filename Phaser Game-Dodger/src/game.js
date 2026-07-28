const config = new Object(); 

config.width = 640;                                              
config.height  = 480;    
config.scene   = [ PlayScene ];                                    //Scenes for this game 
config.physics = { default:'arcade' };
                                          
const game = new Phaser.Game(config);                                
