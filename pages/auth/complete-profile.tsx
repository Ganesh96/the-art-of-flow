// pages/auth/complete-profile.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../lib/supabaseClient';

const CompleteProfilePage: React.FC = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [quizAnswers, setQuizAnswers] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (router.isReady) {
      const { answers } = router.query;
      if (answers) {
        setQuizAnswers(JSON.parse(decodeURIComponent(answers as string)));
      } else {
        // Redirect if no answers are found, something went wrong
        router.push('/onboarding/brain-profile-quiz');
      }
    }
  }, [router.isReady, router.query, router]);

  const completeProfileMutation = useMutation({
    mutationFn: async () => {
      if (!quizAnswers) throw new Error('Quiz data is missing.');
      if (password.length < 16) throw new Error('Password must be at least 16 characters long.');

      // 1. Create the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('User could not be created.');

      // 2. Save the brain profile with the new user's ID
      const { error: profileError } = await supabase
        .from('brain_profiles')
        .insert({ ...quizAnswers, user_id: authData.user.id });

      if (profileError) {
        // Handle potential case where user is created but profile fails
        console.error('Failed to save profile, but user was created:', profileError);
        throw new Error('Could not save your brain profile. Please contact support.');
      }

      return authData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brainProfile'] });
      router.push('/dashboard'); // Redirect to dashboard after successful creation
    },
    onError: (err: any) => {
      console.error('Failed to complete profile:', err);
      setError(err.message || 'An unexpected error occurred.');
    },
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    completeProfileMutation.mutate();
  };

  if (!quizAnswers) {
    return <div className="min-h-screen flex items-center justify-center"><p>Loading quiz data...</p></div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Almost There!</h2>
        <p className="text-gray-300 mb-8">Create your account to save your brain profile and start your journey.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="password"
            placeholder="Create a secure password (min. 16 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={16}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          
          {error && <p className="text-red-400 text-sm">{error}</p>}
          
          <button
            type="submit"
            disabled={completeProfileMutation.isPending}
            className="w-full bg-primary text-gray-900 font-bold py-3 rounded-lg shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {completeProfileMutation.isPending ? 'Saving...' : 'Complete & View Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfilePage;