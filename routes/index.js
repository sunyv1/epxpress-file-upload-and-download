const fs = require("fs");
const path = require("path");

function init(app) {
	const files = fs.readdirSync(path.join(__dirname)).filter(file => file != "index.js");
	files.forEach(file => {
		app.use("/" + file.split(".")[0], require(path.join(__dirname, file)));
	});
}

module.exports = init;
