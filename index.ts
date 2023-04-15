
const TILE_SIZE = 30;
const FPS = 30;
const SLEEP = 1000 / FPS;

enum RawTile {
  AIR,
  FLUX,
  UNBREAKABLE,
  PLAYER,
  STONE, FALLING_STONE,
  BOX, FALLING_BOX,
  KEY1, LOCK1,
  KEY2, LOCK2
}

class KeyConfiguration {
  setColor(g: CanvasRenderingContext2D, x: number, y: number) {
    g.fillStyle = this.color;
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  removeLock() {
    remove(this.removeStrategy);
  }
  constructor(
    private color: string,
    private _1: boolean,
    private removeStrategy: RemoveStrategy
  ) {}
  is1() {
    return this._1;
  }
}

interface RemoveStrategy {
  check(tile: Tile): boolean;
}
class RemoveLock1 implements RemoveStrategy {
  check(tile: Tile): boolean {
    return tile.isLock1();
  }
}

class RemoveLock2 implements RemoveStrategy {
  check(tile: Tile): boolean {
    return tile.isLock2();
  }
}

interface FallingState {
  isFalling(): boolean;
  moveHorizontal(tile: Tile, dx: number): void;
  moveVertical(tile: Tile, dx: number): void;
}

class Falling implements FallingState {
  moveVertical(tile: Tile, dx: number): void {
  }
  moveHorizontal(tile: Tile, dx: number): void {
  }
  isFalling(): boolean {
    return true;
  }
}

class Resting implements FallingState {
  moveVertical(tile: Tile, dy: number): void {
  }
  moveHorizontal(tile: Tile, dx: number): void {
    if (map[playery][playerx + dx + dx].isAir()
    && !map[playery + 1][playerx + dx].isAir()) {
      map[playery][playerx + dx + dx] = tile;
      moveToTile(playerx + dx, playery);
    }
  }
  isFalling(): boolean {
    return false;
  }
}

class FallStrategy {
  constructor(private falling: FallingState) {}
  getFalling() {
    return this.falling;
  }
  update(tile: Tile, x: number, y: number) {
    this.falling = map[y + 1][x].isAir() 
    ? new Falling()
    : new Resting();

    this.drop(tile, x, y);
  }

