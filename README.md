# Project README 👋
## Getting Started
Follow these instructions to set up and run the project locally.

## Prerequisites
Make sure you have Node.js and npm installed on your machine.

## Installation
### Install Hardhat in the project directory:👷


`npm install hardhat`
### Initialize Hardhat in the project directory using JavaScript:


`npx hardhat init`
After initialization, you'll find a contracts and scripts folder containing a demo contract and a deployment script named deploy.js.

Change the demo contract to ffh.sol and update deploy.js according to your project requirements.

The deployment script contains code to deploy the smart contract ffh.sol to the Sepolia test network.

### Run the deployment script through Hardhat:

`npx hardhat run --network sepolia scripts/deploy.js`
The previous step deploys our smart contract on the Sepolia testnet and returns our contract address and artifacts in client/public/src/contracts.

## Usage
This section describes how to interact with the deployed smart contract.

The contract address and ABI are used to interact with our smart contract.

### Install React.js from Vite: 


`npm install vite@latest`
In App.jsx, write code for connection to MetaMask and create a contract instance to interact with our smart contract.

Different components are created for reading and writing functions of the frontend for the smart contract.

## Running the Application
Run the application through:

`npm run dev`
This command starts the development server and allows you to view the application in your browser.🎉🎉
