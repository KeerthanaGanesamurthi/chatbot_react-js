import { GoogleGenerativeAI } from "@google/generative-ai";

// Replace this with your Google AI API key
const GOOGLE_API_KEY = "AIzaSyDWmr9blRvdAvwgBTlNj_S0hEZwi9ulce8";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);

// Function to call Gemini 1.5 Pro model
export const getAIResponse = async (messages) => {
  try {
    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro-latest" });

    const prompt = messages.map(msg => msg.content).join('\n');

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error("Error:", error);
    return "Sorry, there was an error processing your request.";
  }
};
