function Snake(client) {
    /*this.deleted = false;

     this.owner = client;
     this.hue = Math.floor(Math.random() * 360);
     this.radius = 2.0;
     this.respawning = false;

     this.pos = Vec2.new(Math.random() * 16 - 8, Math.random() * 16 - 8);
     this.movementDirection = Vec2.new();

     this.speed = 0.3;
     this.range = 16.0;

     this.hp = 10.0;

     this.shooting = false;
     this.lastShot = 0;
     this.reloading = false;
     this.respawned = Date.now();

     this.angle = Math.random() * 360;*/
    this.timer = this.maxTimer = 111;//movement speed!
    this.owner = client;
    this.pos = [Math.floor((Math.random() * 20) + 1),1,Math.floor((Math.random() * 20) + 1)];
    this.defaultLength = 3;
    //this.move();
    this.defaultDirection = this.movementDirection = Math.floor((Math.random() * 4) + 1);
    this.lastUpdate = 0;
    var snake = this;
    this,gameLoopTimer = setInterval(function(){
        var now = Date.now();
        var dt = now - snake.lastUpdate;
        snake.lastUpdate = now;
        snake.gameUpdateLoop(dt);
    }, 1000 / 30/*Frames*/);
}


Snake.prototype.gameUpdateLoop = function (dt) {

    //console.log('oh ya');
    //console.log(dt);
    this.timer -= dt;
    if(this.timer < 0){
        this.timer = this.maxTimer;
        switch(this.movementDirection){
            case 1:
                //this.snakeHead.translate(0, 0, -this.movementVar);
                this.pos[2] -= 1;
                break;
            case 2:
                //this.snakeHead.translate(0, 0, this.movementVar);
                this.pos[2] += 1;
                break;
            case 3:
                //this.snakeHead.translate(-this.movementVar, 0, 0);
                this.pos[0] -= 1;
                break;
            case 4:
                //this.snakeHead.translate(this.movementVar, 0, 0);
                this.pos[0] += 1;
                break;
        }
    }

}
Snake.prototype.move = function () {
    var snakethis = this;
    var movementTimer = setInterval( function(){
        //alert("Hello")
        //snakethis.pos[2] += 3;
        //console.log(snakethis.movementDirection);
        switch(snakethis.movementDirection){
            case 1:
                //this.snakeHead.translate(0, 0, -this.movementVar);
                snakethis.pos[2] -= 1;
                break;
            case 2:
                //this.snakeHead.translate(0, 0, this.movementVar);
                snakethis.pos[2] += 1;
                break;
            case 3:
                //this.snakeHead.translate(-this.movementVar, 0, 0);
                snakethis.pos[0] -= 1;
                break;
            case 4:
                //this.snakeHead.translate(this.movementVar, 0, 0);
                snakethis.pos[0] += 1;
                break;
        }
    }, 1000 / 30/*Frames*/);
}

Snake.prototype.delete = function() {
    this.deleted = true;

    this.pos.delete();
    this.movementDirection.delete();
    this.owner = null;
};

Snake.prototype.addbody = function(){

}

Object.defineProperty(
    Snake.prototype,
    'data', {
        get: function() {
            return {
                id: this.owner.id,
                pos: [this.pos[0], this.pos[1], this.pos[2]],
                defaultLength :  this.defaultLength,
                defaultDirection : this.defaultDirection
            }
        },
        set: function() { }
    }
);

module.exports = Snake;
