pragma solidity >=0.4.21 <0.6.0;

import "./DiaToken.sol";
import "./DappToken.sol";

contract TokenFarm {
    string public name = "Token Farm";
    address public owner;
    DiaToken public diaToken;
    DappToken public dappToken;

    address[] public stakers;
    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public isStaking;
    mapping(address => bool) public hasStaked;

    constructor(DiaToken _diaToken, DappToken _dappToken) public {
        diaToken = _diaToken;
        dappToken = _dappToken;
        owner = msg.sender;
    }

    // stake token
    function stakeTokens(uint _token) public {
        require(_token > 0, '_token must more then zero.');

        // transfer dia to this contract
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

    // unstake token
    function unStakeTokens() public {
        uint balance =  stakingBalance[msg.sender];

        require(balance > 0, 'account is empty balance');

        diaToken.transfer(msg.sender, balance);

        stakingBalance[msg.sender] = 0;
        isStaking[msg.sender] = false;
    }


    // issue Token
    function issueToken() public {
        require(owner == msg.sender, 'must be owner');

        for(uint i=0; i<stakers.length; i++ ) {
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient];

            if(balance > 0) {
                dappToken.transfer(recipient, balance);
            }
        }
    }

}
