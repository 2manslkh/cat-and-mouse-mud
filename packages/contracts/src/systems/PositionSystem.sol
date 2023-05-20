// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { Position } from "../codegen/Tables.sol";
import { addressToEntityKey } from "../utils/addressToEntityKey.sol";

contract PositionSystem is System {
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
