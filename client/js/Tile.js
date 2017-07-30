class Tile {
  constructor(tileset, x, y, width, height) {
    this.tileset = tileset;
    this.x = x - 1;
    this.y = y - 1;
    this.width = width;
    this.height = height;
  }
}