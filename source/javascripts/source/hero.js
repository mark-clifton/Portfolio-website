var totalTiles = 112;
var numberClasses = 29;
var tileNumbers = [];
var randomTiles = [];
/* Create grid of tiles */
function makeTiles() {
	/* Create container for tiles */
	var container = document.createElement('div');
	container.id = 'pattern';
	document.getElementById('hero').appendChild(container);
	/* Designate a number of random tiles to be blank */
	while(randomTiles.length < numberClasses) {
		// Generate a random integer within the range of the total tile count
		var randomTile = randomNumber(totalTiles);
		// Push to array if not already in the array and outside of the range of tiles that are always blank
		if (withinRange(randomTile)) {
			if (randomTiles.indexOf(randomTile) === -1) {
				randomTiles.push(randomTile);
			}
		}
	}
	/* Create tiles with random classes */
	for(x = 0; x < totalTiles; x++) {
		// Randomize tile class
		var classNumber = randomNumber(numberClasses);
		// Create tile element
		var tile = document.createElement('div');
		tile.className = 'tile tile-' + classNumber;
		// If the index of the current tile matches an integer in the blank tile list, add the class to make it blank
		if (randomTiles.indexOf(x) > -1) {
			tile.classList.add('blank-tile');
		}
		// Make tile index its ID
		tile.id = 'tile-' + x;
		// Append tile to container
		document.getElementById('pattern').appendChild(tile);
		// Store index numbers for all tiles in an array
		tileNumbers.push(x);
	}
	showTiles(); // Show tiles after all are created
}
/* Make tiles visible */
function showTiles() {
	// Continue if there are still tiles to show
	if (tileNumbers.length) {
		// Select a random tile
		var currentTile = randomNumber(totalTiles);
		// Get index of current tile number in storage array
		var currentTileIndex = tileNumbers.indexOf(currentTile);
		// If index of current tile is still in storage array, it hasn't been shown yet, so continue
		if (currentTileIndex > -1) {
			// Add class to selected tile to make visible
			document.getElementById('tile-' + currentTile).classList.add('tile-visible');
			// Remove current tile value from storage array to avoid repetition
			tileNumbers.splice(currentTileIndex, 1);
		}
		// Repeat with delay for a cascade effect, until storage array is empty
		setTimeout(function() {
			showTiles();
		}, 2);
	} else {
		// Start changing tile classes after all are shown
		changeTiles();
	}
}
/* Randomly change tile classes */
function changeTiles() {
	// Random delay time within range
	var min = 200, max = 3000;
	var randomTime = Math.floor(Math.random() * (max - min + 1) + min);
	// Select a random tile
	var tileNumber = randomNumber(totalTiles);
	var currentTile = document.getElementById('tile-' + tileNumber);
	// Randomize tile class
	var classNumber = randomNumber(numberClasses + 1); // The +1 adds a possible class that's blank, to maintain texture
	// Only change tiles within the visible range
	if (withinRange(tileNumber)) {
		// Change tile classes to hide
		currentTile.className = 'tile tile-hidden';
		// Change tile classes to show with a new random class, with delay to allow CSS transition
		setTimeout(function() {
			currentTile.className = 'tile tile-' + classNumber + ' tile-visible';
		}, 200);
	}
	// Run continuously with random delay
	setTimeout(changeTiles, randomTime);
}
/* Check if number is within range of visible tiles */
function withinRange(tile) {
	if (tile < 38 || (tile > 47 && tile < 53) || (tile > 63 && tile < 69) || tile > 79) {
		return true;
	}
}
/* Return a random number within a range */
function randomNumber(range) {
	return Math.floor(Math.random() * range);
}
makeTiles();
