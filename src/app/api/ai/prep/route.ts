import { NextRequest, NextResponse } from "next/server";
import { callClaude } from "@/lib/claude";

export async function POST(req: NextRequest) {
  try {
    const { company } = await req.json();

    if (!company) {
      return NextResponse.json({ error: "Company data is required" }, { status: 400 });
    }

    const systemPrompt = `You are a Senior Technical Recruiter who specializes in university relations and internship hiring. You generate high-quality, practical interview preparation materials specifically for undergraduate interns. Your goal is to provide insightful, accurate, and actionable advice that helps students stand out in a competitive internship market. Return ONLY clean HTML fragments. Use standard HTML tags like <div>, <h4>, <ul>, <li>, <strong>. Style classes are not needed. Keep the tone professional yet encouraging.`;
    
    const userPrompt = `I am a CS undergraduate looking for a technical internship. I am visiting the booth for ${company.name}. 
    Industry: ${company.industry}. 
    They are hiring for: ${company.positions}. 
    Their tech stack is: ${company.techStack}.
    
    Please provide:
    1. Two technical interview questions specifically tailored for an INTERN role (focus on fundamentals and potential) based on their tech stack.
    2. One behavioral question that helps demonstrate my passion and ability to learn quickly in a professional environment.
    3. A strategic "Pro Tip" for an intern candidate to impress them at the booth (e.g., mention a specific project or show curiosity about their code culture).
    
    Format using clean HTML layout. Return as a JSON object with a key 'html'.`;

    const responseText = await callClaude(systemPrompt, userPrompt);
    let { html } = JSON.parse(responseText);

    // Inject custom tailwind classes for the injected HTML to match dark mode (Server side)
    html = html
      .replace(/<h4/g, '<h4 class="text-foreground font-bold text-base mt-4 mb-2 flex items-center gap-2 border-b border-border pb-1"')
      .replace(/<ul/g, '<ul class="list-disc pl-5 space-y-2 text-muted-foreground"')
      .replace(/<li/g, '<li class="leading-relaxed"');

    return NextResponse.json({ html });
  } catch (error: any) {
    console.error("Interview Prep API Error:", error);
    return NextResponse.json({ error: "Failed to generate interview prep" }, { status: 500 });
  }
}
