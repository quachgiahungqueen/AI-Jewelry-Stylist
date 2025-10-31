
import React from 'react';
import { DownloadIcon } from './icons';

interface GeneratedImageGalleryProps {
  images: string[];
}

const downloadImage = (dataUrl: string, index: number) => {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = `ai_jewelry_masterpiece_${index + 1}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const GeneratedImageGallery: React.FC<GeneratedImageGalleryProps> = ({ images }) => {
  return (
    <div className="w-full mt-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-amber-300 font-playfair">Your Virtual Jewelry Collection</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
        {images.map((image, index) => (
          <div key={index} className="relative group overflow-hidden rounded-xl shadow-2xl border border-slate-700">
            <img src={image} alt={`Generated jewelry set ${index + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <button
                onClick={() => downloadImage(image, index)}
                className="flex items-center gap-2 px-4 py-2 bg-amber-500/80 text-slate-900 font-semibold rounded-lg backdrop-blur-sm hover:bg-amber-500 transition-all transform hover:scale-110"
              >
                <DownloadIcon className="w-5 h-5" />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
