Simple AI Implementation
========================

This is the preliminary implementation for the AI used in detecting suspected
blockchain address based on transaction history.

### Scripts

To train the AI you need transaction history statistics from blacklisted addresses:

    ./train-brain.js blacklist.json
	
This will generate a neural-net configuration data in `brain.dat`

To process the blockchain data and generate the suspect list you need a pre-processed list of
transaction history statistics:

    ./generate-suspect-list.js input.json

