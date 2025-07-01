// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Crowdfunding} from "./Crowdfunding.sol";

contract CrowdfundingFactory {
    address public owner;
    bool public paused;

    struct Campaign {
        address campaignAddress;
        address owner;
        string name;
        uint256 CreationTime;
    }

    Campaign[] public campaigns;
    mapping (address => Campaign[]) public userCampaign;

    modifier onlyOwner(){
        require(msg.sender == owner,"not you");
        _;
    }

    modifier notPaused() {
        require(!paused, "factory is paused");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createCampaign(
        string memory _name,
        string memory _description,
        uint256 _goal,
        uint256 _durationInDays
    ) external notPaused {
        Crowdfunding newCampaiagn = new Crowdfunding (
            msg.sender,
            _name,
            _description,
            _goal,
            _durationInDays
        );
        address campaignAddress = address(newCampaiagn);

        Campaign memory campaign = Campaign({
            campaignAddress: campaignAddress,
            owner: msg.sender,
            name :_name,
            CreationTime: block.timestamp
        });

        campaigns.push(campaign);
        userCampaign[msg.sender].push(campaign);
    }

     function getUserCampaigns(address _user) external view returns (Campaign[] memory) {
        return userCampaign[_user];
    }

    function getAllCampaigns() external view returns (Campaign[] memory) {
        return campaigns;
    }

    function togglePause() external onlyOwner {
        paused = !paused;
    }
    
}