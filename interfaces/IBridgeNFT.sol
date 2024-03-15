// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IBridgeNFT {

    function safeMint(
        address to,
        uint256 tokenId,
        uint256 originalChainId,
        address contractAddress,
        uint256 id,
        string memory uri) external;

    function tokenURI(uint256 tokenId) external view returns (string memory);

    function transferFrom(address from, address to, uint256 tokenId) external;

    function tokenExists(uint256 tokenId) external view returns (bool);

    function ownerOf(uint256 tokenId) external view returns (address);
}
