import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Check, X } from 'lucide-react';

const mockQuestions = [
  { id: 1, text: "React state updates are always synchronous.", answer: false, topic: "React State" },
  { id: 2, text: "The virtual DOM is a lightweight copy of the actual DOM.", answer: true, topic: "React Concepts" },
  { id: 3, text: "useEffect without a dependency array runs only once on mount.", answer: false, topic: "Hooks" },
  { id: 4, text: "Tailwind CSS requires you to write custom CSS classes for styling.", answer: false, topic: "CSS Frameworks" },
  { id: 5, text: "Next.js supports both SSR and Static Site Generation.", answer: true, topic: "Next.js" },
  { id: 6, text: "Framer Motion's 'animate' prop can take an object of CSS properties.", answer: true, topic: "Animations" },
  { id: 7, text: "Props can be directly modified by the child component.", answer: false, topic: "React Props" },
  { id: 8, text: "Vite is generally faster than Webpack for local development.", answer: true, topic: "Build Tools" },
  { id: 9, text: "In JavaScript, '==' checks for both value and type equality.", answer: false, topic: "JavaScript Basics" },
  { id: 10, text: "A promise can have three states: pending, fulfilled, or rejected.", answer: true, topic: "Asynchronous JS" },
];

function LightningRound({ setScore, setFeedback, setStep, role }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [mistakes, setMistakes] = useState([]);
  
  const controls = useAnimation();

  const handleSwipe = async (direction) => {
    const isRight = direction === 'right';
    const currentQ = mockQuestions[currentIndex];
    
    const isCorrect = (isRight && currentQ.answer) || (!isRight && !currentQ.answer);
    
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    } else {
      setMistakes(prev => [...prev, currentQ.topic]);
    }

    await controls.start({
      x: isRight ? 300 : -300,
      opacity: 0,
      transition: { duration: 0.3 }
    });

    if (currentIndex < mockQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      controls.set({ x: 0, opacity: 1 });
    } else {
      // Calculate score
      const finalScore = isCorrect ? ((correctCount + 1) / mockQuestions.length) * 100 : (correctCount / mockQuestions.length) * 100;
      setScore(finalScore);
      
      const updatedMistakes = isCorrect ? mistakes : [...mistakes, currentQ.topic];
      
      // Generate feedback based on mistakes
      const feedbackItems = updatedMistakes.length > 0 
        ? updatedMistakes.slice(0, 3).map(topic => `Review your knowledge on ${topic}. Ensure you understand the core concepts.`)
        : ["Great job! Your technical fundamentals are solid.", "Practice advanced system design questions.", "Consider doing mock interviews for behavioral questions."];
      
      // Pad to 3 items if needed
      while (feedbackItems.length < 3) {
        feedbackItems.push("Practice articulating your problem-solving process out loud.");
      }
      
      setFeedback(feedbackItems.slice(0, 3));
      setStep('results');
    }
  };

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ alignSelf: 'flex-start', marginBottom: '1rem', color: 'var(--color-text-muted)' }}>
        Question {currentIndex + 1} of {mockQuestions.length}
      </div>
      
      <div style={{ position: 'relative', width: '100%', height: '250px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <motion.div
          animate={controls}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(e, info) => {
            if (info.offset.x > 100) {
              handleSwipe('right');
            } else if (info.offset.x < -100) {
              handleSwipe('left');
            } else {
              controls.start({ x: 0, opacity: 1 });
            }
          }}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '1rem',
            boxShadow: 'var(--color-card-shadow)',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            cursor: 'grab'
          }}
        >
          <span className="badge" style={{ marginBottom: '1rem' }}>{role || 'General'}</span>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{mockQuestions[currentIndex].text}</h3>
          <p style={{ marginTop: '2rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            Swipe left for False, right for True
          </p>
        </motion.div>
      </div>

      <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
        <button 
          onClick={() => handleSwipe('left')}
          style={{ 
            width: '60px', height: '60px', borderRadius: '50%', 
            border: '2px solid var(--color-error)', backgroundColor: 'transparent',
            color: 'var(--color-error)', display: 'flex', justifyContent: 'center', alignItems: 'center',
            cursor: 'pointer', transition: 'all 0.2s'
          }}
        >
          <X size={32} />
        </button>
        <button 
          onClick={() => handleSwipe('right')}
          style={{ 
            width: '60px', height: '60px', borderRadius: '50%', 
            border: '2px solid var(--color-success)', backgroundColor: 'transparent',
            color: 'var(--color-success)', display: 'flex', justifyContent: 'center', alignItems: 'center',
            cursor: 'pointer', transition: 'all 0.2s'
          }}
        >
          <Check size={32} />
        </button>
      </div>
    </div>
  );
}

export default LightningRound;
