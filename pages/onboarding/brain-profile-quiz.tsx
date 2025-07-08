// pages/onboarding/brain-profile-quiz.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import QuizQuestion from '../../components/onboarding/QuizQuestion';

// Define quiz questions and their properties
const quizQuestions = [
  {
    id: 'chronotype',
    question: 'When do you naturally feel most alert and productive?',
    type: 'single-choice',
    options: [
      { value: 'lark', label: 'Early Morning (before 8 AM)', tooltip: 'Your peak energy is in the morning.' },
      { value: 'third_bird', label: 'Mid-Morning to Afternoon (8 AM - 4 PM)', tooltip: 'You have a steady energy curve.' },
      { value: 'owl', label: 'Late Afternoon to Evening (after 4 PM)', tooltip: 'You thrive later in the day.' },
    ],
    tooltipContent: 'Understanding your chronotype helps optimize your "Chronotype Zone" for deep work.',
  },
  {
    id: 'flow_blockers',
    question: 'Which of these commonly disrupt your focus?',
    type: 'multi-select',
    options: [
      { value: 'phone_distraction', label: 'Phone notifications/checking', tooltip: 'The primary "Flow Assassin".' },
      { value: 'general_distraction', label: 'Unrelated thoughts or external noise' },
      { value: 'friction', label: 'Small annoyances (e.g., slow software, cluttered desk)', tooltip: 'Tiny "zaps of irritation".' },
      { value: 'dispersion', label: 'Juggling too many projects at once', tooltip: 'A mile wide, an inch deep.' },
      { value: 'allostatic_load_symptom', label: 'Feeling constantly stressed or burnt out', tooltip: 'Physical wear and tear from stress.' },
    ],
    tooltipContent: 'Identifying your "Flow Blockers" is the first step to eliminating them.',
  },
  {
    id: 'flow_triggers',
    question: 'What kind of tasks help you get "in the zone"?',
    type: 'multi-select',
    options: [
      { value: 'clear_goals', label: 'Tasks with crystal clear objectives' },
      { value: 'immediate_feedback', label: 'Tasks where you get instant results/feedback' },
      { value: 'challenge_skills_balance', label: 'Tasks that are challenging but achievable (not too easy, not too hard)' },
      { value: 'high_consequences', label: 'Tasks with high stakes or importance' },
      { value: 'novelty_complexity', label: 'New, complex, or unpredictable tasks' },
    ],
    tooltipContent: 'Leverage your "Flow Triggers" to intentionally enter deep focus.',
  },
  {
    id: 'allostatic_load_score',
    question: 'On a scale of 0-100, how often do you feel overwhelmed or stressed?',
    type: 'slider',
    options: [], // Not applicable for slider
    tooltipContent: 'A higher score indicates higher "Allostatic Load," impacting your ability to recover and find flow.',
  },
  {
    id: 'routine_preferences',
    question: 'How do you prefer to build your daily routines?',
    type: 'multi-select',
    options: [
      { value: 'fixed_schedule', label: 'Strict, time-blocked schedule' },
      { value: 'flexible_flow', label: 'Flexible, adaptable structure' },
      { value: 'habit_chaining', label: 'Connecting new habits to existing ones (snowballing)' },
      { value: 'minimal_viable', label: 'Starting with very small, easy habits' },
    ],
    tooltipContent: 'Your preferences help us suggest the best "Routine Creation" strategies for you.',
  },
  {
    id: 'time_management_style',
    question: 'Which best describes your approach to managing tasks?',
    type: 'single-choice',
    options: [
      { value: 'time_blocker', label: 'I plan out specific time blocks for tasks.' },
      { value: 'priority_lister', label: 'I focus on a prioritized list of tasks.' },
      { value: 'engage_immediately', label: 'I try to start tasks as soon as possible to avoid procrastination.' },
      { value: 'flexible_adapter', label: 'I adapt my schedule as needed throughout the day.' },
    ],
    tooltipContent: 'Understanding your style helps tailor "Temporal Architect" and "Procrastination" strategies.',
  },
  {
    id: 'dopamine_resensitization_needs',
    question: 'Which areas do you feel you need to "reset" for better focus?',
    type: 'multi-select',
    options: [
      { value: 'digital_detox', label: 'Reducing constant phone/screen checking' },
      { value: 'boring_breaks', label: 'Taking less stimulating breaks' },
      { value: 'single_tasking', label: 'Focusing on one thing at a time' },
      { value: 'novelty_seeking', label: 'Reducing constant pursuit of new stimuli' },
    ],
    tooltipContent: 'These practices can help "resensitize your dopamine receptors" for sustained motivation.',
  },
];

const BrainProfileQuizPage: React.FC = () => {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [error, setError] = useState<string | null>(null);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleAnswerChange = (value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const handleNext = () => {
    // Basic validation
    if (currentQuestion.type === 'multi-select' && (!answers[currentQuestion.id] || answers[currentQuestion.id].length === 0)) {
      setError('Please select at least one option.');
      return;
    }
    if (currentQuestion.type === 'single-choice' && !answers[currentQuestion.id]) {
      setError('Please select an option.');
      return;
    }
    if (currentQuestion.type === 'slider' && (answers[currentQuestion.id] === undefined || answers[currentQuestion.id] === null)) {
      setError('Please select a value on the slider.');
      return;
    }

    setError(null);

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setError(null);
    }
  };

  const handleSubmit = () => {
    const profileData = {
      chronotype: answers.chronotype || null,
      flow_triggers: answers.flow_triggers || [],
      flow_blockers: answers.flow_blockers || [],
      allostatic_load_score: answers.allostatic_load_score || 0,
      routine_preferences: answers.routine_preferences || [],
      time_management_style: answers.time_management_style || null,
      dopamine_resensitization_needs: answers.dopamine_resensitization_needs || [],
    };

    const encodedAnswers = encodeURIComponent(JSON.stringify(profileData));
    router.push(`/auth/complete-profile?answers=${encodedAnswers}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-900">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-primary">Your Brain Profile Quiz</h2>
          <p className="text-gray-300 mt-2">Help us understand your unique flow architecture.</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2.5 mb-8">
          <div
            className="bg-primary h-2.5 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
          ></div>
        </div>

        <QuizQuestion
          question={currentQuestion.question}
          options={currentQuestion.options}
          type={currentQuestion.type as any}
          value={answers[currentQuestion.id] || (currentQuestion.type === 'multi-select' ? [] : (currentQuestion.type === 'slider' ? 50 : ''))}
          onChange={handleAnswerChange}
          tooltipContent={currentQuestion.tooltipContent}
        />

        {error && (
          <p className="text-red-400 text-center mt-4">{error}</p>
        )}

        <div className="flex justify-between mt-8 max-w-xl mx-auto">
          <button
            onClick={handleBack}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-3 rounded-lg font-semibold transition-all duration-200 ease-in-out bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-3 rounded-lg font-semibold transition-all duration-200 ease-in-out bg-primary text-gray-900 hover:opacity-90"
          >
            {currentQuestionIndex === quizQuestions.length - 1
              ? 'Finish & Create Profile'
              : 'Next'
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrainProfileQuizPage;