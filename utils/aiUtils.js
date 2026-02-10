const { GoogleGenerativeAI } = require('@google/generative-ai');

const getAIResponse = async (question) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured');
  }
  
  if (typeof question !== 'string' || question.trim().length === 0) {
    throw new Error('AI input must be a non-empty string');
  }
  
  // Sanitize input
  const sanitizedQuestion = question.trim().replace(/[<>]/g, '');
  
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  const prompt = `Answer the following question with ONLY a single word. No punctuation, no explanation, no extra text. Just the factual answer as one word.

Question: ${sanitizedQuestion}`;
  
  try {
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    // Clean response to single word
    const singleWord = response.trim()
      .replace(/[^\w\s]/g, '') // Remove punctuation
      .split(/\s+/)[0] // Take first word
      .toLowerCase();
    
    if (!singleWord || singleWord.length === 0) {
      throw new Error('AI response invalid');
    }
    
    return singleWord;
  } catch (error) {
    throw new Error('AI service unavailable');
  }
};

module.exports = {
  getAIResponse
};
