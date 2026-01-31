import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import RecordModel from './models/Record';
import UserModel from './models/User';

dotenv.config();

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 4000;

app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoUri = process.env.MONGO_URI || '';
if (!mongoUri) {
  console.warn('Warning: MONGO_URI is not set. Set it in backend/.env or backend/.env.local');
}

mongoose.connect(mongoUri, { dbName: process.env.MONGO_DB_NAME || undefined })
  .then(async () => {
    console.log('Connected to MongoDB');
    try {
      // Seed multiple test users with comprehensive dummy data
      const testUsers = [
        { username: 'test@123', password: 'test123', email: 'test@example.com' },
        { username: 'test2', password: 'test123', email: 'test2@example.com' },
        { username: 'demo', password: 'demo123', email: 'demo@example.com' }
      ];

      for (const userCreds of testUsers) {
        let testUser: any = await UserModel.findOne({ username: userCreds.username });
        if (!testUser) {
          console.log('Seeding test user:', userCreds.username);
          testUser = await (UserModel as any).createWithPassword(userCreds.username, userCreds.password, userCreds.email);
        }

        const existing = await RecordModel.findOne({ userId: testUser._id }).lean();
        if (!existing) {
          console.log('Seeding comprehensive dummy records for', userCreds.username);
          // Comprehensive MENU_ITEMS
          const MENU_ITEMS = [
            { id: '1', name: 'Signature Burger', unitPrice: 15, costPerUnit: 6 },
            { id: '2', name: 'Quinoa Salad', unitPrice: 12, costPerUnit: 4 },
            { id: '3', name: 'Truffle Pasta', unitPrice: 22, costPerUnit: 9 },
            { id: '4', name: 'Grilled Salmon', unitPrice: 25, costPerUnit: 12 },
            { id: '5', name: 'Avocado Toast', unitPrice: 14, costPerUnit: 5 }
          ];

          const generateHistory = () => {
            const history: any[] = [];
            const now = new Date();

            // Generate 60 days of historical data for better forecast accuracy
            for (let i = 59; i >= 0; i--) {
              const date = new Date(now);
              date.setDate(now.getDate() - i);
              const dateStr = date.toISOString().split('T')[0];
              const dayOfWeek = date.getDay();

              MENU_ITEMS.forEach(item => {
                // Different patterns for different days
                const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
                const isMonday = dayOfWeek === 1;
                const isFriday = dayOfWeek === 5;

                let baseDemand = 0;
                switch (item.id) {
                  case '1': baseDemand = 35; break; // Burger: popular
                  case '2': baseDemand = 18; break; // Salad: moderate
                  case '3': baseDemand = 12; break; // Pasta: less popular
                  case '4': baseDemand = 15; break; // Salmon: moderate
                  case '5': baseDemand = 22; break; // Toast: popular
                  default: baseDemand = 20;
                }

                // Apply day-of-week multipliers
                let multiplier = 1.0;
                if (isWeekend) multiplier = 1.5; // 50% more on weekends
                if (isFriday) multiplier = 1.4; // 40% more on Friday
                if (isMonday) multiplier = 0.8; // 20% less on Monday

                // Add some randomness
                const randomFactor = 0.8 + Math.random() * 0.4; // 0.8 to 1.2
                const sold = Math.floor(baseDemand * multiplier * randomFactor);

                // Preparation waste pattern (some items wasted more than others)
                let wasteMultiplier = 1.08;
                if (item.id === '5') wasteMultiplier = 1.12; // Toast spoils easier
                if (item.id === '2') wasteMultiplier = 1.15; // Salad wilts
                if (item.id === '4') wasteMultiplier = 1.05; // Salmon less waste

                const prepared = Math.ceil(sold * wasteMultiplier);
                const waste = prepared - sold;

                history.push({
                  userId: testUser._id,
                  date: dateStr,
                  itemId: item.id,
                  itemName: item.name,
                  prepared,
                  sold,
                  waste,
                  revenue: sold * item.unitPrice,
                  loss: waste * item.costPerUnit,
                  createdAt: new Date(dateStr)
                });
              });
            }
            return history;
          };

          const docs = generateHistory();
          await RecordModel.insertMany(docs);
          console.log(`Dummy records seeded: ${docs.length} records for ${userCreds.username}`);
        }
      }
    } catch (err) {
      console.error('Seeding error:', err);
    }
  })
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/gemini-status', (_req, res) => {
  const hasKey = !!process.env.GEMINI_API_KEY;
  res.json({ gemini_key_set: hasKey });
});

