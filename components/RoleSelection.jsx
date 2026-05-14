import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

function RoleSelection({ setRole, setStep }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setRole(input.trim());
      setStep('resume');
    }
  };

  return (
    <div className="card text-center">
      <h2>What role are you targeting?</h2>
      <p>We'll tailor the lightning round to your desired position.</p>
      
      <form onSubmit={handleSubmit} className="mt-8">
        <div className="input-group">
          <input 
            type="text" 
            className="input-field" 
            placeholder="e.g. Frontend Developer, Data Scientist" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={!input.trim()}>
          Next <ArrowRight size={18} />
        </button>
      </form>
    </div>
  );
}

export default RoleSelection;
