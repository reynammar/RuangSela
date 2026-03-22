# RuangSela: Academic Stress Detection & Peer-Support Platform

**RuangSela** is a comprehensive student wellbeing platform built to identify early signs of academic stress and provide non-clinical, empathetic support before burnout escalates into a crisis.

*“Jeda sejenak, pahami dirimu.” (Pause for a moment, understand yourself.)*

## 🏆 Product Positioning (For Competitions)
**How RuangSela differs from generic mental health apps:**
Most mental health applications are reactive—users only download them when dealing with clinical-level depression or severe anxiety. They focus heavily on matching users with paid psychologists, which has a high barrier to entry for university students. 

**RuangSela is purely proactive and ecosystem-driven:**
1. **Vertical Focus:** It's specifically mapped to the *academic structural load* (Credits/SKS, Projects, Exams). It measures stress relative to academic output, not just generalized anxiety.
2. **Non-Diagnostic AI:** The AI Reflection tool does *not* diagnose. It uses CBT-lite reframing to help students untangle specific campus-related emotional knots, significantly lowering medical liability risks.
3. **Consent-Based Peer Escalation:** Before paying for a psychologist, students use the "Trusted Buddy" system to safely reach out to friends without feeling like a burden. 
4. **Crisis Deflection:** Built-in safeguards instantly detect high-risk vocabulary (self-harm, extreme despair) and override regular UI with emergency hotline buttons (Kemenkes 119).

## 🗂️ Core Features
- **Academic Stress Radar:** A weekly check-in mapping task load against exhaustion to calculate early burnout warnings.
- **AI Journal Insight:** A secure journaling tool parsed by an LLM to identify dominant emotions, exact triggers, and actionable next steps.
- **Trusted Buddy System:** One-click WhatsApp message templates to alert trusted friends when feeling overwhelmed.
- **Help & Referral:** Immediate routing pathways to Campus Counselors, Partner Psychologists, or Emergency Services depending on self-reported urgency.

## 🏗️ Architecture Summary
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS v3 (Custom Plus Jakarta Sans typography)
- **Database & Auth:** Supabase (PostgreSQL + JWT SSR Auth)
- **Component Lib:** shadcn/ui + Lucide Icons
- **ML/AI:** Generative LLM via prompt-engineered secure architectures.

## 🚀 Setup Instructions
1. Clone the repository.
2. Install dependencies: `npm install`
3. Rename `.env.example` to `.env.local` and add your keys:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```
4. Run the Supabase SQL schema from `supabase/schema.sql`.
5. Run the Supabase SQL Seed data from `supabase/seed.sql` to populate demo accounts.
6. Start the development server: `npm run dev`

## 👨‍⚖️ Demo Day Handoff (For Judges)
We have prepared a frictionless "Demo Mode" for competition judges to experience both ends of the product spectrum without needing to input extensive data manually.

### Demo User Flow:
From the Landing Page (`/`), click the **"Demo Mode (Judges)"** button. This will redirect to the login page where Judge credentials can be quickly utilized to view seeded states:

**Demo Account 1 (Healthy/Low Risk)**
- **Email:** `budi@example.com`
- **Password:** `password123`
- *What to show:* The Dashboard showing "Aman" status. A Journal insight that detects mild fatigue from group projects, responding with positive reinforcement.

**Demo Account 2 (Burnout/High Risk)**
- **Email:** `sari@example.com`
- **Password:** `password123`
- *What to show:* The Dashboard showing "Tinggi" (Burnout warning). Open her latest Journal entry `/journal/:id` to show how the AI immediately intercepts the UI with a red **Crisis Banner** because it detected words of extreme despair. Show the `/help` page where she has an active pending request for a Clinical Psychologist.

---
### UI/UX Language
The application intentionally uses *Indonesian* to bridge emotional intimacy with local students and completely avoids sterile, legalistic "medical-English". By utilizing a cohesive color palette of Sage Green and Soft Blue, the app maintains a psychologically safe, calming environment.
