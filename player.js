class Player {
    constructor(id, color) {
        this.id = id;
        this.color = color;
        this.chromosome = {
            range: (Math.random() * 11 + 1) | 0,
            aggressiveness: (Math.random() * 100) | 0,
            transitivity: (Math.random() * 100) | 0
        };
    }
}

