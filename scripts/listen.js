const { ethers } = require('hardhat')
const fs = require('fs')
const endpointABI = require('../artifacts/contracts/Endpoint.sol/Endpoint.json').abi
const contracts = require('../contracts.json')

const main = async () => {
    const provider_chain_A = new ethers.JsonRpcProvider('http://127.0.0.1:8545')
    const provider_chain_B = new ethers.JsonRpcProvider('http://127.0.0.1:8546')
    const signer_chain_B = new ethers.Wallet(
        'ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
        provider_chain_B)
    const signer_chain_A = new ethers.Wallet(
        'ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
        provider_chain_A)

    const endPointChainA = await ethers.getContractAt('Endpoint', contracts.chainA, signer_chain_A)
    const endPointChainB = await ethers.getContractAt('Endpoint', contracts.chainB, signer_chain_B)

    //message detected on chain A
    endPointChainA.on('MessageSent', async (sender, target, data, value) => {
        console.log("Received message on chain B....")
        console.log("Sender: ", sender);
        console.log("Target: ", target);
        console.log("Call data: ", data);
        console.log("Value: ", ethers.formatEther(value));
        const tx = await endPointChainB.receiveMessage(sender, target, data, { value: value });
        console.log("Recipient: ", await tx.wait(1));
        console.log("-----------------------------------------------------------")
    })

    //message detected on chain B
    endPointChainB.on('MessageSent', async (sender, target, data, value) => {
        console.log("Received message on chain A....")
        console.log("Sender: ", sender);
        console.log("Target: ", target);
        console.log("Call data: ", data);
        console.log("Value: ", ethers.formatEther(value));
        const tx = await endPointChainA.receiveMessage(sender, target, data, { value: value });
        console.log("Recipient: ", await tx.wait(1));
        console.log("-----------------------------------------------------------")
    })
}

main().then(r => {
    console.log("success!");
}).catch(e => {
    console.log("something went wrong!")
})