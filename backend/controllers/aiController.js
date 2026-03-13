const { getAlgorithmExplanation } = require("../services/groqService");

exports.explainAlgorithm = async (req, res) => {
  try {
    const { algorithm, prompt } = req.body;

    // If no algorithm is provided, just use the prompt directly
    const explanation = await getAlgorithmExplanation(
      algorithm,
      prompt
    );

    res.json({ explanation });
  } catch (error) {
    console.error("Groq AI Error:", error.message);
    res.status(500).json({ error: "AI explanation failed" });
  }
};