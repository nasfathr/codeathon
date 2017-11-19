pragma solidity ^0.4.4;

contract Masterlist {
  mapping(address => uint256) public bannedList;
  mapping(address => uint256) public suspectList;
  address public owner;

  modifier restricted() {
    if (msg.sender == owner) _;
  }

  function Masterlist() {
    owner = msg.sender;
  }

  function addToBannedList(address _input) restricted {
    bannedList[_input] = 1;
  }
  
  function addToSuspectList(address _input) restricted {
    suspectList[_input] = 2;
  }
  
  function removeFromBannedList(address _input) restricted {
    bannedList[_input] = 0;
  }
  
  function removeFromSuspectList(address _input) restricted {
    suspectList[_input] = 0;
  }
  
  function checkBanned (address _input) returns (bool){
	if(bannedList[_input] == 1){
		return true;
	}
	return false;
  }
  
   function checkSuspected (address _input) returns (bool){
	if(suspectList[_input] == 2){
		return true;
	}
	return false;
  }
  
}
