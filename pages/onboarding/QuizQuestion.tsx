// components/onboarding/QuizQuestion.tsx
import React from 'react';

interface QuizOption { value: string; label: string; }
interface QuizQuestionProps {
  question: string;
  options: QuizOption[];
  type: 'single-choice' | 'multi-select' | 'slider';
  value: any;
  onChange: (value: any) => void;
  tooltipContent?: string;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ question, options, type, value, onChange, tooltipContent }) => {
  return (
    <>
      <style jsx>{`
        label.option {
          display: block;
          background: rgba(255,255,255,0.05);
          padding: 1rem;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        label.option:hover {
          background: rgba(255,255,255,0.1);
        }
        input[type=range] {
          width: 100%;
          height: 10px;
          background: linear-gradient(90deg, #0ea5e9, #3b82f6);
          border-radius: 5px;
          outline: none;
          -webkit-appearance: none;
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #f3f4f6;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        input[type=range]::-webkit-slider-thumb:hover {
          box-shadow: 0 0 10px #0ea5e9;
        }
        .value-display {
          color: #3b82f6;
        }
      `}</style>
      <div>
        <h2 className="text-2xl font-bold mb-2">{question}</h2>
        {tooltipContent && <p className="text-sm text-gray-400 mb-6">{tooltipContent}</p>}

        {type === 'single-choice' && (
          <div className="space-y-3">
            {options.map((option) => (
              <label key={option.value} className="option flex items-center space-x-3">
                <input
                  type="radio"
                  name={question}
                  checked={value === option.value}
                  onChange={() => onChange(option.value)}
                  className="form-radio h-5 w-5"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        )}

        {type === 'multi-select' && (
           <div className="space-y-3">
           {options.map((option) => (
             <label key={option.value} className="option flex items-center space-x-3">
               <input
                 type="checkbox"
                 checked={value.includes(option.value)}
                 onChange={(e) => {
                   const newSelection = e.target.checked
                     ? [...value, option.value]
                     : value.filter((item: string) => item !== option.value);
                   onChange(newSelection);
                 }}
                 className="form-checkbox h-5 w-5"
               />
               <span>{option.label}</span>
             </label>
           ))}
         </div>
        )}

        {type === 'slider' && (
          <div className="my-8 text-center">
            <input
              type="range"
              min="0"
              max="100"
              value={value}
              onChange={(e) => onChange(Number(e.target.value))}
            />
            <div className="value-display text-2xl font-bold mt-4">{value}</div>
          </div>
        )}
      </div>
    </>
  );
};

export default QuizQuestion;