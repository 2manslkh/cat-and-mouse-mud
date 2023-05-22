import { mount as mountDevTools } from "@latticexyz/dev-tools";
import { setup } from "./mud/setup";

const {
  components,
  systemCalls: { increment , moveUp, moveDown, moveLeft, moveRight,registerPlayer1,registerPlayer2},
} = await setup();

// Components expose a stream that triggers when the component is updated.
components.Counter.update$.subscribe((update) => {
  const [nextValue, prevValue] = update.value;
  console.log("Counter updated", update, { nextValue, prevValue });
  document.getElementById("counter")!.innerHTML = String(nextValue?.value ?? "unset");
});

// Components expose a stream that triggers when the component is updated.
components.ActivePlayer.update$.subscribe((update) => {
  const [nextValue, prevValue] = update.value;
  console.log("Counter updated", update, { nextValue, prevValue });
  document.getElementById("counter")!.innerHTML = String(nextValue?.value ?? "unset");
});

components.Position.update$.subscribe((update) => {
  console.log("🚀 | components.Position.update$.subscribe | update:", update)
  const [nextValue, prevValue] = update.value;
  const entity = update.entity;
  console.log("Position updated", update, { nextValue, prevValue });
  document.getElementById("xpos")!.innerHTML = String(nextValue?.x ?? "unset"); 
  document.getElementById("ypos")!.innerHTML = String(nextValue?.y ?? "unset"); 
  document.getElementById(`${prevValue?.x} ${prevValue?.y}`)?.classList.remove('active');
  document.getElementById(`${nextValue?.x} ${nextValue?.y}`)?.classList.add('active');
});

// Just for demonstration purposes: we create a global function that can be
// called to invoke the Increment system contract via the world. (See IncrementSystem.sol.)
(window as any).increment = async () => {
  console.log("new counter value:", await increment());
};

(window as any).moveUp = async () => {
  console.log("new position value:", await moveUp());
};

(window as any).moveDown = async () => {
  console.log("new position value:", await moveDown());
};

(window as any).moveLeft = async () => {
  console.log("new position value:", await moveLeft());
};

(window as any).moveRight = async () => {
  console.log("new position value:", await moveRight());
};

(window as any).registerPlayer1 = async () => {
  console.log("Player 1 address:", await registerPlayer1());
};

(window as any).registerPlayer2 = async () => {
  console.log("Player 2 address:", await registerPlayer2());
};

// Listen to key events
addEventListener("keydown", async (event) => {
  console.log(event)
  if (event.key === "ArrowUp") {
    await moveUp()
  } else if (event.key === "ArrowDown")  {
    await moveDown()
  } else if (event.key === "ArrowLeft")  {
    await moveLeft()
  } else if (event.key === "ArrowRight")  {
    await moveRight()
  }
});

// Generate Game board
const gridSize = 5; // Replace 5 with your desired grid size
const gridContainer = document.getElementById('game-board');

// Create n x n cells
for (let i = gridSize; i > 0 ; i--) {
  const row = document.createElement('tr');
  gridContainer.appendChild(row); 
  for (let j = 0; j < gridSize; j++) {
    const cell = document.createElement('td');
    cell.classList.add('hole');
    cell.id = `${j} ${i}`;
    row.appendChild(cell);
  }
}

mountDevTools();
