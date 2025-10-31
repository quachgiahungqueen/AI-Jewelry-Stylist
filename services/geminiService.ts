
import { GoogleGenAI, Modality } from "@google/genai";

// Utility to convert data URL to base64 and mimeType
const parseDataUrl = (dataUrl: string) => {
  const match = dataUrl.match(/^data:(.+);base64,(.+)$/);
  if (!match) {
    throw new Error("Invalid data URL format");
  }
  return { mimeType: match[1], data: match[2] };
};

const generateSingleImage = async (
  ai: GoogleGenAI,
  base64ImageData: string,
  mimeType: string,
  prompt: string
): Promise<string> => {
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
            parts: [
                {
                    inlineData: {
                        data: base64ImageData,
                        mimeType: mimeType,
                    },
                },
                {
                    text: prompt,
                },
            ],
        },
        config: {
            responseModalities: [Modality.IMAGE],
        },
    });

    const part = response.candidates?.[0]?.content?.parts?.[0];
    if (part?.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        const imageUrl = `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
        return imageUrl;
    }

    throw new Error("Image generation failed or returned an invalid response.");
};


export const generateJewelryImages = async (
  originalImageDataUrl: string,
  prompts: string[]
): Promise<string[]> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const { data: base64ImageData, mimeType } = parseDataUrl(originalImageDataUrl);

  // Create an array of promises for each image generation
  const imagePromises = prompts.map(prompt => 
    generateSingleImage(ai, base64ImageData, mimeType, prompt)
  );

  // Wait for all promises to resolve
  const results = await Promise.all(imagePromises);

  return results;
};
