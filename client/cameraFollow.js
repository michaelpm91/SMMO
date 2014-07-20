pc.script.create('cameraFollow', function (context) {
    // Creates a new CameraFollow instance
    var CameraFollow = function (entity) {
        this.entity = entity;
        this.target = null;
        this.client = null;
        this.tmpVec = new pc.Vec3();
        this.tmpQuat = new pc.Quat();
        
    };

    CameraFollow.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.client = context.root.getChildren()[0].script.client;
            //this.target = context.root.findByName('main_snake');
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {

            if(this.target){
                var currentTarget = this.target.getPosition();
                switch(this.client.currentDirection){
                    case 1://Up
                        currentTarget.y +=20;
                        currentTarget.z +=20;
                        this.tmpQuat.setFromEulerAngles(-45, 0, 0);
                        break;
                    case 2://Right
                        currentTarget.x -=20;
                        currentTarget.y +=20;
                        this.tmpQuat.setFromEulerAngles(-45, -90, 0);
                        break;
                    case 3://Down
                        currentTarget.y +=20;
                        currentTarget.z -=20;
                        this.tmpQuat.setFromEulerAngles(-45, 180, 0);
                        break;
                    case 4://Left
                        currentTarget.x +=20;
                        currentTarget.y +=20;
                        this.tmpQuat.setFromEulerAngles(-45, 90, 0);
                        break;
                }

                this.tmpQuat.slerp(this.entity.getRotation(), this.tmpQuat, 0.1);
                this.entity.setRotation(this.tmpQuat);
                
                this.tmpVec.lerp(this.entity.getPosition(), currentTarget, 0.1);
                this.entity.setPosition(this.tmpVec);
            }
        },
        link: function(snake) {
            this.target = snake;
        }
    };

    return CameraFollow;
});