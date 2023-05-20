// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { ActivePlayer, Position } from "../codegen/Tables.sol";
import { addressToEntityKey } from "../utils/addressToEntityKey.sol";

contract PlayerSystem is System {
  function registerPlayer1() public returns (address) {
    address value = ActivePlayer.getPlayer1();
    require(
      value == address(0) || _msgSender() != ActivePlayer.getPlayer2(),
      "PlayerSystem: Player 1 registration error"
    );

    ActivePlayer.setPlayer1(_msgSender());
    bytes32 player = addressToEntityKey(_msgSender());
    Position.setX(player, 0);
    Position.setY(player, 0);
    return _msgSender();
  }

  function registerPlayer2() public returns (address) {
    address value = ActivePlayer.getPlayer2();
    require(
      value == address(0) && _msgSender() != ActivePlayer.getPlayer1(),
      "PlayerSystem: Player 2 registration error"
    );

    ActivePlayer.setPlayer2(_msgSender());
    bytes32 player = addressToEntityKey(_msgSender());
    Position.setX(player, 2);
    Position.setY(player, 2);
    return _msgSender();
  }
}
