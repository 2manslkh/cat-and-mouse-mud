import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  enums: {
    TerrainType: ["None", "TallGrass", "Boulder"],
  },
  tables: {
    Counter: {
      keySchema: {},
      schema: "uint32",
    },
    MapConfig: {
      keySchema: {},
      dataStruct: false,
      schema: {
        width: "uint32",
        height: "uint32",
        terrain: "bytes",
      },
    },
    Player: "bool",
    Movable: "bool",
    Position: {
      dataStruct: false,
      schema: {
        x: "uint32",
        y: "uint32",
      },
    },
    ActivePlayer: {
      keySchema: {},
      schema: {
        player1: "address",
        player2: "address",
      },
    },
  },
});
