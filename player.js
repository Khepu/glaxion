class Player {
    constructor(id, color) {
        this.id = id;
        this.color = color;
        this.chromosome = {
            range: (Math.random() * 11 + 1) | 0,
            aggressiveness: (Math.random() * 100) | 0,
            transitivity: (Math.random() * 100) | 0,
            //wait: Math.random()
        };
    }

    range(){
        return this.chromosome.range;
    }

    aggressiveness(){
        return this.chromosome.aggressiveness / 100;
    }

    transitivity (){
        return this.chromosome.transitivity / 100;
    }

    play(planets){
        const ownedPlanets = planets.filter(p => p.owner.id == this.id);

        if (ownedPlanets.length == 0){
            return;
        }

        const aggression = Math.random() <= this.aggressiveness();
        const chosenSource = ownedPlanets
              .reduce((acc, val) => acc.power > val.power ? acc : val, 0);

        const target = planets
              .filter(p => p.owner.id == this.id ^ aggression)
              .reduce((acc, val) => acc.power < val.power ? acc : val);

        chosenSource.transfer(target, this.transitivity());
    }
}

