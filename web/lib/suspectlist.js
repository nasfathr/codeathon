var List = require('./loadlist');

var list = new List('suspectlist.json');

function check (address) {
	return list.get().then(l => {
		return l.filter(x => x==address).length != 0;
	});
}

function upvote (address) {
	// record the fact that users trust this address
}

module.exports = {
	check: check,
	upvote: upvote
}