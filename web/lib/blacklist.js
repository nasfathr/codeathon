var list = require('../blacklist.json');

function check (address) {
	return new Promise((ok,fail) => {
		// We don't have data yet so hardcode to pass for now
		ok(false);
	});
}

module.exports = {
	check: check
}
