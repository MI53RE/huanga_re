const boardAnimator = new Animator();
boardAnimator.refreshCanvas();
const gameAnimator = new Animator();
let player = new Sprite("player", "./img/test_sprite2.png", 8, 4);
player.addAnimation("down", 1, 1, 8, true);
player.addAnimation("left", 1, 2, 8, true);
player.addAnimation("right", 1, 3, 8, true);
player.addAnimation("up", 1, 4, 8, true);
let ground = new Sprite("player", "./img/ground.png", 4, 1);
ground.addAnimation("1", 1, 1, 1, true);
ground.addAnimation("2", 1, 1, 2, true);
ground.addAnimation("3", 1, 1, 3, true);
ground.addAnimation("4", 1, 1, 4, true);
let tree = new Sprite("tree", "./img/tree_spr.png", 1, 1);
tree.addAnimation("tree", 1, 1, 1, true);
gameAnimator.addSprite(player);
boardAnimator.addSprite(tree);
// gameAnimator.play("player", "down");
let pos = {x:0, y: 0};
let direction = "";
boardAnimator.play("tree", "tree", {x:0,y:0});
setInterval(function(){
  let distance = 250;
  if (pos.y < 200) {
    gameAnimator.sprites["player"].context.globalCompositeOperation = "destination-over";
  } else {
    gameAnimator.sprites["player"].context.globalCompositeOperation = "source-over";
  }
  if (pos.x < distance && pos.y === 0) {
    pos.x += 1;
    if (direction !== "right") {
      direction = "right";
      gameAnimator.play("player", direction, pos);
    }
  } else if (pos.x >= distance && pos.y < distance) {
    pos.y += 1;
    if (direction !== "down") {
      direction = "down";
      gameAnimator.play("player", direction, pos);
    }
  } else if (pos.x > 0 && pos.y >= distance) {
    pos.x -= 1;
    if (direction !== "left") {
      direction = "left";
      gameAnimator.play("player", direction, pos);
    }
  } else if (pos.x === 0 && pos.y > 0) {
    pos.y -= 1;
    if (direction !== "up") {
      direction = "up";
      gameAnimator.play("player", direction, pos);
    }
  }
}, 5);

// will be use to randomise the ground
const groundRatioValues = [
  {v: 1, r: [0,30]},
  {v: 2, r: [31,40]},
  {v: 3, r: [41,70]},
  {v: 4, r: [71,100]}
];
function getRandByRatio(ratioValues) {
  let idx = Math.floor(Math.random() * (100 + 1));
  for (let item of ratioValues) {
    if (idx >= item.r[0] && idx <= item.r[1]) {
      return item.v;
    }
  }
}

function generateGround(animator, sprite) {
  for (let i = 0; i < animator.canvas.width; i += sprite.keyWidth) {
    for (let j = 0; j < animator.canvas.height; j += sprite.keyHeight) {
      
    }
  }
}

