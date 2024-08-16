const db = require('../config/database');

class Analysis {
  constructor(text, plagiarismProbability, aiProbability, userId) {
    this.text = text;
    this.plagiarismProbability = plagiarismProbability;
    this.aiProbability = aiProbability;
    this.userId = userId;
  }

  async save() {
    const [result] = await db.execute(
      'INSERT INTO analyses (text, plagiarism_probability, ai_probability, user_id) VALUES (?, ?, ?, ?)',
      [this.text, this.plagiarismProbability, this.aiProbability, this.userId]
    );
    return result.insertId;
  }

  static async findByUserId(userId) {
    const [rows] = await db.execute('SELECT * FROM analyses WHERE user_id = ?', [userId]);
    return rows;
  }
}

module.exports = Analysis;