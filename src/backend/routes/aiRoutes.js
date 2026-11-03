import express from "express";

const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please enter a message.",
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "AfriMarket AI is not configured yet.",
      });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },

      body: JSON.stringify({
        model: "gpt-5.6",

        instructions: `
You are AfriMarket AI, the intelligent shopping and marketplace
assistant for AfriMarket.

AfriMarket is a modern African marketplace connecting customers,
sellers, products and services.

Your job is to help customers:
- Discover products
- Compare products
- Find suitable products
- Understand marketplace features
- Answer shopping questions
- Explain AfriMarket services
- Help customers navigate the marketplace

AfriMarket categories can include:
electronics, fashion, groceries, agriculture, auto parts,
pharmacy, medical services, insurance, digital products,
events and other marketplace services.

Be professional, friendly, concise and helpful.

Do not invent AfriMarket products, prices, sellers, orders,
delivery information or policies.

If you do not have access to specific marketplace data,
clearly say so.

Always refer to the platform as AfriMarket.
`,

        input: message,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI API Error:", data);

      return res.status(response.status).json({
        success: false,
        message:
          data?.error?.message ||
          "AfriMarket AI could not process your request.",
      });
    }

    const answer =
      data.output_text ||
      "Sorry, I couldn't generate a response right now.";

    res.json({
      success: true,
      answer,
    });
  } catch (error) {
    console.error("AfriMarket AI Error:", error);

    res.status(500).json({
      success: false,
      message: "AfriMarket AI is temporarily unavailable.",
    });
  }
});

export default router;