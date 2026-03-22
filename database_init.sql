-- Database Initialization Script for RuangSela

-- 1. Table: trusted_buddies
CREATE TABLE IF NOT EXISTS public.trusted_buddies (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  buddy_name text NOT NULL,
  relationship text NOT NULL,
  phone_number text NOT NULL,
  notes text,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS (Row Level Security) for trusted_buddies
ALTER TABLE public.trusted_buddies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own buddies"
ON public.trusted_buddies FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own buddies"
ON public.trusted_buddies FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own buddies"
ON public.trusted_buddies FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own buddies"
ON public.trusted_buddies FOR DELETE
USING (auth.uid() = user_id);


-- 2. Table: stress_assessments (if not already created)
CREATE TABLE IF NOT EXISTS public.stress_assessments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  responses jsonb NOT NULL,
  assessed_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.stress_assessments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own assessments" ON public.stress_assessments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own assessments" ON public.stress_assessments FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 3. Table: journal_entries (if not already created)
CREATE TABLE IF NOT EXISTS public.journal_entries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  mood text,
  content text NOT NULL,
  ai_summary text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own journals" ON public.journal_entries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own journals" ON public.journal_entries FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 4. Table: help_requests (if not already created)
CREATE TABLE IF NOT EXISTS public.help_requests (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  issue_category text NOT NULL,
  preferred_support text NOT NULL,
  urgency_level text NOT NULL,
  description text,
  status text DEFAULT 'pending',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.help_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own requests" ON public.help_requests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own requests" ON public.help_requests FOR INSERT WITH CHECK (auth.uid() = user_id);
