pragma solidity >=0.4.21 <0.6.0;

import "./DiaToken.sol";
import "./DappToken.sol";

contract TokenFarm {
    string public name = "Token Farm";
    DiaToken public diaToken;
    DappToken public dappToken;

    constructor(DiaToken _diaToken, DappToken _dappToken) public {
        diaToken = _diaToken;
        dappToken = _dappToken;
    }
}
