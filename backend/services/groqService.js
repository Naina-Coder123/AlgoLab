const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function getAlgorithmExplanation(algorithm, userPrompt = "") {
  let prompt = "";

  if (algorithm) {
    // Sorting algorithm path
    prompt = `Explain the ${algorithm} sorting algorithm in simple terms.
${userPrompt ? "User question: " + userPrompt : ""}
Explain with:
- Idea
- Working
- Time complexity
- Space complexity
- When to use
`;
  } else if (userPrompt) {
    // General AI path
    prompt = `You are an expert CS tutor. Answer the question clearly:
${userPrompt}`;
  } else {
    // Default fallback
    prompt = `You are an expert CS tutor. Explain any popular computer science concept.`;
  }

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      { role: "system", content: "You are a helpful computer science tutor." },
      { role: "user", content: prompt }
    ],
  });

  return completion.choices[0].message.content;
}

module.exports = { getAlgorithmExplanation };