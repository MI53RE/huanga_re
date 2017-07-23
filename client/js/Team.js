class Team {
  constructor(id, name, sprite) {
    this.id = id;
    this.name = name;
    this.sprite = sprite;
    this.players = [];
  }

  updateMember(team1, team2, player) {
    team1.addMember(player);
    team2.removeMember(player);
    player.isEaten = true;
    return { add: team1.id, remove: team2.id, player: player.id };
  }

  eat(player1, player2) {
    //this.smokeScreen(player1);
    if (player1.team.id === player2.team.id) {
      return false;
    } else {
      let team1 = player1.team;
      let team2 = player2.team;
      let update = {};

      if (team1.name === "earth" && team2.name === "water") {
        update = this.updateMember(team1, team2, player2);
      } else if (team1.name === "water" && team2.name === "fire") {
        update = this.updateMember(team1, team2, player2);
      } else if (team1.name === "fire" && team2.name === "earth") {
        update = this.updateMember(team1, team2, player2);
      } else {
        update = this.updateMember(team2, team1, player1);
      }
      if ("/#" + socket.id === player1.id) {
        // socket.emit("updateTeam", update);
      }
    }
  }
}