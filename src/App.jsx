import React, { useState, useMemo, useEffect, useRef } from 'react';

const assessmentData = {
  intro: {
    headline: 'Executive Stress & Trauma Self-Audit',
    description: 'This confidential self-audit is designed for high-performing leaders. It measures how stress and trauma may be silently impacting your decision-making, leadership presence, and personal relationships.\n\nBacked by neuroscience and trauma research, this tool will highlight patterns that could be costing you clarity, health, intimacy, and sustainable success.\n\n👉 Answer honestly. Results are confidential and for your personal awareness only.'
  },
  sections: [
    {
      title: 'Section 1: Stress & Burnout Indicators',
      subtitle: 'Neuroscience & Physiology',
      info: 'Chronic stress floods the brain with cortisol and disrupts prefrontal cortex functioning (Arnsten, 2009), impairing executive decision-making.',
      questions: [
        'I feel mentally exhausted even after a full night\'s rest.',
        'I struggle to concentrate during meetings or strategy sessions.',
        'I notice frequent headaches, muscle tension, or gastrointestinal discomfort.',
        'I rely on caffeine, alcohol, or stimulants to keep going.',
        'I often feel like I\'m "wired but tired."'
      ]
    },
    {
      title: 'Section 2: Trauma & Emotional Regulation',
      subtitle: '',
      info: 'Trauma often leaves "emotional imprints" that trigger disproportionate stress responses (van der Kolk, The Body Keeps the Score, 2014).',
      questions: [
        'I overreact to criticism or conflict at work/home.',
        'I often "numb out" or disconnect during stressful conversations.',
        'I avoid certain situations because they feel too overwhelming.',
        'Past failures or betrayals still influence my current decision-making.',
        'My emotional reactions sometimes surprise even me.'
      ]
    },
    {
      title: 'Section 3: Leadership Under Pressure',
      subtitle: '',
      info: 'Leaders with unresolved trauma show increased impulsivity and lower empathy (Shields et al., 2016).',
      questions: [
        'I make reactive decisions under pressure rather than strategic ones.',
        'I notice tension or fear among my team during stressful projects.',
        'I struggle to delegate because I don\'t trust others fully.',
        'I keep pushing through stress instead of pausing to reset.',
        'My leadership sometimes feels performative rather than authentic.'
      ]
    },
    {
      title: 'Section 4: Boardroom vs. Bedroom Disconnect',
      subtitle: '',
      info: 'Research shows occupational stress strongly correlates with marital dissatisfaction and intimacy breakdown (Karney & Bradbury, 1995).',
      questions: [
        'My partner/spouse has expressed feeling emotionally distant from me.',
        'Work stress frequently spills into my home life.',
        'I avoid intimacy or vulnerable conversations because I feel drained.',
        'Success at work feels hollow if my relationship is strained.',
        'I sometimes feel like I\'m living two separate lives: public success, private struggle.'
      ]
    },
    {
      title: 'Section 5: Meaning, Identity & Resilience',
      subtitle: '',
      info: 'Trauma disrupts meaning-making; resilience requires integration of identity (Southwick & Charney, Resilience: The Science of Mastering Life\'s Greatest Challenges, 2018).',
      questions: [
        'I question whether my success truly aligns with my deeper purpose.',
        'I feel disconnected from who I really am outside of my role.',
        'I sometimes fear that if I stop performing, I will lose my value.',
        'I rarely pause to reflect on my spiritual, emotional, or relational needs.',
        'Despite outward success, I feel something essential is missing.'
      ]
    }
  ],
  results: {
    interpretations: [
      { range: [0, 25], level: 'Low Impact', text: 'Stress/trauma not currently impairing leadership or relationships. Preventive coaching still valuable.' },
      { range: [26, 50], level: 'Moderate Impact', text: 'Noticeable effects on performance and intimacy; intervention recommended.' },
      { range: [51, 75], level: 'High Impact', text: 'Stress/trauma significantly undermining executive functioning and relational health; urgent support required.' },
      { range: [76, 125], level: 'Critical Impact', text: 'Severe dysregulation; high risk of burnout, relational breakdown, or executive collapse.' }
    ],
    nextStep: {
      title: 'Next Step for Executives',
      description: 'This audit is not a clinical diagnosis but a mirror. If your score suggests moderate to high impact, trauma-informed executive coaching can help you:',
      points: [
        'Restore clarity and decision-making power.',
        'Reconnect with your partner and family.',
        'Lead with authentic presence instead of hidden exhaustion.',
        'Build resilience strategies rooted in neuroscience and evidence-based practice.'
      ],
      callToAction: '👉 Executives: DM me "AUDIT" to schedule a confidential Executive Diagnostic Call where we\'ll unpack your results and create a tailored action plan.'
    }
  }
};

