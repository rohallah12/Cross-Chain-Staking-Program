# Simple Cross-Chain Staking Program
- this is a very simplified example of a cross-chain staking program where users are able to stake on chainA/chainB using an Endpoint contract.
- Endpoint contract emits a "MessageSent" which is catched by offchain event listeners
- After catching the event, event listener will initiate a transaction on the other side of the bridge.
- "receiveMessage" function on Endpoint on the other side of the bridge with "MessageSent" event parameters,
- Target contract on the other chain must implement "IMessageReceiver" interface so that it can be called from endpoint.

# How to run?
- Deploy chains:
`sh setup.sh`
this command will run two seperate local chains with chain Ids of 31337 (chainA) and 31336 (chainB)

- Deploy contracts:
`yarn deploy` to deploy endpoint and staking contracts on both chains

- Run event listener:
`yarn listen` to deploy run event listeners

- Stake on chainB from chainA:
`yarn AB`

- Stake on chainA from chainB:
`yarn BA`


# WARNING!
this is a very simplified example of a cross-chain staking program to only show how this programs, writting this program only took me like 45 minutes, its not ready to be used in production!

