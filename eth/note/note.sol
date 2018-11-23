pragma solidity ^0.4.25;

contract Note{
    //public : variable and getter function
    string public note;
    
    //constructor
    constructor(string _input) public {
        note = _input;
    }
    
    //abi -> contract - use public 
    function writeNote(string _input) public{
        note = _input;
    }
}