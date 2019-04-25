class Player {
    constructor(id, color) {
        this.id = id;
        this.color = color;
    }

    transfer(player, source, target) {
        const power = source.power;
        source.power = 0;
        target.power -= target;

        if (target.power < 0){
            target.owner = owner.id;
            target.owner *= -1;
        }
    }
}

