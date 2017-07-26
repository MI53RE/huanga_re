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

  addAnimation(name, columnStart, rowStart, length, speed, loop) {
    let cstart = columnStart - 1;
    let rstart = rowStart - 1;
    let sindex = (cstart) + ((rstart) * this.columns);
    this.animations[name] = {
      x: cstart,
      y: rstart,
      length: length - 1,
      isPlaying: false,
      loop: loop || false,
      ticks: 0,
      end: sindex + length - 1,
      speed: speed,
      start: sindex,
      index: sindex
    };
    return this;
  }

  RemoveAnimation(name) {
    delete this.animations[name];
    return this;
  }

  render(animation, position) {
    position = position || {x: 0, y: 0};
    this.context.drawImage(
      this.image,
      this.keyWidth * (animation.index - (this.columns * Math.floor(animation.index / this.columns))),
      this.keyHeight * (Math.floor(animation.index / this.columns)),
      this.keyWidth,
      this.keyHeight,
      position.x,
      position.y,
      this.keyWidth,
      this.keyHeight);
  }
}