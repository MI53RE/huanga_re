class TilesManager {
  constructor(canvas) {
    this.tileset = {};
    this.canvas = canvas;
  }

  addTile(tileset, name, x, y, width, height) {
    this.tileset[tileset].tiles[name] = new Tile(x, y, width, height);
    return this;
  }

  addTileset(name, image, columns, rows) {
    let ts = {};
    ts.image = new Image();
    ts.image.src = image;
    ts.width = ts.image.width;
    ts.height = ts.image.height;
    ts.keyWidth = ts.width / columns;
    ts.keyHeight = ts.height / rows;
    ts.tiles = {};
    this.tileset[name] = ts;
    return this;
  }

  removeTile(name) {
    delete this.tiles[name];
    return this;
  }

  draw(tileset, tile, posX, posY) {
    let ts = this.tileset[tileset];
    let t = ts.tiles[tile];
    this.canvas.context.drawImage(
      ts.image,
      t.x * ts.keyWidth,
      t.y * ts.keyHeight,
      t.width * ts.keyWidth,
      t.height * ts.keyHeight,
      posX,
      posY,
      t.width,
      t.height
    );
  }
}