const ProgressBar = ({ current, total }) => {
  const percentage = (current / total) * 100;
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-sm">
      <div className="w-full bg-gray-200 dark:bg-gray-700 h-1">
        <div
          className="bg-blue-600 h-5 transition-all duration-500 ease-in-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const IntroPage = ({ onStart }) => {
  const { headline, description } = assessmentData.intro;
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/40"></div>
      
      <div className="text-center max-w-2xl mx-auto relative z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
          {headline}
        </h1>
        <div className="text-gray-100 text-base sm:text-lg space-y-4 whitespace-pre-line mb-10 drop-shadow-md">
          <p>{description}</p>
        </div>
        <button
          onClick={onStart}
          className="bg-blue-600 text-white font-bold py-3 px-8 sm:py-4 sm:px-10 rounded-lg text-lg sm:text-xl hover:bg-blue-700 transition-all duration-300 shadow-lg transform hover:scale-105 hover:shadow-xl"
        >
          Start Audit
        </button>
      </div>
    </div>
  );
};

const QuestionCard = ({ 
  question, 
  onAnswer, 
  questionNumber, 
  selectedValue,
  questionRef
}) => {
  return (
    <div ref={questionRef} className="min-h-screen flex items-center justify-center px-3 sm:px-4 py-8 sm:py-16">
      <div className="w-full max-w-4xl mx-auto">
        {/* Section Header (if new section) */}
        {question.isNewSection && (
          <div className="text-center mb-8 sm:mb-12 p-4 sm:p-6 bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 drop-shadow-lg">{question.sectionTitle}</h2>
            <p className="text-xs sm:text-sm text-gray-200 italic max-w-3xl mx-auto leading-relaxed drop-shadow">
              "{question.sectionInfo}"
            </p>
          </div>
        )}
        
        {/* Question Card */}
        <div className="bg-white/95 backdrop-blur-sm p-6 sm:p-8 md:p-12 rounded-xl sm:rounded-2xl shadow-2xl border border-white/20">
          <div className="text-center mb-2">
            <span className="text-xs sm:text-sm font-medium text-gray-500">
              Question {questionNumber}
            </span>
          </div>
          
          <div className="text-center mb-8 sm:mb-10">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 leading-relaxed px-2">
              {question.text}
            </p>
          </div>
          
          {/* Rating Scale */}
          <div className="flex flex-col items-center space-y-6 sm:space-y-8">
            <div className="flex justify-between items-center w-full max-w-xs sm:max-w-md text-xs sm:text-sm text-gray-500">
              <span>Never</span>
              <span className="text-center">Almost Always</span>
            </div>
            
            <div className="flex space-x-2 sm:space-x-3 md:space-x-6">
              {[0, 1, 2, 3, 4, 5].map(value => (
                <button
                  key={value}
                  onClick={() => onAnswer(questionNumber - 1, value)}
                  className={`w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full text-base sm:text-xl md:text-2xl font-bold transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-500 ${
                    selectedValue === value
                      ? 'bg-blue-600 text-white shadow-lg scale-110 ring-4 ring-blue-300'
                      : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white shadow-md'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
            
            {selectedValue !== null && selectedValue !== undefined && (
              <div className="mt-4 text-green-600 font-medium flex items-center text-sm sm:text-base">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Answer recorded
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ResultsPage = ({ score, onRestart, answers, totalQuestions }) => {
  const { interpretations, nextStep } = assessmentData.results;
  
  const result = interpretations.find(({ range }) => score >= range[0] && score <= range[1]) || interpretations[interpretations.length - 1];
  const answeredQuestions = answers.filter(answer => answer !== null && answer !== undefined).length;

  const getScoreColor = (level) => {
    switch (level) {
      case 'Low Impact': return 'text-green-500';
      case 'Moderate Impact': return 'text-yellow-500';
      case 'High Impact': return 'text-orange-500';
      case 'Critical Impact': return 'text-red-500';
      default: return 'text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-3 sm:px-4 py-8 sm:py-16">
      <div className="w-full max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
        <div className="bg-white/95 backdrop-blur-sm p-6 sm:p-8 md:p-12 rounded-xl sm:rounded-2xl shadow-2xl border border-white/20">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-3 sm:mb-4">Assessment Complete!</h2>
          <div className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
            {answeredQuestions} of {totalQuestions} questions answered
          </div>
          <p className={`text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold mb-4 sm:mb-6 ${getScoreColor(result.level)}`}>{score}/125</p>
          <div className="mb-6 sm:mb-8">
            <h3 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${getScoreColor(result.level)} mb-3 sm:mb-4`}>{result.level}</h3>
            <p className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed px-2">{result.text}</p>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-sm p-6 sm:p-8 md:p-12 rounded-xl sm:rounded-2xl shadow-2xl border border-white/20 text-left">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">{nextStep.title}</h3>
          <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">{nextStep.description}</p>
          <ul className="space-y-3 sm:space-y-4 list-disc list-inside text-gray-600 mb-8 sm:mb-10 text-base sm:text-lg">
            {nextStep.points.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
          <p className="font-semibold text-center text-gray-800 text-lg sm:text-xl">{nextStep.callToAction}</p>
        </div>

        <div className="pt-6 sm:pt-8">
          <button
            onClick={onRestart}
            className="bg-gray-700 text-white font-bold py-3 px-8 sm:py-4 sm:px-10 rounded-lg text-lg sm:text-xl hover:bg-gray-800 transition-all duration-300 shadow-lg transform hover:scale-105 hover:shadow-xl"
          >
            Take Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [currentStep, setCurrentStep] = useState('intro');
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const questionRefs = useRef([]);

  const allQuestions = useMemo(() => {
    return assessmentData.sections.flatMap((section) =>
      section.questions.map((questionText, questionIndexInSection) => ({
        text: questionText,
        sectionTitle: section.title,
        sectionInfo: section.info,
        isNewSection: questionIndexInSection === 0,
      }))
    );
  }, []);

  const totalQuestions = allQuestions.length;
  const answeredCount = answers.filter(answer => answer !== null && answer !== undefined).length;
  const totalScore = answers.reduce((acc, val) => acc + (val || 0), 0);

  const startAssessment = () => {
    setCurrentStep('assessment');
    setAnswers(new Array(allQuestions.length).fill(null));
    setShowResults(false);
    questionRefs.current = [];
  };

  const handleAnswerSelect = (questionIndex, value) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = value;
    setAnswers(newAnswers);
    
    // Auto-scroll to next question after a brief delay
    setTimeout(() => {
      if (questionIndex < allQuestions.length - 1) {
        // Scroll to next question
        const nextQuestionRef = questionRefs.current[questionIndex + 1];
        if (nextQuestionRef) {
          nextQuestionRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        // Show results section
        setShowResults(true);
        // Scroll to results
        setTimeout(() => {
          const resultsElement = document.getElementById('results-section');
          if (resultsElement) {
            resultsElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 300);
      }
    }, 800);
  };
  
  const handleRestart = () => {
    setCurrentStep('intro');
    setAnswers([]);
    setShowResults(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentStep === 'intro') {
    return (
      <main 
        className="min-h-screen font-sans text-gray-900 bg-cover bg-center bg-fixed relative"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
        }}
      >
        <IntroPage onStart={startAssessment} />
        <footer className="text-center text-white/80 py-6 sm:py-8 text-xs sm:text-sm relative z-10 drop-shadow-lg">
          Confidential — For Your Self-Reflection Only
        </footer>
      </main>
    );
  }

  return (
    <main 
      className="min-h-screen font-sans text-gray-900 bg-cover bg-center bg-fixed relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
      }}
    >
      {/* Background overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>
      
      <div className="relative z-10">
        <ProgressBar current={answeredCount} total={totalQuestions} />
        
        {/* All Questions */}
        {allQuestions.map((question, index) => (
          <QuestionCard
            key={index}
            question={question}
            onAnswer={handleAnswerSelect}
            questionNumber={index + 1}
            selectedValue={answers[index]}
            questionRef={(el) => questionRefs.current[index] = el}
          />
        ))}
        
        {/* Results Section */}
        {showResults && (
          <div id="results-section">
            <ResultsPage 
              score={totalScore} 
              onRestart={handleRestart}
              answers={answers}
              totalQuestions={totalQuestions}
            />
          </div>
        )}
        
        <footer className="text-center text-white/80 py-6 sm:py-8 text-xs sm:text-sm drop-shadow-lg">
          Confidential — For Your Self-Reflection Only
        </footer>
      </div>
    </main>
  );
}