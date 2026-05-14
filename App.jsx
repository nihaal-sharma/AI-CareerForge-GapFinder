import React, { useState } from 'react';
import RoleSelection from './components/RoleSelection';
import ResumeUpload from './components/ResumeUpload';
import LightningRound from './components/LightningRound';
import Results from './components/Results';
import { Briefcase } from 'lucide-react';

function App() {
  const [step, setStep] = useState('role'); // role, resume, swipe, results
  const [role, setRole] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState([]);

  return (
    <div className="container">
      <header className="app-header">
        <h1 className="logo-text">
          <Briefcase className="logo-icon" size={32} />
          CareerForge
        </h1>
        <p>Interview Readiness in 2 Minutes</p>
      </header>

      <main>
        {step === 'role' && <RoleSelection setRole={setRole} setStep={setStep} />}
        {step === 'resume' && <ResumeUpload setStep={setStep} />}
        {step === 'swipe' && <LightningRound setScore={setScore} setFeedback={setFeedback} setStep={setStep} role={role} />}
        {step === 'results' && <Results score={score} feedback={feedback} setStep={setStep} />}
      </main>
    </div>
  );
}

export default App;
