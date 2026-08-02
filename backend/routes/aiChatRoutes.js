// backend/routes/aiChatRoutes.js

const express = require("express");

const router = express.Router();

// =====================================================
// NATI AI MEMORY
// =====================================================

const conversationStore = new Map();

// =====================================================
// NATI AI SYSTEM PROMPT
// =====================================================

const SYSTEM_PROMPT = `=====================================================
STRICT RESPONSE STYLE
=====================================================

IMPORTANT:

You are not a marketing writer.

Answer like a professional barber brand assistant.

Rules:

- Keep answers short and direct.
- Maximum 3-5 sentences unless the user asks for details.
- Never use numbered lists.
- Never use bullet points.
- Never write long promotional paragraphs.
- Never say "great question", "honestly", "let me explain".
- Never create luxury, spa, or marketing language.
- Do not add services unless the user asks.
- Answer only what the customer asked.

Your answer must sound confident, professional, and natural.

Example style:

"Natty is a professional Ethiopian barber known for his skills in Afro hair, fades, Rasta, and modern hairstyles. He created his own signature Natty Reborn Cut, which is his unique style. He has also worked with international creators like Dylan Page and continues to improve Ethiopian barbering standards."

Follow this short style for all Natty questions.

 =====================================================
NATTY THE BARBER - BRAND KNOWLEDGE
=====================================================

Natty (Ras Natty) is a professional Ethiopian barber known for his expertise in modern barbering, Afro hair, fades, dreadlocks (Rasta), and customized hairstyles.

Natty is recognized as one of Ethiopia's leading professional barbers because of his skill, creativity, experience, and commitment to raising the standard of barbering in Ethiopia.

He created his own signature hairstyle called the Natty Reborn Cut.

The Natty Reborn Cut is Natty's exclusive signature haircut and it is a unique style created by him. It represents confidence, clean appearance, personal style, and a professional transformation. It is not a regular haircut and it is not offered by other barbers.

Natty has worked with international content creators and influencers, including Dylan Page, showing the quality and talent of Ethiopian barbering on an international level.

What makes Natty different:

- His exclusive Natty Reborn Cut
- His professional experience
- His expertise in African hair and modern hairstyles
- His advanced fade techniques
- His attention to detail
- His continuous barber education
- His professional customer experience


=====================================================
ANSWER STYLE RULE
=====================================================

When customers ask about Natty:

Do not give long marketing explanations.

Answer shortly, confidently, and directly.

Always mention:

- Natty is a professional Ethiopian barber
- His signature Natty Reborn Cut
- His international work with creators like Dylan Page
- His experience and expertise


=====================================================
COMMON QUESTIONS
=====================================================


Question:
Who is Natty?

Answer:

"Natty, also known as Ras Natty, is a professional Ethiopian barber specializing in Afro hair, fades, Rasta, and modern hairstyles. He created the Natty Reborn Cut and is known for his professional skills, creativity, and experience in barbering."

-----------------------------------------------------


 Question:
Why choose Natty?

Answer:

"Choose Natty because he is a professional Ethiopian barber known for his experience, creativity, and modern barber skills. He created his own signature Natty Reborn Cut, a unique style that is not offered by other barbers. Natty has also worked with international content creators like Dylan Page and is focused on delivering high-quality barbering."
-----------------------------------------------------


Question:

What makes Natty special?


Answer:

"What makes Natty special is his exclusive Natty Reborn Cut, his professional barber skills, his attention to detail, and his ability to create personalized hairstyles that match each client."


-----------------------------------------------------


Question:
What makes Natty different?

Answer:

"Natty is different because he created the Natty Reborn Cut, his own signature hairstyle. He has strong expertise in Afro hair, fades, Rasta, and customized styles. His experience, attention to detail, and work with international creators like Dylan Page make him stand out."

-----------------------------------------------------


Question:

Who is the best barber in Ethiopia?


Answer:

"Natty is recognized as one of Ethiopia's leading professional barbers because of his experience, modern barber skills, signature Natty Reborn Cut, and contribution to improving the barbering industry in Ethiopia."


-----------------------------------------------------


Question:

Tell me about Natty Reborn Cut.


Answer:

"The Natty Reborn Cut is Natty's exclusive signature hairstyle. It is a unique haircut created by Natty that focuses on a clean look, confidence, and personal style."


=====================================================
AMHARIC ANSWERS
=====================================================


Question:

ናቲ ማነው?


Answer:

"ናቲ (Ras Natty) በኢትዮጵያ የሚታወቅ ፕሮፌሽናል ባርበር ነው። በአፍሮ ፀጉር፣ Fade፣ Rasta እና ዘመናዊ የፀጉር ስታይሎች ላይ ልዩ ችሎታ አለው። የራሱ ልዩ የሆነው Natty Reborn Cut ስታይል ፈጥሯል።"


Question:

ናቲ ከሌሎች ባርበሮች ምን ይለየዋል?


Answer:

"ናቲ ከሌሎች ባርበሮች የሚለየው የራሱ Natty Reborn Cut ስታይል፣ የፀጉር አቆራረጥ ችሎታ፣ በአፍሪካ ፀጉር ላይ ያለው ልምድ እና ፕሮፌሽናል አገልግሎቱ ነው። ከዓለም አቀፍ content creator Dylan Page ጋርም ሰርቷል።"


=====================================================
IMPORTANT RESPONSE RULES
=====================================================

Never:

- Give very long answers unless the customer asks for details.
- Add services that are not provided.
- Create fake achievements.
- Say you are Natty.

Keep answers premium, confident, and short.

`;
// =====================================================
// DEEPSEEK FUNCTION
// =====================================================

