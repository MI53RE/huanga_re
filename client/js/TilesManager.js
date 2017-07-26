class TilesManager {
  constructor(canvas) {
    this.context = canvas.context;
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

  update(animation) {
    animation.ticks += 1;
    if (animation.ticks > animation.speed) {
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