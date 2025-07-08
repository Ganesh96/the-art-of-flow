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
  <div className="feature-card">
    <h3>{icon} {title}</h3>
    <p>{description}</p>
  </div>
);

const LandingPage = () => {
  const router = useRouter();

  return (
    <>
      <style jsx>{`
        .page-container {
          font-family: var(--font-geist-sans);
        }
        header {
          text-align: center;
          padding: 4rem 1rem;
          background: linear-gradient(90deg, var(--header-start), var(--header-end));
          color: var(--header-text);
        }
        h1 {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 1rem;
          font-family: var(--font-geist-mono);
        }
        header p {
          font-size: 1.2rem;
          max-width: 700px;
          margin: 0 auto 2rem;
        }
        .cta-button {
          display: inline-block;
          background: var(--cta-bg);
          color: var(--cta-text);
          padding: 0.75rem 2rem;
          font-weight: 600;
          border-radius: 30px;
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 1.1rem;
        }
        .cta-button:hover {
          background: var(--cta-hover-bg);
          transform: translateY(-3px);
        }
        .features {
          max-width: 1200px;
          margin: 4rem auto;
          padding: 2rem;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }
        .feature-card {
          background: var(--card-bg);
          border-radius: 12px;
          padding: 2rem;
          text-align: center;
          backdrop-filter: blur(8px);
          transition: transform 0.3s ease, background 0.3s ease;
          border: var(--card-border, 1px solid transparent);
          box-shadow: var(--card-shadow);
        }
        .feature-card:hover {
          transform: translateY(-5px);
          background: var(--card-hover-bg);
        }
        .feature-card h3 {
          font-family: var(--font-geist-mono);
          font-size: 1.3rem;
          color: var(--card-title);
          margin-bottom: 1rem;
          font-weight: 700;
        }
        .feature-card p {
          font-size: 1rem;
          color: var(--text-secondary);
        }
        footer {
          text-align: center;
          padding: 2rem 1rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
      `}</style>
      <div className="page-container">
        <header>
          <h1>🚀 Product Overview</h1>
          <p>Master the art of peak performance. Discover your brain’s unique flow profile and transform how you set goals, build habits, and thrive.</p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              router.push('/onboarding/brain-profile-quiz');
            }}
            className="cta-button">
            ✨ Start Your Journey
          </a>
        </header>

        <section className="features">
          {features.map(feature => <FeatureCard key={feature.title} {...feature} />)}
        </section>

        <footer>
          &copy; 2025 FlowScience. All rights reserved.
        </footer>
      </div>
    </>
  );
};

export default LandingPage;