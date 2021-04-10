/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 * 
 * Eldy Deines (Updated Solution)
 */

//these values won't be changing
const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])


/*  makeBoard: create in-JS board structure:  board = array of rows, 
    each row is array of cells  (board[y][x])  */
function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let h = 0; h < HEIGHT; h++) {
    board[h] = new Array;
    for (let w = 0; w < WIDTH; w++) {
      board[h][w] = null;
    }//end of width loop 
  }//end of height loop
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById("board");
  // TODO: this adds a new table role HTML element
  // and adds a new ID and click event to that table row
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);
  // This loop adds a column with an id of x (tranversing horizontally)
  // Then appends it to the top table row
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top); //appended to HTML Board Table At the Very Top

  // This setups the actual game board and appends to the top row 
  // New Rows are appended from the bottom
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  let y = (HEIGHT - 1);
  while (y >= 0) {
    if (board[y][x] === null) {
      return y;
    }
    y--;
  }
  return 0;
}

/** placeInTable: update DOM to place piece into HTML table of board */
function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const place = document.createElement("div");
  //const setCell = `${y}-${x}`;
  const cell = document.getElementById(`${y}-${x}`);
  place.classList.add("piece");
  place.classList.add(`p${currPlayer}`);
  cell.append(place);

}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(`Player${currPlayer} is the winner!`)
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
  board[y][x] = currPlayer;

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  const isBoardFilled = board.
    every(function (subArray) {
      return subArray.every(function (value) {
        return value !== null;
      });
    });
  //came up with the above solution by checking this question and answer 
  //https://forum.freecodecamp.org/t/how-to-map-a-subarray-or-nested-array/137761/2

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = (currPlayer === 1) ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
  // This for loop runs through all scenarios to see if four
  // of the same player are near each other for cell in the array.
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
