# Full Technical Plan: Flow Optimization Web App

This document outlines a comprehensive technical plan for the "Flow Optimization Web App," designed to be easily digestible by an LLM for quick understanding and extraction of key details. It covers product vision, user personas, features, screen flows, technical architecture, database design, UX/UI, and development strategy, all deeply integrated with the principles of flow, productivity, and well-being.

## 1. Product Vision & Goals

* **Overall Objective:** To create a web-only application that empowers users to consistently achieve flow states, boost productivity, and enhance overall well-being by applying neuroscience-backed protocols and personalized strategies.

* **Core Value Proposition:**

    * Personalized understanding of individual flow architecture ("Brain Profile").

    * Actionable systems for goal setting, habit formation, and task management.

    * Tools for intentional flow engagement, active recovery, and sleep optimization.

    * Guided journaling and cognitive exercises for mental clarity and anxiety control.

    * A minimalist, distraction-free UI designed to reduce cognitive load.

## 2. User Personas

### Persona 1: "The Overwhelmed Achiever" (Sarah, 32, Marketing Manager)

* **Pain Points:** Constantly busy, but feels unproductive; struggles with `dispersion` (too many projects); easily distracted by `the phone`; experiences `allostatic load` leading to burnout; wants to do deep work but can't find focus; struggles with `procrastination` on important tasks.

* **Goals:** Achieve more meaningful work; reduce stress; find focus blocks; learn to manage distractions; build consistent routines.

* **Flow Needs:** Needs help identifying `flow blockers`, structuring `deep work` sessions, and implementing `active recovery`.

### Persona 2: "The Aspiring Creator" (David, 28, Freelance Designer)

* **Pain Points:** Inconsistent work habits; struggles with `motivation` and `dopamine resensitization` (constant stimulation); difficulty setting and sticking to long-term `goals`; wants to optimize his `chronotype` for creative work; often works late, impacting `sleep`.

* **Goals:** Establish consistent creative routines; improve focus and output; leverage peak energy times; improve sleep quality; find intrinsic motivation.

* **Flow Needs:** Needs guidance on `goal stacking`, `dopamine reset`, `chronotype zone` optimization, and `high flow sleep`.

## 3. Core Features & Modules

* **Brain Profile Onboarding:** Interactive quiz to assess user's unique flow architecture.

* **Dashboard:** Personalized hub for daily focus, progress, and quick actions.

* **Goal & Task Management:** System for hierarchical goal breakdown and task execution.

* **Habit & Routine Builder:** Tools for creating, tracking, and sustaining positive habits.

* **Flow Session Tracking:** Timer and logging for deep work periods.

* **Active Recovery Scheduler:** Protocol library and scheduling for physical/mental rejuvenation.

* **Sleep Optimization Tools:** Guided practices and tracking for restorative sleep.

* **Journaling & Cognitive Tools:** Guided prompts for reflection, problem-solving, and mindset shifts.

* **In-House Calendar:** Visual scheduling tool for time management.

* **Analytics & Insights:** Personalized data visualizations and recommendations.

* **User Authentication:** Secure custom email/password signup/login.

## 4. Screen Flows (Key User Journeys)

### 4.1. Onboarding & Brain Profile Creation

1.  **User Signup/Login:** (Auth Module)

    * Screen: `/auth/signup` or `/auth/login`

    * Action: User creates account or logs in.

    * Transition: On successful authentication, redirect to `/onboarding/brain-profile-quiz`.

2.  **Brain Profile Quiz:** (Brain Profile Module)

    * Screen: `/onboarding/brain-profile-quiz` (multi-step, one question per screen)

    * Content: `Chronotype` assessment, `Flow Blockers` audit, `Flow Triggers` discovery, `Allostatic Load` score (slider), `Routine Preferences`, `Time Management Style`, `Dopamine Resensitization Needs`.

    * UI: Progress bar (`Goal Gradient`), clear question text, educational tooltips, `Next`/`Back` buttons (`Fitts's Law`).

    * Action: User answers questions. Answers are temporarily stored in local state.

    * Transition: Upon completion of last question, submit data to backend. Loading state (`Doherty Threshold`).

