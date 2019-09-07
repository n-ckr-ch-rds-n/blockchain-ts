# BS

This is a CLI tool written in TypeScript for making and validating blockchains.

To get started, download the repo and install it globally: `npm install -g`.
You will also need to have ts-node installed: `npm install ts-node -g`

## Using BS

Once installed you can create a blockchain with a genesis block: `bs --init [filename]`
This will write a blockchain as a json file with the given filename to your cwd.
You can also set the difficulty level for the chain on initialisation with the `-d` flag and a number argument. 
This determines how difficult it is to mine each block, e.g. `bs --init foobar -d 3` will initialise a blockchain with a difficulty level of 3 in a file called `foobar.json`.

To add a block to a blockchain, use: `bs --add [data string] --filename [filename]`.
This will mine a block with the data contained in the data string and add it to the blockchain with the given filename.

To validate the blockchain, use: `bs --validate --filename [filename]`.

## Tests
Tests are written with mocha and chai. To run them, make sure you've installed the project's dependencies with `npm install`, then run `npm test`.

## Coda
This is a bit of a weird project without many obvious practical applications. I mostly made it to teach myself about blockchains and CLI tools. 
I guess it could be useful if you wanted to have a secret diary or something on your computer and be able to check if anyone had meddled with it, idk.