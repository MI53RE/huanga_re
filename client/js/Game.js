const animatorTest = new Animator();
let test = new Sprite("test", "./img/sprite_test.png", 10, 1);
test.addAnimation("2-5", 1, 0, 3, true);
animatorTest.addSprite(test).render("2-5");