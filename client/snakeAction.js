var tmpVec = new pc.Vec3();

pc.script.create('snakeAction', function (context) {
    // Creates a new SnakeAction instance
    var SnakeAction = function (entity) {
        this.entity = entity;
        //this.movePoint = new pc.Vec3();
    };

    SnakeAction.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            //this.movePoint.copy(this.entity.getPosition());
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            //tmpVec.lerp(this.entity.getPosition(), this.movePoint, 0.1);
            //this.entity.setPosition(tmpVec);
            //if(this.entity.getPosition()!=this.movePoint) this.entity.setPosition(this.movePoint);
        },
        moveToAction: function(pos) {
            //console.log('%c Geronimo! ', 'background: #222; color: #bada55');
            //console.log(pos);
            //this.movePoint.set(pos[0], pos[1], pos[2]);
            //console.log(this.entity.getChildren());
            //console.log(pos);
            //for(var entry in pos) {
            for(i = 0; i < 20; i++){
                //console.log(new pc.Vec3(pos[i][0],pos[i][1],pos[i][2]));
                //this.entity.getChildren()[i].setPosition(new pc.Vec3(pos[i]))
                this.entity.getChildren()[i].setPosition(new pc.Vec3(pos[i][0],pos[i][1],pos[i][2]));
            }
        }
    };

    return SnakeAction;
});