3.  **Brain Profile Summary:** (Brain Profile Module)

    * Screen: `/onboarding/profile-summary` (or directly to Dashboard with a modal summary)

    * Content: Visual summary of user's chronotype, identified blockers, and strongest triggers. Personalized initial recommendations.

    * Action: User reviews summary.

    * Transition: Redirect to `/dashboard`.

### 4.2. Daily Flow Engagement

1.  **Dashboard Access:** (Dashboard Module)

    * Screen: `/dashboard`

    * Content: `Daily Focus Panel` (highlighting `Hunter Method` "One Thing"), quick `Start Flow Session` CTA, `Habit/Routine Summary`, `Recent Insights`.

    * Action: User clicks "Start Flow Session".

    * Transition: Navigate to `/flow-session`.

2.  **Flow Session Start:** (Flow Session Module)

    * Screen: `/flow-session`

    * Content: Select `Goal-Directed Action` for the session, optionally select `Flow Triggers` to focus on.

    * Action: User starts timer.

    * Transition: Timer begins.

3.  **Flow Session In-Progress:** (Flow Session Module)

    * Screen: `/flow-session` (timer running)

    * Content: Minimalist UI, elapsed time, option to pause/end.

    * Action: User completes work, ends session.

    * Transition: Navigate to `/flow-session-feedback`.

4.  **Post-Flow Session Feedback:** (Flow Session Module)

    * Screen: `/flow-session-feedback`

    * Content: Prompt user to rate their experience of `Struggle`, `Release`, `Flow`, `Recovery` phases. Add notes.

    * Action: User submits feedback. Data saved to `flow_sessions` table.

    * Transition: Return to `/dashboard`.

### 4.3. Habit Building

1.  **Habit Builder Access:** (Habit/Routine Module)

    * Screen: `/habits`

    * Content: List of existing habits, "Add New Habit" CTA.

    * Action: User clicks "Add New Habit".

    * Transition: Navigate to `/habits/new`.

2.  **New Habit Wizard:** (Habit/Routine Module)

    * Screen: `/habits/new` (multi-step wizard)

    * Content: Prompts for `Identity` ("Who do you want to become?"), `Micro Habit` suggestions, `Cue-Routine-Reward` definition, `Habit Chaining` (snowballing).

    * Action: User defines habit.

    * Transition: Save habit, return to `/habits`.

3.  **Habit Tracking:** (Habit/Routine Module)

    * Screen: `/habits` or Dashboard widget

    * Content: `Seinfeld Calendar` view for streaks, daily check-off.

    * Action: User checks off completed habit.

    * Transition: Streak updates.

### 4.4. Goal Management

1.  **Goal Stack Access:** (Goal Module)

    * Screen: `/goals`

    * Content: Visual representation of `Goal Stack` (Purpose, High Hard Goal, etc.), nested view.

    * Action: User adds new goal or drills down.

    * Transition: To `/goals/new` or specific goal detail.

2.  **Task Creation:** (Goal Module)

    * Screen: `/goals/[id]/add-task` or inline on goal detail.

    * Content: Input for `Goal-Directed Action`, prompt for `Microscopic Goals`, `First Action So Easy`.

    * Action: User creates task.

    * Transition: Task added to relevant goal.

3.  **Task Completion:** (Goal Module / Dashboard)

    * Screen: Dashboard or `/goals`

    * Content: Task list with completion checkbox.

    * Action: User marks task complete.

    * Transition: Task removed/marked, progress updated.

## 5. Technical Architecture

* **Frontend Stack:**

    * **Framework:** Next.js (React) - Fast, SEO-friendly, file-based routing, server-side rendering capabilities.

    * **Language:** TypeScript - Type safety, improved developer experience, fewer runtime errors.

    * **Styling:** Tailwind CSS - Utility-first CSS framework for rapid, consistent, and responsive UI development.

    * **Animations:** Framer Motion - Declarative library for smooth, performant micro-interactions and transitions.

    * **State & Data Fetching:** TanStack Query (React Query) - Caching, background refetching, network state management for efficient data handling.

    * **Global State (Optional):** Zustand - Simple, performant, and flexible global state management if needed beyond TanStack Query's capabilities.

