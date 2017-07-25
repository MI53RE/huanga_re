class Animator {
  constructor() {
    this.canvas = document.getElementById("main");
    this.canvas.height = 500;
    this.canvas.width = 500;
    this.context = this.canvas.getContext("2d");
    this.fps = 4;
    this.sprites = [];
    this.currentlyPlayed = undefined;
  }

  addSprite(sprite) {
    sprite.context = this.context;
    this.sprites[sprite.name] = sprite;
    return this;
  }

  removeSprite(name) {
    delete this.sprites[name];
    return this;
  }

  refreshCanvas() {
    let that = this;
    function refresh() {
      window.requestAnimationFrame(refresh);
      that.context.clearRect(0, 0, that.canvas.width, that.canvas.height);
    }
    refresh();
  }

  update(animation) {
    animation.ticks += 1;
    if (animation.ticks > this.fps) {
      animation.ticks = 0;
      if (animation.index < animation.end) {
        animation.index += 1;
      } else if (animation.loop) {
        animation.index = 0 + animation.start;
      } else {
        window.cancelAnimationFrame(this.currentlyPlayed);
      }
    }
    return animation;
  }

  play(spritename, animation, position) {
    let s = this.sprites[spritename];
    let that = this;
    this.stop();
    function playIt() {
      that.currentlyPlayed = window.requestAnimationFrame(playIt);
      let a = that.update(s.animations[animation]);
      s.render(a, position);
    }
    playIt();
  }

  stop() {
    window.cancelAnimationFrame(this.currentlyPlayed);
    return this;
  }
}