// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

interface IMessageReceiver {
    function onReceiveMessage(
        address _sender,
        bytes memory _data,
        uint _value
    ) external payable;
}
