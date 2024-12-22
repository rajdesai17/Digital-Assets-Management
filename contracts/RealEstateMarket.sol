// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract RealEstateMarket {
    struct Asset {
        uint256 id;
        address owner;
        string title;
        string description;
        string location;
        string ipfsHash;
        uint256 price;
        bool isListed;
    }

    mapping(uint256 => Asset) public assets;
    uint256 public assetCount;
    
    event AssetCreated(uint256 indexed id, address indexed owner, string ipfsHash);
    event AssetListed(uint256 indexed id, uint256 price);
    event AssetSold(uint256 indexed id, address indexed oldOwner, address indexed newOwner, uint256 price);

    constructor() {
        assetCount = 0;
    }

    function createAsset(
        string memory _title,
        string memory _description,
        string memory _location,
        string memory _ipfsHash
    ) public {
        assetCount++;
        assets[assetCount] = Asset(
            assetCount,
            msg.sender,
            _title,
            _description,
            _location,
            _ipfsHash,
            0,
            false
        );
        
        emit AssetCreated(assetCount, msg.sender, _ipfsHash);
    }

    function listAsset(uint256 _id, uint256 _price) public {
        require(assets[_id].owner == msg.sender, "Not the owner");
        require(_price > 0, "Price must be greater than 0");
        assets[_id].price = _price;
        assets[_id].isListed = true;
        
        emit AssetListed(_id, _price);
    }

    function buyAsset(uint256 _id) public payable {
        Asset storage asset = assets[_id];
        require(asset.isListed, "Asset not listed");
        require(msg.value >= asset.price, "Insufficient payment");
        
        address payable seller = payable(asset.owner);
        asset.owner = msg.sender;
        asset.isListed = false;
        
        seller.transfer(msg.value);
        
        emit AssetSold(_id, seller, msg.sender, msg.value);
    }

    function getAsset(uint256 _id) public view returns (Asset memory) {
        return assets[_id];
    }

    function getAssetsByOwner(address _owner) public view returns (uint256[] memory) {
        uint256[] memory ownerAssets = new uint256[](assetCount);
        uint256 currentIndex = 0;
        
        for (uint256 i = 1; i <= assetCount; i++) {
            if (assets[i].owner == _owner) {
                ownerAssets[currentIndex] = i;
                currentIndex++;
            }
        }
        
        return ownerAssets;
    }
} 