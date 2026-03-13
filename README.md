# IIT Career Fair AI 🚀

An AI-powered assistant designed for students attending the IIT Career Fair. This platform helps students navigate the fair efficiently by matching their skills with suitable companies and providing tailored interview preparation.

![IIT Career Fair AI](public/og-image.png) *(Note: Add a screenshot of your app here if available)*

## ✨ Features

- **🤖 AI Matchmaker**: Enter your skills and interests to receive 3 personalized company recommendations. The AI analyzes company tech stacks and roles to find your best fit.
- **📝 AI Interview Prep**: Click on any company to generate realistic technical and behavioral interview questions tailored specifically to that company's stack and industry.
- **🔍 Smart Company Directory**: Browse a curated list of 30+ companies attending the fair, categorized by tiers (Tier 1: Product, Tier 2: High Growth, etc.).
- **⚡ Real-time Filtering**: Instantly search and filter companies by name, industry, tech stack, size, or tier.
- **🎨 Premium UI**: A modern, responsive dark-themed interface built for a seamless user experience.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI Engine**: [Groq SDK](https://groq.com/) (Llama-3.3-70b-versatile)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- A Groq API Key (Get one at [console.groq.com](https://console.groq.com/))

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/OshadhaVimuB/IIT-Career-Fair-AI.git
   cd iit-career-fair
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add your Groq API key:
   ```bash
   GROQ_API_KEY=your_groq_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
Built with ❤️ for the IIT Career Fair.
