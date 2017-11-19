function check (address) {
	return new Promise((ok,fail) => {
		// We don't have data yet so hardcode to pass for now
		ok(false);
	});
}

function upvote (address) {
	// record the fact that users trust this address
}

module.exports = {
	check: check,
	upvote: upvote
}