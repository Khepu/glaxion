const HEIGHT = window.innerHeight;
const WIDTH = window.innerWidth;
const MAX_PLANETS = 30;
const MAX_PLAYER = 4;

const PLANET_COORDS = [[WIDTH/2, HEIGHT/2],
                    //ring planets
                    [WIDTH/2 + 100, HEIGHT/2],
                    [WIDTH/2 - 100, HEIGHT/2],
                    [WIDTH/2, HEIGHT/2 + 100],
                    [WIDTH/2, HEIGHT/2 - 100],
                    [WIDTH/2 + 75, HEIGHT/2 + 75],
                    [WIDTH/2 - 75, HEIGHT/2 + 75],
                    [WIDTH/2 + 75, HEIGHT/2 - 75],
                    [WIDTH/2 - 75, HEIGHT/2 - 75],
                    //starting planets
                    [WIDTH/3, HEIGHT/3], //red
                    [WIDTH*2/3, HEIGHT/3], //green
                    [WIDTH/2, HEIGHT*(2/2.75)]]; //blue

let planets = [];
let players = [];

function setup() {
    createCanvas(WIDTH, HEIGHT);
    createPlayers();
    planets = createPlanets(PLANET_COORDS);
}

function draw() {
    clear();
    updatePlanets(planets);
    drawPlanets(planets);
}

const createPlanets = ps =>
      ps.map((p, index) => new Planet(p[0], p[1], randRate(), index));

const createPlayers = ps =>
      players = [0xff0000, 0x00ff00, 0x0000ff].map((p, index) => new Player(p, index));

const drawPlanets = planets =>
      planets.forEach(p => p.show());

const updatePlanets = planets =>
      planets.forEach(p => p.update());

const randRate = () =>
      Math.trunc(Math.random() * 100 + 5);

const radius = planet =>
      Math.sqrt(planet.power * 0.05);

const stop = () => planets = [];

const score = player =>
      player.planets
            .map(p => p.power)
            .reduce((acc, val) => acc + val);