* **Backend / Database Stack:**

    * **Platform:** Supabase - Provides PostgreSQL database, Authentication, and auto-generated APIs.

    * **Database:** PostgreSQL - Robust, relational database perfect for structured data (users, goals, events).

    * **Authentication:** Supabase Auth - Handles user signup, login, session management.

    * **Storage:** Supabase Storage (for future user-uploaded assets, e.g., journal images).

* **API Interaction:**

    * **Client Library:** Supabase JS client - Direct interaction with Supabase services from the frontend.

    * **Auth Session:** Managed securely client-side by Supabase JS client.

    * **Data Flow:** TanStack Query handles data fetching, caching, and invalidation, optimizing API calls.

## 6. Database Schema (Detailed)

All tables will have `id UUID PRIMARY KEY DEFAULT uuid_generate_v4()`, `user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL`, `created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()`, `updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()`. `updated_at` will be automatically updated via a PostgreSQL trigger. All tables will have `RLS enabled`.

### `public.users` (Managed by Supabase Auth)

* `id`: UUID (PK, from auth.users)

* `email`: TEXT

* `password_hash`: TEXT

* `created_at`: TIMESTAMP

### `public.brain_profiles`

* `id`: UUID (PK)

* `user_id`: UUID (FK to `auth.users`, UNIQUE)

* `chronotype`: TEXT (`lark`, `owl`, `third_bird`)

* `flow_triggers`: JSONB (Array of strings: `clear_goals`, `immediate_feedback`, `challenge_skills_balance`, `high_consequences`, `novelty_complexity`)

* `flow_blockers`: JSONB (Array of strings: `phone_distraction`, `general_distraction`, `friction`, `dispersion`, `allostatic_load_symptom`)

* `routine_preferences`: JSONB (Array of strings: `fixed_schedule`, `flexible_flow`, `habit_chaining`, `minimal_viable`)

* `time_management_style`: TEXT (`time_blocker`, `priority_lister`, `engage_immediately`, `flexible_adapter`)

* `allostatic_load_score`: INTEGER (0-100, from slider)

* `dopamine_resensitization_needs`: JSONB (Array of strings: `digital_detox`, `boring_breaks`, `single_tasking`, `novelty_seeking`)

### `public.goals`

* `id`: UUID (PK)

* `user_id`: UUID (FK)

* `title`: TEXT

* `description`: TEXT (Optional)

* `level`: TEXT (`purpose`, `high_hard_goal`, `annual`, `quarterly`, `monthly`, `weekly`, `daily_action`)

* `parent_goal_id`: UUID (Nullable FK to `goals.id` for hierarchical structure)

* `due_date`: DATE (Optional)

* `is_completed`: BOOLEAN DEFAULT FALSE

* `completed_at`: TIMESTAMP (Nullable)

### `public.habits`

* `id`: UUID (PK)

* `user_id`: UUID (FK)

* `title`: TEXT

* `description`: TEXT (Optional)

* `frequency`: TEXT (`daily`, `weekly`, `custom_days`)

* `cue`: TEXT (For `Cue-Routine-Reward`)

* `routine`: TEXT (For `Cue-Routine-Reward`)

* `reward`: TEXT (For `Cue-Routine-Reward`)

* `current_streak`: INTEGER DEFAULT 0

* `longest_streak`: INTEGER DEFAULT 0

* `last_completed_date`: DATE (Nullable)

* `is_archived`: BOOLEAN DEFAULT FALSE

### `public.habit_completions` (Junction table for tracking daily/weekly completions)

* `id`: UUID (PK)

* `habit_id`: UUID (FK to `habits.id`)

* `completion_date`: DATE

* `user_id`: UUID (FK for RLS)

* `created_at`: TIMESTAMP

### `public.flow_sessions`

* `id`: UUID (PK)

* `user_id`: UUID (FK)

* `start_time`: TIMESTAMP WITH TIME ZONE

* `end_time`: TIMESTAMP WITH TIME ZONE

* `duration_minutes`: INTEGER

* `associated_goal_id`: UUID (Nullable FK to `goals.id`)

* `user_notes`: TEXT (Optional, for post-session feedback)

* `rated_struggle`: INTEGER (1-5)

* `rated_release`: INTEGER (1-5)

