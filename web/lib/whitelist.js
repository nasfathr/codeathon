var List = require('./loadlist');

var list = new List('../whitelist.json');

function check (address) {
	return list.get().then(l => {
		return l.filter(x => x==address).length != 0;
	});
}

module.exports = {
	check: check
}
