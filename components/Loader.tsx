
import React from 'react';
import { DiamondIcon } from './icons';

export const Loader: React.FC = () => {
  const messages = [
    "Polishing the gemstones...",
    "Contacting master jewelers...",
    "Crafting your masterpiece...",
    "Adding sparkle and shine...",
    "Unveiling the brilliance..."
  ];

  const [message, setMessage] = React.useState(messages[0]);

  React.useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % messages.length;
      setMessage(messages[index]);
    }, 3000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mt-8 text-center flex flex-col items-center justify-center p-6 bg-slate-800/50 rounded-lg">
        <DiamondIcon className="w-12 h-12 text-amber-400 animate-spin" style={{ animationDuration: '3s' }} />
        <p className="mt-4 text-lg font-semibold text-slate-200">{message}</p>
        <p className="text-sm text-slate-400">This may take a moment, perfection cannot be rushed.</p>
    </div>
  );
};
