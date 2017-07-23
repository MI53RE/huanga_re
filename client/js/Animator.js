class Animator {
  constructor() {
    this.canvas = document.getElementById("main");
    this.canvas.height = 100;
    this.canvas.width = 100;
    this.context = this.canvas.getContext("2d");
    this.fps = 30;
    this.sprites = [];
  }

  addSprite(sprite) {
    this.sprites[sprite.name] = sprite;
    return this;
  }

  removeSprite(name) {
    delete this.sprites[name];
    return this;
  }

  render(sprite, stepX, stepY) {
    stepX = stepX || 0;
    stepY = stepY || 0;
    this.context.drawImage(sprite.image, sprite.keyWidth * stepX, sprite.keyHeight * stepY, sprite.keyWidth, sprite.keyHeight, 0, 0, sprite.keyWidth, sprite.keyHeight);
  }

  update(animation) {
    animation.ticks += 1;
    if (animation.ticks > this.fps) {
      animation.ticks = 0;
      animation.index += 1;
    }
  }

  play(name, animation) {
    let s = this.sprites[name];
    let a = s.animations[name];



  }

  stop(name) {
    let s = this.sprites[name];


  }
}