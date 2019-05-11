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
let players;

const initGame = () =>{
    planets = createPlanets(PLANET_COORDS);
    players = createPlayers();
    positionPlayers(players, planets);
};

const createPlanets = ps =>
      ps.map((p, index) => new Planet(p[0], p[1], randRate(), index));

const createPlayers = ps =>
      ["#ff0000", "#00ff00", "#0000ff"].map((c, i) => new Player(i, c));

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

const stop = () => planets = [];

const fitness = player => {
    const fitnessVector = planets
          .reduce((acc, p) => [acc[0] + (p.owner.id == player.id ? p.power : 0), acc[1] + p.power], [0, 0]);

    return fitnessVector[0] / fitnessVector[1];
};

const isOver = planets =>
      new Set(planets.map(p => p.owner).filter(o => o.id != -1)).size == 1;

//p5.js entry functions

function setup() {
    createCanvas(WIDTH, HEIGHT);
    initGame();
}

function draw() {
    clear();
    if(isOver(planets)){
        console.log(players.map(fitness));
        initGame();
    }

    updatePlanets(planets);
    drawPlanets(planets);
    players.forEach(p => p.play(planets));
}

