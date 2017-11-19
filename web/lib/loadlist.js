var fs = require('fs');

const TEN_MINUTES = 10 * 60 * 1000;

function List (filename) {
	this.filename = filename;
	this.list = JSON.parse(fs.readFileSync(filename)); // WARNING: Don't call constructor after progarm initialisation!!!
	this.timestamp = Date.now();
}

List.prototype.get = function () {
	var now = Date.now();
	
	return new Promise((ok,fail) => {
		if (now > (this.timestamp + TEN_MINUTES)) {
			fs.readFile(this.filename,(err,txt) => {
				if (err) return fail(err);
				
				this.timestamp = now;
				this.list = JSON.parse(txt);
				ok(this.list);
			});
		}
		else {
			ok(this.list);
		}
	});
}

module.exports = List;