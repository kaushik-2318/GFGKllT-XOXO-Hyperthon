// Import necessary React components
import React, { useState } from 'react';
import './CandidateHomepage.css'; // Include styles here

// Sample party data
const parties = [
  { id: 1, name: 'Party A' },
  { id: 2, name: 'Party B' },
  { id: 3, name: 'Party C' },
  { id: 4, name: 'Party D' },
  { id: 5, name: 'Party E' },
  { id: 6, name: 'Party D' },
];

function CandidateHomepage() {
  const [selectedParty, setSelectedParty] = useState(null);
  const [voteCasted, setVoteCasted] = useState(false);

  // Handle vote submission
  const handleVote = () => {
    if (selectedParty) {
      setVoteCasted(true);
      alert('You have successfully voted for ${ selectedParty.name }');
    } else {
      alert('Please select a party before casting your vote.');
    }
  };

  return (
    <>
      <div className="homepage">
        <header className="header">
          <h1>E-Voting System</h1>
          <p>Welcome to the Candidate Voting Page</p>
        </header>

        <main className="main-content">
          {!voteCasted ? (
            <>
              <h2>Select a Party to Vote</h2>
              <ul className="party-list">
                {parties.map((party) => (
                  <li
                    key={party.id}
                    className={`party - item ${selectedParty?.id === party.id ? 'selected' : ''}`}
                onClick={() => setSelectedParty(party)}
                >
                <div className="party-info">
                  <span className="party-name-card">{party.name}</span>
                </div>
              </li>
              ))}
            </ul>
          <button className="vote-button" onClick={handleVote}>
            Cast Your Vote
          </button>
        </>
        ) : (
        <div className="thank-you-message">
          <h2>Thank you for voting!</h2>
          <p>Your vote has been successfully recorded.</p>
        </div>
        )}
      </main>

      <footer className="footer">
        <p>&copy; 2025 E-Voting System. All rights reserved.</p>
      </footer>
    </div >
            </>
  );
}

export default CandidateHomepage;