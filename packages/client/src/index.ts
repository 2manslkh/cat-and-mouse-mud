import { mount as mountDevTools } from "@latticexyz/dev-tools";
import { setup } from "./mud/setup";

const {
  components,
  systemCalls: {
    increment,
    moveUp,
    moveDown,
    moveLeft,
    moveRight,
    registerPlayer1,
    registerPlayer2,
    attack,
  },
} = await setup();

let player1Address: string;
let player2Address: string;

// Components expose a stream that triggers when the component is updated.
components.Counter.update$.subscribe((update) => {
  const [nextValue, prevValue] = update.value;
  console.log("Counter updated", update, { nextValue, prevValue });
  document.getElementById("counter")!.innerHTML = String(
    nextValue?.value ?? "unset"
  );
});

// Components expose a stream that triggers when the component is updated.
components.ActivePlayer.update$.subscribe((update) => {
  const [nextValue, prevValue] = update.value;
  console.log("Counter updated", update, { nextValue, prevValue });
  document.getElementById("p1")!.innerHTML = String(
    nextValue?.player1 ?? "unset"
  );
  document.getElementById("p2")!.innerHTML = String(
    nextValue?.player2 ?? "unset"
  );

  player1Address = nextValue?.player1;
  player2Address = nextValue?.player2;
});

components.Position.update$.subscribe((update) => {
  console.log("🚀 | components.Position.update$.subscribe | update:", update);
  const [nextValue, prevValue] = update.value;
  const entity = update.entity;
  console.log("Position updated", update, { nextValue, prevValue });

  let suffix = "";
  if (entity === player1Address) {
    suffix = "-p1";
  } else if (entity === player2Address) {
    suffix = "-p2";
  }
  document.getElementById(`xpos${suffix}`)!.innerHTML = String(
    nextValue?.x ?? "unset"
  );
  document.getElementById(`ypos${suffix}`)!.innerHTML = String(
    nextValue?.y ?? "unset"
  );
  document
    .getElementById(`${prevValue?.x} ${prevValue?.y}`)
    ?.classList.remove(`active${suffix}`);
  document
    .getElementById(`${nextValue?.x} ${nextValue?.y}`)
    ?.classList.add(`active${suffix}`);
});

const roles = { 0: "CAT", 1: "MOUSE" };

components.PlayerRole.update$.subscribe((update) => {
  console.log("🚀 | components.PlayerRole.update$.subscribe | update:", update);
  const [nextValue, prevValue] = update.value;
  const entity = update.entity;
  console.log("Role updated", update, { nextValue, prevValue });

  let suffix = "";
  if (entity === player1Address) {
    suffix = "-p1";
  } else if (entity === player2Address) {
    suffix = "-p2";
  }
  document.getElementById(`role${suffix}`)!.innerHTML = String(
    nextValue?.value ?? "unset"
  );
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
  console.log(event);
  if (event.key === "ArrowUp") {
    await moveUp();
  } else if (event.key === "ArrowDown") {
    await moveDown();
  } else if (event.key === "ArrowLeft") {
    await moveLeft();
  } else if (event.key === "ArrowRight") {
    await moveRight();
  } else if (event.key === " ") {
    await attack();
  }
});

// Generate Game board
const gridSize = 5; // Replace 5 with your desired grid size
const gridContainer = document.getElementById("game-board");

// Create n x n cells
for (let i = gridSize - 1; i >= 0; i--) {
  const row = document.createElement("tr");
  gridContainer.appendChild(row);
  for (let j = 0; j < gridSize; j++) {
    const cell = document.createElement("td");
    cell.classList.add("hole");
    cell.id = `${j} ${i}`;
    row.appendChild(cell);
  }
}

mountDevTools();
