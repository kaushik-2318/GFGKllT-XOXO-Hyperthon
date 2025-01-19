// Importing required dependencies
import React, { useState, useEffect } from 'react';
import './AdminHomepage.css'; // Import CSS for styling

// Sample AdminHomepage Component
const AdminHomepage = () => {
  // State variables for parties and votes
  const [parties, setParties] = useState([]);
  const [newParty, setNewParty] = useState('');
  const [newLogo, setNewLogo] = useState(null);

  // Function to fetch initial data (simulate backend call)
  useEffect(() => {
    // Example of fetching initial data from backend
    const fetchData = async () => {
      const mockData = [
        { id: 1, name: 'Party A', votes: 120, logo: null },
        { id: 2, name: 'Party B', votes: 95, logo: null },
      ];
      setParties(mockData);
    };

    fetchData();
  }, []);

  // Function to add a new party
  const handleAddParty = () => {
    if (newParty.trim() === '') {
      alert('Party name cannot be empty.');
      return;
    }

    const newPartyData = {
      id: parties.length + 1,
      name: newParty,
      votes: 0,
      logo: newLogo ? URL.createObjectURL(newLogo) : null,
    };

    setParties([...parties, newPartyData]);
    setNewParty('');
    setNewLogo(null);
  };

  // Function to delete a party
  const handleDeleteParty = (id) => {
    const updatedParties = parties.filter((party) => party.id !== id);
    setParties(updatedParties);
  };

  // Calculate total votes
  const totalVotes = parties.reduce((total, party) => total + party.votes, 0);

  return (
    <div className="admin-homepage">
      <h1>Admin Homepage - E-Voting System</h1>

      <div className="add-party-section">
        <h2>Add a New Party</h2>
        <input
          type="text"
          placeholder="Enter party name"
          value={newParty}
          onChange={(e) => setNewParty(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNewLogo(e.target.files[0])}
        />
        <button onClick={handleAddParty}>Add Party</button>
      </div>

      <div className="party-list-section">
        <h2>Current Parties and Votes</h2>
        {parties.length === 0 ? (
          <p>No parties available.</p>
        ) : (
          <div className="party-list">
            {parties.map((party) => (
              <div key={party.id} className="party-item">
                {party.logo && (
                  <img src={party.logo} alt={party.name} className="party-logo" />
                )}
                <div className="party-details">
                  <p className="party-name">{party.name}</p>
                  <p className="party-votes">Votes: {party.votes}</p>
                </div>
                <button onClick={() => handleDeleteParty(party.id)}>Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="total-votes-section">
        <h3>Total Votes: {totalVotes}</h3>
      </div>
    </div>
  );
};

export default AdminHomepage;
