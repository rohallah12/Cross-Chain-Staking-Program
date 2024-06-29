const { ethers } = require('hardhat')
const fs = require('fs')
const endpointABI = require('../artifacts/contracts/Endpoint.sol/Endpoint.json').abi
let contracts = require('../contracts.json')


const main = async () => {
    const provider_chain_A = new ethers.JsonRpcProvider('http://127.0.0.1:8545')
    const provider_chain_B = new ethers.JsonRpcProvider('http://127.0.0.1:8546')
    const signer_chain_A = new ethers.Wallet('ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80', provider_chain_A)
    const signer_chain_B = new ethers.Wallet('ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80', provider_chain_B)
    const endPointChainAFactory = await ethers.getContractFactory('Endpoint', signer_chain_A)
    const endPointChainBFactory = await ethers.getContractFactory('Endpoint', signer_chain_B)
    const StakingChainAFactory = await ethers.getContractFactory('StakingExample', signer_chain_A)
    const StakingChainBFactory = await ethers.getContractFactory('StakingExample', signer_chain_B)

    //Deploy Endpoints
    const endPointA = await (await endPointChainAFactory.deploy(signer_chain_A.address)).waitForDeployment();
    const endPointB = await (await endPointChainBFactory.deploy(signer_chain_B.address)).waitForDeployment();

    //Deploy Staking
    const stakingA = await (await StakingChainAFactory.deploy(await endPointA.getAddress())).waitForDeployment();
    const stakingB = await (await StakingChainBFactory.deploy(await endPointB.getAddress())).waitForDeployment();

    //Address of chains and staking contracts might be same because nonces are same on both chains
    const newData = `
    {
        "chainA" : "${await endPointA.getAddress()}",
        "chainB" : "${await endPointB.getAddress()}",
        "stakingA" : "${await stakingA.getAddress()}",
        "stakingB" : "${await stakingB.getAddress()}" 
    } 
    `;
    fs.writeFileSync('./contracts.json', newData, 'utf-8')
}

main().then(r => {
    console.log("deploymet success!");
}).catch(e => {
    console.log(e)

})