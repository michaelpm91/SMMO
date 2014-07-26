var tmpVec = new pc.Vec3();

pc.script.create('snakeAction', function (context) {
    // Creates a new SnakeAction instance
    var SnakeAction = function (entity) {
        this.entity = entity;
        //this.movePoint = new pc.Vec3();
        this.timer = this.maxTimer = 0.5;
        this.snakeHead;
        this.player;
        this.movementVar = 1;
        this.stopMove = false;
        //this.client = context.root.getChildren()[0].script.client;
        this.clientid = 0;
        this.snake;//= context.root.findByName('snake_' + this.client.id);
        this.direction = 1;
    };

    SnakeAction.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            
            this.snake = context.root.findByName('snake_' + this.clientid);
            this.snakeHead = this.snake.getChildren()[0];
            
            
            //this.direction = this.client.currentDirection;
            this.timer -= dt;    
            if(this.timer < 0){
                this.timer = this.maxTimer;
                
                var currentHeadPosition = this.snakeHead.getPosition();
                var nextPos = currentHeadPosition;
                
                switch(this.direction){
                    case 1://Up
                        this.snakeHead.translate(0, 0, -this.movementVar);
                        break;              
                    case 2://Right
                        this.snakeHead.translate(this.movementVar, 0, 0);
                        break;
                    case 3://Down
                        this.snakeHead.translate(0, 0, this.movementVar);
                        break;
                    case 4://Left
                        this.snakeHead.translate(-this.movementVar, 0, 0);
                        break;
                }
                
                var len = this.snake.getChildren().length;//-1;
                
                for(var i = 1; i < len; i++)
                {
                    var previousPos = this.snake.getChildren()[i].getPosition();
                    this.snake.getChildren()[i].setPosition(nextPos);
                    nextPos = previousPos;
                    
                }
            }
            
        },
        addBody: function (pos, parent) {
            var entity = new pc.fw.Entity();

            context.systems.model.addComponent(entity, {
                type: 'box',
            });
            
            context.root.findByName(parent).addChild(entity);
            
            entity.setPosition(pos[0],pos[1],pos[2]);
        },
        moveToAction: function(pos) {

        },
        changeMoveDirection: function(dir){
            this.direction = dir;
        },
        link: function(snakeid) {
            this.clientid = snakeid;
        }
    };

    return SnakeAction;
});