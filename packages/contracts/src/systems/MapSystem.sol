// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { Position, Player, Movable } from "../codegen/Tables.sol";
import { addressToEntityKey } from "../utils/addressToEntityKey.sol";

contract MapSystem is System {
  /**
   * Get the distance between X and Y
   * @param fromX Initial X Coordinates
   * @param fromY Initial Y Coordinates
   * @param toX Destination X Coordinates
   * @param toY Destination Y Coordinates
   */
  function distance(uint32 fromX, uint32 fromY, uint32 toX, uint32 toY) internal pure returns (uint32) {
    uint32 deltaX = fromX > toX ? fromX - toX : toX - fromX;
    uint32 deltaY = fromY > toY ? fromY - toY : toY - fromY;
    return deltaX + deltaY;
  }

  /**
   * Spawn a player
   * @param x X Coordinates
   * @param y Y Coordinates
   */

  function spawn(uint32 x, uint32 y) public {
    bytes32 player = addressToEntityKey(address(_msgSender()));
    require(!Player.get(player), "already spawned");

    Player.set(player, true);
    Position.set(player, x, y);
    Movable.set(player, true);
  }

  /**
   * Moves the player (_msgSender) to a specified x,y coordinates
   * @dev can only move to adjacent space
   * @param x X Coordinates
   * @param y Y Coordinates
   */
  function move(uint32 x, uint32 y) public {
    bytes32 player = addressToEntityKey(_msgSender());
    require(Movable.get(player), "cannot move");

    (uint32 fromX, uint32 fromY) = Position.get(player);
    require(distance(fromX, fromY, x, y) == 1, "can only move to adjacent spaces");

    Position.set(player, x, y);
  }

  function moveUp() public returns (uint32) {
    bytes32 player = addressToEntityKey(_msgSender());
    uint32 value = Position.getY(player);
    uint32 newValue = value + 1;
    Position.setY(player, newValue);
    return newValue;
  }

  function moveDown() public returns (uint32) {
    bytes32 player = addressToEntityKey(_msgSender());
    uint32 value = Position.getY(player);
    uint32 newValue = value - 1;
    Position.setY(player, newValue);
    return newValue;
  }

  function moveLeft() public returns (uint32) {
    bytes32 player = addressToEntityKey(_msgSender());
    uint32 value = Position.getX(player);
    uint32 newValue = value - 1;
    Position.setX(player, newValue);
    return newValue;
  }

  function moveRight() public returns (uint32) {
    bytes32 player = addressToEntityKey(_msgSender());
    uint32 value = Position.getX(player);
    uint32 newValue = value + 1;
    Position.setX(player, newValue);
    return newValue;
  }
}
