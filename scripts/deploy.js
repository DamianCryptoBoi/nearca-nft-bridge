const { ethers } = require("hardhat");

async function main() {
    const [owner] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", owner.address);

    const NFT = await ethers.getContractFactory("BridgeNFT");
    const nft = await NFT.deploy(owner.address);

    console.log("NFT deployed to:", nft.target);

    const Bridge = await ethers.getContractFactory("Bridge");
    const bridge = await Bridge.deploy(nft.target);

    console.log("Bridge deployed to:", bridge.target);

    console.log("Transferring ownership of NFT to Bridge...");
    await nft.transferOwnership(bridge.target);
    console.log("Done");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