// --- Authentication ---
const JWT_SECRET = process.env.JWT_SECRET || 'please-change-me';
const generateToken = (user: any) => jwt.sign({ id: user._id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

app.post('/auth/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'username and password required' });
    const existing = await UserModel.findOne({ username }).lean();
    if (existing) return res.status(409).json({ error: 'username already exists' });
    const user = await (UserModel as any).createWithPassword(username, password, email);
    const token = generateToken(user);
    res.status(201).json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'registration failed' });
  }
});

app.post('/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'username and password required' });
    const user: any = await UserModel.findOne({ username });
    if (!user) return res.status(401).json({ error: 'invalid credentials' });
    const ok = await user.verifyPassword(password);
    if (!ok) return res.status(401).json({ error: 'invalid credentials' });
    const token = generateToken(user);
    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'login failed' });
  }
});

// Auth middleware
const requireAuth = (req: any, res: any, next: any) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'missing token' });
  const token = auth.slice(7);
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'invalid token' });
  }
};

// Records endpoints (simple CRUD for daily records)
app.get('/records', requireAuth, async (req: any, res) => {
  try {
    const userId = req.user?.id;
    const records = await RecordModel.find({ userId }).sort({ createdAt: -1 }).limit(200).lean();
    res.json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to fetch records' });
  }
});

app.post('/records', requireAuth, async (req: any, res) => {
  try {
    const payload = req.body;
    // ensure the record is associated with the authenticated user
    const rec = new RecordModel({ ...payload, userId: req.user.id });
    await rec.save();
    res.status(201).json(rec);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Invalid record payload' });
  }
});

// Forecast endpoint using Gemini API
app.post('/forecast', requireAuth, async (req: any, res) => {
  try {
    const { history, menu } = req.body;

    if (!history || !menu) {
      return res.status(400).json({ error: 'history and menu are required' });
    }

    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (!geminiApiKey) {
      return res.status(500).json({ error: 'Gemini API key not configured' });
    }

    // Format history for the prompt
    const historySnippet = history.slice(-35).map((h: any) =>
      `Date: ${h.date}, Item: ${h.itemName}, Sold: ${h.sold}, Prepared: ${h.prepared}`
    ).join('\n');

    const prompt = `
    Analyze the following historical restaurant sales data and provide a food demand forecast for the NEXT day.
    Context:
    - Today is ${new Date().toISOString().split('T')[0]}
    - Consider patterns like weekend vs weekday.
    - Aim to minimize waste (Prepared - Sold) while ensuring demand is met.

    Historical Data:
    ${historySnippet}

    Menu Items for Prediction:
    ${menu.map((m: any) => `- ${m.name} (Cost: ₹${m.costPerUnit})`).join('\n')}

    Respond ONLY with valid JSON in this exact format (no markdown, no extra text):
    {
      "predictions": [
        {
          "itemId": "string",
          "itemName": "string",
          "predictedDemand": number,
          "confidence": number (0-1),
          "reasoning": "string"
        }
      ],
      "overallInsight": "string",
      "savingsOpportunity": number
    }
    `;

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': geminiApiKey
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', response.status, JSON.stringify(errorData, null, 2));

      if (response.status === 429) {
        return res.status(429).json({
          error: 'Gemini API Quota Exceeded',
          details: 'Your AI Studio API key has reached its limits. Please check your usage at https://aistudio.google.com/app/plan or try a different key.',
          raw: errorData
        });
      }

      return res.status(response.status).json({ error: 'Failed to generate forecast from Gemini', details: errorData });
    }

    const data = await response.json();

    // Extract text from the response
    const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textContent) {
      console.error('No text content in Gemini response:', data);
      return res.status(500).json({ error: 'Invalid response from Gemini API' });
    }

    // Parse the JSON response
    let result: any;
    try {
      result = JSON.parse(textContent);
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', textContent);
      return res.status(500).json({ error: 'Failed to parse forecast response' });
    }

    // Ensure IDs match our menu items
    result.predictions = result.predictions.map((p: any) => {
      const match = menu.find((m: any) => m.name.toLowerCase() === p.itemName.toLowerCase());
      return { ...p, itemId: match?.id || p.itemId };
    });

    res.json(result);
  } catch (err: any) {
    console.error('Forecast error:', err);
    res.status(500).json({ error: 'Failed to generate forecast', details: err.message });
  }
});

