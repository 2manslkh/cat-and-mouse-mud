# Cat and Mouse MUD Game

This project is a simple game developed using the MUD (Multi-User Dungeon) framework. The game revolves around two players, one assuming the role of a cat and the other assuming the role of a mouse. The objective of the cat is to attack the mouse, while the mouse tries to avoid the cat for as long as possible. When the cat successfully attacks the mouse, the players' roles switch. Please note that this project is solely for experimentation purposes with the MUD framework.

## How to Play

1. Clone the repository to your local machine:

    `git clone https://github.com/2manslkh/cat-and-mouse-mud.git`

2. Install the necessary dependencies:

    `cd cat-and-mouse-mud`

    `npm install`

3. Start the game server:

    `pnpm dev`


4. Connect to `http://localhost:3000/` on 2 separate browsers.

5. Choose a player role:
   - Register as player 1 to play as the cat.
   - Register as player 2 to play as the mouse.

6. Gameplay:
   - The cat's objective is to attack the mouse by moving towards its location.
   - The mouse's objective is to avoid the cat and survive for as long as possible.
   - Players take turns entering commands.
   - Available commands:
     - `Arrow Keys` Move in the specified direction.
     - `Spacebar`: If the cat is on the mouse, initiate an attack.

7. Enjoy the game! Remember that when the cat successfully attacks the mouse, the players' roles will switch.

## Contribution

This project is purely for personal experimentation with the MUD framework. Contributions are not expected, but feel free to fork the repository if you wish to make any modifications or improvements.

## License

The project is licensed under the [MIT License](LICENSE). Feel free to use it as a reference or base for your own projects.

## Disclaimer

Please note that this game does not currently have a win condition. It is intended for experimentation and personal enjoyment only.
