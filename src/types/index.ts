export type CompanySize = 'Small' | 'Medium' | 'Large';

export interface Company {
  name: string;
  industry: string;
  positions: string;
  techStack: string;
  tier: string;
  size: CompanySize;
}

export interface MatchRecommendation {
  companyName: string;
  reason: string;
}

export interface InterviewPrep {
  technicalQuestions: string[];
  behavioralQuestion: string;
  tip: string;
}
