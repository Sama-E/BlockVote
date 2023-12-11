// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.2;

contract Voting{

  // Structure: Candidate
  struct Candidate {
      uint256 id;
      string name;
      uint256 numberOfVotes;
  }


  // List of Candidates
  Candidate[] public candidates;
  //Owner's address
  address public owner;

  // Map all voter's address - verify voting status
  mapping(address => bool) public voters;

  // List of voters
  address[] public listOfVoters;

  // Create voting start and end session
  uint256 public votingStart;
  uint256 public votingEnd;

  // Election status
  bool public electionStarted;

  //Restrict others from creating election - only owner
  modifier onlyOwner() {
    require(msg.sender == owner, "You are not authorized to start an election");
    _;
  }

  // Check if an election is ongoing
  modifier electionOngoing() {
    require(electionStarted, "No election yet");
    _;
  }

  // Contructor - whoever deploys contract is owner
  constructor() {
    owner = msg.sender;
  }

  // Start an Election
  function startElection(string[] memory _candidates, uint256 _votingDuration ) public onlyOwner {

    require(electionStarted == false, "Election is currently ongoing");
    delete candidates;
    // resetAllVotersStatus();

    for(uint256 i = 0; i < _candidates.length; i++){
      candidates.push(
        Candidate({
          id: i,
          name: _candidates[i],
          numberOfVotes: 0
        })
      );
    }

    electionStarted = true;
    votingStart = block.timestamp;
    votingEnd = block.timestamp + (_votingDuration * 1 minutes);
  }

  // Add new Candidate
  function addCandidate(string memory _name) public onlyOwner electionOngoing {
    require(checkElectionPeriod(), "Election period has ended.");
    candidates.push(
      Candidate({
        id: candidates.length,
        name: _name,
        numberOfVotes: 0
      })
    );
  }

  // Check voter's status
  function voterStatus(address _voter) public view electionOngoing returns (bool){
      if(voters[_voter] == true){
        return true;
      }

      return false;
  }

  // To vote
  function toVote(uint256 _id) public electionOngoing {
    require(checkElectionPeriod(), "Election period has ended.");
    require(!voterStatus(msg.sender), "You already voted. You can only vote once.");

    candidates[_id].numberOfVotes++;
    voters[msg.sender] = true;
    listOfVoters.push(msg.sender);
  }

  // Get number of votes
  function retreiveVotes() public view returns(Candidate[] memory){

    return candidates;
  }

  // Election timer
  function electionTimer() public view electionOngoing returns (uint256) {
    if(block.timestamp >= votingEnd){
      return 0;
    }

    return (votingEnd - block.timestamp);
  }

  // Check election period
  function checkElectionPeriod() public returns (bool) {
    if(electionTimer() > 0){
      return true;
    }
    electionStarted = false;

    return false;
  }

  // Reset all voters status
  function resetAllVotersStatus() public onlyOwner {
    for(uint256 i = 0; i < listOfVoters.length; i ++){
      voters[listOfVoters[i]] = false;
    }

    delete listOfVoters;
  }

}