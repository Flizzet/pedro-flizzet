const WAI = {};

WAI.init = function() {
	console.log("WAI initialized");

	// Collect all elements
	this._allElements = document.querySelectorAll("[data-wai-page]");
	
	console.log(this._allElements);
}
