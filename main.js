const HEIGHT = window.innerHeight;
const WIDTH = window.innerWidth;
const NumberOfPlanets = 30;

let planets = [];
//let color = [0xff, 0x55, 0x00]; WIP

const identity = x => x;

function setup() {
    createCanvas(WIDTH, HEIGHT);
    tmp = initPlanets();

    while(intersectingPlanets(tmp) > NumberOfPlanets){
        tmp = initPlanets();
    }

    planets = tmp;
    console.log(intersectingPlanets(planets));
}


function draw() {
    clear();
    updatePower(planets);
    drawPlanets(planets);
}

const initPlanets = () =>
      createPlanets(NumberOfPlanets)
      .map(p => p(randRate())(-1));

const drawPlanets = planets =>
      planets.forEach(p => ellipse(p.x, p.y, radius(p), radius(p)));

const updatePower = planets =>
      planets.forEach(p => p.power = (p.power +  p.rate) % 120000 + 10);

const planet = (x, y, rate) => (power=rate*1) => owner => {
    return {x: x,         //coordinates
            y: y,
            rate: rate,   //value increase rate
            power: power, //current power value
            owner: owner  //id of the player that owns the planet (-1 if neutral)
           };
};

const randomWithPad = (max, pad) =>
      Math.trunc(Math.random() * (max - (2 * pad)) + pad);

const randX = () =>
      randomWithPad(WIDTH, 20);

const randY = () =>
      randomWithPad(HEIGHT, 20);

const randRate = () =>
      Math.trunc(Math.random() * 100 + 5);

const radius = planet =>
      Math.sqrt(planet.power * 0.01);

const intersecting = planet1 => planet2 =>{
    const dx = Math.abs(planet1.x - planet2.x);
    const dy = Math.abs(planet1.y - planet2.y);
    return Math.sqrt(dx * dx + dy * dy) < Math.sqrt(120000*0.01) * 2;
};

const intersectingPlanets = planets =>
      planets
      .map(p => planets
           .map(intersecting(p))
           .filter(identity)
           .length)
      .reduce((acc, val) => acc + val);

const createPlanets = n =>
      [...Array(n)].map(p => planet(randX(), randY(), randRate()));

const stop = () => planets = [];

