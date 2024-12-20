require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(express.json());
app.use(cors());

const apiKey = process.env.GOOGLE_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

app.post("/api/ai", async (req, res) => {
  const inputText = req.body.inputText;

  try {
    console.log(`Generating book recommendation based on: ${inputText}`);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const input = [
      {
        text: `You are a helpful assistant who suggests good books based on the topic: ${inputText}. Please recommend a good book.`,
      },
    ];

    const result = await model.generateContent(input);

    let responseText = result.response.text();

    res.json({
      analysis: responseText,
    });
  } catch (error) {
    console.error("Error generating AI response:", error);
    res
      .status(500)
      .json({ error: "An error occurred. Please try again later." });
  }
});

const PORT = process.env.PORT || 7071;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