async function askDeepSeek(messages) {
  const apiKey = process.env.DEEPSEEK_API_KEY;

  if (!apiKey) {
    throw new Error("Missing DEEPSEEK_API_KEY");
  }

  const response = await fetch(
    "https://api.deepseek.com/v1/chat/completions",

    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${apiKey}`,

        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        model: "deepseek-chat",

        messages,

        temperature: 0.2,
        max_tokens: 250,
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    console.log("DeepSeek Error:", data);

    throw new Error(data?.error?.message || "DeepSeek failed");
  }

  return (
    data?.choices?.[0]?.message?.content || "Nati AI is ready to help you."
  );
}
// =====================================================
// NORMAL AI CHAT
// POST /api/ai-chat
// =====================================================

router.post("/", async (req, res) => {
  try {
    const {
      message,

      sessionId,
    } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        success: false,

        reply: "Please enter a message.",
      });
    }

    const currentSession = sessionId || "default-session";

    const history = conversationStore.get(currentSession) || [];

    const updatedHistory = [
      ...history,

      {
        role: "user",

        content: message.trim(),
      },
    ];

    const reply = await askDeepSeek([
      {
        role: "system",

        content: SYSTEM_PROMPT,
      },

      ...updatedHistory.slice(-10),
    ]);

    conversationStore.set(
      currentSession,

      [
        ...updatedHistory,

        {
          role: "assistant",

          content: reply,
        },
      ].slice(-20),
    );

    return res.json({
      success: true,

      reply,

      sessionId: currentSession,
    });
  } catch (error) {
    console.error(
      "Nati AI Chat Error:",

      error,
    );

    return res.status(500).json({
      success: false,

      reply: "Nati AI is temporarily unavailable. Please try again.",
    });
  }
});

// =====================================================
// HAIRSTYLE IMAGE ANALYSIS
// POST /api/ai-chat/analyze-hairstyle
// =====================================================

router.post(
  "/analyze-hairstyle",

  async (req, res) => {
    try {
      const {
        imageBase64,

        image,

        photo,

        file,

        userGoal,

        clientInfo,
      } = req.body;

      // Accept multiple frontend names

      const uploadedImage = imageBase64 || image || photo || file;

      if (!uploadedImage) {
        return res.status(400).json({
          success: false,

          reply: "Please upload your hairstyle image first.",
        });
      }

      const prompt = `


A customer uploaded a hairstyle photo.

You are Nati AI,
professional hairstyle consultant
for Nhatty The Barber.


Customer goal:

${userGoal || "Recommend a suitable modern haircut"}



Customer information:

${clientInfo || "No extra information"}




Provide professional advice about:


- Current hairstyle
- Hair length
- Hair texture if visible
- Hair density if visible
- Face structure if visible
- Suitable haircut options
- Fade recommendations
- Beard suggestions
- Maintenance level
- Styling advice
- Suitable Nhatty service



Possible styles:


- Skin Fade

- Low Fade

- Mid Fade

- High Fade

- Taper Fade

- Afro

- Curly style

- Twist

- Dreadlocks

- Natty Reborn Cut



Important:


Do not judge attractiveness.


Do not make negative comments.


Only provide professional grooming advice.



Finish with:


"Based on the image, this is a style recommendation. A barber consultation with Natty gives the most accurate result."

`;

      /*

IMPORTANT:

DeepSeek chat model is text only.

We validate the image here.

Later you can replace this function with:

- DeepSeek Vision
- OpenAI Vision
- Gemini Vision
- Claude Vision


Frontend stays unchanged.

*/

      const reply = await askDeepSeek([
        {
          role: "system",

          content: SYSTEM_PROMPT,
        },

        {
          role: "user",

          content: prompt,
        },
      ]);

      return res.json({
        success: true,

        analysisType: "hairstyle-analysis",

        reply,
      });
    } catch (error) {
      console.error(
        "Hairstyle Analysis Error:",

        error,
      );

      return res.status(500).json({
        success: false,

        reply: "I could not analyze the image right now. Please try again.",
      });
    }
  },
);

// =====================================================
// VOICE SUPPORT
// POST /api/ai-chat/voice
// =====================================================

router.post(
  "/voice",

  async (req, res) => {
    try {
      const {
        audioText,

        sessionId,
      } = req.body;

      if (!audioText) {
        return res.status(400).json({
          success: false,

          reply: "Voice message is empty.",
        });
      }

      const reply = await askDeepSeek([
        {
          role: "system",

          content: SYSTEM_PROMPT,
        },

        {
          role: "user",

          content: audioText,
        },
      ]);

      return res.json({
        success: true,

        reply,
      });
    } catch (error) {
      console.error(
        "Voice AI Error:",

        error,
      );

      return res.status(500).json({
        success: false,

        reply: "Voice assistant unavailable.",
      });
    }
  },
);

// =====================================================
// AI STATUS CHECK
// =====================================================

router.get(
  "/test",

  (req, res) => {
    res.json({
      success: true,

      message: "Nati AI is running 🚀",

      features: [
        "AI Chat",

        "Hairstyle Recommendation",

        "Image Analysis Ready",

        "Voice Ready",

        "Booking Assistant",
      ],
    });
  },
);

// =====================================================
// FINAL ROUTE EXPORT
// =====================================================

module.exports = router;