// Weather endpoint using Open-Meteo API (free, no key required)
app.get('/weather', async (req, res) => {
  try {
    // Default to Delhi, India coordinates. In production, get from user profile
    const lat = req.query.lat || '28.6139';
    const lon = req.query.lon || '77.2090';

    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max&timezone=auto&forecast_days=2`
    );

    if (!response.ok) {
      throw new Error('Weather API failed');
    }

    const data = await response.json();

    // Map weather codes to descriptions
    const weatherDescriptions: Record<number, string> = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Foggy',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      71: 'Slight snow',
      73: 'Moderate snow',
      75: 'Heavy snow',
      80: 'Slight rain showers',
      81: 'Moderate rain showers',
      82: 'Violent rain showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm with hail',
      99: 'Thunderstorm with heavy hail'
    };

    const currentWeatherCode = data.current?.weather_code || 0;
    const tomorrowWeatherCode = data.daily?.weather_code?.[1] || 0;

    const result = {
      current: {
        temperature: data.current?.temperature_2m,
        humidity: data.current?.relative_humidity_2m,
        description: weatherDescriptions[currentWeatherCode] || 'Unknown',
        code: currentWeatherCode
      },
      tomorrow: {
        tempMax: data.daily?.temperature_2m_max?.[1],
        tempMin: data.daily?.temperature_2m_min?.[1],
        precipitationChance: data.daily?.precipitation_probability_max?.[1],
        description: weatherDescriptions[tomorrowWeatherCode] || 'Unknown',
        code: tomorrowWeatherCode
      }
    };

    res.json(result);
  } catch (err: any) {
    console.error('Weather error:', err);
    res.status(500).json({ error: 'Failed to fetch weather data', details: err.message });
  }
});

// AI Chat endpoint for natural language queries
app.post('/chat', requireAuth, async (req: any, res) => {
  try {
    const { message, history: chatHistory } = req.body;
    const userId = req.user?.id;

    if (!message) {
      return res.status(400).json({ error: 'message is required' });
    }

    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (!geminiApiKey) {
      return res.status(500).json({ error: 'Gemini API key not configured' });
    }

    // Fetch user's recent records for context
    const records = await RecordModel.find({ userId }).sort({ createdAt: -1 }).limit(100).lean();

    // Summarize the data for the AI
    const totalWaste = records.reduce((sum: number, r: any) => sum + (r.waste || 0), 0);
    const totalSold = records.reduce((sum: number, r: any) => sum + (r.sold || 0), 0);
    const totalLoss = records.reduce((sum: number, r: any) => sum + (r.loss || 0), 0);
    const avgWastePerDay = records.length > 0 ? (totalWaste / records.length).toFixed(1) : 0;

    // Group by item
    const itemStats: Record<string, { waste: number, sold: number, count: number }> = {};
    records.forEach((r: any) => {
      if (!itemStats[r.itemName]) {
        itemStats[r.itemName] = { waste: 0, sold: 0, count: 0 };
      }
      itemStats[r.itemName].waste += r.waste || 0;
      itemStats[r.itemName].sold += r.sold || 0;
      itemStats[r.itemName].count += 1;
    });

    const itemSummary = Object.entries(itemStats)
      .map(([name, stats]) => `${name}: ${stats.waste} wasted, ${stats.sold} sold (${stats.count} records)`)
      .join('\n');

    const prompt = `
You are an AI assistant for EcoFeast, a food demand prediction platform for restaurants.
You help restaurant managers understand their waste patterns and improve efficiency.

RESTAURANT DATA CONTEXT:
- Total records analyzed: ${records.length}
- Total items sold: ${totalSold}
- Total waste: ${totalWaste} units
- Total financial loss from waste: ₹${totalLoss.toFixed(2)}
- Average waste per day: ${avgWastePerDay} units

ITEM BREAKDOWN:
${itemSummary}

USER QUESTION: "${message}"

Provide a helpful, concise response. If asked about specific patterns, analyze the data.
If asked for recommendations, be specific and actionable.
Keep responses friendly and professional. Use emojis occasionally for warmth.
Format numbers nicely (e.g., ₹1,234 not 1234).
`;

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': geminiApiKey
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini Chat API error:', response.status, errorData);
      return res.status(response.status).json({ error: 'Failed to get AI response', details: errorData });
    }

    const data = await response.json();
    const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textContent) {
      return res.status(500).json({ error: 'No response from AI' });
    }

    res.json({ response: textContent });
  } catch (err: any) {
    console.error('Chat error:', err);
    res.status(500).json({ error: 'Failed to process chat', details: err.message });
  }
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
