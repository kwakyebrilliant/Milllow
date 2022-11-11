// require("@nomicfoundation/hardhat-toolbox");
/* hardhat.config.js */
require("@nomiclabs/hardhat-waffle");
const fs = require("fs");
// const privateKey = fs.readFileSync("secret.txt").toString();
const projectId = "8b7ba5517c414450a93ec7334975a7fe";
const privatekey1 =
  "e5521236a22b16a827161afb56a2fd5fd1c48d0b4dc3dd960a96ec8cdad914cc";
const privatekey2 =
  "de3e7171e0654efd4179bc967277eeff17227b0860a8a4eb139dfc45f9adda3f";
const privatekey3 =
  "0fac9610dc1eac5c9479f01804737b95fb0c7ca0b9ab9c2d92d9ca00c252058b";
const privatekey4 =
  "6b2eea68a372d42f933f6808f01313db0bdde58660284102e1142f88423c3536";
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
    },

    mainet: {
      url: `https://palm-mainnet.infura.io/v3/${projectId}`,
      // accounts: [privateKey],
    },
    matic: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/2bGIFu-iEnl9RvAOTe1ddZI2gBnuYQGS",
      accounts: [privatekey1, privatekey2, privatekey3, privatekey4],
    },
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};