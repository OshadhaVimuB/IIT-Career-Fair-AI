import { NextRequest, NextResponse } from "next/server";
import { callClaude } from "@/lib/claude";
import { companiesData } from "@/data/companies";

export async function POST(req: NextRequest) {
  try {
    const { skills } = await req.json();

    if (!skills) {
      return NextResponse.json({ error: "Skills are required" }, { status: 400 });
    }

    // Simplify data for token efficiency
    const catalog = companiesData.map(c => ({
      name: c.name,
      roles: c.positions,
      stack: c.techStack,
      tier: c.tier
    }));

    const systemPrompt = "You are an elite university career coach specializing in placing Computer Science students into high-impact internships. Your goal is to provide sophisticated, strategic matches that consider technical growth, mentorship culture, and career trajectory. Focus specifically on internship opportunities.";
    const userPrompt = `I am a CS student seeking a summer internship. My skills and interests are: "${skills}". 
    Here is the list of companies attending the career fair: ${JSON.stringify(catalog)}. 
    Recommend exactly 3 companies where I have the highest potential for a successful internship match. Keep the reasoning professional, technical, and highlight exactly why this internship would be a great fit for my specific skill set.
    Return the response as a JSON object with a key 'recommendations' which is an array of objects containing 'companyName' and 'reason'.`;

    const responseText = await callClaude(systemPrompt, userPrompt);
    const result = JSON.parse(responseText);

    return NextResponse.json({ recommendations: result.recommendations || [] });
  } catch (error: any) {
    console.error("Matchmaker API Error:", error);
    return NextResponse.json({ error: "Failed to fetch recommendations" }, { status: 500 });
  }
}
