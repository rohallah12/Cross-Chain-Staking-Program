// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import {IMessageReceiver} from "./interfaces/IMessageReceiver.sol";

contract Endpoint {
    bool locked;
    address public immutable protocol;

    constructor(address _protocol) {
        protocol = _protocol;
    }

    modifier Locked() {
        require(!locked);
        locked = true;
        _;
        locked = false;
    }

    event MessageSent(
        address _sender,
        address indexed _target,
        bytes _call_data,
        uint _value
    );

    function sendMessage(
        address _target,
        bytes memory _call_data
    ) public payable Locked {
        //Send ETH to protocol
        (bool success, ) = protocol.call{value: msg.value}("");
        require(success, "Sending ETH to protocol faild");
        emit MessageSent(msg.sender, _target, _call_data, msg.value);
    }

    function receiveMessage(
        address _sender,
        address _target,
        bytes memory _call_data
    ) public payable Locked {
        require(msg.sender == protocol);
        IMessageReceiver(_target).onReceiveMessage{value: msg.value}(
            _sender,
            _call_data,
            msg.value
        );
    }
}
