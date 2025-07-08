// pages/index.tsx
import React from 'react';
import { useRouter } from 'next/router';

const features = [
  { icon: '🧠', title: 'Brain Profile', description: 'Personalized insights into your unique cognitive strengths and flow triggers.' },
  { icon: '🎯', title: 'Goals & Habits', description: 'Craft systems that align with your brain and boost sustainable progress.' },
  { icon: '🗓️', title: 'In-House Calendar', description: 'Seamlessly plan flow sessions, tasks, and life events without distractions.' },
  { icon: '🚀', title: 'Flow Tracking', description: 'Monitor sessions, measure time in flow, and refine your practice over time.' },
  { icon: '📓', title: 'Journaling Tools', description: 'Enhance mental clarity with focused journaling and reflection workflows.' },
  { icon: '💤', title: 'Recovery & Sleep', description: 'Optimize rest, balance cortisol, and replenish energy for peak focus.' },
];

const FeatureCard = ({ icon, title, description }: { icon: string; title: string; description: string }) => (
  <div className="feature-card text-center p-8 rounded-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
    <h3 className="text-2xl font-bold mb-4">{icon} {title}</h3>
    <p>{description}</p>
  </div>
);

const LandingPage = () => {
  const router = useRouter();

  return (
    <div className="theme-wrapper">
      <style jsx>{`
        .theme-wrapper {
          background: radial-gradient(circle at 50% 0%, var(--background-start), var(--background-end));
          color: var(--text-primary);
        }
        header {
          background: linear-gradient(90deg, var(--header-start), var(--header-end));
          color: var(--header-text);
          padding: 4rem 1rem;
          text-align: center;
        }
        .cta-button {
          display: inline-block;
          background-color: var(--cta-bg);
          color: var(--cta-text);
          padding: 0.75rem 2rem;
          font-weight: 600;
          border-radius: 30px;
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 1.1rem;
        }
        .cta-button:hover {
          background-color: var(--cta-hover-bg);
          transform: translateY(-3px);
        }
        .feature-card {
          background: var(--card-bg);
          border: 1px solid var(--card-border, transparent);
          backdrop-filter: blur(8px);
        }
        .feature-card:hover {
          background: var(--card-hover-bg);
        }
        .feature-card h3 {
          color: var(--card-title);
        }
        .feature-card p {
          color: var(--text-secondary);
        }
        footer {
          color: var(--text-secondary);
        }
      `}</style>

      <header>
        <h1 className="text-5xl font-bold mb-4">🚀 Product Overview</h1>
        <p className="text-lg max-w-2xl mx-auto mb-8">
          Master the art of peak performance. Discover your brain’s unique flow profile and transform how you set goals, build habits, and thrive.
        </p>
        <a 
          href="#" 
          className="cta-button"
          onClick={(e) => {
            e.preventDefault();
            router.push('/onboarding/brain-profile-quiz');
          }}
        >
          ✨ Start Your Journey
        </a>
      </header>

      <section className="max-w-6xl mx-auto my-16 p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(feature => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </section>

      <footer className="text-center py-8 text-sm">
        &copy; 2025 FlowScience. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;