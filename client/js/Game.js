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
  const gameAnimator2 = new Animator(canvas.getCanvas("playground"));

  let playerSpr = new Sprite("player", "./img/test_sprite2.png", 8, 4);
  playerSpr.addAnimation("down", 1, 1, 8, 4, true);
  playerSpr.addAnimation("left", 1, 2, 8, 4, true);
  playerSpr.addAnimation("right", 1, 3, 8, 4, true);
  playerSpr.addAnimation("up", 1, 4, 8, 4, true);

  let player2Spr = new Sprite("player", "./img/test_sprite2.png", 8, 4);
  player2Spr.addAnimation("down", 1, 1, 8, 4, true);
  player2Spr.addAnimation("left", 1, 2, 8, 4, true);
  player2Spr.addAnimation("right", 1, 3, 8, 4, true);
  player2Spr.addAnimation("up", 1, 4, 8, 4, true);
  
  gameAnimator.addSprite(playerSpr);
  gameAnimator2.addSprite(player2Spr);
  let pos = {x:0, y: 0};
  let pos2 = {x:300, y: 0};

  const player = new Player(1, "Yuki", pos, gameAnimator, "right", true);
  const player2 = new Player(2, "Saruki", pos2, gameAnimator2, "left", true);
  player2.play();
  player.play();
  let distance = 450;
  player2.isMovingOn();
  setInterval(function(){
    if (pos2.x < distance && pos2.y === 0) {
      player2.action = "right";
    } else if (pos2.x >= distance && pos2.y < distance) {
      player2.action = "down";
    } else if (pos2.x > 0 && pos2.y >= distance) {
      player2.action = "left";
    } else if (pos2.x === 0 && pos2.y > 0) {
      player2.action = "up";
    }
  }, 5);
  // let kb = new KeyboardEvent("keydown");

  document.addEventListener("keydown", function(e) {
    if (player.isMain === true) {
      if (player.tooglePressed(e.key, true) === true) {
        player.action = player.getInput(e.key).action;
        player.isMovingOn();
      }
    }
  });
  document.addEventListener("keyup", function(e) {
    if (player.isMain === true) {
      if(player.tooglePressed(e.key, false) === true) {
        if (player.testInput() === false) {
          player.isMovingOff();
        } else {
          player.action = player.getInputPressed().action;
        }
      }
    }
  });
};
