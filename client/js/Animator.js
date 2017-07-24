class Animator {
  constructor() {
    this.canvas = document.getElementById("main");
    this.canvas.height = 100;
    this.canvas.width = 100;
    this.context = "2d";
    this.fps = 4;
    this.sprites = [];
    this.currentlyPlayed = undefined;
  }

  addSprite(sprite) {
    sprite.context = this.canvas.getContext(this.context);
    this.sprites[sprite.name] = sprite;
    return this;
  }

  removeSprite(name) {
    delete this.sprites[name];
    return this;
  }

  update(animation) {
    animation.ticks += 1;
    if (animation.ticks > this.fps) {
      animation.ticks = 0;
      if (animation.index < animation.length) {
        animation.index += 1;
      } else if (animation.loop) {
        animation.index = 0 + animation.startIndex;
      } else {
        window.cancelAnimationFrame(this.currentlyPlayed);
      }
    }
    return animation;
  }

  play(name, animation) {
    let s = this.sprites[name];
    let a = s.animations[animation];
    let that = this;
    function playIt() {
      that.currentlyPlayed = window.requestAnimationFrame(playIt);
      a = that.update(a);
      s.render(a);
    }
    playIt();
  }

  stop(name) {
    let s = this.sprites[name];


  }
}