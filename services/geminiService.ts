import { GoogleGenAI, Type } from "@google/genai";
// Fix: Use explicit '.ts' extension for module import.
import type { AIAnalysis, WellnessEntry, ExerciseAnalysis } from "../types.ts";

// Note: API_KEY should be set in the environment variables
const apiKey = process.env.API_KEY;
if (!apiKey) {
  // In a real app, you might want to handle this more gracefully
  console.error("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || "" });

export async function getChatbotResponse(message: string): Promise<string> {
    if (!apiKey) return "AI services are unavailable. API key is missing.";
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: message,
            config: {
                systemInstruction: 'You are a helpful assistant for a sports platform called VEERआकलन. Your goal is to assist users with their application process and answer related questions. Keep answers concise and helpful.'
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error getting chatbot response:", error);
        return "Sorry, I'm having trouble connecting to my brain right now. Please try again later.";
    }
}

export async function getHealthBotResponse(message: string): Promise<string> {
    if (!apiKey) return "AI services are unavailable. API key is missing.";
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: message,
            config: {
                systemInstruction: `You are a Wellness Assistant for athletes. You are not a medical professional. Your goal is to suggest general wellness tips, exercises, diet ideas, or meditation techniques based on how the user is feeling. Always include a disclaimer: "I am not a medical professional. Please consult a doctor for any health concerns."`
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error getting health bot response:", error);
        return "Sorry, I'm having trouble connecting to my brain right now. Please try again later.";
    }
}


const analysisSchema = {
    type: Type.OBJECT,
    properties: {
        passionForSports: {
            type: Type.STRING,
            description: "A summary of the candidate's passion and enthusiasm for the sport, based on their presentation. (2-3 sentences)"
        },
        communicationClarity: {
            type: Type.STRING,
            description: "An assessment of how clearly the candidate communicates their thoughts and ideas. (2-3 sentences)"
        },
        confidenceLevel: {
            type: Type.STRING,
            description: "An evaluation of the candidate's confidence and self-assurance. (2-3 sentences)"
        },
        keySkills: {
            type: Type.ARRAY,
            description: "A list of 3-5 key athletic or soft skills observed from the video.",
            items: { type: Type.STRING }
        },
        guidance: {
            type: Type.STRING,
            description: "Constructive feedback and guidance for the candidate on areas for improvement. (2-3 sentences)"
        }
    },
    required: ["passionForSports", "communicationClarity", "confidenceLevel", "keySkills", "guidance"]
};


export async function analyzeCandidateWithAI(videoDescription: string): Promise<AIAnalysis> {
    if (!apiKey) throw new Error("AI services are unavailable. API key is missing.");
    const prompt = `
        Analyze the following description of a sports candidate's video submission.
        The candidate is applying for a sports program.
        Based on the description, evaluate their passion, communication, confidence, and identify key skills.
        Provide constructive guidance for them.
        Return the analysis in a JSON format.

        Video Description: "${videoDescription}"
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: analysisSchema
            }
        });
        
        const jsonText = response.text.trim();
        const analysisResult = JSON.parse(jsonText);
        
        // Basic validation
        if (analysisResult && typeof analysisResult === 'object' && 'keySkills' in analysisResult) {
            return analysisResult as AIAnalysis;
        } else {
            throw new Error("Invalid JSON structure received from AI.");
        }

    } catch (error) {
        console.error("Error analyzing candidate:", error);
        throw new Error("The AI analysis failed. Please check the console for more details.");
    }
}

export async function analyzeWellnessData(entries: WellnessEntry[]): Promise<string> {
    if (!apiKey) return "AI services are unavailable. API key is missing.";
    
    const moodMap = ['Great', 'Good', 'Okay', 'Bad', 'Awful'];
    const dataSummary = entries.map(e => 
        `Date: ${e.date}, Sleep: ${e.sleep} hrs, Hydration: ${e.hydration} L, Mood: ${moodMap[e.mood]}`
    ).join('\n');

    const prompt = `
        As a wellness coach for athletes, analyze the following daily wellness data.
        
        Data:
        ${dataSummary}

        Provide a concise analysis (3-4 sentences) covering:
        1. Overall wellness trends (positive or negative).
        2. Correlations you notice (e.g., does more sleep lead to better mood?).
        3. One actionable suggestion for improvement.
        
        Keep the tone supportive and encouraging.
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error analyzing wellness data:", error);
        return "Sorry, I'm having trouble providing an analysis right now. Please try again later.";
    }
}

const exerciseAnalysisSchema = {
    type: Type.OBJECT,
    properties: {
        overallSummary: { type: Type.STRING, description: "A brief, encouraging summary of the athlete's performance in 2-3 sentences." },
        overallScore: { type: Type.INTEGER, description: "A numerical score from 0 to 100 representing the quality of the exercise form." },
        pros: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of 2-4 specific things the athlete did well, focusing on good form and posture." },
        cons: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of 2-4 specific, actionable areas for improvement, focusing on posture, joint alignment, and movement patterns." },
        performanceMetrics: {
            type: Type.OBJECT,
            description: "Evaluation of key performance aspects, each rated on a scale of 1 to 10.",
            properties: {
                rangeOfMotion: { type: Type.INTEGER, description: "A numerical score from 1 to 10 for the range of motion, where 10 is excellent." },
                stability: { type: Type.INTEGER, description: "A numerical score from 1 to 10 for the athlete's stability, where 10 is excellent." },
                tempo: { type: Type.INTEGER, description: "A numerical score from 1 to 10 for the exercise tempo, where 10 is perfectly controlled." }
            },
            required: ["rangeOfMotion", "stability", "tempo"]
        },
        jointSpecificFeedback: {
            type: Type.ARRAY,
            description: "Detailed feedback for specific joints involved in the exercise.",
            items: {
                type: Type.OBJECT,
                properties: {
                    joint: { type: Type.STRING, description: "The name of the joint (e.g., Knees, Spine, Hips)." },
                    feedback: { type: Type.STRING, description: "Specific feedback on the joint's movement and alignment." },
                    rating: { type: Type.STRING, description: "A rating of the joint's performance ('good', 'average', 'poor')." }
                },
                required: ["joint", "feedback", "rating"]
            }
        },
        videoSuggestions: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING, description: "A relevant, helpful title for a YouTube video." },
                    description: { type: Type.STRING, description: "A short sentence explaining why this video is recommended based on the 'cons'." },
                    url: { type: Type.STRING, description: "A placeholder URL for the YouTube video (e.g., 'https://www.youtube.com/watch?v=placeholder')." }
                },
                required: ["title", "description", "url"]
            },
            description: "A list of 2-3 YouTube video suggestions to help the user with the areas for improvement. Order them logically."
        }
    },
    required: ["overallSummary", "overallScore", "pros", "cons", "performanceMetrics", "jointSpecificFeedback", "videoSuggestions"]
};

