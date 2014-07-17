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

    this.defaultLength = this.currentLength = 10;

    this.defaultDirection = this.movementDirection = Math.floor((Math.random() * 4) + 1);

    this.headPosition = [Math.floor((Math.random() * 20) + 1),1,Math.floor((Math.random() * 20) + 1)];
    this.positionsArray = [];
    this.positionsArray.push (this.headPosition);
    for  (i = 1; i < this.defaultLength; i++ ){
        switch(this.defaultDirection){
            case 1:
                //this.positions[i] = [this.pos[0], this.pos[1], this.pos[2] + i];
                this.positionsArray.push([this.headPosition[0], this.headPosition[1], this.headPosition[2] + i]);
                break;
            case 2:
                //this.positions[i] = [this.pos[0], this.pos[1], this.pos[2] - i];
                this.positionsArray.push([this.headPosition[0], this.headPosition[1], this.headPosition[2] - i]);
                break;
            case 3:
                //this.positions[i] = [this.pos[0] + i, this.pos[1], this.pos[2]];
                this.positionsArray.push([this.headPosition[0] + i, this.headPosition[1], this.headPosition[2]]);
                break;
            case 4:
                //this.positions[i] = [this.pos[0] - i, this.pos[1], this.pos[2]];
                this.positionsArray.push([this.headPosition[0] - i, this.headPosition[1], this.headPosition[2]]);
                break;
        }
    }
    //console.log(this.positionsArray);

    this.lastUpdate = 0;
    var snake = this;
    this,gameLoopTimer = setInterval(function(){
        var now = Date.now();
        var dt = now - snake.lastUpdate;
        snake.lastUpdate = now;
        snake.gameUpdateLoop(dt);
    }, 1000 / 30 );//Frames
}


Snake.prototype.gameUpdateLoop = function (dt) {

    //console.log('oh ya');
    //console.log(dt);
    this.timer -= dt;
    if(this.timer < 0){
        this.timer = this.maxTimer;

        var nextPosition = this.positionsArray[0].slice();
        //console.log(this.positionsArray[0]);
        //console.log(this.positionsArray[1]);

        switch(this.movementDirection){
            case 1://Up
                //this.snakeHead.translate(0, 0, -this.movementVar);
                //this.pos[2] -= 1;//Delete soon
                this.positionsArray[0][2] -=1;
                break;
            case 2://Right
                //this.snakeHead.translate(0, 0, this.movementVar);
                //this.pos[2] += 1;//Delete soon
                this.positionsArray[0][0] +=1;
                break;
            case 3://Down
                //this.snakeHead.translate(-this.movementVar, 0, 0);
                //this.pos[0] -= 1;//Delete soon
                
                this.positionsArray[0][2] +=1;
                break;
            case 4://Left
                //this.snakeHead.translate(this.movementVar, 0, 0);
                //this.pos[0] += 1;//Delete soon
                this.positionsArray[0][0] -=1;
                break;
        }

        //this.positionsArray[1] = nextPosition;
        
        //console.log(nextPosition);
        for(var i = 1; i < this.currentLength; i++){
            //console.log(i);
            var previousPosition = this.positionsArray[i].slice();
            //console.log('previous');
            //console.log(previousPosition);
            this.positionsArray[i] = nextPosition;
            //console.log('new');
            //console.log(nextPosition);
            nextPosition = previousPosition;
            //console.log('next');
            //console.log(nextPosition);
        }
    }

}
/*Snake.prototype.move = function () {
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
    }, 1000 / 30 ); //Frames
}*/

Snake.prototype.delete = function() {
    this.deleted = true;

    //this.pos.delete();
    //this.movementDirection.delete();
    //this.owner = null;
};

Snake.prototype.addbody = function(){

}

Object.defineProperty(
    Snake.prototype,
    'data', {
        get: function() {
            return {
                id: this.owner.id,
                headPosition: [this.headPosition[0], this.headPosition[1], this.headPosition[2]],
                positionsArray : this.positionsArray,
                defaultLength :  this.defaultLength,
                defaultDirection : this.defaultDirection
            }
        },
        set: function() { }
    }
);

module.exports = Snake;