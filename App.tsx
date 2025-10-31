
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { GeneratedImageGallery } from './components/GeneratedImageGallery';
import { Loader } from './components/Loader';
import { generateJewelryImages } from './services/geminiService';
import { UploadIcon } from './components/icons';

// Define prompts outside component to avoid re-creation
const JEWELRY_PROMPTS = [
    "Adorn the person with an ultra-luxurious, multi-million dollar jewelry set made of magnificent diamonds and platinum. The set must include a stunning necklace, elegant earrings, and a matching bracelet. The style should be exquisite, fit for royalty. The gemstones must look incredibly realistic, with detailed facets, brilliant fire, and lighting that perfectly matches the source image. Surround the person with a subtle, elegant shower of floating diamonds, creating a magical and opulent atmosphere. The final image must be photorealistic, 4K Full HD quality. Ensure the jewelry is placed naturally on the person's body.",
    "Adorn the person with an ultra-luxurious, multi-million dollar jewelry set made of breathtaking Burmese rubies and 18k yellow gold. The set must include a stunning necklace, elegant earrings, and a matching bracelet. The style should be exquisite, fit for royalty. The gemstones must look incredibly realistic, with a deep 'pigeon blood' red color, and lighting that perfectly matches the source image. Surround the person with a subtle, elegant shower of floating rubies and diamonds, creating a passionate and opulent atmosphere. The final image must be photorealistic, 4K Full HD quality. Ensure the jewelry is placed naturally on the person's body.",
    "Adorn the person with an ultra-luxurious, multi-million dollar jewelry set made of stunning Ceylon sapphires and white gold. The set must include a stunning necklace, elegant earrings, and a matching bracelet. The style should be exquisite, fit for royalty. The gemstones must look incredibly realistic, with a rich cornflower blue hue, and lighting that perfectly matches the source image. Surround the person with a subtle, elegant shower of floating sapphires and diamonds, creating a serene and opulent atmosphere. The final image must be photorealistic, 4K Full HD quality. Ensure the jewelry is placed naturally on the person's body.",
    "Adorn the person with an ultra-luxurious, multi-million dollar jewelry set made of regal Colombian emeralds and platinum. The set must include a stunning necklace, elegant earrings, and a matching bracelet. The style should be exquisite, fit for royalty. The gemstones must have a deep, vibrant green, with natural-looking inclusions ('jardin'), and lighting that perfectly matches the source image. Surround the person with a subtle, elegant shower of floating emeralds and diamonds, creating a vibrant and opulent atmosphere. The final image must be photorealistic, 4K Full HD quality. Ensure the jewelry is placed naturally on the person's body."
];


export default function App() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalImage(reader.result as string);
      setGeneratedImages([]);
      setError(null);
    };
    reader.onerror = () => {
      setError("Failed to read the image file.");
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = useCallback(async () => {
    if (!originalImage) {
      setError("Please upload an image first.");
      return;
    }

    setIsLoading(true);
    setGeneratedImages([]);
    setError(null);

    try {
      const results = await generateJewelryImages(originalImage, JEWELRY_PROMPTS);
      setGeneratedImages(results);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unknown error occurred during image generation.");
    } finally {
      setIsLoading(false);
    }
  }, [originalImage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 text-slate-100">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          {!originalImage && <ImageUploader onImageUpload={handleImageUpload} />}

          {originalImage && (
            <div className="w-full bg-slate-800/50 p-6 rounded-2xl shadow-2xl border border-slate-700 backdrop-blur-sm">
              <h2 className="text-xl md:text-2xl font-bold text-center text-amber-300 mb-6">Your Portrait</h2>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-full md:w-1/2">
                   <img src={originalImage} alt="Uploaded portrait" className="rounded-xl object-contain max-h-96 mx-auto shadow-lg" />
                </div>
                <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center">
                    <p className="text-slate-300 mb-4">Ready to be adorned? Click the button to witness the magic.</p>
                    <button
                        onClick={handleGenerate}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-amber-500 text-slate-900 font-bold rounded-lg shadow-lg hover:bg-amber-400 transition-all duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed transform hover:scale-105"
                    >
                        <UploadIcon />
                        {isLoading ? 'Adorning with Jewels...' : 'Generate Masterpieces'}
                    </button>
                    <button
                        onClick={() => setOriginalImage(null)}
                        className="mt-4 text-sm text-slate-400 hover:text-amber-300 transition-colors"
                    >
                        Use a different image
                    </button>
                </div>
              </div>
            </div>
          )}

          {isLoading && <Loader />}
          
          {error && <div className="mt-8 text-center text-red-400 bg-red-900/50 p-4 rounded-lg border border-red-700">{error}</div>}
          
          {generatedImages.length > 0 && !isLoading && (
            <GeneratedImageGallery images={generatedImages} />
          )}

        </div>
      </main>
    </div>
  );
}
