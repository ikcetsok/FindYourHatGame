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

  static generateField(width, height) {}
}

const myField = new Field([
  ["*", "░", "O"],
  ["░", "O", "░"],
  ["░", "^", "░"],
]);

let status = 0;
let playerPosition = [0, 0];


while (status == 0) {
  myField.print();
  const move = prompt("Where do you want to go? (u,d,l,r)?");
  switch(move){
    case 'u':
    playerPosition[0]=playerPosition[0]+1;
    break;

    case 'd':
    playerPosition[0]=playerPosition[0]-1
    break;

    case 'r':
    playerPosition[1]=playerPosition[1]+1;
    break;

    case 'l':
    playerPosition[1]=playerPosition[1]-1;
    break;

    case 'q':
        status=1;
        break;
  }



}


