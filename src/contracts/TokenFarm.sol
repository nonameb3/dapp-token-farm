pragma solidity >=0.4.21 <0.6.0;

import "./DaiToken";
import "./DappToken";

contract TokenFarm {
    string public name = "Token Farm";
    DiaToken public diaToken;
    DappToken public dappToken;

    constructor(DiaToken _diaToken, DappToken _dappToken) public {
        diaToken = _diaToken;
        dappToken = _dappToken;
    }
}
