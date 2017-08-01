window.onload = function() {
  const canvas = new Canvas("2d", 608, 608);
  canvas.refreshCanvas("playground");
  canvas.refreshCanvas("effects");
  canvas.refreshCanvas("skyeffects");
  canvas.refreshCanvas("lightfilter");

  const tm = new TilesManager(canvas.getCanvas("background"), canvas.getCanvas("foreground"));
  tm.addTileset("tree", "./img/tree_spr.png", 10, 10)
    .addTileset("forest", "./img/tilesetA.png", 16, 16)
    .addTileset("outside_ground", "./img/tilesetA2.png", 64, 48)
    .addTileset("ground", "./img/tilesetG1.png", 64, 60)
    .addTile("forest", "tree", 7, 5, 2, 2)
    .addTile("forest", "treeTop", 7, 5, 2, 1)
    .addTile("forest", "treeLeft", 7, 5, 1, 2)
    .addTile("forest", "treeRight", 8, 5, 1, 2)
    .addTile("forest", "treeBottom", 7, 6, 2, 1)
    .addTile("forest", "treeSquare", 7, 7, 2, 2)
    .addTile("tree", "top", 1, 1, 10, 8)
    .addTile("tree", "bottom", 1, 9, 10, 2)
    .addTile("outside_ground", "grass", 2, 6, 4, 4)
    .addTile("outside_ground", "highgrass", 33, 1, 4, 4)

    .addTile("ground", "sd_f", 11, 47, 4, 4)
    .addTile("ground", "sd_w_t_nw", 9, 45, 4, 4)
    .addTile("ground", "sd_w_t_n", 11, 45, 4, 4)
    .addTile("ground", "sd_w_t_ne", 13, 45, 4, 4)
    .addTile("ground", "sd_w_t_e", 13, 47, 4, 4)
    .addTile("ground", "sd_w_t_se", 13, 49, 4, 4)
    .addTile("ground", "sd_w_t_s", 11, 49, 4, 4)
    .addTile("ground", "sd_w_t_sw", 9, 49, 4, 4)
    .addTile("ground", "sd_w_t_w", 9, 47, 4, 4)
    
    .addTile("ground", "sd_w_m_e", 13, 53, 4, 4)
    .addTile("ground", "sd_w_m_s", 11, 53, 4, 4)
    .addTile("ground", "sd_w_m_w", 9, 53, 4, 4)
    
    .addTile("ground", "sd_w_b_e", 13, 57, 4, 4)
    .addTile("ground", "sd_w_b_s", 11, 57, 4, 4)
    .addTile("ground", "sd_w_b_w", 9, 57, 4, 4);

  const foreground = tm.getCanvas("foreground");
  const background = tm.getCanvas("background");



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
      background.draw("sd_f", i, j);
      if (getRandByRatio(highgrassRatio)) {
        background.draw("highgrass", i, j);
      }
    }
  }

  // const cf = 32; // cellFactor
  // foreground.draw("sd_f", 1 * cf, 1 * cf);
  // foreground.draw("sd_w_t_nw", 0 * cf, 0 * cf);
  // foreground.draw("sd_w_t_n", 1 * cf, 0 * cf);
  // foreground.draw("sd_w_t_ne", 2 * cf, 0 * cf);
  // foreground.draw("sd_w_t_e", 2 * cf, 1 * cf);
  // foreground.draw("sd_w_t_se", 2 * cf, 2 * cf);
  // foreground.draw("sd_w_t_s", 1 * cf, 2 * cf);
  // foreground.draw("sd_w_t_sw", 0 * cf, 2 * cf);
  // foreground.draw("sd_w_t_w", 0 * cf, 1 * cf);

  // foreground.draw("sd_w_m_w", 0 * cf, 3 * cf);
  // foreground.draw("sd_w_m_s", 1 * cf, 3 * cf);
  // foreground.draw("sd_w_m_e", 2 * cf, 3 * cf);

  // foreground.draw("sd_w_b_w", 0 * cf, 4 * cf);
  // foreground.draw("sd_w_b_s", 1 * cf, 4 * cf);
  // foreground.draw("sd_w_b_e", 2 * cf, 4 * cf);

  // foreground.draw("tree", "top", 0, 0);
  // background.draw("tree", "bottom", 0, 240);

  // foreground.draw("tree", "top", 200, 200);
  // background.draw("tree", "bottom", 200, 440);
  
  function randDestination() {
    let x = Math.floor(Math.random() * canvas.width + 1);
    let y = Math.floor(Math.random() * canvas.height + 1);
    return {x: x, y: y};
  }
  // [
  //   layers = [
  //     row = {
  //       tile: [col]
  //     }
  //   ]
  // ]
  const layers = [
      new Map([[
        8, {
          sd_w_b_w: [0],
          sd_w_b_s: [1,2,3,4,5,6,7,8,9,16,17],
          sd_w_b_e: [18],
        }],[
        10, {
          sd_w_b_w: [10],
          sd_w_b_s: [11,12,13,14],
          sd_w_b_e: [15]
        }],[
        14, {
          sd_w_t_nw: [5],
          sd_w_t_n: [6],
          sd_w_t_ne: [7]
        }],[
        15, {
          sd_w_t_w: [5],
          sd_f: [6],
          sd_w_t_e: [7]
        }],[
        16, {
          sd_w_t_w: [5],
          sd_f: [6],
          sd_w_t_e: [7]
        }],[
        17, {
          sd_w_t_sw: [5],
          sd_w_t_s: [6],
          sd_w_t_se: [7],
        }],[
        18, {
          sd_w_b_w: [5],
          sd_w_b_s: [6],
          sd_w_b_e: [7],
        }]
      ]),
      new Map([
        [8,{
          sd_w_m_w: [0],
          sd_w_m_s: [1,2,3,4,5,6,7,8,9,16,17],
          sd_w_m_e: [18]
        }],
        [9,{
        sd_w_m_w: [10],
        sd_w_m_s: [11,12,13,14],
        sd_w_m_e: [15]
        }],[
        7,{
          sd_w_m_w: [0],
          sd_w_m_s: [1,2,3,4,5,6,7,8,9,16,17],
          sd_w_m_e: [18]
        }]
      ]),
      // new Map([]),
      // new Map([]),
      // new Map([]),
      // new Map([]),
      // new Map([]),
    // [
    //   {},
    //   {},
    //   {},
    //   {},
    //   {},
    //   {},
    //   {
    //     sd_w_m_w: [0],
    //     sd_w_m_s: [1,2,3,4,5,6,7,8,9,16,17],
    //     sd_w_m_e: [18]
    //   },
    //   {},
    //   {
    //     sd_w_m_w: [10],
    //     sd_w_m_s: [11,12,13,14],
    //     sd_w_m_e: [15]
    //   }
    // ],
    // [
    //   {},
    //   {},
    //   {},
    //   {},
    //   {},
    //   {
    //     sd_w_m_w: [0],
    //     sd_w_m_s: [1,2,3,4,5,6,7,8,9,16,17],
    //     sd_w_m_e: [18]
    //   },
    //   {},
    //   {
    //     sd_w_m_w: [10],
    //     sd_w_m_s: [11,12,13,14],
    //     sd_w_m_e: [15]
    //   }
    // ],
    // [
    //   {},
    //   {},
    //   {},
    //   {},
    //   {
    //     sd_w_t_sw: [0],
    //     sd_w_t_s: [1,2,3,4,5,6,7,8,9,16,17],
    //     sd_w_t_se: [18]
    //   },
    //   {
    //     sd_w_t_w: [10],
    //     sd_w_t_e: [15]
    //   },
    //   {
    //     sd_w_t_sw: [10],
    //     sd_w_t_s: [11,12,13,14],
    //     sd_w_t_se: [15]
    //   }

    // ],
    // [
    //   {},
    //   {},
    //   {},
    //   {
    //     sd_w_b_w: [0],
    //     sd_w_b_s: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
    //     sd_w_b_e: [18]
    //   }
    // ],
    // [
    //   {},
    //   {},
    //   {
    //     sd_w_m_w: [0],
    //     sd_w_m_s: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
    //     sd_w_m_e: [18]
    //   }
    // ],
    // [
    //   {},
    //   {
    //     sd_w_m_w: [0],
    //     sd_w_m_s: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
    //     sd_w_m_e: [18]
    //   }
    // ],
    // [
    //   {
    //     sd_w_m_w: [0],
    //     sd_w_m_s: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
    //     sd_w_m_e: [18]
    //   }
    // ],
  ];  

  // const layers2 = [
  //   [
  //     {tree: [4,3,2,12,13,14]},
  //     {tree: [1,5,15,11]},
  //     {tree: [10,16,6,0]},
  //     {tree: [0,7,9,16]},
  //     {tree: [0,8,16]},
  //     {tree: [15,1]},
  //     {tree: [14,2]},
  //     {tree: [13,3]},
  //     {tree: [4,12]},
  //     {tree: [11,5]},
  //     {tree: [10,6]},
  //     {tree: [9,7]},
  //     {tree: [8]}
  //   ],
  //   [
  //     {tree: [8]},
  //     {tree: [9,7]},
  //     {tree: [10,6]},
  //     {tree: [11,5]},
  //     {tree: [4,12]},
  //     {tree: [13,3]},
  //     {tree: [14,2]},
  //     {tree: [15,1]},
  //     {tree: [0,8,16]},
  //     {tree: [0,7,9,16]},
  //     {tree: [10,16,6,0]},
  //     {tree: [1,5,15,11]},
  //     {tree: [4,3,2,12,13,14]}
  //   ],
  // ];



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
  let destination = randDestination();

  const player = new Player(1, "Yuki", pos, gameAnimator, "right", true);
  const player2 = new Player(2, "Saruki", pos2, gameAnimator2, "left", true);
  player2.play();
  player.play();
  let distance = 450;
  player2.isMovingOn();
  setInterval(function(){
    if (pos2.x === destination.x && pos2.y === destination.y) {
      destination = randDestination();
    }
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
        let act = player.getInput(e.key).action;
        player.action = act === "jump" ? player.action : act;
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

  for (let layer of layers) {
    for (let [row, cell] of layer) {
      for (let tile in cell)  {
        for (let col of cell[tile]) {
          background.draw(tile, 32 * col, 32 * row);
        }
      }
    }
  }
};
