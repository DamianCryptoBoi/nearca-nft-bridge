// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BridgeNFT is ERC721, Ownable {

    struct NFTData {
        uint256 originalChainId;
        address contractAddress;
        uint256 id;
        string uri;
    }

    mapping (uint256 => NFTData) public nftData;


    constructor(address initialOwner)
        ERC721("BridgeNFT", "BNFT")
        Ownable(initialOwner)
    {}

    function safeMint(
        address to,
        uint256 tokenId,
        uint256 originalChainId,
        address contractAddress,
        uint256 id,
        string memory uri) public onlyOwner
    {
        nftData[tokenId] = NFTData(originalChainId, contractAddress, id, uri);
        _safeMint(to, tokenId);
    }

    function tokenURI(uint256 tokenId) override public view returns (string memory) {
        return nftData[tokenId].uri;
    }

    function tokenExists(uint256 tokenId) external view returns (bool) {
        return _ownerOf(tokenId) != address(0);
    }
}