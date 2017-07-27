class TilesManager {
  constructor(...canvas) {
    this.tileset = {};
    this.canvas = {};
    let that = this;
    for (let c of canvas) {
      c.draw = function(tileset, tile, posX, posY) {
        let ts = that.tileset[tileset];
        let t = ts.tiles[tile];
        this.context.drawImage(
          ts.image,
          t.x * ts.keyWidth,
          t.y * ts.keyHeight,
          t.width * ts.keyWidth,
          t.height * ts.keyHeight,
          posX,
          posY,
          t.width * ts.keyWidth,
          t.height * ts.keyHeight
        );
      };
      this.canvas[c.id] = c;
    }
  }

  getCanvas(name) {
    return this.canvas[name];
  }

  addTile(tileset, name, x, y, width, height) {
    this.tileset[tileset].tiles[name] = new Tile(x, y, width, height);
    return this;
  }

  addTileset(name, image, columns, rows) {
    let ts = {};
    ts.image = new Image();
    ts.image.src = image;
    ts.width = ts.image.naturalWidth;
    ts.height = ts.image.naturalHeight;
    ts.keyWidth = ts.width / columns;
    ts.keyHeight = ts.height / rows;
    ts.tiles = {};
    this.tileset[name] = ts;
    return this;
  }
}