'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Add a variable to count moves
let moveCount = 0;

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
}; 

const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

let from = '';
let to = '';


const movePiece = (from, to) => {
  // remove the top disc from the 'from' stack
  const disc = stacks[from].pop();

  // Add the removed disc to the 'to' stack
  stacks[to].push(disc);
}


const isLegal = (from, to) => {
  if(!['a','b','c'].includes(from) || !['a','b','c'].includes(to)) {
    return false; // Invalid stack names
  }

  if (stacks[from].length == 0) {
    return false;
  }

  // Get the top disc from the 'from' stack
  const fromTop = stacks[from][stacks[from].length - 1];

  // Get the top disc from the 'to' stack (if not empty)
  const toTop = stacks[to][stacks[to].length - 1];

  // check if 'to' stack is empty or if the move is valid
  return stacks[to].length == 0 || fromTop < toTop;

}

// this function should check if the board is in a winning state.
// A winning state is when all the discs are on stack b, or stack c.
// return true if the board is in a winning state,
// otherwise return false
const checkForWin = () => {
  // Check if all discs are on stack 'b' or 'c'
  return (stacks.b.length == 4 || stacks.c.length == 4);

}

// When is this function called? What should it do with its argument?
const towersOfHanoi = (from, to) => {
  // Check if the move is legal
  if (isLegal(from, to)) {
    movePiece(from, to);
    moveCount++;
    console.log(`Move #${moveCount}`)
    // Check if the player has won
    if (checkForWin()) {
      // Print the final state of the stacks
      printStacks();
      console.log(`Congratulations, You Won in ${moveCount} moves!`);
      process.exit(0); // to exit program
    }
  } else {
    // if the move is not legal, print an error message
    console.log("Invalid move. Please try again.");
  }
};

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (fromInput) => {
    rl.question('end stack: ', (toInput) => {
      from = fromInput;
      to = toInput;
      towersOfHanoi(from, to);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}

// My unit tests

if (typeof describe === 'function') {


  describe('#towersOfHanoi()', () => {
    it('should not allow an invalid move from an empty stack', () => {
      moveCount = 0;
      stacks = {
        a: [],
        b: [],
        c: [4, 3, 2, 1]
      };
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [], b: [], c: [4, 3, 2, 1] }); // Stacks should remain unchanged
      assert.equal(moveCount, 0); // No moves should be counted
    });

    it('should not allow an illegal move to a non-empty stack', () => {
      moveCount = 0;
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] }); // Stacks should remain unchanged
      assert.equal(moveCount, 0); // No moves should be counted
    });
    

    it('should not allow moves from/to invalid stack names', () => {
      moveCount = 0;
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      towersOfHanoi('d', 'a'); // Invalid 'from' stack
      assert.deepEqual(stacks, { a: [4, 3, 2, 1], b: [], c: [] }); // Stacks should remain unchanged
      assert.equal(moveCount, 0); // No moves should be counted
      towersOfHanoi('a', 'x'); // Invalid 'to' stack
      assert.deepEqual(stacks, { a: [4, 3, 2, 1], b: [], c: [] }); // Stacks should remain unchanged
      assert.equal(moveCount, 0); // No moves should be counted
    });
  });

}
