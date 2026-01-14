const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function getAlgorithmExplanation(algorithm, userPrompt = "") {
  const prompt = `
Explain the ${algorithm} sorting algorithm in simple terms.
 ${userPrompt ? "User question: " + userPrompt : ""}
Explain with:
- Idea
-Working
- Time complexity
- Space complexity
- When to use
`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [ { role: "system", content: "You are an algorithm tutor." },
   { role: "user", content: prompt }
],
  });

  return completion.choices[0].message.content;
}

module.exports = { getAlgorithmExplanation };
