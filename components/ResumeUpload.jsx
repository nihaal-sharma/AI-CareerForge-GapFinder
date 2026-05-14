import React, { useState } from 'react';
import { UploadCloud, CheckCircle2, Loader2 } from 'lucide-react';

function ResumeUpload({ setStep }) {
  const [status, setStatus] = useState('idle'); // idle, uploading, parsing, done

  const handleUpload = () => {
    setStatus('uploading');
    setTimeout(() => {
      setStatus('parsing');
      setTimeout(() => {
        setStatus('done');
        setTimeout(() => {
          setStep('swipe');
        }, 1000);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="card text-center">
      <h2>Upload your Resume</h2>
      <p>We'll scan for keywords to find your blind spots.</p>
      
      <div 
        className="mt-8 mb-4" 
        style={{
          border: '2px dashed var(--color-border)',
          borderRadius: '1rem',
          padding: '3rem 2rem',
          cursor: status === 'idle' ? 'pointer' : 'default',
          backgroundColor: status === 'idle' ? 'var(--color-bg)' : 'var(--color-surface)',
          transition: 'all 0.3s'
        }}
        onClick={status === 'idle' ? handleUpload : undefined}
      >
        {status === 'idle' && (
          <div>
            <UploadCloud size={48} color="var(--color-primary)" style={{ margin: '0 auto', marginBottom: '1rem' }} />
            <p style={{ margin: 0, fontWeight: 500, color: 'var(--color-text-main)' }}>Click or drag PDF/Text here</p>
            <p style={{ fontSize: '0.875rem' }}>Simulated upload & parse</p>
          </div>
        )}
        
        {status === 'uploading' && (
          <div>
            <Loader2 className="lucide-spin" size={48} color="var(--color-primary)" style={{ margin: '0 auto', marginBottom: '1rem', animation: 'spin 2s linear infinite' }} />
            <p style={{ margin: 0, fontWeight: 500 }}>Uploading...</p>
          </div>
        )}

        {status === 'parsing' && (
          <div>
            <Loader2 className="lucide-spin" size={48} color="var(--color-primary)" style={{ margin: '0 auto', marginBottom: '1rem', animation: 'spin 2s linear infinite' }} />
            <p style={{ margin: 0, fontWeight: 500 }}>Extracting skills & gaps...</p>
          </div>
        )}

        {status === 'done' && (
          <div>
            <CheckCircle2 size={48} color="var(--color-success)" style={{ margin: '0 auto', marginBottom: '1rem' }} />
            <p style={{ margin: 0, fontWeight: 500, color: 'var(--color-success)' }}>Analysis Complete!</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default ResumeUpload;
