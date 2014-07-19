function Snake(client) {

    this.timer = this.maxTimer = 0.15;/
    this.owner = client;

    this.defaultLength = this.currentLength = 10;

    this.defaultDirection = this.movementDirection = Math.floor((Math.random() * 4) + 1);

    this.headPosition = [Math.floor((Math.random() * 20) + 1),1,Math.floor((Math.random() * 20) + 1)];
    this.positionsArray = [];
    this.positionsArray.push (this.headPosition);
    for  (i = 1; i < this.defaultLength; i++ ){
        switch(this.defaultDirection){
            case 1:
                this.positionsArray.push([this.headPosition[0], this.headPosition[1], this.headPosition[2] + i]);
                break;
            case 2:
                this.positionsArray.push([this.headPositi on[0], this.headPosition[1], this.headPosition[2] - i]);
                break;
            case 3:
                this.positionsArray.push([this.headPosition[0] + i, this.headPosition[1], this.headPosition[2]]);
                break;
            case 4:
                this.positionsArray.push([this.headPosition[0] - i, this.headPosition[1], this.headPosition[2]]);
                break;
        }
    }

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

    this.timer -= dt;
    if(this.timer < 0){
        this.timer = this.maxTimer;

        var nextPosition = this.positionsArray[0].slice();

        switch(this.movementDirection){
            case 1://Up
                this.positionsArray[0][2] -=1;
                break;
            case 2://Right
                this.positionsArray[0][0] +=1;
                break;
            case 3://Down
                this.positionsArray[0][2] +=1;
                break;
            case 4://Left
                this.positionsArray[0][0] -=1;
                break;
        }

        for(var i = 1; i < this.currentLength; i++){

            var previousPosition = this.positionsArray[i].slice();
            this.positionsArray[i] = nextPosition;
            nextPosition = previousPosition;
        }
    }

}


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