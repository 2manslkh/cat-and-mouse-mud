import { ClientComponents } from "./createClientComponents";
import { SetupNetworkResult } from "./setupNetwork";
import { awaitStreamValue } from "@latticexyz/utils";
import { getComponentValue } from "@latticexyz/recs";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
  { worldSend, txReduced$, singletonEntity, playerEntity }: SetupNetworkResult,
  { Counter, Position }: ClientComponents,
) {
  const increment = async () => {
    const tx = await worldSend("increment", []);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
    return getComponentValue(Counter, singletonEntity);
  };

  const moveUp = async () => {
    const tx = await worldSend("moveUp", []);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
    if (!playerEntity) {
      throw new Error("no player");
    }
    return getComponentValue(Position, playerEntity);
  };

  const moveDown = async () => {
    const tx = await worldSend("moveDown", []);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
    if (!playerEntity) {
      throw new Error("no player");
    }
    return getComponentValue(Position, playerEntity);
  };

  const moveLeft = async () => {
    const tx = await worldSend("moveLeft", []);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
    if (!playerEntity) {
      throw new Error("no player");
    }
    return getComponentValue(Position, playerEntity);
  };

  const moveRight = async () => {
    const tx = await worldSend("moveRight", []);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
    if (!playerEntity) {
      throw new Error("no player");
    }
    return getComponentValue(Position, playerEntity);
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

  return {
    increment,
    moveUp,
    moveDown,
    moveLeft,
    moveRight,
    registerPlayer1,
    registerPlayer2,
    getPlayers
  };
}
