window.onload = function() {
  const canvas = new Canvas("2d", 600, 600);
  canvas.refreshCanvas("playground");
  canvas.refreshCanvas("effects");
  canvas.refreshCanvas("skyeffects");
  canvas.refreshCanvas("lightfilter");

  const tm = new TilesManager(canvas.getCanvas("background"), canvas.getCanvas("foreground"));
  tm.addTileset("tree", "./img/tree_spr.png", 10, 10)
    .addTileset("forest", "./img/tilesetA.png", 16, 16)
    .addTileset("ground", "./img/tilesetA2.png", 64, 48)
    .addTile("forest", "tree", 7, 5, 2, 2)
    .addTile("forest", "treeTop", 7, 5, 2, 1)
    .addTile("forest", "treeLeft", 7, 5, 1, 2)
    .addTile("forest", "treeRight", 8, 5, 1, 2)
    .addTile("forest", "treeBottom", 7, 6, 2, 1)
    .addTile("forest", "treeSquare", 7, 7, 2, 2)
    .addTile("tree", "top", 1, 1, 10, 8)
    .addTile("tree", "bottom", 1, 9, 10, 2)
    .addTile("ground", "grass", 2, 6, 4, 4)
    .addTile("ground", "highgrass", 33, 1, 4, 4);

  const foreground = tm.getCanvas("foreground");
  const background = tm.getCanvas("background");

  // foreground.draw("forest", "tree", 0, 128);
  // foreground.draw("forest", "tree", 0, 64);
  // foreground.draw("forest", "tree", 64, 0);
  // foreground.draw("forest", "tree", 128, 0);
  // foreground.draw("forest", "tree", 192, 64);
  // foreground.draw("forest", "tree", 256, 128);
  // foreground.draw("forest", "tree", 320, 64);
  // foreground.draw("forest", "tree", 384, 0);
  // foreground.draw("forest", "tree", 448, 0);
  // foreground.draw("forest", "tree", 512, 64);
  // foreground.draw("forest", "tree", 512, 128);
  // foreground.draw("forest", "tree", 448, 192);
  // foreground.draw("forest", "tree", 384, 256);
  // foreground.draw("forest", "tree", 320, 320);
  // foreground.draw("forest", "tree", 256, 384);
  // foreground.draw("forest", "tree", 192, 320);
  // foreground.draw("forest", "tree", 128, 256);
  // foreground.draw("forest", "tree", 64, 192);


  // foreground.draw("forest", "treeTop", 256, 32);
  // foreground.draw("forest", "treeLeft", 224, 64);
  // foreground.draw("forest", "treeSquare", 256, 64);
  // foreground.draw("forest", "treeRight", 320, 64);
  // foreground.draw("forest", "treeBottom", 256, 128);
  // foreground.draw("forest", "tree", 240, 130);

  // will be use to randomise the ground
  const highgrassRatio = [
    {v: true, r: [0,5]},
    {v: false, r: [6,100]},
  ];
  function getRandByRatio(ratioValues) {
    let idx = Math.floor(Math.random() * (100 + 1));
    for (let item of ratioValues) {
      if (idx >= item.r[0] && idx <= item.r[1]) {
        return item.v;
      }
    }
  }

  for (let i = 0; i < canvas.width; i += 32) {
    for (let j = 0; j < canvas.height; j += 32) {
      background.draw("ground", "grass", i, j);
      if (getRandByRatio(highgrassRatio)) {
        background.draw("ground", "highgrass", i, j);
      }
    }
  }
  foreground.draw("tree", "top", 0, 0);
  background.draw("tree", "bottom", 0, 240);

  foreground.draw("tree", "top", 200, 200);
  background.draw("tree", "bottom", 200, 440);

  const gameAnimator = new Animator(canvas.getCanvas("playground"));

  let player = new Sprite("player", "./img/test_sprite2.png", 8, 4);
  player.addAnimation("down", 1, 1, 8, 4, true);
  player.addAnimation("left", 1, 2, 8, 4, true);
  player.addAnimation("right", 1, 3, 8, 4, true);
  player.addAnimation("up", 1, 4, 8, 4, true);
  
  gameAnimator.addSprite(player);

  let pos = {x:0, y: 0};
  let distance = 250;
  let direction = "";
  setInterval(function(){
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
};
