require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: {
        compilers: [
            {
                version: "0.8.24",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
        ],
    },
    networks: {
        hardhat: {
            chainId: 31337,
        },
        sepolia: {
            url: "https://eth-sepolia.g.alchemy.com/v2/RF2vrEEq0BgZ9u8H1gY2nogOTZnEta23",
            accounts: [process.env.PRIVATE_KEY],
            chainId: 11155111,
            gas: "auto",
        },
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY,
    },
};
