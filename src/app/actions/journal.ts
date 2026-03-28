"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export type AIInsightResult = {
  summary: string;
  emotions: string[];
  triggers: string[];
  coping_suggestions: string[];
  next_step: string;
  concerning_signs: boolean;
};

// In a real app, this would call OpenAI or Gemini via structured output (e.g. Vercel AI SDK generateObject)
async function generateAIInsights(content: string): Promise<AIInsightResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  console.log(
    "Debug - API Key present:",
    !!apiKey,
    apiKey?.substring(0, 10) + "...",
  );

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
    });

    const prompt = `
      You are a supportive, empathetic, and professional AI-reflection assistant for university students. 
      Your goal is to help students reflect on their journal entries without giving clinical diagnosis.
      
      Analyze this student journal entry:
      "${content}"

      Return a JSON object with the following structure:
      {
        "summary": "A 1-2 sentence empathetic summary/validation of their feelings.",
        "emotions": ["3 specific emotions identified"],
        "triggers": ["1-2 potential academic or emotional triggers identified"],
        "coping_suggestions": ["2 short, practical, and gentle self-care or academic tips"],
        "next_step": "A single, tiny actionable step to take now (e.g., drink water, 5 min walk).",
        "concerning_signs": boolean (True if the content strongly implies self-harm or deep clinical crisis)
      }

      Keep the language warm and Indonesian (Bahasa Indonesia). 
      IMPORTANT: You are NOT a psychologist.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Attempt to extract JSON if it's wrapped in markers or not quite perfect
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const cleanText = jsonMatch ? jsonMatch[0] : text;
    return JSON.parse(cleanText) as AIInsightResult;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Gemini Error Details:", JSON.stringify(error, null, 2));
    // Fallback to basic insights if API fails
    return {
      summary:
        "Terima kasih sudah berbagi. Maaf, saat ini modul analisis AI sedang beristirahat sebentar, namun ceritamu sudah tersimpan aman.",
      emotions: ["Telah Berbagi"],
      triggers: ["-"],
      coping_suggestions: [
        "Tarik napas dalam-dalam.",
        "Coba baca kembali tulisanmu besok.",
      ],
      next_step: "Istirahat sejenak dari aktivitas.",
      concerning_signs: false,
    };
  }
}

export async function submitJournalEntry(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "Unauthorized" };
  }

  const content = formData.get("content") as string;
  const mood = (formData.get("mood") as string) || "Netral";

  if (!content || content.trim().length < 10) {
    return {
      success: false,
      error: "Jurnal terlalu singkat. Ceritakan sedikit lebih banyak.",
    };
  }

  // 1. Generate AI Insights (Mocked for MVP)
  // Constraint: NOT a psychologist.
  const insights = await generateAIInsights(content);

  // 2. Save to DB
  const { data, error } = await supabase
    .from("journal_entries")
    .insert({
      user_id: user.id,
      content,
      mood,
      ai_summary: insights.summary,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ai_insights: insights as any,
    })
    .select("id")
    .single();

  if (error || !data) {
    return {
      success: false,
      error: error?.message || "Gagal menyimpan jurnal",
    };
  }

  revalidatePath("/dashboard");
  revalidatePath("/journal");

  // Redirect to the insight result page
  redirect(`/journal/${data.id}`);
}