export async function analyzeExerciseVideo(videoDescription: string, exerciseType: string): Promise<ExerciseAnalysis> {
    if (!apiKey) throw new Error("AI services are unavailable. API key is missing.");
    const prompt = `
        Act as an expert sports science and biomechanics coach.
        Analyze the following description of an athlete performing a ${exerciseType}.
        Focus critically on every single posture and joint movement described. Your analysis for pros and cons must prioritize feedback on posture and joint alignment.
        Provide a detailed analysis including:
        1. An overall summary.
        2. An overall form score out of 100.
        3. A list of "pros" (strengths in their form).
        4. A list of "cons" (areas for improvement), which must be specific and actionable.
        5. Specific feedback on major joints involved in a ${exerciseType} (like knees, hips, spine), including a rating for each ('good', 'average', 'poor').
        6. An evaluation of performance metrics: Range of Motion, Stability, and Tempo, each rated on a scale of 1 to 10.
        7. A logically ordered list of suggested YouTube videos to help correct the cons.

        Return the entire analysis in a valid JSON format.

        Video Description: "${videoDescription}"
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: exerciseAnalysisSchema,
            }
        });
        
        const jsonText = response.text.trim();
        const analysisResult = JSON.parse(jsonText);
        
        if (analysisResult && typeof analysisResult === 'object' && 'pros' in analysisResult && 'cons' in analysisResult) {
            return analysisResult as ExerciseAnalysis;
        } else {
            throw new Error("Invalid JSON structure received from AI.");
        }

    } catch (error) {
        console.error("Error analyzing exercise video:", error);
        throw new Error("The AI analysis failed. Please check the model's response or your prompt.");
    }
}