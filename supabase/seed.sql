-- ==============================================================================
-- RuangSela Realistic Dummy Data (Seed)
-- Simulates two distinct users: a low-risk student and a high-risk student.
-- ==============================================================================

-- NOTE: Ensure UUIDs correspond to actual auth.users if verifying in a real project.
-- Here we're using static UUIDs mapped appropriately.
DO $$
DECLARE
  user_a uuid := '11111111-1111-1111-1111-111111111111'; -- Budi (Aman / Waspada)
  user_b uuid := '22222222-2222-2222-2222-222222222222'; -- Sari (Tinggi / High Risk)
  checkin_a uuid := '33333333-3333-3333-3333-333333333333';
  checkin_b uuid := '44444444-4444-4444-4444-444444444444';
  journal_a uuid := '55555555-5555-5555-5555-555555555555';
  journal_b uuid := '66666666-6666-6666-6666-666666666666';
BEGIN

  -- 1. Insert Profiles
  INSERT INTO public.profiles (id, full_name, university, faculty, major, semester)
  VALUES 
    (user_a, 'Budi Santoso', 'Universitas Indonesia', 'Fasilkom', 'Ilmu Komputer', 4),
    (user_b, 'Sari Wijaya', 'Institut Teknologi Bandung', 'SAPPK', 'Arsitektur', 8)
  ON CONFLICT DO NOTHING;

  -- 2. Insert Onboarding (Baseline)
  INSERT INTO public.stress_onboarding (user_id, sks_count, org_involvement, sleep_hours)
  VALUES 
    (user_a, 20, 'Sedang', 6.5),
    (user_b, 14, 'Rendah', 4.0) -- Low SKS but final year, poor sleep
  ON CONFLICT DO NOTHING;

  -- 3. Insert Check-ins
  INSERT INTO public.stress_checkins (id, user_id, deadlines_count, exams_count, exhaustion_level, academic_pressure, emotional_overwhelm)
  VALUES 
    (checkin_a, user_a, 2, 0, 5, 5, 4),
    (checkin_b, user_b, 5, 1, 9, 9, 10)
  ON CONFLICT DO NOTHING;

  -- 4. Insert Stress Results
  INSERT INTO public.stress_results (user_id, checkin_id, score, level, overload_indicator, burnout_risk, assessed_at)
  VALUES 
    (user_a, checkin_a, 35, 'Aman', false, false, now() - INTERVAL '2 days'),
    (user_b, checkin_b, 85, 'Tinggi', true, true, now() - INTERVAL '1 hour')
  ON CONFLICT DO NOTHING;

  -- 5. Insert Journals
  INSERT INTO public.journals (id, user_id, content, mood)
  VALUES 
    (journal_a, user_a, 'Tugas struktur data lumayan susah, tapi tadi akhirnya kelar dibantu teman kelompok. Lumayan capek tapi senang.', 'Senang'),
    (journal_b, user_b, 'Aku benar-benar tidak sanggup lagi revisi studio. Rasanya mau mati saja melihat gambar-gambar ini. Dosen tidak pernah puas. Aku merasa sangat sendirian dan ingin menyerah total.', 'Sedih')
  ON CONFLICT DO NOTHING;

  -- 6. Insert AI Insights
  INSERT INTO public.ai_insights (journal_id, summary, emotions, triggers, coping_suggestions, next_step, concerning_signs)
  VALUES 
    (journal_a, 
     'Kamu merasa cukup kelelahan setelah mengerjakan tugas yang menantang, namun senang karena bisa menyelesaikannya bersama teman.', 
     '["Lelah", "Lega", "Senang"]'::jsonb, 
     '["Materi yang sulit", "Tugas kelompok"]'::jsonb, 
     '["Luangkan waktu apresiasi diri sendiri atas progres hari ini.", "Istirahat sejenak sebelum pindah ke tugas selanjutnya."]'::jsonb, 
     'Tidur yang cukup malam ini.', 
     false),
     
    (journal_b, 
     'Aku mendengar betapa lelah dan hancurnya perasaanmu menghadapi revisi tiada henti. Beban ini pasti terasa sangat berat.', 
     '["Putus Asa", "Kewalahan Total", "Merasa Ditolak"]'::jsonb, 
     '["Revisi studio", "Ekspektasi dosen", "Isolasi sosial"]'::jsonb, 
     '["Fokus pada keselamatan dirimu saat ini, jauhkan diri dari meja kerjamu setidaknya 15 menit.", "Hubungi teman terdekat atau hotline; jangan tanggung beban ini sendirian."]'::jsonb, 
     'Pejamkan mata, minum air putih, dan hubungi seseorang sekarang.', 
     true)
  ON CONFLICT DO NOTHING;

  -- 7. Insert Trusted Buddies
  INSERT INTO public.trusted_buddies (user_id, buddy_name, relationship, phone_number, notes)
  VALUES 
    (user_a, 'Kak Rini', 'Kakak / Adik', '081234567890', 'Bisa diajak ngobrol santai tanpa disalahkan'),
    (user_b, 'Andi Sahabatku', 'Sahabat', '089876543210', 'Selalu responsif kalau malem')
  ON CONFLICT DO NOTHING;

  -- 8. Insert Help Requests
  INSERT INTO public.help_requests (user_id, issue_category, description, urgency_level, preferred_support, status)
  VALUES 
    (user_b, 'Burnout Ekstrem', 'Saya butuh bantuan segera. Saya tidak bisa bangun dari kasur dan tidak sanggup melihat laptop lagi. Pikiran saya sangat gelap.', 'Tinggi', 'Psikolog Klinis', 'Menunggu')
  ON CONFLICT DO NOTHING;

END $$;
