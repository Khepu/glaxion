const HEIGHT = window.innerHeight;
const WIDTH = window.innerWidth;


function setup() {
    createCanvas(HEIGHT, WIDTH);
    createPlanets(30)
        .map(p => p()(-1))
        .forEach(p => ellipse(p.x, p.y, radius(p), radius(p)));
}

function draw() {

}

const planet = (x, y, rate) => (power=rate*10) => owner => {
    return {x: x,         //coordinates
            y: y,
            rate: rate,   //value increase rate
            power: power, //current power value
            owner: owner  //id of the player that owns the planet (-1 if neutral)
           };
};

const randomWithPad = (max, pad) =>
      Math.trunc(Math.random() * (max-(2*pad)) + pad);

const randX = () =>
      randomWithPad(WIDTH, 20);

const randY = () =>
      randomWithPad(HEIGHT, 20);

const randRate = () =>
      Math.trunc(Math.random() * 20 + 5);

const startingPower = rate =>
      rate * 10;

const radius = planet =>
      Math.ceil(Math.sqrt(planet.power)) * 2;

const intersecting = (planet1, planet2) =>
    Math.sqrt(planet1.x * planet1.x + planet2.y * planet2.y) < radius(planet1) + radius(planet2);

function createPlanets(n) {
    return Array(n)
        .fill(0)
        .map(p => planet(randX(), randY(), randRate()));

}
