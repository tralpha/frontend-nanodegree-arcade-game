
//An array which holds the paths for the bug enemies.
var paths = [63, 146, 229];

//A utility function to randomly generate an integer, which will be used
//to change the spped of the bugs, when they re-appear on the other 
//side of the screen.
var randomInt = function(min,max){
    return Math.floor(Math.random() * (max - min)) + min;
}

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += this.speed * dt
    if (this.x >= canvas.width) {
        //Update the position of the bug when it reaches the end of the canvas
        this.x = -101;

        //Randomly determine the new speed of the bug
        this.speed = randomInt(100, 280);

        //Randomly determine where the which row the bug will run on next
        this.y = paths[randomInt(0, paths.length)]; 

    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

//Player class, which extends enemy class. 
var Player = function(x, y) {
    Enemy.call(this, x, y);

    this.sprite = 'images/char-boy.png';

};

Player.prototype = Object.create(Enemy.prototype);
Player.prototype.constructor = Player;

//Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Create the handle input method to move the player around the screen
Player.prototype.handleInput = function(code){
    switch(code){
        case 'left':
            if (this.x>0) this.x -= 101;
            break;
        case 'right':
            if (this.x<404) this.x += 101;
            break;
        case 'up':
            if (this.y>83) this.y -= 83;
            break;
        case 'down':
            if (this.y<332) this.y += 83;
            break;
    }
}





// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



var f_bad = new Enemy(-101, 63, randomInt(100, 400));
var s_bad = new Enemy(-101, 143, randomInt(100, 400));
var t_bad = new Enemy(-101, 226, randomInt(100, 400));


var allEnemies = [];
allEnemies.push(f_bad, s_bad, t_bad);

var player = new Player(202, 312);




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

//Write down the functions for checking
