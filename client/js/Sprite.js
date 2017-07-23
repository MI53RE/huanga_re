class Sprite {
  constructor(name, image, columns, rows) {
    this.name = name;
    this.image = new Image();
    this.image.src = image;
    this.width = this.image.width;
    this.height = this.image.height;
    this.columns = columns;
    this.rows = rows;
    this.keyWidth = this.image.width / this.columns;
    this.keyHeight = this.image.height / this.rows;
    this.animations = [];
  }

  addAnimation(name, columnStart, rowStart, length, loop) {
    this.animations[name] = {
      x: columnStart,
      y: rowStart,
      length: length,
      isPlaying: false,
      loop: loop || false,
      ticks: 0,
      index: 0,
      currentRow: rowStart 
    };
    return this;
  }

  RemoveAnimation(name) {
    delete this.animations[name];
    return this;
  }
}