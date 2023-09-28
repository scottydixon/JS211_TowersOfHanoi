// * This js file is incomplete. It will log to the console the elements you click
    // call another function and set stone. You will have to work through the logic
    // of the game as you know it from building it in the terminal. Work through the
    // puzzle slowly, stepping through the flow of logic, and making the game work.
    // Have fun!!
// * First run the program in your browser with live server and double-click on the row you'd like to select an element from.
// * Why are you get a warning in your console? Fix it.
// * Delete these comment lines!

let stone = null

// this function is called when a row is clicked. 
// Open your inspector tool to see what is being captured and can be used.
const selectRow = (row) => {
  const currentRow = row.getAttribute("data-row")
  console.log("Yay, we clicked an item", row)

  if (row.id) {
    console.log("Here is the stone's id: ", row.id)
    console.log("Here is the stone's data-size: ", currentRow)
    // Check if stone is picked up
    if (!stone) {
      pickUpStone(row.id);
    } else {
      dropStone(row.id);
    }
  }
};

// this function can be called to get the last stone in the stack
const pickUpStone = (rowID) => {
  const selectedRow = document.getElementById(rowID);

  // Check if there is a child to remove
  if (selectedRow.lastChild) {
    stone = selectedRow.removeChild(selectedRow.lastChild);
    console.log(stone);
  } else {
    console.log("No stone to pick up in this row");
  }
};

// This function is used to drop the stone
const dropStone = (rowID) => {
  const row = document.getElementById(rowID);
  
  // Check if the row and stone are valid before appending the stone
  if (row && stone) {
    row.appendChild(stone);
    stone = null;
  }
};

// * Remember you can use your logic from 'main.js' to maintain the rules of the game. But how? Follow the flow of data just like falling dominoes.

