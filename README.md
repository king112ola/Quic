# Quic!

### The centralized AI platform with decentralization

## Description

Quic is a platform that connects various publicly available large-scale AI engines into one single platform that mainly runs on the blockchain. The platform is able to take in various user prompts, serve them to various AIs decided by the user or by an automatic AI prompt-routing algorithm, and then return the results back to the user in the application platform in a decentralized way. 

## Task list

 - [ ] A better `README.md`

## Set-up

### Common

* For all the `.env.example`, rename it to `.env` and fill in the corresponding API keys & credentials.
* For the Front-End, Back-End, Moralis-Server-Self-Host Project, Run the command: `npm install` to download the dependencies.

### Front-end Directory

* Run local development server using: `npm run dev`
* Create a production build of the Front-End: `npm run build`

### Back-end Directory

* Run local backend development server using: `node server.js`

### Moralis-Server-Self-Host Directory:
* Start the Moralis Self Host Parse Server with the command: `npm run dev`
* Monitor the MongoDB with the parse-dashboard using the command: `npm run dashboard`

### Web3.0 Directory:
Contains the logic for designing the smart contract including upload IPFS contents to the smart contract and the (pick one: Quic Exchange, Pooling Exchange, Bidding Controller)

## Frameworks used

### Front-end
* React.js
* Redux
* Vue.js
* Material UI
* Moralis SDK

### Back-end
* Express@4.18.2
* walletconnect/web3-provider@1.8.0
* moralis@2.23.1

### Moralis Server Self-hosting
* Moralis Authentication
* Parse Dashboard
* Redis Connection
* MongoDB CRUD

## Contact us!

If you have any questions, feel free to open an issue to reach out. More contact details of other platforms will be filled in later. 
