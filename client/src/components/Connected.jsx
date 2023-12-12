import React from 'react'
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const Connected = (props) => {


  return (
    <div className="connected-container">
      <h1 className="connected-header">You are Connected to Metamask</h1>
      <p className="connected-account">Metamask Account: {props.account}</p>

      {/* <p className="connected-account">Remaining Time: {props.remainingTime}</p>
      { props.showButton ? (
          <p className="connected-account">You have already voted</p>
      ) : (
          <div>
              <input type="number" placeholder="Enter Candidate Index" value={props.number} onChange={props.handleNumberChange}></input>
      <br />
      <button className="login-button" onClick={props.voteFunction}>Vote</button>

          </div>
      )}
      
      <table id="myTable" className="candidates-table">
          <thead>
          <tr>
              <th>Index</th>
              <th>Candidate name</th>
              <th>Candidate votes</th>
          </tr>
          </thead>
          <tbody>
          {props.candidates.map((candidate, index) => (
              <tr key={index}>
              <td>{candidate.index}</td>
              <td>{candidate.name}</td>
              <td>{candidate.voteCount}</td>
              </tr>
          ))}
          </tbody>
      </table>
      <div>
        <input type="text" placeholder="Add new election" value={props.newElection} onChange={props.handleNewElection}></input>
      </div>

      <div>
        <input type="text" placeholder="Add new candidate" value={props.name} onChange={props.handleNewCandidate}></input>
        <input type="text" placeholder="Add new election" value={props.newElectionDuration} onChange={props.handleNewElectionDuration}></input>
      </div>

      <div>
        <input type="number" placeholder="Add new candidate" value={props.name} onChange={props.handleAddCandidate}></input>
      </div> */}
  </div>
  )
}

export default Connected