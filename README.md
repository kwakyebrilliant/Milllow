<div align="center">
  <a href="https://ipfs.infura.io/ipfs/Qmade64cdA3YaNfThD8Pr5AVedwhxHa213AYbr5J5h7waH">
    <img width="200" src="public/logo.png" alt="logo">
  </a>

  <h3 align="center">Auditra</h3>

  <p align="center">
    Auditing platform with Blockchain!
    <br />
    <a href="https://github.com/kwakyebrilliant/Auditra2/"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://auditra2.vercel.app/">View App</a>
    
  </p>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

<img src="public/Screenshot.png" alt="Logo" width="" >

# What it does
Making use of blockchain technology, we present to you Auditra, an auditing platform that seeks simplify the auditing process with blockchain. By doing so, we offer you an easy way to perform the most challenging and complex audits more efficiently. And what we seek to achieve is to make the auditing processes more transparent to end users.

There are about two (2) user types (that is team and one auditor) that is captured on the platform. Among the two (2) user types, a user can perform an activity on the platform by choosing the user type they represent and then proceed to provide login details. The user is also to ensure that metamask is installed in their browser. Below are steps a user can undertake to perform an activity on the platform:

- Click on connect wallet button in the navbar to load the user type modal.
- Select the user type from the modal to fill login details.
- Fill login details (login details: username: "user" password: "63CkBcD{B)h2>") and then click on submit button for a modal.
- From the modal, click on continue to proceed to user dashboard. If metamask is not connected to the platform, the user will be prompted to connect or install metamask to continue the process.

Holla, you are now ready to use Auditra.

All media that are added as supporting documents in creating and submitting an audit are stored on IPFS.


# Built With
This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.
- [React.js](https://reactjs.org/)
- [React-Bootstrap](https://react-bootstrap.github.io/)
- [Bootstrap](https://getbootstrap.com/)
- [Solidity](https://docs.soliditylang.org/en/v0.8.13/)
- [IPFS](https://ipfs.io/)

# Getting started
The project consist of the backend and also the front end.

### Prerequisites
- nodejs installed
- npm
- Hardhat
 ```
npm install npm@latest -g
npm install -g hardhat
```

### Local setup
To run this project locally, follow these steps.
1. Clone the project locally, change into the directory, and install the dependencies:
```
git clone https://github.com/kwakyebrilliant/Auditra2

cd Auditra2

# install using NPM or Yarn
npm install

# or

yarn
```

2. Start the local Hardhat node

```sh
npx hardhat node
```

3. With the network running, deploy the contracts to the local network in a separate terminal window

```sh
npx hardhat run scripts/deploy.js --network localhost
```

4. Start the app

```
npm run dev
```

### Configuration

The chain ID should be 80001. If you have a localhost rpc set up, you may need to overwrite it.

To deploy to Polygon test or main networks, update the configurations located in **hardhat.config.js** to use a private key and, optionally, deploy to a private RPC like Infura.

```javascript
require('@nomiclabs/hardhat-waffle');
const privateKey = '';

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: 'https://rpc-mumbai.maticvigil.com',
      accounts: [privateKey],
    },
    matic: {
      url: 'https://polygon-mainnet.g.alchemy.com/v2/OPAn_R_vIjcnM9MeCVVuvET9glKc1Y_l',
      accounts: [privateKey],
    },
  },
  solidity: {
    version: '0.8.4',
      paths: {
    artifacts: './src/artifacts',
  },
    settings: {
      optimizer: {
        enabled: true,
        runs: 1,
      },
    },
  },
};
```


If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

# License
Distributed under the MIT License.

# Contact
- Brilliant Kwakye - https://twitter.com/a_moah__
- Mends Albert - https://twitter.com/mendalbert
- Daniel Sarkodie - https://twitter.com/AbrantepaSark
