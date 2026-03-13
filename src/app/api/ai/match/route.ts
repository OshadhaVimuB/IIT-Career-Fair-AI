import { NextRequest, NextResponse } from "next/server";
import { callGroq } from "@/lib/groq";
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

    const systemPrompt = "You are an expert career counselor at a university computer science career fair. Your goal is to match the student's skills/interests with the perfect companies attending the fair.";
    const userPrompt = `I am a CS student. My skills/interests are: "${skills}". 
    Here is the list of companies attending: ${JSON.stringify(catalog)}. 
    Recommend exactly 3 companies I should visit. Keep the reasoning brief (1 sentence) highlighting the specific overlap.
    Return the response as a JSON object with a key 'recommendations' which is an array of objects containing 'companyName' and 'reason'.`;

    const responseText = await callGroq(systemPrompt, userPrompt);
    const result = JSON.parse(responseText);

    return NextResponse.json({ recommendations: result.recommendations || [] });
  } catch (error: any) {
    console.error("Matchmaker API Error:", error);
    return NextResponse.json({ error: "Failed to fetch recommendations" }, { status: 500 });
  }
}
