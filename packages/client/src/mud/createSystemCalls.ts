import { awaitStreamValue, uuid } from "@latticexyz/utils";

import { ClientComponents } from "./createClientComponents";
import { SetupNetworkResult } from "./setupNetwork";
import { getComponentValue } from "@latticexyz/recs";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
  { worldSend, txReduced$, singletonEntity, playerEntity }: SetupNetworkResult,
  { Counter, Position, Player }: ClientComponents,
) {
  const increment = async () => {
    const tx = await worldSend("increment", []);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
    return getComponentValue(Counter, singletonEntity);
  };

  const moveUp = async () => {
    return moveBy(0,1);
  };

  const moveDown = async () => {
    return moveBy(0,-1);
  };

  const moveLeft = async () => {
      return moveBy(-1,0);
  };

  const moveRight = async () => {
    return moveBy(1,0);
  };

  const registerPlayer1 = async () => {
    const tx = await worldSend("registerPlayer1", []);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
    return getComponentValue(Position, singletonEntity);
  };

  const registerPlayer2 = async () => {
    const tx = await worldSend("registerPlayer2", []);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
    return getComponentValue(Position, singletonEntity);
  };

  const getPlayers = async () => {
    return getComponentValue(Position, singletonEntity);
  };

  const moveTo = async (x: number, y: number) => {
    if (!playerEntity) {
      throw new Error("no player");
    }
    const positionId = uuid();
    Position.addOverride(positionId, {
      entity: playerEntity,
      value: { x, y },
    });
   
    try {
      const tx = await worldSend("move", [x, y]);
      await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
    } finally {
      Position.removeOverride(positionId);
    }
  };
 
  const moveBy = async (deltaX: number, deltaY: number) => {
    if (!playerEntity) {
      throw new Error("no player");
    }
   
    const playerPosition = getComponentValue(Position, playerEntity);
    if (!playerPosition) {
      console.warn("cannot moveBy without a player position, not yet spawned?");
      return;
    }
   
    await moveTo(playerPosition.x + deltaX, playerPosition.y + deltaY);
  };
 
  const spawn = async (x: number, y: number) => {
    if (!playerEntity) {
      throw new Error("no player");
    }
 
    const canSpawn = getComponentValue(Player, playerEntity)?.value !== true;
    if (!canSpawn) {
      throw new Error("already spawned");
    }
 
    const tx = await worldSend("spawn", [x, y]);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  };

  return {
    increment,
    moveUp,
    moveDown,
    moveLeft,
    moveRight,
    registerPlayer1,
    registerPlayer2,
    getPlayers,
    moveBy,
    moveTo,
    spawn,
  };
}
