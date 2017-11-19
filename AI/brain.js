#! /usr/bin/env node

var Encog = require('encog');
var shuffle = require('shuffle-array');
var fs = require('fs');

var args = process.argv.slice(2);

var dataEncoder = new Encog.Preprocessing.DataEncoder();

if (args.length !== 1) process.exit();

var blackList = JSON.parse(fs.readFileSync(args[0]));

shuffle(blackList);
blackList = Encog.Preprocessing.DataToolbox.trainTestSplit(blackList);

//apply a specific mapping to each column
const mappings = {
	'count': new Encog.Preprocessing.DataMappers.MinMaxScaller(),
	'in.out.ratio': new Encog.Preprocessing.DataMappers.MinMaxScaller(),
	'average.value': new Encog.Preprocessing.DataMappers.MinMaxScaller(),
	'average.in': new Encog.Preprocessing.DataMappers.MinMaxScaller(),
	'average.out': new Encog.Preprocessing.DataMappers.MinMaxScaller(),
	'max.in': new Encog.Preprocessing.DataMappers.MinMaxScaller(),
	'max.out': new Encog.Preprocessing.DataMappers.MinMaxScaller(),
	'daily.out': new Encog.Preprocessing.DataMappers.MinMaxScaller(),
	'daily.in': new Encog.Preprocessing.DataMappers.MinMaxScaller(),
	'count.out': new Encog.Preprocessing.DataMappers.MinMaxScaller(),
	'count.in': new Encog.Preprocessing.DataMappers.MinMaxScaller(),
	'address': new Encog.Preprocessing.DataMappers.OneHot(),
};

//Fit to data, then transform it.
let trainData = dataEncoder.fit_transform(blackList.train, mappings);
//transform the test data based on the train data
let testData = dataEncoder.transform(blackList.test, mappings);

//slice the data in input and output
trainData = Encog.Preprocessing.DataToolbox.sliceOutput(trainData.values, 3);
testData = Encog.Preprocessing.DataToolbox.sliceOutput(testData.values, 3);

// create a neural network
const network = new Encog.Networks.Basic();
network.addLayer(new Encog.Layers.Basic(null, true, 4));
network.addLayer(new Encog.Layers.Basic(new Encog.ActivationFunctions.Sigmoid(), true, 10));
network.addLayer(new Encog.Layers.Basic(new Encog.ActivationFunctions.Sigmoid(), true, 10));
network.addLayer(new Encog.Layers.Basic(new Encog.ActivationFunctions.Sigmoid(), true, 10));
network.addLayer(new Encog.Layers.Basic(new Encog.ActivationFunctions.Sigmoid(), true, 10));
network.addLayer(new Encog.Layers.Basic(new Encog.ActivationFunctions.Sigmoid(), true, 10));
network.addLayer(new Encog.Layers.Basic(new Encog.ActivationFunctions.Sigmoid(), true, 10));
network.addLayer(new Encog.Layers.Basic(new Encog.ActivationFunctions.Sigmoid(), true, 10));
network.addLayer(new Encog.Layers.Basic(new Encog.ActivationFunctions.Sigmoid(), true, 10));
network.addLayer(new Encog.Layers.Basic(new Encog.ActivationFunctions.Sigmoid(), true, 10));
network.addLayer(new Encog.Layers.Basic(new Encog.ActivationFunctions.Sigmoid(), true, 10));
network.addLayer(new Encog.Layers.Basic(new Encog.ActivationFunctions.Sigmoid(), false, 3));
network.randomize();

// train the neural network
const train = new Encog.Training.Propagation.Resilient(network, trainData.input, trainData.output);
Encog.Utils.Network.trainNetwork(train, {minError: 0.01, minIterations: 5});

//validate the neural network
let accuracy = Encog.Utils.Network.validateNetwork(network, testData.input, testData.output);
console.log('Accuracy:', accuracy);

//save the trained network
Encog.Utils.File.saveNetwork(network, 'brain.dat');

