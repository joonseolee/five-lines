
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

class Player {
  private x = 1;
  private y = 1;
  moveVertical(dy: number) {
    if (map[this.y + dy][this.x].isFlux()
      || map[this.y + dy][this.x].isAir()) {
      this.moveToTile(this.x, this.y + dy);
    } else if (map[this.y + dy][this.x].isKey1()) {
      remove(new RemoveLock1());
      this.moveToTile(this.x, this.y + dy);
    } else if (map[this.y + dy][this.x].isKey2()) {
      remove(new RemoveLock2());
      this.moveToTile(this.x, this.y + dy);
    }
  }
  moveToTile(newx: number, newy: number) {
    map[this.y][this.x] = new Air();
    map[newy][newx] = new PlayerTile();
    this.x = newx;
    this.y = newy;
  }
  move(dx: number, dy: number) {
    this.moveToTile(this.x + dx, this.y + dy);
  }
  pushHorizontal(tile: Tile, dx: number) {
    if (map[this.y][this.x + dx + dx].isAir()
    && !map[this.y + 1][this.x + dx].isAir()) {
      map[this.y][this.x + dx + dx] = tile;
      this.moveToTile(this.x + dx, this.y);
    }
  }
  moveHorizontal(dx: number) {
    map[this.y][this.x + dx].moveHorizontal(this, dx);
  }
  drawPlayer(g: CanvasRenderingContext2D) {
    g.fillStyle = "#ff0000";
    g.fillRect(this.x * TILE_SIZE, this.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
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
  drop(tile: Tile, x: number, y: number): void;
}

class Falling implements FallingState {
  drop(tile: Tile, x: number, y: number): void {
    map[y + 1][x] = tile;
    map[y][x] = new Air();
  }
  moveVertical(tile: Tile, dx: number): void {
  }
  moveHorizontal(tile: Tile, dx: number): void {
  }
  isFalling(): boolean {
    return true;
  }
}

class Resting implements FallingState {
  drop(tile: Tile, x: number, y: number): void {
  }
  moveVertical(tile: Tile, dy: number): void {
  }
  moveHorizontal(tile: Tile, dx: number): void {
    player.pushHorizontal(tile, dx);
  }
  isFalling(): boolean {
    return false;
  }
}

class FallStrategy {
  moveVertical(tile: Tile, dy: number) {
    this.falling.moveVertical(tile, dy);
  }
  moveHorizontal(tile: Tile, dx: number) {
    this.falling.moveHorizontal(tile, dx);
  }
  update(tile: Tile, x: number, y: number) {
    this.falling = map[y + 1][x].getBlockOnTopState();
    this.falling.drop(tile, x, y);
  }
  constructor(private falling: FallingState) {}
}

interface Input {
  handle(): void
}

class Right implements Input {
  handle(): void {
    player.moveHorizontal(1);
  }
}

class Left implements Input {
  handle(): void {
    player.moveHorizontal(-1);
  }
}

class Up implements Input {
  handle(): void {
    player.moveVertical(-1);
  }
}

class Down implements Input {
  handle(): void {
    player.moveVertical(1);
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
  moveHorizontal(player: Player, dx: number): void;
  moveVertical(player: Player, dy: number): void;
  isStony(): boolean;
  isBoxy(): boolean;
  drop(): void;
  rest(): void;
  isFalling(): boolean;
  canFall(): boolean;
  update(x: number, y: number): void;
  getBlockOnTopState(): FallingState;
}

class Air implements Tile {
  getBlockOnTopState(): FallingState {
    return new Falling();
  }
  moveVertical(player: Player, dx: number): void {
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
  moveHorizontal(player: Player, dx: number): void {
    player.move(dx, 0);
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
  getBlockOnTopState(): FallingState {
    return new Resting();
  }
  moveVertical(player: Player, dx: number): void {
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
  moveHorizontal(player: Player, dx: number): void {
    player.move(dx, 0);
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
  getBlockOnTopState(): FallingState {
    return new Resting();
  }
  moveVertical(player: Player, dy: number): void {
    
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
  moveHorizontal(player: Player, dx: number): void {
    
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

class PlayerTile implements Tile {
  getBlockOnTopState(): FallingState {
    return new Resting();
  }
  moveVertical(player: Player, dy: number): void {
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
  moveHorizontal(player: Player, dx: number): void {
    
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
  getBlockOnTopState(): FallingState {
    return new Resting();
  }
  update(x: number, y: number): void {
    this.fallStrategy.update(this, x, y);
  }
  canFall(): boolean {
    return true;
  }
  isFalling(): boolean {
    return this.falling.isFalling();
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
  moveVertical(player: Player, dy: number): void {
    this.fallStrategy.moveVertical(this, dy);
  }
  moveHorizontal(player: Player, dx: number): void {
    this.fallStrategy.moveHorizontal(this, dx);
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
  getBlockOnTopState(): FallingState {
    return new Resting();
  }
  update(x: number, y: number): void {
    this.fallStrategy.update(this, x, y);
  }
  canFall(): boolean {
    return true;
  }
  isFalling(): boolean {
    return this.falling.isFalling();
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
  moveVertical(player: Player, dy: number): void {
    this.fallStrategy.moveVertical(this, dy);
  }
  moveHorizontal(player: Player, dx: number): void {
    this.fallStrategy.moveHorizontal(this, dx);
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
  getBlockOnTopState(): FallingState {
    return new Resting();
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
  moveVertical(player: Player, dy: number): void {
    this.keyConf.removeLock();
    player.move(0, dy);
  }
  moveHorizontal(player: Player, dx: number): void {
    this.keyConf.removeLock();
    player.move(dx, 0);
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
  getBlockOnTopState(): FallingState {
    return new Resting();
  }
  moveVertical(player: Player, dy: number): void {
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
  moveHorizontal(player: Player, dx: number): void {
  
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

const player = new Player();
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
    case RawTile.PLAYER: return new PlayerTile();
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

function moveVertical(dy: number) {
  
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
  player.drawPlayer(g);
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

