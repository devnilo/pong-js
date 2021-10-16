// variáveis da bolinha
// xBolinha e yBolinha, serve para posicionar a bolinha no centro do campo
let xBolinha = 300;
let yBolinha = 200;
let diametroBolinha = 15;
let raioDiametro = diametroBolinha / 2;

// velocidade da bolinha
let velocidadeX = 5;
let velocidadeY = 5;

// variáveis da raquete
let xRacket = 5;
let yRacket = 150;
let comprimentoRacket = 10;
let alturaRacket = 90;

// variáveis raquete máquina
let xRacketMachine = 585;
let yRacketMachine = 150;
let velocidadeYMachine;

let hit = false;

// placar do jogo
let myPoints = 0;
let pointsMachine = 0;

// sons do jogo
let soundRacket;
let soundPoint;
let soundBackground;

// adicionando som ao jogo
function preload(){
  soundRacket = loadSound("raquetada.mp3")
  soundPoint = loadSound("ponto.mp3")
  soundBackground = loadSound("trilha.mp3")
}

function setup(){
  createCanvas(600, 400);
  soundBackground.loop();
}

function draw(){
  background(0);
  ballAppear();
  ballMovement();
  racketAppear(xRacket, yRacket);
  racketAppear(xRacketMachine, yRacketMachine);
  racketMovement();
  racketMachineMovement();
  collideRacket(xRacket, yRacket);
  collideRacket(xRacketMachine, yRacketMachine);
  showScoreboard();
  scorePoints();
  }

function ballAppear(){
  circle(xBolinha, yBolinha, diametroBolinha);
}

function ballMovement(){
  xBolinha += velocidadeX;
  yBolinha += velocidadeY;
  
  // o if está sendo usado aqui para fazer a bola rebater quando colidir com a borda
  if (xBolinha + raioDiametro > width || xBolinha - raioDiametro < 0){
    velocidadeX *= -1;
  }
  
  if (yBolinha + raioDiametro > height || yBolinha - raioDiametro <0){
    velocidadeY *= -1;
  }
}

function racketAppear(x,y) {
  rect(x, y, comprimentoRacket, alturaRacket);
}

function racketMovement(){
  
  // if sendo usado para movimentar a raquete para cima e para baixo
  if (keyIsDown(UP_ARROW)){
    yRacket -= 10;
  }
  
  if (keyIsDown(DOWN_ARROW)){
    yRacket += 10;
  }
}

function racketMachineMovement(){
  velocidadeYMachine = yBolinha - yRacketMachine - comprimentoRacket / 2 - 30;
  yRacketMachine += velocidadeYMachine;
}

function collideRacket(x,y){
  hit = collideRectCircle(x, y, comprimentoRacket, alturaRacket, xBolinha, yBolinha, raioDiametro);
  if (hit){
    velocidadeX *= -1;
    soundRacket.play();
  }
}

function showScoreboard(){
  stroke(255)
  textAlign(CENTER)
  textSize(20);
  fill(171, 178, 185)
  rect(235, 7, 30, 25)
  fill(171, 178, 185)
  rect(335, 7, 30, 25)
  fill(255)
  text(myPoints, 250, 26)
  fill(255)
  text(pointsMachine, 350, 26)
}

function scorePoints(){
  if (xBolinha > 590){
    myPoints += 1;
    soundPoint.play();
  }
  if (xBolinha < 10){
    pointsMachine += 1;
    soundPoint.play();
  }
}
