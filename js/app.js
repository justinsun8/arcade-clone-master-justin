
var level = 1;
// Enemy Object
var Enemy = function() {

  // Set enemy image
  this.sprite = 'images/enemy-bug.png';
  // Enemy starts at random x position
  this.x = Math.floor((Math.random() * 504) + -90);
  //Possible Enemy Array
  this.yArray = [41.5, 124.5, 207.5];
  // Set enemy position to random yarray
  this.y = this.yArray[Math.floor(Math.random() * this.yArray.length)];
  // Enemy Difficulty - increases each level
  this.veloc = Math.floor((Math.random() * 30) + 10) * level;
};

// Update the enemy's position method
Enemy.prototype.update = function(dt) { 
  this.x = this.x + (this.veloc * dt);

  // refresh enemy at right
  if (this.x > 504) {
    // set start position for enemy
    this.x = -90;
    this.y = this.yArray[Math.floor(Math.random() * this.yArray.length)];
    this.veloc = Math.floor((Math.random() * 30) + 10) * level;
  }

  // check if player touches enemy
  if ((this.x > player.x - 75 && this.x < player.x + 75) && (this.y > player.y - 75 && this.y < player.y + 75)) {
    // Return player to initial position if so
    player.x = 202;
    player.y = 373.5;

    // Enemies go to random positions in this scenario
    allEnemies.forEach(function(enemy) {
      enemy.x = Math.floor((Math.random() * 504) + -90);
      enemy.y = enemy.yArray[Math.floor(Math.random() * enemy.yArray.length)];
    });

    // Return to level 1
    level = 1;
  }

  // Display the level variable value to .level span when update
  document.querySelector('.level span').innerHTML = level;
};

// Render enemy on the screen method
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
var Player = function() {

  // Set initial player position
  this.x = 202;
  this.y = 373.5;

  // Set player image
  this.sprite = 'images/char-boy.png';
};

Player.prototype.handleInput = function(keyPress) {

  // Input keypress to change position
  switch (keyPress) {
    case 'up':
      this.y = this.y - 83;
      //can't move outside boundries
      if(this.y < 0) {
        this.x = 202;
        this.y = 373.5;
        level++;
      }
    break;
    case 'down':
      if(this.y < 373.5) {
        this.y = this.y + 83;
      }
    break;
    case 'left':
      if(this.x > 0) {
        this.x = this.x - 101;
      }
    break;
    case 'right':
      if(this.x < 404) {
        this.x = this.x + 101;
      }
    break;
  }
};

Player.prototype.update = function(dt) {

};

// Render player on the screen method
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Instatiate enemies in allEnemie array
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];

// Instantiate player
var player = new Player();

// Listen for key presses and send keys to Player.handleInput() method
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
