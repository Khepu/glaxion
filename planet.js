class Planet{
    constructor(x, y, rate, id){
        this.x = x;
        this.y = y;
        this.rate = rate;
        this.power = rate * 20;
        this.id = id;
        this.owner = -1;
        this.color = 0xffffff;
    }

    setOwner(owner) {
        this.owner = owner.id;
        this.color = owner.color;
    }

    show() {
        fill(this.color);
        circle(this.x, this.y, radius(this));
    }

    update() {
        this.power = (this.power + this.rate) % 12000 + 10;
    }

    clicked(mx, my) {
        let d = dist(mx, my, this.x, this.y);

        if(d < radius(this)){
            this.col=color(100,100,100);
        }
    }
}

