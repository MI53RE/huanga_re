const animatorTest = new Animator();
let test = new Sprite("test", "./img/test_sprite2.jpg", 8, 4);
test.addAnimation("down", 0, 0, 7, true);
animatorTest.addSprite(test).play("test", "down");
// test.render("2-5");