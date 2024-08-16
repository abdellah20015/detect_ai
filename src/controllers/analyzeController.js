const plagiarismDetector = require('../services/plagiarismDetector');
const aiDetector = require('../services/aiDetector');
const Analysis = require('../models/Analysis');

exports.analyzeText = async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.user.id;

    const plagiarismResult = await plagiarismDetector.detect(text);
    const aiResult = await aiDetector.detect(text);

    const analysis = new Analysis(text, plagiarismResult.probability, aiResult.probability, userId);
    await analysis.save();

    res.json({
      plagiarismProbability: plagiarismResult.probability.toFixed(2),
      aiProbability: aiResult.probability.toFixed(2),
      additionalInfo: "Analyse complétée avec succès et enregistrée."
    });
  } catch (error) {
    console.error('Erreur lors de l\'analyse:', error);
    res.status(500).json({ error: 'Une erreur est survenue lors de l\'analyse' });
  }
};