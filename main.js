const HEIGHT = window.innerHeight;
const WIDTH = window.innerWidth;
const MAX_PLANETS = 30;
const MAX_PLAYER = 4;

const PLANET_COORDS = [[WIDTH/3, HEIGHT/3], //red
                       [WIDTH*2/3, HEIGHT/3], //green
                       [WIDTH/2, HEIGHT*(2/2.75)], //blue

                       [WIDTH/2, HEIGHT/2],
                       //ring planets
                       [WIDTH/2 + 100, HEIGHT/2],
                       [WIDTH/2 - 100, HEIGHT/2],
                       [WIDTH/2, HEIGHT/2 + 100],
                       [WIDTH/2, HEIGHT/2 - 100],
                       [WIDTH/2 + 75, HEIGHT/2 + 75],
                       [WIDTH/2 - 75, HEIGHT/2 + 75],
                       [WIDTH/2 + 75, HEIGHT/2 - 75],
                       [WIDTH/2 - 75, HEIGHT/2 - 75]];

let planets;
/*
  Array of players.
  There are 3 players per game from which only the fittest one is saved.
  Every generation consists of 10 games.
  Therefore 10 games * 3 players each = 30 players.
 */
let players = [];
let ticks;
let generation = 0;
let game = -1;
let generationCache = [];

const initGame = () => {
    ticks = 0;

    if (game == 9){
        players = evolve(generationCache);
        ++generation;
    }

    game = (++game) % 10;
    planets = createPlanets(PLANET_COORDS);
    players = createPlayers();
    positionPlayers(players[game], planets);
};

const createPlanets = ps =>
      ps.map((p, index) => new Planet(p[0], p[1], randRate(), index));

const createPlayers = () =>
      Array(10).fill(0).map(i => ["#ff0000", "#00ff00", "#0000ff"].map((c, i) => new Player(i, c)));

const positionPlayers = (players, planets) =>
      planets.slice(0, 3).map((p, i) => p.owner = players[i]);

const drawPlanets = planets =>
      planets.forEach(p => p.show());

const updatePlanets = planets =>
      planets.forEach(p => p.update());

const randRate = () =>
      (Math.random() * 100 + 5) | 0;

const radius = planet =>
      Math.sqrt(planet.power * 0.005);

const transpose = arr =>
      arr[0].map((col, i) => arr.map(row => row[i]));

const stop = () => planets = [];

const fitness = player => {
    const fitnessVector = planets
          .reduce((acc, p) => [acc[0] + (p.owner.id == player.id ? p.power : 0), acc[1] + p.power], [0, 0]);

    return fitnessVector[0] / fitnessVector[1] / ticks;
};

const cacheFittest = (players, gen) => {
    const fittest = players.reduce((acc, p) => fitness(p) > fitness(acc) ? p : acc);
    generationCache.push({generation: gen,
                          game: game,
                          player: fittest,
                          fitness: fitness(fittest)});
};

const createEvolvedPlayer = oldPlayer => {
    const evolvedPlayer = new Player(oldPlayer.id, oldPlayer.color);
    evolvedPlayer.setChromosome(oldPlayer.mutate());
    return evolvedPlayer;
};

const evolve = (generationCache) => {
    const gen = generationCache
          .filter(g => g.generation == generation)
          .sort((a, b) => a.fitness > b.fitness)
          .slice(0, 3);

    return transpose(gen.map(g => [...Array(10)].map(e => createEvolvedPlayer(g.player))));
};

const isOver = planets =>
      new Set(planets.map(p => p.owner).filter(o => o.id != -1)).size == 1;

//p5.js entry functions

function setup() {
    createCanvas(WIDTH, HEIGHT);
    initGame();
}

function draw() {
    ticks++;
    clear();
    if(isOver(planets)){
        cacheFittest(players[game], generation);
        initGame();
    }

    updatePlanets(planets);
    drawPlanets(planets);
    players[game].forEach(p => p.play(planets));
}

