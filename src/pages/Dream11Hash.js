import React, { useState } from 'react';
import { FaHashtag, FaCopy } from 'react-icons/fa';

const Dream11Hash = () => {
  const [matchId, setMatchId] = useState('');
  const [hashValue, setHashValue] = useState('');

  const generateHash = () => {
    // This is a placeholder hash generation
    // In a real application, this would call an API
    const hash = Math.random().toString(36).substring(2, 15) + 
                Math.random().toString(36).substring(2, 15);
    setHashValue(hash);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hashValue);
    alert('Hash value copied to clipboard!');
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">
                <FaHashtag className="me-2" />
                Dream11 Hash Generator
              </h2>
              
              <div className="mb-4">
                <label className="form-label">Match ID</label>
                <input
                  type="text"
                  className="form-control"
                  value={matchId}
                  onChange={(e) => setMatchId(e.target.value)}
                  placeholder="Enter Match ID"
                />
              </div>

              <button
                className="btn btn-primary w-100 mb-4"
                onClick={generateHash}
                disabled={!matchId}
              >
                Generate Hash
              </button>

              {hashValue && (
                <div className="card bg-light">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="text-break">{hashValue}</div>
                      <button
                        className="btn btn-outline-secondary btn-sm ms-2"
                        onClick={copyToClipboard}
                      >
                        <FaCopy />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-4">
                <h5>Instructions:</h5>
                <ol className="small">
                  <li>Enter the Match ID from Dream11</li>
                  <li>Click on Generate Hash button</li>
                  <li>Copy the generated hash value</li>
                  <li>Use this hash in Dream11 for team verification</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dream11Hash;
