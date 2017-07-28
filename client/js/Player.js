class Player {
  constructor(id, name, position, animator, action, isMain) {
    this.id = id;
    this.name = name;
    this.position = position;
    this.animator = animator;
    this.isMain = isMain || false;
    this.isMoving = false;
    this.action = action;
    this.speed = 5;
    this.keypress = 0;
    this.inputs = [
      {action: "up", keys: ["z", "ArrowUp"], pressed: false},
      {action: "down", keys: ["s", "ArrowDown"], pressed: false},
      {action: "left", keys: ["q", "ArrowLeft"], pressed: false},
      {action: "right", keys: ["d", "ArrowRight"], pressed: false}
    ];
  }

  isMovingOn() {
    this.isMoving = true;
  }

  isMovingOff() {
    this.isMoving = false;
  }

  getInput(key) {
    for (let input of this.inputs) {
      if (input.keys.indexOf(key) !== -1)
        return input;
    }
    return true;
  }
  getInputPressed() {
    for (let input of this.inputs) {
      if (input.pressed)
        return input;
    }
    return false;
  }

  tooglePressed(key, onOff) {
    for (let input of this.inputs) {
      if (input.keys.indexOf(key) !== -1) {
        input.pressed = onOff;
        return true;
      }
    }
    return false;
  }

  testInput() {
    for (let input of this.inputs) {
      if (input.pressed === true)
        return true;
    }
    return false;
  }

  play() {
    let s = this.animator.sprites["player"];
    let that = this;
    this.animator.stop();
    function playIt() {
      if (that.isMoving === true) {
        switch (that.action) {
        case "up":
          that.position.y -= that.speed;
          break;
        case "left":
          that.position.x -= that.speed;
          break;
        case "right":
          that.position.x += that.speed;
          break;
        case "down":
          that.position.y += that.speed;
          break;
        }
      }
      that.animator.currentlyPlayed = window.requestAnimationFrame(playIt);
      let a = that.animator.update(s.animations[that.action]);
      s.render(a, that.position);
    }
    playIt();
  }
}