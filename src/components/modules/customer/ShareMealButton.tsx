"use client";

import { Share2 } from "lucide-react";
import { useState } from "react";

const ShareMealButton = ({ title }: { title: string }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: `Check out this meal: ${title}`,
          url,
        });
        return;
      } catch {
        // User might cancel native share, fallback to clipboard.
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // No-op fallback if clipboard is unavailable.
    }
  };

  return (
    <button
      type='button'
      onClick={handleShare}
      className='w-full flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium text-gray-700 hover:bg-gray-50 transition-colors'>
      <Share2 className='w-4 h-4' />
      {copied ? "Link Copied" : "Share"}
    </button>
  );
};

export default ShareMealButton;
