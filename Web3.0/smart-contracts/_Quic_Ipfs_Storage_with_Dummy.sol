/**
 *Submitted for verification at Etherscan.io on 2023-03-22
*/

/**
 *Submitted for verification at Etherscan.io on 2023-02-27
 */

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract _Quic_Ipfs_Storage {
    address public masterOwner;
    uint256 public deployDate;

    // structure of how hash realted information are stored for each address.
    struct currentIpfsHash {
        mapping(string => string) promptOfIpfsHash;
        mapping(string => int256) ipfsHashIndex;
        string[] ipfsHash;
        uint256 numOfHashs;
    }

    // structure of the premium user for Quic
    struct premiumUserInfo {
        bool isPremiumUser;
        uint256 expireDate;
    }

    // structure of the ipfs pool
    struct ipfsHashPoolStruct {
        address ipfsHashHolder;
        uint256 biddingPriceInWei;
        address currentBidder;
    }

    mapping(address => currentIpfsHash) public ipfsHash_Holder;
    mapping(address => premiumUserInfo) public premium_Users;
    mapping(string => ipfsHashPoolStruct) public ipfsHash_Pool;

    string[] public ipfsHash_Pool_List;
    string[] public ipfsHashPrompt_Pool_List;
    uint256 public numOfHashsInPool;

    constructor() {
        deployDate = block.timestamp;
        masterOwner = msg.sender;

        // demo data init 
        // images
        initCons("https://ipfs.moralis.io:2053/ipfs/QmQeEy3nVbxKBLtBWpc5AqikTupjfxKSfhXRDdRQMBtCAh/DALLE2-39.jpg","ethereal Bohemian Waxwing bird, Bombycilla garrulus :: intricate details, ornate, detailed illustration, octane render :: Johanna Rupprecht style, William Morris style :: trending on artstation --ar 9:16");
        initCons("https://ipfs.moralis.io:2053/ipfs/QmYuEE5KQUrTfHVRvwsmMMLuZXx1vLj5hS7ttwfVkSXxB7/DALLE2-42.jpg","aerial view of a giant fish tank shaped like a tower in the middle of new york city, 8k octane render, photorealistic --ar 9:20");
        initCons("https://ipfs.moralis.io:2053/ipfs/QmQBECEaVEt7CZtjdZ1DppqBVjhN7h1RBvE9oNkRw2dvPa/DALLE2-46.jpg","Beautiful kingfisher catching a fish, cinematic lighting --beta --ar 2:3 --upbeta");
        initCons("https://ipfs.moralis.io:2053/ipfs/QmaVw5eqs3U3pA8tVZPQ7Zjib5TcbAvTdodhMdKVYb91dz/DALLE2-60.jpg","a jewelry design,sakura-themed ring, gemstones and diamonds,luxury, closeup, product view,trending on artstation, cgsociety,ultra quality,digital art, exquisite hyper details,4k,Soft illumination, dreamy,fashion, rendering by unreal engine");
        initCons("https://ipfs.moralis.io:2053/ipfs/QmUaYr4FAYJViV4yGQr6wTci1HehdHTNDJr3u9Mrjkcnq3/DALLE2-64.jpg","A real photographic landscape painting with incomparable reality,Super wide,Ominous sky,Sailing boat,Wooden boat,Lotus,Huge waves,Starry night,Harry potter,Volumetric lighting,Clearing,Realistic,James gurney,artstation --ar 9:16||");
        initCons("https://ipfs.moralis.io:2053/ipfs/QmU4u5bTQFPJ71FWoSqS2szd3VHHYJKeH9VAUS53dEh3H5/DALLE2-237.jpg","orange looking like water-universe-Earth in the background is a dusty wooden desk, room interior, realistic, abstract art, cinematic bright lighting, colorful, foggy, smokes --ar 16:9");
        initCons("https://ipfs.moralis.io:2053/ipfs/QmfH7zsUAyLiwLzWrc5CVugogQVZaMa34gGZFQVQj2s1vN/DALLE2-238.jpg","Synthwave halloween formula 1 car racing on a night road in Singapore");

        // music
        initCons("https://ipfs.moralis.io:2053/ipfs/QmPQngaimFrNtG74ZRhpGuPpjnEjn9Rc1uqJMemRVVVc8w/message-27.RIFFUSION.mp3","Relaxing music should include slow tempo, gentle melodies, soft dynamics, calming sounds, and minimal dissonance to promote relaxation and tranquility.");
        initCons("https://ipfs.moralis.io:2053/ipfs/QmdrA6JksT7jncn5c9ArE9funLMnQX27gkRHkEbxTYcE78/message-42.RIFFUSION.mp3","R&B Chilling relax");
        initCons("https://ipfs.moralis.io:2053/ipfs/QmVdoSKtAxNXGKiQADkps5YTKMieZhAbTW7Dz7cHd375g1/message-46.RIFFUSION.mp3","- Ambient - Chillout - Meditation - Yoga - Spa - Calm - Peaceful - Soothing - Tranquil - Serene - New Age - Nature Sounds - Instrumental - Sleep - Relaxation - Mindfulness - Healing - Zen - Melodic - Therapeutic - Stress Relief - Deep Sleep");
        initCons("https://ipfs.moralis.io:2053/ipfs/QmUtMxoFkEQFLyj7tZTRztqz3wyEPh9uNTbTgEbBVdR7Ep/message-48.RIFFUSION.mp3","one piece fun chill light delightful");

    }

    // init for Premium User
    function startPremiumTier() public payable minimumRequestFee {
        premium_Users[msg.sender].isPremiumUser = true;
        premium_Users[msg.sender].expireDate = block.timestamp + 365 days;
    }

    // Start a whole new transaction for an addrees that allows it to store a new Hash value.
    function createIpfsHashOwner(string memory newHash, string memory prompt)
        public
        payable
        minimumRequestFee
    {
        // holder section
        ipfsHash_Holder[msg.sender].numOfHashs += 1; // counting the number of hash an address contain.
        ipfsHash_Holder[msg.sender].ipfsHash.push(newHash); // adding newhas to the user stack
        ipfsHash_Holder[msg.sender].promptOfIpfsHash[newHash] = prompt;
        ipfsHash_Holder[msg.sender].ipfsHashIndex[newHash] = int256(
            ipfsHash_Holder[msg.sender].numOfHashs
        ); // tracking the index of the IPFS Hash in that address

        // pool section
        numOfHashsInPool += 1; // adding a IPFS to the pool
        ipfsHash_Pool_List.push(newHash);
        ipfsHashPrompt_Pool_List.push(prompt);
        ipfsHash_Pool[newHash].ipfsHashHolder = msg.sender; // associate user address with the IPFS hash
        ipfsHash_Pool[newHash].biddingPriceInWei = msg.value;
    }

    function fetchipfsHashIndex(string memory hash)
        public
        view
        returns (int256)
    {
        return ipfsHash_Holder[msg.sender].ipfsHashIndex[hash];
    }

    // update bidding price for an IPFS Hash
    function changeBiddingPrice(string memory IPFSHash)
        public
        payable
        minimumRequestFee
    {
        require(
            msg.value > ipfsHash_Pool[IPFSHash].biddingPriceInWei &&
                ipfsHash_Pool[IPFSHash].ipfsHashHolder != msg.sender
        );
        ipfsHash_Pool[IPFSHash].biddingPriceInWei = msg.value;
        ipfsHash_Pool[IPFSHash].currentBidder = msg.sender;
    }

    // accept bidding price offer from another user
    function acceptBiddingPrice(string memory IPFSHash)
        public
        payable
        minimumRequestFee
    {
        require(
            ipfsHash_Pool[IPFSHash].ipfsHashHolder == msg.sender &&
                ipfsHash_Pool[IPFSHash].currentBidder != address(0)
        );

        // change the ipfs hash from the pool and from the ipfsHash_Holder mapping

        // adding the IPFS for the bidder
        createIpfsHashOwnerPrivately(
            IPFSHash,
            ipfsHash_Holder[msg.sender].promptOfIpfsHash[IPFSHash],
            ipfsHash_Pool[IPFSHash].currentBidder
        );

        removeIpfsHashFromAddress(IPFSHash);

        // payment by the contract from the bidder given already
        payable(msg.sender).transfer(
            ipfsHash_Pool[IPFSHash].biddingPriceInWei
        );

        // final state of removing the ipfs hash from the original user
        ipfsHash_Pool[IPFSHash].ipfsHashHolder = ipfsHash_Pool[IPFSHash]
            .currentBidder;
        ipfsHash_Pool[IPFSHash].biddingPriceInWei = 10000000000000000;
        ipfsHash_Pool[IPFSHash].currentBidder = address(0);
    }

    // get the hash and prompt from an address by an index.
    function fetchHashAndPromptFromAddress(string memory index)
        public
        view
        returns (string memory, string memory)
    {
        currentIpfsHash storage sender = ipfsHash_Holder[msg.sender];
        string memory hashValue = sender.ipfsHash[strToUint(index)];
        string memory prompt = sender.promptOfIpfsHash[hashValue];

        return (hashValue, prompt);
    }

    // get the hash from an address by an index.
    function fetchHashFromAddress(string memory index)
        public
        view
        returns (string memory)
    {
        return ipfsHash_Holder[msg.sender].ipfsHash[strToUint(index)];
    }

    // give back the amount of hashes stored in an account.
    function fetchAmountOfHashsFromAddress() public view returns (uint256) {
        return ipfsHash_Holder[msg.sender].numOfHashs;
    }

    // give back the amount of hashes stored in the pool.
    function fetchAmountOfHashsFromPool() public view returns (uint256) {
        return numOfHashsInPool;
    }

    // give back to contract master, for testing only
    function gatherEthBackFromdevEnv() public payable {
        payable(masterOwner).transfer(address(this).balance);
    }

    // function changeHashOwner(string memory newHash) public{
    //   require(ipfsHash_Holder[msg.sender]==)

    // }

    // helper functions
    function removeIpfsHashFromAddress(string memory hash) private {
        require(ipfsHash_Holder[msg.sender].ipfsHashIndex[hash] >= 1);

        uint256 index = uint256(
            ipfsHash_Holder[msg.sender].ipfsHashIndex[hash]
        ) - 1; // due to its start from 1, not 0, to prevent non exist IPFS Hash

        delete ipfsHash_Holder[msg.sender].ipfsHashIndex[hash];

        if (index >= ipfsHash_Holder[msg.sender].ipfsHash.length) return;

        for (
            uint256 i = index;
            i < ipfsHash_Holder[msg.sender].ipfsHash.length - 1;
            i++
        ) {
            ipfsHash_Holder[msg.sender].ipfsHash[i] = ipfsHash_Holder[
                msg.sender
            ].ipfsHash[i + 1];

            ipfsHash_Holder[msg.sender].ipfsHashIndex[
                ipfsHash_Holder[msg.sender].ipfsHash[i + 1]
            ] = int256(i) + 1; // + 1 due to the ipfsHashIndex starts from 1, we have to add the 1 back as deleted above in the index, if ipfsHashIndex starts from 0, any other attemp can be 0 even the IPFS Hash not exist
        }

        delete ipfsHash_Holder[msg.sender].promptOfIpfsHash[hash];

        ipfsHash_Holder[msg.sender].ipfsHash.pop();
        ipfsHash_Holder[msg.sender].numOfHashs -= 1;
    }

    // create IPFS Hash Owner Internally/ privately
    function createIpfsHashOwnerPrivately(
        string memory newHash,
        string memory prompt,
        address newOwner
    ) private {
        // holder section
        ipfsHash_Holder[newOwner].numOfHashs += 1; // counting the number of hash an address contain.
        ipfsHash_Holder[newOwner].ipfsHash.push(newHash); // adding newhas to the user stack
        ipfsHash_Holder[newOwner].promptOfIpfsHash[newHash] = prompt;
        ipfsHash_Holder[newOwner].ipfsHashIndex[newHash] = int256(
            ipfsHash_Holder[newOwner].numOfHashs
        ); // tracking the index of the IPFS Hash in that address
    }

    // modifier for fee
    modifier minimumRequestFee() {
        require(msg.value >= .01 ether);
        _;
    }

    // demo dummy data function , will be deleted
     // Start a whole new transaction for an addrees that allows it to store a new Hash value.
    function initCons(string memory newHash, string memory prompt)
        private
    {
        // holder section
        ipfsHash_Holder[msg.sender].numOfHashs += 1; // counting the number of hash an address contain.
        ipfsHash_Holder[msg.sender].ipfsHash.push(newHash); // adding newhas to the user stack
        ipfsHash_Holder[msg.sender].promptOfIpfsHash[newHash] = prompt;
        ipfsHash_Holder[msg.sender].ipfsHashIndex[newHash] = int256(
            ipfsHash_Holder[msg.sender].numOfHashs
        ); // tracking the index of the IPFS Hash in that address

        // pool section
        numOfHashsInPool += 1; // adding a IPFS to the pool
        ipfsHash_Pool_List.push(newHash);
        ipfsHashPrompt_Pool_List.push(prompt);
        ipfsHash_Pool[newHash].ipfsHashHolder = msg.sender; // associate user address with the IPFS hash
        ipfsHash_Pool[newHash].biddingPriceInWei = msg.value;
    }
}

// Pure Functions, e.g. conversions
function strToUint(string memory _str) pure returns (uint256 res) {
    for (uint256 i = 0; i < bytes(_str).length; i++) {
        if (
            (uint8(bytes(_str)[i]) - 48) < 0 || (uint8(bytes(_str)[i]) - 48) > 9
        ) {
            return (0);
        }
        res += (uint8(bytes(_str)[i]) - 48) * 10**(bytes(_str).length - i - 1);
    }

    return (res);
}