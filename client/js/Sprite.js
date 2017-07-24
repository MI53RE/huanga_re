class Sprite {
  constructor(name, image, columns, rows, length) {
    this.name = name;
    this.image = new Image();
    this.image.src = image;
    this.width = this.image.width;
    this.height = this.image.height;
    this.columns = columns;
    this.rows = rows;
    this.length = length;
    this.keyWidth = this.width / this.columns;
    this.keyHeight = this.height / this.rows;
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
      startIndex: columnStart + (rowStart * this.columns),
      index: columnStart + (rowStart * this.columns),
      currentRow: rowStart 
    };
    return this;
  }

  RemoveAnimation(name) {
    delete this.animations[name];
    return this;
  }

  render(animation) {
    this.context.drawImage(
      this.image,
      this.keyWidth * (animation.index - (this.columns * Math.floor(animation.index / this.columns))),
      this.keyHeight * (Math.floor(animation.index / this.columns)),
      this.keyWidth,
      this.keyHeight,
      0,
      0,
      this.keyWidth,
      this.keyHeight);
  }
}