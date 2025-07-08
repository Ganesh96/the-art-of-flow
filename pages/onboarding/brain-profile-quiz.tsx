// pages/onboarding/brain-profile-quiz.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import QuizQuestion from '../../components/onboarding/QuizQuestion';

const quizQuestions = [
    { id: 'chronotype', question: 'When do you naturally feel most alert and productive?', type: 'single-choice', options: [ { value: 'lark', label: 'Early Morning (before 8 AM)' }, { value: 'third_bird', label: 'Mid-Morning to Afternoon (8 AM - 4 PM)' }, { value: 'owl', label: 'Late Afternoon to Evening (after 4 PM)' }, ], tooltipContent: 'This helps optimize your "Chronotype Zone" for deep work.', },
    { id: 'flow_blockers', question: 'Which of these commonly disrupt your focus?', type: 'multi-select', options: [ { value: 'phone_distraction', label: 'Phone notifications/checking' }, { value: 'general_distraction', label: 'Unrelated thoughts or external noise' }, { value: 'friction', label: 'Small annoyances (e.g., slow software)' }, { value: 'dispersion', label: 'Juggling too many projects' }, { value: 'allostatic_load_symptom', label: 'Feeling constantly stressed or burnt out' }, ], tooltipContent: 'Identifying your "Flow Blockers" is the first step to eliminating them.', },
    { id: 'allostatic_load_score', question: 'On a scale of 0-100, how often do you feel overwhelmed or stressed?', type: 'slider', options: [], tooltipContent: 'A higher score indicates higher "Allostatic Load," impacting recovery.', },
    // Add other questions here...
];

const BrainProfileQuizPage: React.FC = () => {
    const router = useRouter();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [error, setError] = useState<string | null>(null);

    const currentQuestion = quizQuestions[currentQuestionIndex];
    const progressPercentage = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

    // Functions for handleAnswerChange, handleNext, handleBack, handleSubmit remain the same

    const handleSubmit = () => {
        const profileData = { /* ... assemble answers ... */ };
        const encodedAnswers = encodeURIComponent(JSON.stringify(profileData));
        router.push(`/auth/complete-profile?answers=${encodedAnswers}`);
    };
    
    // Placeholder functions to avoid errors
    const handleAnswerChange = (value: any) => setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
    const handleNext = () => currentQuestionIndex < quizQuestions.length - 1 ? setCurrentQuestionIndex(currentQuestionIndex + 1) : handleSubmit();
    const handleBack = () => currentQuestionIndex > 0 ? setCurrentQuestionIndex(currentQuestionIndex - 1) : null;


    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <style jsx>{`
                .quiz-card {
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(8px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 0 0 20px rgba(0,0,0,0.4);
                }
                .progress-bar-container {
                    background-color: rgba(255, 255, 255, 0.1);
                    border-radius: 4px;
                    overflow: hidden;
                }
                .progress-bar {
                    background: linear-gradient(90deg, #0ea5e9, #3b82f6);
                    transition: width 0.3s ease;
                }
                button {
                    background: #f3f4f6;
                    color: #0ea5e9;
                    transition: all 0.3s ease;
                }
                button:hover {
                    background: #e0f2fe;
                    transform: translateY(-3px);
                }
                button:disabled {
                    background: #4b5563;
                    color: #9ca3af;
                    cursor: not-allowed;
                    transform: none;
                }
            `}</style>
            <div className="quiz-card w-full max-w-2xl p-8 sm:p-12 rounded-xl">
                <div className="progress-bar-container w-full h-2 mb-8">
                    <div className="progress-bar h-full" style={{ width: `${progressPercentage}%` }}></div>
                </div>

                <QuizQuestion
                    key={currentQuestion.id}
                    question={currentQuestion.question}
                    options={currentQuestion.options}
                    type={currentQuestion.type as any}
                    value={answers[currentQuestion.id] || (currentQuestion.type === 'multi-select' ? [] : (currentQuestion.type === 'slider' ? 50 : ''))}
                    onChange={handleAnswerChange}
                    tooltipContent={currentQuestion.tooltipContent}
                />
                
                {error && <p className="text-red-400 text-center mt-4">{error}</p>}

                <div className="flex justify-between mt-8">
                    <button
                        onClick={handleBack}
                        disabled={currentQuestionIndex === 0}
                        className="px-8 py-3 rounded-full font-semibold text-lg">
                        Back
                    </button>
                    <button
                        onClick={handleNext}
                        className="px-8 py-3 rounded-full font-semibold text-lg">
                        {currentQuestionIndex === quizQuestions.length - 1 ? 'Finish' : 'Next'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BrainProfileQuizPage;