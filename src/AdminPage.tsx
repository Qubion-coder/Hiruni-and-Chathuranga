import React, { useState } from 'react';
import { Toaster, toast } from 'sonner';
import { Copy, Link as LinkIcon, MessageSquare } from 'lucide-react';

export default function AdminPage() {
  const [prefix, setPrefix] = useState('Mr.');
  const [guestName, setGuestName] = useState('');

  // Generate the custom link based on current window location
  const baseUrl = window.location.origin;
  const generatedLink = guestName.trim() 
    ? `${baseUrl}/?prefix=${encodeURIComponent(prefix)}&name=${encodeURIComponent(guestName.trim())}`
    : baseUrl;

  // Generate the full message template
  const fullMessage = `Dear ${prefix} ${guestName.trim() || '[Guest Name]'} ❤️

With joyful hearts, we warmly invite you and your family to celebrate one of the most special days of our lives as we begin our journey together.

Please view our wedding invitation and all the event details through the link below 🌐:

${generatedLink}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

With love,
❤️ Chathuranga & Amasha`;

  const copyToClipboard = (text: string, successMessage: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success(successMessage);
    }).catch(() => {
      toast.error('Failed to copy. Please try again.');
    });
  };

  return (
    <div className="min-h-screen bg-brand-ivory flex items-center justify-center p-6 font-sans text-stone-800">
      <Toaster position="top-center" />
      
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-[0_20px_50px_rgba(176,137,104,0.15)] border border-brand-beige/30 p-8 sm:p-12">
        <div className="text-center mb-10">
          <span className="text-brand-beige-deep uppercase tracking-[0.4em] text-[10px] sm:text-[11px] font-bold drop-shadow-sm mb-4 block">
            Admin Dashboard
          </span>
          <h1 className="text-3xl sm:text-4xl font-display text-stone-800 tracking-tight">
            Link Generator
          </h1>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-brand-beige-deep/60 to-transparent mx-auto mt-6" />
        </div>

        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="w-full sm:w-1/3">
              <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-stone-500 mb-2 ml-2">
                Prefix
              </label>
              <select
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                className="w-full bg-brand-ivory/50 px-5 py-3 rounded-2xl border border-stone-200 focus:ring-2 focus:ring-brand-beige/30 focus:border-brand-beige-deep/40 outline-none transition-all duration-300 font-serif text-lg text-stone-700 cursor-pointer appearance-none"
              >
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Mr. & Mrs.">Mr. & Mrs.</option>
                <option value="Family">Family</option>
                <option value="Dear">Dear</option>
              </select>
            </div>

            <div className="w-full sm:w-2/3">
              <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-stone-500 mb-2 ml-2">
                Guest Name
              </label>
              <input
                type="text"
                placeholder="e.g. Sanjaya"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full bg-brand-ivory/50 px-5 py-3 rounded-2xl border border-stone-200 focus:ring-2 focus:ring-brand-beige/30 focus:border-brand-beige-deep/40 outline-none transition-all duration-300 font-serif italic text-lg text-stone-700 placeholder:text-stone-400"
              />
            </div>
          </div>

          {/* Generated Link Section */}
          <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-stone-500 ml-1">
                Generated Link
              </label>
              <button
                onClick={() => copyToClipboard(generatedLink, 'Link copied to clipboard!')}
                className="text-[10px] uppercase tracking-[0.1em] font-bold text-brand-beige-deep hover:text-brand-gold flex items-center gap-1 transition-colors"
              >
                <Copy className="w-3 h-3" /> Copy Link
              </button>
            </div>
            <div className="bg-white p-4 rounded-xl border border-stone-200 overflow-x-auto">
              <code className="text-sm text-stone-600 whitespace-nowrap">{generatedLink}</code>
            </div>
          </div>

          {/* Generated Message Section */}
          <div className="bg-brand-champagne/20 p-6 rounded-2xl border border-brand-beige/20">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-brand-beige-deep ml-1">
                Full Message Template
              </label>
              <button
                onClick={() => copyToClipboard(fullMessage, 'Full message copied to clipboard!')}
                className="text-[10px] uppercase tracking-[0.1em] font-bold text-brand-beige-deep hover:text-brand-gold flex items-center gap-1 transition-colors"
              >
                <Copy className="w-3 h-3" /> Copy Message
              </button>
            </div>
            <textarea
              readOnly
              value={fullMessage}
              className="w-full h-64 bg-white/80 p-4 rounded-xl border border-brand-beige/30 outline-none font-serif text-sm text-stone-700 resize-none whitespace-pre-wrap leading-relaxed shadow-inner"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <button
              onClick={() => copyToClipboard(generatedLink, 'Link copied to clipboard!')}
              className="flex items-center justify-center gap-2 bg-white border-2 border-brand-beige text-brand-beige-deep py-4 rounded-full font-sans tracking-[0.2em] font-bold text-[11px] uppercase hover:bg-brand-beige/10 transition-all duration-300"
            >
              <LinkIcon className="w-4 h-4" />
              Copy Link Only
            </button>
            
            <button
              onClick={() => copyToClipboard(fullMessage, 'Full message copied to clipboard!')}
              className="flex items-center justify-center gap-2 bg-stone-800 text-brand-champagne py-4 rounded-full font-sans tracking-[0.2em] font-bold text-[11px] uppercase hover:bg-stone-900 transition-all duration-300 shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.25)] active:scale-[0.98]"
            >
              <MessageSquare className="w-4 h-4 text-brand-gold" />
              Copy Full Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
