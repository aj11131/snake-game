# Demo
https://snake-game11131.glitch.me

# Snake

The objective of snake is to eat food and grow as long as possible. The rules of snake are you cannot hit the walls or hit a segment of your own body. If you do either of those the game will end.

If playing on desktop, use the arrow keys to move the snake. If on mobile, touch the arrow buttons below the game display.

## About

This game was created using HTML, CSS, and JavaScript. When the app is loaded, a 'tile' array is created which contains all the tiles in the game area. A head element with absolute positioning is then created in the top right of the game area. This head is the initial snake. When the head reaches the food element, a body segment is added to the head and the food element is respawned in a random empty tile. The movement is based on a timer. When the time expires a move function is executed which deletes the head and segment elements and rerenders them in their new coordinates. If at any time the head attempts to move within it's own body or outside the game area, the game will end.