* `rated_flow`: INTEGER (1-5)

* `rated_recovery`: INTEGER (1-5)

* `triggers_used`: JSONB (Array of strings: `clear_goals`, `immediate_feedback`, etc.)

### `public.recovery_sessions`

* `id`: UUID (PK)

* `user_id`: UUID (FK)

* `start_time`: TIMESTAMP WITH TIME ZONE

* `end_time`: TIMESTAMP WITH TIME ZONE

* `duration_minutes`: INTEGER

* `recovery_type`: TEXT (`breathwork`, `cold_therapy`, `nature_walk`, `meditation`, `exercise`, `other`)

* `notes`: TEXT (Optional)

* `perceived_effectiveness`: INTEGER (1-5)

### `public.sleep_logs`

* `id`: UUID (PK)

* `user_id`: UUID (FK)

* `sleep_date`: DATE (Date of going to bed)

* `bed_time`: TIME WITH TIME ZONE

* `wake_time`: TIME WITH TIME ZONE

* `total_sleep_minutes`: INTEGER

* `sleep_quality_rating`: INTEGER (1-5)

* `80_20_adherence`: JSONB (Object: `{ deaf: true, blind: false, cold: true, hungry: true, consistent: true }`)

* `notes`: TEXT (Optional)

### `public.journal_entries`

* `id`: UUID (PK)

* `user_id`: UUID (FK)

* `entry_date`: DATE

* `entry_time`: TIME WITH TIME ZONE

* `content`: TEXT (Main journal entry)

* `prompt_type`: TEXT (e.g., `free_text`, `dopamine_reset`, `fear_labeling`, `rumination_upgrade`)

* `associated_goal_id`: UUID (Nullable FK to `goals.id`)

* `tags`: JSONB (Array of strings for categorization)

### `public.calendar_events`

* `id`: UUID (PK)

* `user_id`: UUID (FK)

* `title`: TEXT

* `description`: TEXT (Optional)

* `start_time`: TIMESTAMP WITH TIME ZONE

* `end_time`: TIMESTAMP WITH TIME ZONE

* `event_type`: TEXT (`work_block`, `recovery_session`, `habit_slot`, `personal`, `other`)

* `color_code`: TEXT (HEX color for visual distinction)

* `is_all_day`: BOOLEAN DEFAULT FALSE

## 7. UX/UI Design Principles & Visual System

* **Core Principles:**

    * **Minimalism & Clarity:** Reduce visual clutter to minimize `cognitive load` (`Law of Prägnanz`). Every element serves a purpose.

    * **Actionable Design:** UI guides users towards `Goal-Directed Actions` and `Engage Rule` behaviors.

    * **Feedback-Rich:** Provide immediate, subtle feedback for all interactions (`Doherty Threshold`).

    * **Personalization:** UI adapts based on `Brain Profile` insights.

    * **Accessibility:** WCAG 2.1 AA compliant (color contrast, keyboard navigation).

* **Visual System:**

    * **Color Palette:** A vibrant, high-contrast palette (e.g., "Brilliant Blues" or "Energetic & Playful" from `colour combinations`). Consistent use of primary, secondary, and accent colors. Dark mode support.

    * **Typography:** `Inter` font for all text. Clear hierarchy (headings, body, captions).

    * **Design Tokens:** Centralized definitions for colors, spacing, border-radius, shadows.

    * **Iconography:** Consistent, minimalist icon set (e.g., outline style, Unicode characters where suitable). No SVG.

    * **UI Kit:** Comprehensive set of reusable components (buttons, forms, cards, modals, progress bars, calendar elements) with consistent styling.

    * **Animations:** Subtle, purposeful animations using Framer Motion for smooth transitions and delightful micro-interactions without distraction.

    * **Spacing:** Generous use of whitespace to improve readability and reduce visual density.

    * **Responsiveness:** Grid-based layouts (Tailwind CSS) ensuring optimal viewing across desktop, tablet, and mobile. Chart containers will have `max-width` and controlled `height` for proper scaling.

## 8. Performance & Scalability

