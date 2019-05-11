class Planet{
    constructor(x, y, rate, id){
        this.x = x;
        this.y = y;
        this.rate = rate;
        this.power = rate;
        this.id = id;
        this.owner = new Player(-1, "#cccccc");
        this.connection = false;
    }

    show(){
        fill(this.owner.color);
        stroke(this.owner.color);
        circle(this.x, this.y, radius(this));

        if(this.connection){
            this.connection();
        }
    }

    update(){
        this.power = (this.power + this.rate) % 100000 + 10;
    }

    transfer(target){

        // counter for how long the transfer line will be shown
        this.connection = (planet => {
            let viewCount = 15;
            return () => {
                if (viewCount >= 0){
                    stroke(planet.owner.color);
                    line(planet.x, planet.y, target.x, target.y);
                    viewCount--;
                }
            };
        })(this);

        const power = this.power;
        this.power = 0;

        target.power += power * (target.owner.id == this.owner.id ? 1 : -1);

        if (target.power < 0){
            target.owner = this.owner;
            target.power *= -1;
        }
    }

    clicked(mx, my){
        let d = dist(mx, my, this.x, this.y);

        if(d < radius(this)){
            this.col=color(100,100,100);
        }
    }
}

