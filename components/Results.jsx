import React from 'react';
import { RotateCcw, Trophy } from 'lucide-react';

function Results({ score, feedback, setStep }) {
  let scoreColor = 'var(--color-error)';
  if (score >= 80) scoreColor = 'var(--color-success)';
  else if (score >= 50) scoreColor = '#f59e0b'; // amber

  return (
    <div className="card">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Trophy size={48} color={scoreColor} style={{ margin: '0 auto', marginBottom: '1rem' }} />
        <h2>Interview Readiness Score</h2>
        <div style={{ fontSize: '4rem', fontWeight: 800, color: scoreColor, lineHeight: 1 }}>
          {Math.round(score)}<span style={{ fontSize: '2rem', color: 'var(--color-text-muted)' }}>/100</span>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>
          Personalized Improvement Plan
        </h3>
        <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {feedback.map((item, index) => (
            <li key={index} style={{ color: 'var(--color-text-main)' }}>{item}</li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        <button className="btn btn-outline" onClick={() => setStep('role')}>
          <RotateCcw size={18} /> Try Again
        </button>
      </div>
    </div>
  );
}

export default Results;
