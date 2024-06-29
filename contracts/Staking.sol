// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {IMessageReceiver} from "./interfaces/IMessageReceiver.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract StakingExample is IMessageReceiver {
    address public immutable endpoint;
    mapping(address => uint) public balances;

    modifier onlyEndpoint() {
        require(msg.sender == endpoint, "Only endpoint can call this!");
        _;
    }

    constructor(address _endpoint) {
        endpoint = _endpoint;
    }

    function onReceiveMessage(
        address _sender,
        bytes memory,
        uint _value
    ) public payable onlyEndpoint {
        require(msg.value == _value, "Value mismatch");
        _stake(_sender, _value);
    }

    function withdraw(uint _value) public {
        _withdraw(msg.sender, _value);
        (bool success, ) = msg.sender.call{value: _value}("");
        require(success, "Sending ETH faild");
    }

    function _stake(address _staker, uint _value) internal {
        balances[_staker] += _value;
    }

    function _withdraw(address _staker, uint _value) internal {
        balances[_staker] -= _value;
    }
}
