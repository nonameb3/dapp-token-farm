# Dapp Token Farm

## This project used Smart Contact on Ethereum blockchain.

<p align="center">
    <img src="/image/app.png" width="800">
</p>

## :wine_glass: Features
- Simple farm token Decentralized application
  - Stake token
  - Unstake token
  - Receive free token

## :jack_o_lantern: Technology
- Solidity
- Truffle
- Ganache
- React.js
- web3.js

## :grey_question: How to install & start Dapp

- Install Ganache to your machine
- Install MetaMask to your Google Chome
- Clone this repo
- Open terminal in root location and run command to deploy smart contact to local network
  - npm install --g truffle@5.1.39
  - fruffle compile
  - truffle margrate --reset
- Open terminal in root location  and run command to run react app
  - npm install
  - npm start
- Connect metaMask to website
  - open metaMast chenge network to custome.
  - use RPC Server in Ganache in New RPC URL
  - set Chain ID to 1337
  - import account(from second row account not first row account) from Ganache by use PRIVATE KEY from Ganache account
- Congratulations time to use Dapp!!
  - click connect and connect metaMask to Dapp
  - click Stake to Stake DIAToken
  - back to terminal at root folder run command that give free dappToken to account who staked DIAToken in Dapp
    ```
    $truffle console
    $truffle exec scripts/issue-token.js
    ```

## :grey_question: How to Test
```
  $truffle test
```

Folder structure:

```
Token Farm App
├── README.md
├── node_modules
├── package.json
├── .babelrc
├── .gitignore
├── truffle-config << config truffle host
├── migrations 
│   ├─ 1_initial_migration.js
│   └─ 2_deploy_migration.js << config deploy smart contact
├── scripts << truffle exec file folder
│   └─ ...rest
├── test << smart contact test file folder
│   └─ ...rest
├── public 
│   └─ ...rest
└── src
    ├── contracts << smart contact folder
    └─ ...rest
```

## :exclamation: License - [MIT](./LICENSE)
