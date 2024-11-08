const { OpenAI } = require("openai");
const { app } = require("@azure/functions");

app.http("getAiResponse", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "ai",
  handler: async (request, context) => {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const body = await request.json();
    const inputText = body.inputText;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant who suggests good books based on the topic user gives.",
        },
        {
          role: "user",
          content: ` Give a good book recommdation based on ${inputText}`,
        },
      ],
    });

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `Generate a good book cover based on ${inputText}`,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });

    return{
      jsonBody: {
        images: response.data.data[0].url,
        analysis: completion.choices[0].message.content,
      }
    }
  },
});
