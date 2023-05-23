// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { ActivePlayer, Movable, PlayerRole, Position } from "../codegen/Tables.sol";
import { Role } from "../codegen/Types.sol";
import { addressToEntityKey } from "../utils/addressToEntityKey.sol";

contract AttackSystem is System {
  function attack() public returns (bool) {
    address player1 = ActivePlayer.getPlayer1();
    address player2 = ActivePlayer.getPlayer2();
    bytes32 _player1 = addressToEntityKey(player1);
    bytes32 _player2 = addressToEntityKey(player2);
    bytes32 player = addressToEntityKey(_msgSender());
    require(PlayerRole.get(player) == Role.Cat, "Only cat can attack");
    if (Position.getX(_player1) == Position.getX(_player2) && Position.getY(_player1) == Position.getY(_player2)) {
      // HIT!
      // Role Change
      Role _player1Role = PlayerRole.get(_player1);
      Role _player2Role = PlayerRole.get(_player2);
      PlayerRole.set(_player1, _player2Role);
      PlayerRole.set(_player2, _player1Role);
      return true;
    } else {
      return false;
    }
  }
}
