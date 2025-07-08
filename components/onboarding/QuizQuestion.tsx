// components/onboarding/QuizQuestion.tsx
import React from 'react';

interface QuizOption {
  value: string;
  label: string;
  tooltip?: string; // For educational tooltips on options
}

interface QuizQuestionProps {
  question: string;
  options: QuizOption[];
  type: 'single-choice' | 'multi-select' | 'slider';
  value: any; // Can be string, array of strings, or number
  onChange: (value: any) => void;
  tooltipContent?: string; // For general educational tooltip for the question
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  options,
  type,
  value,
  onChange,
  tooltipContent,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto dark:bg-gray-700">
      <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">{question}</h3>
      {tooltipContent && (
        <p className="text-sm text-slate-500 italic mb-4 dark:text-slate-400">{tooltipContent}</p>
      )}

      {type === 'single-choice' && (
        <div className="space-y-3">
          {options.map((option) => (
            <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="quiz-option"
                value={option.value}
                checked={value === option.value}
                onChange={() => onChange(option.value)}
                className="form-radio h-5 w-5 text-[#0A9396] focus:ring-[#0A9396] dark:text-[#94D2BD] dark:focus:ring-[#94D2BD]"
              />
              <span className="text-slate-700 dark:text-slate-200">{option.label}</span>
              {option.tooltip && (
                <span className="text-xs text-slate-500 ml-2 dark:text-slate-400">({option.tooltip})</span>
              )}
            </label>
          ))}
        </div>
      )}

      {type === 'multi-select' && (
        <div className="space-y-3">
          {options.map((option) => (
            <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="quiz-option"
                value={option.value}
                checked={Array.isArray(value) && value.includes(option.value)}
                onChange={(e) => {
                  if (e.target.checked) {
                    onChange([...(Array.isArray(value) ? value : []), option.value]);
                  } else {
                    onChange((Array.isArray(value) ? value : []).filter((item: string) => item !== option.value));
                  }
                }}
                className="form-checkbox h-5 w-5 text-[#0A9396] focus:ring-[#0A9396] rounded dark:text-[#94D2BD] dark:focus:ring-[#94D2BD]"
              />
              <span className="text-slate-700 dark:text-slate-200">{option.label}</span>
              {option.tooltip && (
                <span className="text-xs text-slate-500 ml-2 dark:text-slate-400">({option.tooltip})</span>
              )}
            </label>
          ))}
        </div>
      )}

      {type === 'slider' && (
        <div className="mt-4">
          <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
                       [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#0A9396] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:appearance-none
                       [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#0A9396] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:appearance-none
                       dark:bg-gray-600 dark:[&::-webkit-slider-thumb]:bg-[#94D2BD] dark:[&::-moz-range-thumb]:bg-[#94D2BD]"
          />
          <div className="text-center text-sm text-slate-600 mt-2 dark:text-slate-300">{value}</div>
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;
