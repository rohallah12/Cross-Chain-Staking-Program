const { ethers } = require('hardhat')
const fs = require('fs')
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

    const endPointChainB = await ethers.getContractAt('Endpoint', contracts.chainB, signer_chain_B)
    const stakingChainA = await ethers.getContractAt('StakingExample', contracts.stakingA, signer_chain_A)

    const stakerAddress = signer_chain_A.address;

    console.log("Staking on chain A from chain B...")
    const tx = await endPointChainB.sendMessage(contracts.stakingA, "0x", { value: ethers.parseEther("1") });
    await tx.wait(1)
    console.log("Staking Balance on chainA", ethers.formatEther(await stakingChainA.balances(stakerAddress)))
    console.log("---------------------")
}

main().then(r => {
    console.log("success!");
}).catch(e => {
    console.log("something went wrong!")
})