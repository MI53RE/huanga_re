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
    this.jumpHeight = 0;
    this.jumping = true;
    this.jumpFall = false;
    this.jumpMaxHeight = 0;
    this.inputs = [
      {action: "up", keys: ["z", "w", "ArrowUp"], pressed: false},
      {action: "down", keys: ["s", "ArrowDown"], pressed: false},
      {action: "left", keys: ["q", "a", "ArrowLeft"], pressed: false},
      {action: "right", keys: ["d", "ArrowRight"], pressed: false},
      {action: "jump", keys: [" "], pressed: false}
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
      if (input.keys.indexOf(key) !== -1) {
        return input;
      }
    }
    return true;
  }
  getInputPressed() {
    for (let input of this.inputs) {
      if (input.pressed) {
        return input;
      }
    }
    return false;
  }
  isPressed(action) {
    for (let input of this.inputs) {
      if (input.action === action && input.pressed === true) {
        return input;
      }
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
      if (input.pressed === true) {
        return true;
      }
    }
    return false;
  }

  play() {
    let s = this.animator.sprites["player"];
    let that = this;
    this.animator.stop();
    function playIt() {
      if (that.isMoving === true) {
        if (that.isPressed("up")){
          that.position.y -= that.speed;
        }
        if (that.isPressed("down")){
          that.position.y += that.speed;
        }
        if (that.isPressed("left")){
          that.position.x -= that.speed;
        }
        if (that.isPressed("right")){
          that.position.x += that.speed;
        }
        if (that.isPressed("jump")) {
          that.jumping = true;
          that.jumpFall = false;
        }
        if (that.jumping === true) {
          if (that.jumpFall === false && that.jumpHeight < that.jumpMaxHeight) {
            that.jumpHeight += 1;
            that.position.x -= that.speed;
          } else if (that.jumpFall === false && that.jumpHeight >= that.jumpMaxHeight) {
            that.jumpFall = true;
          } else if (that.jumpHeight > 0) {
            that.jumpHeight -= 1;
            that.position.x -= that.speed;
          } else {
            that.jumping = false;
          }          
        }
      }
      that.animator.currentlyPlayed = window.requestAnimationFrame(playIt);
      let a = that.animator.update(s.animations[that.action]);
      s.render(a, that.position);
    }
    playIt();
  }
}