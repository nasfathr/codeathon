const express = require('express');
const blacklist = require('./lib/blacklist');
const suspectlist = require('./lib/suspectlist');
const whitelist = require('./lib/whitelist');

const app = express();

app.get('/api/ethereum/check/:hash', (req, res) => {
	var address = request.params.hash;
	
	whitelist.check(address).then(status => {
		if (status) {
			res.json({good: true, bad: false, blocked: false, suspect: false, whitelist: true});
		}
		else {
			blacklist.check(address).then(status => {
				if (status) {
					res.json({good: false, bad: true, blocked: true, suspect: false});
				}
				else {
					suspectlist.check(address).then(status => {
						if (status) {
							res.json({good: false, bad: true, blocked: false, suspect: true});
						}
						else {
							res.json({good: true, bad: false, blocked: false, suspect: false});
						}
					});
				}
			});
		}
	});
});

app.get('/api/ethereum/trust/:hash', (req, res) => {
	var address = request.params.hash;
	
	suspectlist.check(address).then(status => {
		if (status) {
			suspectlist.upvote(address);
			res.json({status: 'OK'});
		}
	});
});

app.listen(3333, () => console.log('Example app listening on port 3333!'));
