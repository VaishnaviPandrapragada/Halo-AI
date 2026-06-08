const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

let emergencyContacts = [];

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get("/", (req, res) => {
  res.send("HALO Backend Running 🚀");
});

app.get("/test", (req, res) => {
  res.send("Test route working!");
});

app.get("/health", (req, res) => {
  res.json({
    status: "online",
    service: "HALO"
  });
});

app.post("/contact", (req, res) => {
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).json({
      success: false,
      message: "Name and phone are required"
    });
  }

  emergencyContacts.push({
    name,
    phone
  });

  res.json({
    success: true,
    message: "Emergency contact added",
    contacts: emergencyContacts
  });
});

app.post("/sos", (req, res) => {
  const { location } = req.body;

  res.json({
    success: true,
    alert: "SOS Activated",
    location,
    contacts: emergencyContacts
  });
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const prompt = `
You are HALO, an AI women's safety companion.

Rules:
- Maximum 2 sentences.
- Be direct.
- Give practical safety advice.
- Focus on immediate safety.

User: ${message}

HALO:
`;

    const result = await model.generateContent(prompt);

    res.json({
      success: true,
      reply: result.response.text().trim()
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Something went wrong"
    });
  }
});

app.listen(PORT, () => {
  console.log(`HALO running on port ${PORT}`);
});