console.clear();
const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(array) {
    this.array = array;
  }

  print() {
    let output = [];
    for (let i = 0; i < this.array.length; i++) {
      output[i] = "";
      for (let j = 0; j < this.array[i].length; j++) {
        output[i] = output[i] + this.array[i][j];
      }
    }
    for (let i = 0; i < output.length; i++) {
      console.log(output[i]);
    }
  }
  static generateField(width, height) {
    let random = 0;
    let field = [];
    let temp = [];
    let hatPresent = 0;
    temp[0] = pathCharacter;
    for (let i = 1; i < width; i++) {
      if (hatPresent == 0) {
        random = Math.floor(Math.random() * 3) + 1;
      } else {
        random = Math.floor(Math.random() * 2) + 1;
      }

      switch (random) {
        case 1:
          temp.push(hole);
          break;
        case 2:
          temp.push(fieldCharacter);
          break;
        case 3:
          temp.push(hat);
          hatPresent = 1;
          break;
      }
    }
    field.push(temp);
    temp = [];
    for (let j = 1; j < height; j++) {
      for (let i = 0; i < width; i++) {
        if (hatPresent == 0) {
          random = Math.floor(Math.random() * 3) + 1;
        } else {
          random = Math.floor(Math.random() * 2) + 1;
        }

        switch (random) {
          case 1:
            temp.push(hole);
            break;
          case 2:
            temp.push(fieldCharacter);
            break;
          case 3:
            temp.push(hat);
            hatPresent = 1;
            break;
        }
      }
      field.push(temp);
      temp = [];
    }

    return field;
  }
}

const myField = new Field(Field.generateField(4,4));

let status = 0;
let playerPosition = [0, 0];

console.log(Field.generateField(5,5));

while (status == 0) {
  myField.print();
  const move = prompt("Where do you want to go? (u,d,l,r)?");
  switch (move) {
    case "u":
      if (playerPosition[0] - 1 < 0) {
        console.log("You are outside of the grid!");
        status = 1;
      } else {
        playerPosition[0] = playerPosition[0] - 1;
      }
      break;

    case "d":
      playerPosition[0] = playerPosition[0] + 1;
      break;

    case "r":
      playerPosition[1] = playerPosition[1] + 1;
      break;

    case "l":
      if (playerPosition[1] - 1 < 0) {
        console.log("You are outside of the grid!");
        status = 1;
      } else {
        playerPosition[1] = playerPosition[1] - 1;
      }

      break;

    case "q":
      status = 1;
      break;
  }

  if (myField.array[playerPosition[0]][playerPosition[1]] == undefined) {
    console.log("You are outside of the grid!");
  }

  switch (myField.array[playerPosition[0]][playerPosition[1]]) {
    case undefined:
      console.log("You are outside of the grid!");
      status = 1;
      break;

    case hole:
      console.log("You fell into a hole!");
      status = 1;
      break;

    case fieldCharacter:
      console.clear();
      myField.array[playerPosition[0]][playerPosition[1]] = pathCharacter;
      break;

    case hat:
      myField.array[playerPosition[0]][playerPosition[1]] = pathCharacter;
      console.log("You found the hat!");
      status = 1;
      break;
  }
}
