import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT) || 3000;

async function startServer() {
  const app = express();

  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Gemini AI Strategy Advisor Endpoint
  app.post('/api/consultation', async (req, res) => {
    try {
      const { firstName, lastName, email, inquiryType, projectDetails, budget, timeline } = req.body;

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        // Fallback response if GEMINI_API_KEY is not configured
        return res.json({
          summary: `Thank you, ${firstName || 'valued client'}. We have logged your request for ${inquiryType || 'Digital Transformation'}. Our technical lead at Apex Nova Digital will analyze your project requirements and connect via ${email || 'email'}.`,
          recommendedArchitecture: [
            'Microservices Architecture (Node.js/TypeScript)',
            'Scalable Cloud Hosting (Cloud Run / AWS ECS)',
            'React / Next.js High-Performance Frontend',
            'PostgreSQL / Redis Multi-Tier Caching Data Store'
          ],
          keyDeliverables: [
            'Technical Architecture Specification Document',
            'UI/UX Design System & Component Library',
            'Production-Ready Source Code with Automated CI/CD',
            'Security Audit & Load Performance Verification'
          ],
          estimatedScope: timeline ? `Estimated duration: ${timeline}` : '4 to 8 Weeks Sprint Cycles',
          nextSteps: [
            'Initial technical scope review by Apex Nova Digital engineering team',
            'Executive strategy call with leadership',
            'Formal proposal & roadmap sign-off'
          ]
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `
You are the Executive Technical Solution Architect at Apex Nova Digital (founded by CEO Pradip Khadka).
A prospective enterprise client submitted a consultation inquiry with the following details:
- Client Name: ${firstName || 'N/A'} ${lastName || 'N/A'}
- Email: ${email || 'N/A'}
- Inquiry Type: ${inquiryType || 'General Digital Transformation'}
- Project Details: ${projectDetails || 'No details provided'}
- Target Budget: ${budget || 'To be evaluated'}
- Target Timeline: ${timeline || 'Flexible'}

Provide a structured, authoritative JSON response with recommendations in this EXACT format:
{
  "summary": "2-3 concise, highly professional sentences outlining Apex Nova Digital's approach to this project.",
  "recommendedArchitecture": ["4 key technical architecture components or frameworks recommended"],
  "keyDeliverables": ["4 core project deliverables"],
  "estimatedScope": "Realistic timeline and team structure suggestion",
  "nextSteps": ["3 clear immediate next steps for the client"]
}
`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      const responseText = response.text;
      if (responseText) {
        const parsed = JSON.parse(responseText);
        return res.json(parsed);
      } else {
        throw new Error('Empty response from AI model');
      }
    } catch (err: any) {
      console.error('Error handling /api/consultation:', err);
      return res.status(500).json({
        error: 'Failed to generate proposal',
        details: err.message || 'Server error'
      });
    }
  });

  // Vite Middleware for Development vs Static for Production
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Apex Nova Digital Server running on http://localhost:${PORT}`);
  });
}

startServer();
