# ZK Firma Digital Web

This is a minimal project to get react (typescript) and snarkjs up and running. 

To install the necessary packages etc, run `yarn install`. 

The circuit-specific files are provided to the react frontend through express. 

To run the example, start the express server in `file-server` and the react application:
```
# Run fileserver:
cd src/file-server
node index.js

# Start react
yarn start
```

The circuit and related files are located in the folder `src/zkproof`. 


