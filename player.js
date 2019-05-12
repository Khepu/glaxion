class Player {
    constructor(id) {
        this.id = id;
        // [aggressiveness, transitivity, noMovePos]
        this.chromosome = [(Math.random() * 100) | 0,
                           (Math.random() * 100) | 0,
                           (Math.random() * 100) | 0];
        this.mutationChance = 0.15;
        this.color = this.genColor();
    }

    genColor() {
        const rgb = this.chromosome.map(c => (c * 2.55) | 0);
        return "rgb(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ")";
    }

    setChromosome(chromosome){
        this.chromosome = chromosome;
    }

    aggressiveness(){
        return this.chromosome[0] / 100;
    }

    transitivity (){
        return this.chromosome[1] / 100;
    }

    noMovePos(){
        return this.chromosome[2] / 100;
    }

    mutate() {
        const mutationMap = [...Array(this.chromosome.length)].map(k => Math.random() <= this.mutationChance);
        return this.chromosome
            .map((a, i) => a + (mutationMap[i] && (Math.random() * 15 - 5) | 0) % 100);
    }

    play(planets){
        if (Math.random < this.noMovePos()){
            return;
        }

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

