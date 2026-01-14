const { getAlgorithmExplanation } = require("../services/groqService");

async function explainAlgorithm(req, res) {
  try {
    const { algorithm, prompt } = req.body;

    if (!algorithm) {
      return res.status(400).json({ error: "Algorithm is required" });
    }

    const explanation = await getAlgorithmExplanation(algorithm, prompt || "");

    res.json({ explanation });
  } catch (err) {
    console.error("Groq AI Error:", err.message);
    res.status(500).json({ error: "Failed to generate explanation" });
  }
}

module.exports = { explainAlgorithm };
