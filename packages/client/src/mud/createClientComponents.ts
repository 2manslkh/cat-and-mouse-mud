import { SetupNetworkResult } from "./setupNetwork";
import { overridableComponent } from "@latticexyz/recs";

export type ClientComponents = ReturnType<typeof createClientComponents>;

export function createClientComponents({ components }: SetupNetworkResult) {
  return {
    ...components,
    // add your client components or overrides here
    Player: overridableComponent(components.Player),
    Position: overridableComponent(components.Position) // Render update of position client side
  };
}
