const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { parseEther, MaxInt256, utils } = require("ethers");

describe("Bridge", function () {
    async function deployContracts() {
        const [owner] = await ethers.getSigners();

        const NFT = await ethers.getContractFactory("BridgeNFT");
        const nft = await NFT.deploy(owner.address);

        console.log("NFT deployed to:", nft.target);

        const Bridge = await ethers.getContractFactory("Bridge");
        const bridge = await Bridge.deploy(nft.target);

        console.log("Bridge deployed to:", bridge.target);

        await nft.transferOwnership(bridge.target);

        return {
            nft,
            bridge,
        };
    }

    describe("CHECK", function () {
        it("In - Out", async function () {
            const { nft, bridge } = await loadFixture(deployContracts);

            const [owner, address1] = await ethers.getSigners();

            await bridge.nftIn(
                owner.address,
                69420,
                address1.address,
                111,
                "abc"
            );

            const preCalculatedTokenId =
                "59916559349711254540427688632419449106393676799660977753277041997296513310900"; // fixed, based on the input

            await expect(nft.ownerOf(preCalculatedTokenId)).to.eventually.equal(
                owner.address
            );

            const [chainId, contractAddress, id, uri] = await nft.nftData(
                preCalculatedTokenId
            );
            expect(chainId).to.equal(69420);
            expect(contractAddress).to.equal(address1.address);
            expect(id).to.equal(111);
            expect(uri).to.equal("abc");

            // aprove bridge to transfer the token
            await nft.approve(bridge.target, preCalculatedTokenId);

            await bridge.nftOut(preCalculatedTokenId);

            await expect(nft.ownerOf(preCalculatedTokenId)).to.eventually.equal(
                bridge.target
            );
        });
    });
});
