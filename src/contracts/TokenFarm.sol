pragma solidity >=0.4.21 <0.6.0;

import "./DiaToken.sol";
import "./DappToken.sol";

contract TokenFarm {
    string public name = "Token Farm";
    address public owner;
    DiaToken public diaToken;
    DappToken public dappToken;

    address[] public stakers;
    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public isStaking;
    mapping(address => bool) public hasStaked;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    constructor(DiaToken _diaToken, DappToken _dappToken) public {
        diaToken = _diaToken;
        dappToken = _dappToken;
        owner = msg.sender;
    }

    // stake token
    function stakeToken(uint256 _token) public {
        // transfer dia to this contract
        emit Transfer(msg.sender, address(this), _token);
        diaToken.transferFrom(msg.sender, address(this), _token);

        // update stake
        stakingBalance[msg.sender] += _token;

        // add user to array (onetime)
        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // update status
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }
}