  drop(tile: Tile, x: number, y: number) {
    if (this.falling.isFalling()) {
      map[y + 1][x] = tile;
      map[y][x] = new Air();
    }
  }
}

interface Input {
  handle(): void
}

class Right implements Input {
  handle(): void {
    moveHorizontal(1);
  }
}

class Left implements Input {
  handle(): void {
    moveHorizontal(-1);
  }
}

class Up implements Input {
  handle(): void {
    moveVertical(-1);
  }
}

class Down implements Input {
  handle(): void {
    moveVertical(1);
  }
}

interface Tile {
  isAir(): boolean;
  isFlux(): boolean;
  isUnbreakable(): boolean;
  isPlayer(): boolean;
  isStone(): boolean;
  isFallingStone(): boolean;
  isBox(): boolean;
  isFallingBox(): boolean;
  isKey1(): boolean;
  isKey2(): boolean;
  isLock1(): boolean;
  isLock2(): boolean;
  draw(g: CanvasRenderingContext2D, x: number, y: number): void;
  moveHorizontal(dx: number): void;
  moveVertical(dy: number): void;
  isStony(): boolean;
  isBoxy(): boolean;
  drop(): void;
  rest(): void;
  isFalling(): boolean;
  canFall(): boolean;
  update(x: number, y: number): void;
}

class Air implements Tile {
  moveVertical(dx: number): void {
    throw new Error("Method not implemented.");
  }
  update(x: number, y: number): void {
    
  }
  canFall(): boolean {
    throw new Error("Method not implemented.");
  }
  isFalling(): boolean {
    throw new Error("Method not implemented.");
  }
  drop(): void {
    throw new Error("Method not implemented.");
  }
  rest(): void {
    throw new Error("Method not implemented.");
  }
  isStony(): boolean {
    return false;
  }
  isBoxy(): boolean {
    return false;
  }
  moveHorizontal(dx: number): void {
    moveToTile(playerx + dx, playery);
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
  }
  isAir(): boolean {
    return true;
  }
  isPlayer(): boolean {
    return false;
  }
  isFallingStone(): boolean {
    return false;
  }
  isBox(): boolean {
    return false;
  }
  isFallingBox(): boolean {
    return false;
  }
  isKey1(): boolean {
    return false;
  }
  isKey2(): boolean {
    return false;
  }
  isLock1(): boolean {
    return false;
  }
  isLock2(): boolean {
    return false;
  }
  isFlux(): boolean {
    return false;
  }
  isUnbreakable(): boolean {
    return false;
  }
  isStone(): boolean {
    return false;
  }
}

class Flux implements Tile {
  moveVertical(dx: number): void {
    throw new Error("Method not implemented.");
  }
  update(x: number, y: number): void {
    
  }
  canFall(): boolean {
    throw new Error("Method not implemented.");
  }
  isFalling(): boolean {
    throw new Error("Method not implemented.");
  }
  drop(): void {
    throw new Error("Method not implemented.");
  }
  rest(): void {
    throw new Error("Method not implemented.");
  }
  isStony(): boolean {
    return false;
  }
  isBoxy(): boolean {
    return false;
  }
  moveHorizontal(dx: number): void {
    moveToTile(playerx + dx, playery);
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = "#ccffcc";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isAir(): boolean {
    return false;
  }
  isPlayer(): boolean {
    return false;
  }
  isFallingStone(): boolean {
    return false;
  }
  isBox(): boolean {
    return false;
  }
  isFallingBox(): boolean {
    return false;
  }
  isKey1(): boolean {
    return false;
  }
  isKey2(): boolean {
    return false;
  }
  isLock1(): boolean {
    return false;
  }
  isLock2(): boolean {
    return false;
  }
  isFlux(): boolean {
    return true;
  }
  isUnbreakable(): boolean {
    return false;
  }
  isStone(): boolean {
    return false;
  }
}

class Unbreakable implements Tile {
  moveVertical(dy: number): void {
    
  }
  update(x: number, y: number): void {
    
  }
  canFall(): boolean {
    throw new Error("Method not implemented.");
  }
  isFalling(): boolean {
    throw new Error("Method not implemented.");
  }
  drop(): void {
    throw new Error("Method not implemented.");
  }
  rest(): void {
    throw new Error("Method not implemented.");
  }
  isStony(): boolean {
    return false;
  }
  isBoxy(): boolean {
    return false;
  }
  moveHorizontal(dx: number): void {
    
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = "#999999";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isAir(): boolean {
    return false;
  }
  isPlayer(): boolean {
    return false;
  }
  isFallingStone(): boolean {
    return false;
  }
  isBox(): boolean {
    return false;
  }
  isFallingBox(): boolean {
    return false;
  }
  isKey1(): boolean {
    return false;
  }
  isKey2(): boolean {
    return false;
  }
  isLock1(): boolean {
    return false;
  }
  isLock2(): boolean {
    return false;
  }
  isFlux(): boolean {
    return false;
  }
  isUnbreakable(): boolean {
    return true;
  }
  isStone(): boolean {
    return false;
  }
}

class Player implements Tile {
  moveVertical(dy: number): void {
    throw new Error("Method not implemented.");
  }
  update(x: number, y: number): void {
  }
  canFall(): boolean {
    throw new Error("Method not implemented.");
  }
  isFalling(): boolean {
    throw new Error("Method not implemented.");
  }
  drop(): void {
    throw new Error("Method not implemented.");
  }
  rest(): void {
    throw new Error("Method not implemented.");
  }
  isStony(): boolean {
    return false;
  }
  isBoxy(): boolean {
    return false;
  }
  moveHorizontal(dx: number): void {
    
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
  }
  isAir(): boolean {
    return false;
  }
  isPlayer(): boolean {
    return true;
  }
  isFallingStone(): boolean {
    return false;
  }
  isBox(): boolean {
    return false;
  }
  isFallingBox(): boolean {
    return false;
  }
  isKey1(): boolean {
    return false;
  }
  isKey2(): boolean {
    return false;
  }
  isLock1(): boolean {
    return false;
  }
  isLock2(): boolean {
    return false;
  }
  isFlux(): boolean {
    return false;
  }
  isUnbreakable(): boolean {
    return false;
  }
  isStone(): boolean {
    return false;
  }
}

class Stone implements Tile {
  private fallStrategy: FallStrategy;
  constructor(private falling: FallingState) {
    this.fallStrategy = new FallStrategy(falling);
  }
  update(x: number, y: number): void {
    this.fallStrategy.update(this, x, y);
  }
  canFall(): boolean {
    return true;
  }
  isFalling(): boolean {
    return this.fallStrategy.getFalling().isFalling();
  }
  drop(): void {
    this.falling = new Falling();
  }
  rest(): void {
    this.falling = new Resting();
  }
  isStony(): boolean {
    return true;
  }
  isBoxy(): boolean {
    return false;
  }
  moveVertical(dy: number): void {
    this.fallStrategy.getFalling().moveVertical(this, dy);
  }
  moveHorizontal(dx: number): void {
    this.fallStrategy.getFalling().moveHorizontal(this, dx);
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = "#0000cc";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isAir(): boolean {
    return false;
  }
  isPlayer(): boolean {
    return false;
  }
  isFallingStone(): boolean {
    return this.falling.isFalling();
  }
  isBox(): boolean {
    return false;
  }
  isFallingBox(): boolean {
    return false;
  }
  isKey1(): boolean {
    return false;
  }
  isKey2(): boolean {
    return false;
  }
  isLock1(): boolean {
    return false;
  }
  isLock2(): boolean {
    return false;
  }
  isFlux(): boolean {
    return false;
  }
  isUnbreakable(): boolean {
    return false;
  }
  isStone(): boolean {
    return true;
  }
}

class Box implements Tile {
  private fallStrategy: FallStrategy;
  constructor(private falling: FallingState) {
    this.fallStrategy = new FallStrategy(falling);
  }
  update(x: number, y: number): void {
    this.fallStrategy.update(this, x, y);
  }
  canFall(): boolean {
    return true;
  }
  isFalling(): boolean {
    return this.fallStrategy.getFalling().isFalling();
  }
  drop(): void {
    throw new Error("Method not implemented.");
  }
  rest(): void {
    throw new Error("Method not implemented.");
  }
  isStony(): boolean {
    return false;
  }
  isBoxy(): boolean {
    return true;
  }
  moveVertical(dy: number): void {
    this.fallStrategy.getFalling().moveVertical(this, dy);
  }
  moveHorizontal(dx: number): void {
    this.fallStrategy.getFalling().moveHorizontal(this, dx);
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = "#8b4513";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isAir(): boolean {
    return false;
  }
  isPlayer(): boolean {
    return false;
  }
  isFallingStone(): boolean {
    return false;
  }
  isBox(): boolean {
    return true;
  }
  isFallingBox(): boolean {
    return false;
  }
  isKey1(): boolean {
    return false;
  }
  isKey2(): boolean {
    return false;
  }
  isLock1(): boolean {
    return false;
  }
  isLock2(): boolean {
    return false;
  }
  isFlux(): boolean {
    return false;
  }
  isUnbreakable(): boolean {
    return false;
  }
  isStone(): boolean {
    return false;
  }
}

class Key implements Tile {
  constructor(
    private keyConf: KeyConfiguration
  ) {}
  update(x: number, y: number): void {
  }
  canFall(): boolean {
    throw new Error("Method not implemented.");
  }
  isFalling(): boolean {
    throw new Error("Method not implemented.");
  }
  drop(): void {
    throw new Error("Method not implemented.");
  }
  rest(): void {
    throw new Error("Method not implemented.");
  }
  isStony(): boolean {
    return false;
  }
  isBoxy(): boolean {
    return false;
  }
  moveVertical(dy: number): void {
    this.keyConf.removeLock();
    moveToTile(playery, playerx + dy);
  }
  moveHorizontal(dx: number): void {
    this.keyConf.removeLock();
    moveToTile(playerx + dx, playery);
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    this.keyConf.setColor(g, x, y);
  }
  isAir(): boolean {
    return false;
  }
  isPlayer(): boolean {
    return false;
  }
  isFallingStone(): boolean {
    return false;
  }
  isBox(): boolean {
    return false;
  }
  isFallingBox(): boolean {
    return false;
  }
  isKey1(): boolean {
    return true;
  }
  isKey2(): boolean {
    return false;
  }
  isLock1(): boolean {
    return false;
  }
  isLock2(): boolean {
    return false;
  }
  isFlux(): boolean {
    return false;
  }
  isUnbreakable(): boolean {
    return false;
  }
  isStone(): boolean {
    return false;
  }
}

class Locker implements Tile {
  constructor(
    private keyConf: KeyConfiguration
  ) {}
  moveVertical(dy: number): void {
    throw new Error("Method not implemented.");
  }
  update(x: number, y: number): void {
  }
  canFall(): boolean {
    throw new Error("Method not implemented.");
  }
  isFalling(): boolean {
    throw new Error("Method not implemented.");
  }
  drop(): void {
    throw new Error("Method not implemented.");
  }
  rest(): void {
    throw new Error("Method not implemented.");
  }
  isStony(): boolean {
    return false;
  }
  isBoxy(): boolean {
    return false;
  }
  moveHorizontal(dx: number): void {
  
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    this.keyConf.setColor(g, x, y);
  }
  isAir(): boolean {
    return false;
  }
  isPlayer(): boolean {
    return false;
  }
  isFallingStone(): boolean {
    return false;
  }
  isBox(): boolean {
    return false;
  }
  isFallingBox(): boolean {
    return false;
  }
  isKey1(): boolean {
    return false;
  }
  isKey2(): boolean {
    return false;
  }
  isLock1(): boolean {
    return this.keyConf.is1();
  }
  isLock2(): boolean {
    return !this.keyConf.is1();
  }
  isFlux(): boolean {
    return false;
  }
  isUnbreakable(): boolean {
    return false;
  }
  isStone(): boolean {
    return false;
  }
}

let playerx = 1;
let playery = 1;
let map: Tile[][] = [];
let rawMap: RawTile[][] = [
  [2, 2, 2, 2, 2, 2, 2, 2],
  [2, 3, 0, 1, 1, 2, 0, 2],
  [2, 4, 2, 6, 1, 2, 0, 2],
  [2, 8, 4, 1, 1, 2, 0, 2],
  [2, 4, 1, 1, 1, 9, 0, 2],
  [2, 2, 2, 2, 2, 2, 2, 2],
];

let inputs: Input[] = [];

const YELLOW_KEY = new KeyConfiguration("#ffcc00", true, new RemoveLock1());
const BLUE_KEY = new KeyConfiguration("#00ccff", false, new RemoveLock1());

function assertExhausted(x: never): never {
  throw new Error("Unexpected object: " + x);
}

function transformTile(tile: RawTile) {
  switch (tile) {
    case RawTile.AIR: return new Air();
    case RawTile.PLAYER: return new Player();
    case RawTile.UNBREAKABLE: return new Unbreakable();
    case RawTile.STONE: return new Stone(new Resting());
    case RawTile.FALLING_STONE: return new Stone(new Falling());
    case RawTile.BOX: return new Box(new Resting());
    case RawTile.FALLING_BOX: return new Box(new Falling())
    case RawTile.FLUX: return new Flux();
    case RawTile.KEY1: return new Key(YELLOW_KEY);
    case RawTile.LOCK1: return new Locker(YELLOW_KEY);
    case RawTile.KEY2: return new Key(BLUE_KEY);
    case RawTile.LOCK2: return new Locker(BLUE_KEY);
    default: assertExhausted(tile);
  }
}

function transformMap() {
  map = new Array(rawMap.length);
  for (let y = 0; y < rawMap.length; y++) {
    map[y] = new Array(rawMap[y].length);
    for (let x = 0; x < rawMap[y].length; x++) {
      map[y][x] = transformTile(rawMap[y][x]);
    }
  }
}

function remove(shouldRemove: RemoveStrategy) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (shouldRemove.check(map[y][x])) {
        map[y][x] = new Air();
      }
    }
  }
}

function moveToTile(newx: number, newy: number) {
  map[playery][playerx] = new Air();
  map[newy][newx] = new Player();
  playerx = newx;
  playery = newy;
}

function moveHorizontal(dx: number) {
  map[playery][playerx + dx].moveHorizontal(dx);
}

function moveVertical(dy: number) {
  if (map[playery + dy][playerx].isFlux()
      || map[playery + dy][playerx].isAir()) {
      moveToTile(playerx, playery + dy);
    } else if (map[playery + dy][playerx].isKey1()) {
      remove(new RemoveLock1());
      moveToTile(playerx, playery + dy);
    } else if (map[playery + dy][playerx].isKey2()) {
      remove(new RemoveLock2());
      moveToTile(playerx, playery + dy);
    }
  // map[playerx][playery + dy].moveVertical(dy);
}

function update() {
  handleInputs();
  updateMap();
}

function updateMap() {
  for (let y = map.length - 1; y >= 0; y--) {
    for (let x = 0; x < map[y].length; x++) {
      map[y][x].update(x, y);
    }
  }
}

function handleInputs() {
  while (inputs.length > 0) {
    let current = inputs.pop();
    current.handle();
  }
}

function draw() {
  let g = createGraphics();
  drawMap(g);
  drawPlayer(g);
}

function createGraphics() {
  let canvas = document.getElementById("GameCanvas") as HTMLCanvasElement;
  let g = canvas.getContext("2d");

  g.clearRect(0, 0, canvas.width, canvas.height);
  return g;
}

function drawMap(g: CanvasRenderingContext2D) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      map[y][x].draw(g, x, y);
    }
  }
}

function drawPlayer(g: CanvasRenderingContext2D) {
  g.fillStyle = "#ff0000";
  g.fillRect(playerx * TILE_SIZE, playery * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

function gameLoop() {
  let before = Date.now();
  update();
  draw();
  let after = Date.now();
  let frameTime = after - before;
  let sleep = SLEEP - frameTime;
  setTimeout(() => gameLoop(), sleep);
}

window.onload = () => {
  transformMap();
  gameLoop();
}

const LEFT_KEY = "ArrowLeft";
const UP_KEY = "ArrowUp";
const RIGHT_KEY = "ArrowRight";
const DOWN_KEY = "ArrowDown";
window.addEventListener("keydown", e => {
  if (e.key === LEFT_KEY || e.key === "a") inputs.push(new Left());
  else if (e.key === UP_KEY || e.key === "w") inputs.push(new Up());
  else if (e.key === RIGHT_KEY || e.key === "d") inputs.push(new Right());
  else if (e.key === DOWN_KEY || e.key === "s") inputs.push(new Down());
});

