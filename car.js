class Car{
    constructor(x,y,width,height){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;

        this.speed=0;
        this.acceleration=0.2;
        this.maxSpeed=3;
        this.friction=0.05;
        this.angle=0;
        this.image = new Image();
        this.image.src = "car3.png";
        this.controls=new Controls();
    }

    update(){
        this.#move();
    }

    #move(){
        if(this.controls.forward){
            this.speed+=this.acceleration;
        }
        if(this.controls.reverse){
            this.speed-=this.acceleration;
        }

        if(this.speed>this.maxSpeed){
            this.speed=this.maxSpeed;
        }
        if(this.speed<-this.maxSpeed/2){
            this.speed=-this.maxSpeed/2;
        }

        if(this.speed>0){
            this.speed-=this.friction;
        }
        if(this.speed<0){
            this.speed+=this.friction;
        }
        if(Math.abs(this.speed)<this.friction){
            this.speed=0;
        }

        if(this.speed!=0){
            const flip=this.speed>0?1:-1;
            if(this.controls.left){
                this.angle+=0.03*flip;
            }
            if(this.controls.right){
                this.angle-=0.03*flip;
            }
        }

        this.x-=Math.sin(this.angle)*this.speed;
        this.y-=Math.cos(this.angle)*this.speed;
    }
     
    carLight(ctx){
        let radius = 9;

        //HeadLight
        this.controls.forward ? ctx.fillStyle = "yellow" : ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc( this.width / 2 - radius - 2 , -this.height / 2 + radius , radius ,  -1.57 , 0  , 0);
        ctx.fill();
        ctx.beginPath();
        ctx.arc( -this.width / 2 + radius + 2 , -this.height / 2 + radius , radius ,  3.14 , -1.57  , 0);
        ctx.fill();

        //BackLight
        this.controls.reverse ? ctx.fillStyle = "red" : ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc( this.width / 2 - radius - 2, this.height / 2 - radius , radius , 0 , 1.57  , 0);
        ctx.fill();
        ctx.beginPath();
        ctx.arc( -this.width / 2 + radius + 2, this.height / 2 - radius , radius , 1.57 , 3.14  , 0);
        ctx.fill();

    }
    draw(ctx){
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(-this.angle);

        ctx.drawImage(this.image ,
            -this.width/2,
            -this.height/2,
            this.width ,
            this.height );
        this.carLight(ctx);
        ctx.restore();
    }
}