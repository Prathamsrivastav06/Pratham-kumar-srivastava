import { GoogleGenAI, Type } from "@google/genai";
import type { Question, Difficulty } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const quizSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      questionText: {
        type: Type.STRING,
        description: "The text of the quiz question."
      },
      options: {
        type: Type.ARRAY,
        items: {
          type: Type.STRING,
        },
        description: "An array of 4 possible answers."
      },
      correctAnswer: {
        type: Type.STRING,
        description: "The correct answer from the options array."
      }
    },
    required: ["questionText", "options", "correctAnswer"],
  }
};

export const generateQuizQuestions = async (topic: string, difficulty: Difficulty): Promise<Question[]> => {
  try {
    const prompt = `Generate 5 unique, engaging, and challenging multiple-choice quiz questions for a high school / college student about ${topic} at a ${difficulty} difficulty level. Provide 4 possible answers for each question, with only one being correct. Ensure the correct answer is one of the options.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: quizSchema,
      },
    });
    
    const jsonText = response.text.trim();
    const questions = JSON.parse(jsonText);
    
    // Basic validation
    if (!Array.isArray(questions) || questions.some(q => !q.questionText || !q.options || !q.correctAnswer)) {
      throw new Error("Invalid format for quiz questions received from API.");
    }
    
    return questions as Question[];

  } catch (error) {
    console.error("Error generating quiz questions:", error);
    // You might want to return a default set of questions or throw the error
    // to be handled by the UI component.
    throw new Error("Failed to generate quiz. Please try again later.");
  }
};
