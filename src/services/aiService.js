const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

export const generateQuiz = async (topic) => {
  const prompt = `Generate exactly 5 multiple-choice quiz questions about "${topic}".

  Return ONLY a valid JSON object with this exact structure (no markdown, no extra text):
  {
    "questions": [
      {
        "question": "Question text here?",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": 0
      }
    ]
  }

  Rules:
  - Each question must have exactly 4 options
  - correctAnswer is the index (0–3) of the correct option
  - Questions should be educational and interesting
  - Mix difficulty levels from easy to challenging
  - Return ONLY the JSON object, nothing else`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
        },
      }),
    });

    if (!response.ok) throw new Error(`API request failed: ${response.statusText}`);

    const data = await response.json();

    if (!data.candidates?.[0]?.content?.parts?.[0]?.text)
      throw new Error('Invalid response structure from API');

    let textContent = data.candidates[0].content.parts[0].text
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    const quizData = JSON.parse(textContent);

    if (!quizData.questions || quizData.questions.length !== 5)
      throw new Error('Invalid quiz format: expected 5 questions');

    for (const q of quizData.questions) {
      if (!q.question || !Array.isArray(q.options) || q.options.length !== 4 || typeof q.correctAnswer !== 'number') {
        throw new Error('Invalid question format');
      }
    }

    return quizData.questions;
  } catch (error) {
    console.error('Error generating quiz:', error);
    throw error;
  }
};

export const generateFeedback = async (score, totalQuestions, topic) => {
  const percentage = (score / totalQuestions) * 100;

  const prompt = `A student just completed a quiz about "${topic}" and scored ${score} out of ${totalQuestions} (${percentage.toFixed(0)}%).

  Provide encouraging, personalized feedback in 2–3 sentences. Be specific about their performance level and offer motivation to continue learning.

  Return ONLY the feedback text, no extra formatting or labels.`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 200,
        },
      }),
    });

    if (!response.ok) throw new Error(`API request failed: ${response.statusText}`);

    const data = await response.json();

    if (!data.candidates?.[0]?.content?.parts?.[0]?.text)
      throw new Error('Invalid response structure from API');

    return data.candidates[0].content.parts[0].text.trim();
  } catch (error) {
    console.error('Error generating feedback:', error);

    if (percentage >= 80)
      return "Excellent work! You've demonstrated strong knowledge of this topic. Keep up the great work!";
    else if (percentage >= 60)
      return "Good effort! You're on the right track. Review the questions you missed to strengthen your understanding.";
    else
      return "Keep learning! Every quiz is a chance to grow. Review the material and try again to improve your score.";
  }
};