* **Frontend Optimization:**

    * **Next.js Pre-rendering (SSR/SSG):** Leverage for fast initial page loads (e.g., dashboard, static content).

    * **Code-splitting:** Automatic splitting of JavaScript bundles for faster downloads.

    * **TanStack Query Caching:** Aggressive client-side caching of data, reducing redundant network requests.

    * **Image Optimization:** (If any images are introduced) Use Next.js Image component.

    * **Minimalist UI:** Fewer DOM elements and CSS rules inherently lead to better performance.

* **Backend Scalability (Supabase):**

    * **Connection Pooling:** Supabase handles connection pooling automatically, optimizing database connections.

    * **Optimized DB Indexes:** Ensure all frequently queried columns (especially `user_id`, `created_at`, `start_time`, `due_date`) are indexed.

    * **RLS Efficiency:** RLS policies are optimized at the database level.

* **Hosting:**

    * **Frontend:** Vercel (free tier for initial development, scales automatically).

    * **Backend/Database:** Supabase (free tier for initial development, scales to Pro/Enterprise as needed).

## 9. Security

* **Authentication:** Supabase Auth handles secure user registration, login, and session management.

* **Authorization:** Supabase Row-Level Security (RLS) ensures users can only access and modify their own data.

* **Data Validation:** Implement robust validation on both frontend (for immediate feedback) and backend (for data integrity) to prevent invalid or malicious data.

* **HTTPS:** All communication will be encrypted via HTTPS.

* **Environment Variables:** Sensitive keys stored securely in `.env.local` and not exposed to the client-side bundle.

## 10. Testing Strategy

* **Unit Tests:** React Testing Library (for components), Jest (for utility functions, data processing).

* **Integration Tests:** Cypress or Playwright (for testing flows across multiple components and API interactions).

* **Accessibility Testing:** Axe-core (automated checks), manual audits (keyboard navigation, screen reader compatibility).

* **Performance Audits:** Lighthouse (regular monitoring of Core Web Vitals).

* **End-to-End (E2E) Tests:** Simulate full user journeys (e.g., signup -> complete quiz -> log flow session).

## 11. Development Phases / MVP Definition

### Phase 1: Core Onboarding & Brain Profile (MVP)

* **Frontend:** Custom Signup/Login, Brain Profile Quiz (all questions), Brain Profile Summary display.

* **Backend:** Supabase `users` table (via Auth), `brain_profiles` table schema, RLS policies.

* **Key UX Laws:** `Hick's Law`, `Goal Gradient`, `Doherty Threshold` (for quiz).

### Phase 2: Daily Flow & Task Management

* **Frontend:** Dashboard, Goal Stack Builder, Task Creation/Completion, Basic Calendar View.

* **Backend:** `goals` table schema, `flow_sessions` table schema.

* **Key UX Laws:** `Hunter Method` prominence, `First Action So Easy` prompts.

### Phase 3: Habits & Core Wellness

* **Frontend:** Habit/Routine Builder, Seinfeld Calendar, Active Recovery Scheduler, Sleep Optimization Checklist.

* **Backend:** `habits` table, `habit_completions`, `recovery_sessions`, `sleep_logs` schemas.

* **Key UX Laws:** `Aesthetic-Usability Effect` for habit streaks, `80/20 Rule` checklist.

### Phase 4: Cognitive Tools & Analytics

* **Frontend:** Journaling Interface, Analytics Dashboard (basic charts).

* **Backend:** `journal_entries` schema.

* **Key UX Laws:** `Law of Prägnanz` for data visualization.

## 12. Future Enhancements (Post-MVP)

* **AI-Driven Recommendations Engine:** Personalized suggestions based on `Brain Profile` and tracked data (e.g., "Your `Dispersion` score is high; try the `Work Compression` protocol next week.").

* **AI Summarization:** Summarize `Journal Entries` for quick insights from `Upgraded Rumination`.

* **Social/Community Features:** Facilitate `Team Flow` concepts (e.g., shared goals, accountability partners).

* **Advanced Analytics:** Pattern detection, correlation analysis between sleep, recovery, and flow states.

* **Integrations:** With external calendar apps (Google Calendar, Outlook) for `Temporal Architect` syncing.

* **Gamification:** Badges, levels for consistent habit adherence or flow streaks.

* **Mobile Apps:** Native iOS/Android applications.