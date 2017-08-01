/* Typekit async load */

document.documentElement.className += ' wf-loading';

(function(d) {
var config = {
  kitId: 'cuv6ijh',
  scriptTimeout: 3000,
  async: true
},
h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
})(document);
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

/*
 * Lazy Load
 * https://github.com/verlok/lazyload
 * The MIT License (MIT)
 * © Andrea Verlicchi 2015
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.LazyLoad = factory();
    }
}(this, function() {

    var _defaultSettings,
        _isInitialized = false;

    /*
     * PRIVATE FUNCTIONS *NOT RELATED* TO A SPECIFIC INSTANCE OF LAZY LOAD
     * -------------------------------------------------------------------
     */

    function _init() {
        if (!_isInitialized) {
            _defaultSettings = {
                elements_selector: "img",
                container: window,
                threshold: 300,
                throttle: 150,
                data_src: "original",
                data_srcset: "original-set",
                class_loading: "loading",
                class_loaded: "loaded",
                skip_invisible: true,
                callback_load: null,
                callback_error: null,
                callback_set: null,
                callback_processed: null
            };

            _isInitialized = true;
        }
    }

    function _isInsideViewport(element, container, threshold) {

        var ownerDocument, documentTop, documentLeft;

        function _getDocumentWidth() {
            return window.innerWidth || (ownerDocument.documentElement.clientWidth || document.body.clientWidth);
        }

        function _getDocumentHeight() {
            return window.innerHeight || (ownerDocument.documentElement.clientHeight || document.body.clientHeight);
        }

        function _getTopOffset(element) {
            return element.getBoundingClientRect().top + documentTop - ownerDocument.documentElement.clientTop;
        }

        function _getLeftOffset(element) {
            return element.getBoundingClientRect().left + documentLeft - ownerDocument.documentElement.clientLeft;
        }

        function _isBelowViewport() {
            var fold;
            if (container === window) {
                fold = _getDocumentHeight() + documentTop;
            } else {
                fold = _getTopOffset(container) + container.offsetHeight;
            }
            return fold <= _getTopOffset(element) - threshold;
        }

        function _isAtRightOfViewport() {
            var fold;
            if (container === window) {
                fold = _getDocumentWidth() + window.pageXOffset;
            } else {
                fold = _getLeftOffset(container) + _getDocumentWidth();
            }
            return fold <= _getLeftOffset(element) - threshold;
        }

        function _isAboveViewport() {
            var fold;
            if (container === window) {
                fold = documentTop;
            } else {
                fold = _getTopOffset(container);
            }
            return fold >= _getTopOffset(element) + threshold + element.offsetHeight;
        }

        function _isAtLeftOfViewport() {
            var fold;
            if (container === window) {
                fold = documentLeft;
            } else {
                fold = _getLeftOffset(container);
            }
            return fold >= _getLeftOffset(element) + threshold + element.offsetWidth;
        }

        ownerDocument = element.ownerDocument;
        documentTop = window.pageYOffset || ownerDocument.body.scrollTop;
        documentLeft = window.pageXOffset || ownerDocument.body.scrollLeft;

        return !_isBelowViewport() && !_isAboveViewport() && !_isAtRightOfViewport() && !_isAtLeftOfViewport();
    }

    function _now() {
        var d = new Date();
        return d.getTime();
    }

    function _merge_objects(obj1, obj2) {
        var obj3 = {},
            propertyName;
        for (propertyName in obj1) {
            if (obj1.hasOwnProperty(propertyName)) {
                obj3[propertyName] = obj1[propertyName];
            }
        }
        for (propertyName in obj2) {
            if (obj2.hasOwnProperty(propertyName)) {
                obj3[propertyName] = obj2[propertyName];
            }
        }
        return obj3;
    }

    function _convertToArray(nodeSet) {
        return Array.prototype.slice.call(nodeSet);
    }

    function _setSourcesForPicture(element, srcsetDataAttribute) {
        var parent = element.parentElement;
        if (parent.tagName !== 'PICTURE') {
            return;
        }
        for (var i = 0; i < parent.children.length; i++) {
            var pictureChild = parent.children[i];
            if (pictureChild.tagName === 'SOURCE') {
                var sourceSrcset = pictureChild.getAttribute('data-' + srcsetDataAttribute);
                if (sourceSrcset) {
                    pictureChild.setAttribute('srcset', sourceSrcset);
                }
            }
        }
    }

    function _setSources(element, srcsetDataAttribute, srcDataAttribute) {
        var tagName = element.tagName;
        var elementSrc = element.getAttribute('data-' + srcDataAttribute);
        if (tagName === "IMG") {
            _setSourcesForPicture(element, srcsetDataAttribute);
            var imgSrcset = element.getAttribute('data-' + srcsetDataAttribute);
            if (imgSrcset) element.setAttribute("srcset", imgSrcset);
            if (elementSrc) element.setAttribute("src", elementSrc);
            return;
        }
        if (tagName === "IFRAME") {
            if (elementSrc) element.setAttribute("src", elementSrc);
            return;
        }
        element.style.backgroundImage = "url(" + elementSrc + ")";
    }

    function _bind(fn, obj) {
        return function() {
            return fn.apply(obj, arguments);
        };
    }


    /*
     * INITIALIZER
     * -----------
     */

    function LazyLoad(instanceSettings) {
        _init();

        this._settings = _merge_objects(_defaultSettings, instanceSettings);
        this._queryOriginNode = this._settings.container === window ? document : this._settings.container;

        this._previousLoopTime = 0;
        this._loopTimeout = null;

        this._handleScrollFn = _bind(this.handleScroll, this);

        window.addEventListener("resize", this._handleScrollFn);
        this.update();
    }


    /*
     * PRIVATE FUNCTIONS *RELATED* TO A SPECIFIC INSTANCE OF LAZY LOAD
     * ---------------------------------------------------------------
     */

    LazyLoad.prototype._showOnAppear = function(element) {
        var settings = this._settings;

        function errorCallback() {
            element.removeEventListener("load", loadCallback);
            element.classList.remove(settings.class_loading);
            if (settings.callback_error) {
                settings.callback_error(element);
            }
        }
        function loadCallback() {
            /* As this method is asynchronous, it must be protected against external destroy() calls */
            if (settings === null) {
                return;
            }
            /* Calling LOAD callback */
            if (settings.callback_load) {
                settings.callback_load(element);
            }
            element.classList.remove(settings.class_loading);
            element.classList.add(settings.class_loaded);
            element.removeEventListener("load", loadCallback);
            element.removeEventListener("error", errorCallback);
        }

        if (element.tagName === "IMG" || element.tagName === "IFRAME") {
            element.addEventListener("load", loadCallback);
            element.addEventListener("error", errorCallback);
            element.classList.add(settings.class_loading);
        }

        _setSources(element, settings.data_srcset, settings.data_src);
        /* Calling SET callback */
        if (settings.callback_set) {
            settings.callback_set(element);
        }
    };

    LazyLoad.prototype._loopThroughElements = function() {
        var i, element,
            settings = this._settings,
            elements = this._elements,
            elementsLength = (!elements) ? 0 : elements.length,
            processedIndexes = [];

        for (i = 0; i < elementsLength; i++) {
            element = elements[i];
            /* If must skip_invisible and element is invisible, skip it */
            if (settings.skip_invisible && (element.offsetParent === null)) {
                continue;
            }
            if (_isInsideViewport(element, settings.container, settings.threshold)) {
                this._showOnAppear(element);

                /* Marking the element as processed. */
                processedIndexes.push(i);
                element.wasProcessed = true;
            }
        }
        /* Removing processed elements from this._elements. */
        while (processedIndexes.length > 0) {
            elements.splice(processedIndexes.pop(), 1);
            /* Calling the end loop callback */
            if (settings.callback_processed) {
                settings.callback_processed(elements.length);
            }
        }
        /* Stop listening to scroll event when 0 elements remains */
        if (elementsLength === 0) {
            this._stopScrollHandler();
        }
    };

    LazyLoad.prototype._purgeElements = function() {
        var i, element,
            elements = this._elements,
            elementsLength = elements.length,
            elementsToPurge = [];

        for (i = 0; i < elementsLength; i++) {
            element = elements[i];
            /* If the element has already been processed, skip it */
            if (element.wasProcessed) {
                elementsToPurge.push(i);
            }
        }
        /* Removing elements to purge from this._elements. */
        while (elementsToPurge.length > 0) {
            elements.splice(elementsToPurge.pop(), 1);
        }
    };

    LazyLoad.prototype._startScrollHandler = function() {
        if (!this._isHandlingScroll) {
            this._isHandlingScroll = true;
            this._settings.container.addEventListener("scroll", this._handleScrollFn);
        }
    };

    LazyLoad.prototype._stopScrollHandler = function() {
        if (this._isHandlingScroll) {
            this._isHandlingScroll = false;
            this._settings.container.removeEventListener("scroll", this._handleScrollFn);
        }
    };


    /*
     * PUBLIC FUNCTIONS
     * ----------------
     */

    LazyLoad.prototype.handleScroll = function() {
        var remainingTime,
            now,
            throttle;

        // IE8 fix for destroy() malfunctioning
        if (!this._settings) {
            return;
        }

        now = _now();
        throttle = this._settings.throttle;

        if (throttle !== 0) {
            remainingTime = throttle - (now - this._previousLoopTime);
            if (remainingTime <= 0 || remainingTime > throttle) {
                if (this._loopTimeout) {
                    clearTimeout(this._loopTimeout);
                    this._loopTimeout = null;
                }
                this._previousLoopTime = now;
                this._loopThroughElements();
            } else if (!this._loopTimeout) {
                this._loopTimeout = setTimeout(_bind(function() {
                    this._previousLoopTime = _now();
                    this._loopTimeout = null;
                    this._loopThroughElements();
                }, this), remainingTime);
            }
        } else {
            this._loopThroughElements();
        }
    };

    LazyLoad.prototype.update = function() {
        this._elements = _convertToArray(this._queryOriginNode.querySelectorAll(this._settings.elements_selector));
        this._purgeElements();
        this._loopThroughElements();
        this._startScrollHandler();
    };

    LazyLoad.prototype.destroy = function() {
        window.removeEventListener("resize", this._handleScrollFn);
        if (this._loopTimeout) {
            clearTimeout(this._loopTimeout);
            this._loopTimeout = null;
        }
        this._stopScrollHandler();
        this._elements = null;
        this._queryOriginNode = null;
        this._settings = null;
    };


    return LazyLoad;

}));

/* Init Lazy Load */

var myLazyLoad = new LazyLoad();
