// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/access/Ownable.sol";
import "../interfaces/IBridgeNFT.sol";

contract Bridge {
    IBridgeNFT public bridgeNFT;

    event NFTIncoming(address owner, uint256 originalChainId, address contractAddress, uint256 id, uint256 indexed newId);
    event NFTOutgoing(uint256 indexed id);

    constructor(address _bridgeNFT)  {
        bridgeNFT = IBridgeNFT(_bridgeNFT);
    }

    function nftIn(address _owner, uint256 _originalChainId, address _contractAddress,  uint256 _id, string memory _uri ) external returns(uint256) {
        uint256 nftId = uint256(keccak256(abi.encodePacked(_originalChainId, _contractAddress, _id)));
        if (bridgeNFT.tokenExists(nftId)){
            // check ownership of the NFT
            require(bridgeNFT.ownerOf(nftId)==address(this), "NFT not owned by bridge contract");
            // transfer the NFT
            bridgeNFT.transferFrom(address(this), _owner, nftId);
        }else{
            // mint the NFT
            bridgeNFT.safeMint(_owner, nftId, _originalChainId, _contractAddress, _id, _uri);
        }
        return nftId;
    }

    function nftOut(uint256 _nftId) external returns (uint256){
        bridgeNFT.transferFrom(msg.sender, address(this), _nftId);
        emit NFTOutgoing(_nftId);
        return _nftId;
    }

}