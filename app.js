// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt

    if (this.x >= 505) {
      this.x = -101;
    }

    checkCollision(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
  this.sprite = 'images/char-boy.png';
  this.x = x;
  this.y = y;
};

Player.prototype.update = function() {
  checkBoundaries(this);
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyInput) {
  if (keyInput == "up") {
    this.y -= 41;
  }
  if (keyInput == "down") {
    this.y += 41;
  }
  if (keyInput == "left") {
    this.x -= 50.5;
  }
  if (keyInput == "right") {
    this.x += 50.5;
  }
};

var checkCollision = function(enemy) {
  // Resets the player object to its original position if the enemy and player collide
  if (player.x >= enemy.x - 65
      && player.x <= enemy.x + 65
      && player.y >= enemy.y - 50
      && player.y <= enemy.y + 50) {
    player.y = 404;
    player.x = 202;
  }
};

var checkBoundaries = function(player) {
  // Makes sure the player object doesn't walk off the screen
  if (player.y <= -6) {
    player.y = 404;
    player.x = 202;
  }
  if (player.x > 404) {
      player.x = 404;
  }
  if (player.x < 0) {
      player.x = 0;
  }
  if (player.y > 404) {
      player.y = 404;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(202,404);
var enemy1 = new Enemy(-101,76,225);
var enemy2 = new Enemy(-101,117,75);
var enemy3 = new Enemy(-101,158,175);
var enemy4 = new Enemy(-101,199,125);
var enemy5 = new Enemy(-101,240,25);
var allEnemies = [enemy1,enemy2,enemy3,enemy4,enemy5];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
