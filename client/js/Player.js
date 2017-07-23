class Player {
  constructor(id, name, position, team) {
    this.id = id;
    this.name = name;
    this.position = position;
    this.team = team.id;
    this.animator = new Animator();
    this.animator.addSprite("player", team.sprite);
  }
}