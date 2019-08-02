pragma solidity ^0.5.10;

contract Lottery {
    address private manager;
    address payable[] private players;

    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }

    function getManager() public view returns (address) {
        return manager;
    }

    constructor() public {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > .01 ether);
        players.push(msg.sender);
    }

    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, now, players)));
    }

    function draw() public restricted {
        uint index = random() % players.length;
        players[index].transfer(address(this).balance);
        players = new address payable[](0);
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
}
