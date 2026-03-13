import { NextRequest, NextResponse } from "next/server";
import { callGroq } from "@/lib/groq";

export async function POST(req: NextRequest) {
  try {
    const { company } = await req.json();

    if (!company) {
      return NextResponse.json({ error: "Company data is required" }, { status: 400 });
    }

    const systemPrompt = `You are an expert technical recruiter and interviewer. Generate realistic interview questions. Return ONLY clean HTML fragments. Use standard HTML tags like <div>, <h4>, <ul>, <li>, <strong>. Style classes are not needed. Keep the tone encouraging.`;
    
    const userPrompt = `I am a CS undergrad attending a career fair. I want to visit the booth for ${company.name}. 
    Industry: ${company.industry}. 
    They are hiring for: ${company.positions}. 
    Their tech stack is: ${company.techStack}.
    
    Please provide:
    1. Two technical questions I might be asked based on this stack/role.
    2. One behavioral question relevant to their industry.
    3. A one-sentence tip on how to impress them at the booth.
    
    Format using clean HTML layout. Return as a JSON object with a key 'html'.`;

    const responseText = await callGroq(systemPrompt, userPrompt);
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
