#! /usr/bin/env node

var Encog = require('encog');
var fs = require('fs');

var args = process.argv.slice(2);

var dataEncoder = new Encog.Preprocessing.DataEncoder();

if (args.length !== 1) process.exit();

var input = JSON.parse(fs.readFileSync(args[0]));

//load a pretrained network
var network = Encog.Utils.File.loadNetwork('brain.dat');

console.log(network.compute(input));
