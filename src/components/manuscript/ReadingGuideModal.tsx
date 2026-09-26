'use client';

import React, { useEffect } from 'react';
import { Info, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ReadingGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReadingGuideModal({ isOpen, onClose }: ReadingGuideModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl bg-card p-6 sm:p-7 border border-border shadow-2xl space-y-5 my-auto overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button (X) */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground rounded-full p-1 transition-colors"
          title="Close (Esc)"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
            <Info className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            How to read this manuscript
          </h2>
        </div>

        {/* Diagram: 3 vertical columns numbered 1 → 2 → 3, ordered right to left */}
        <div className="rounded-xl bg-muted/50 p-4 sm:p-5 border border-border flex flex-col items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider">
            <span>Reading Direction: Right to Left</span>
          </div>

          {/* 3 Columns Diagram */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 w-full max-w-xs">
            {/* Column 3 (Leftmost) */}
            <div className="flex-1 flex flex-col items-center rounded-lg border border-border bg-card p-3 shadow-xs">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground mb-2">
                3
              </span>
              <div className="flex flex-col items-center gap-1 text-muted-foreground">
                <span className="text-xs font-serif font-medium">Col</span>
                <span className="text-xs">│</span>
                <span className="text-xs">│</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <span className="text-muted-foreground font-bold text-base">←</span>

            {/* Column 2 (Middle) */}
            <div className="flex-1 flex flex-col items-center rounded-lg border border-border bg-card p-3 shadow-xs">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground mb-2">
                2
              </span>
              <div className="flex flex-col items-center gap-1 text-muted-foreground">
                <span className="text-xs font-serif font-medium">Col</span>
                <span className="text-xs">│</span>
                <span className="text-xs">│</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <span className="text-muted-foreground font-bold text-base">←</span>

            {/* Column 1 (Rightmost) */}
            <div className="flex-1 flex flex-col items-center rounded-lg border border-primary/40 bg-primary/5 p-3 shadow-xs">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground mb-2">
                1
              </span>
              <div className="flex flex-col items-center gap-1 text-primary">
                <span className="text-xs font-serif font-medium">Col</span>
                <span className="text-xs">│</span>
                <span className="text-xs">│</span>
                <ChevronDown className="h-4 w-4 text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Text content */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          This is a Chinese handscroll manuscript. Read each page top to bottom, starting with the rightmost column and moving left — the opposite of Western books. Pages follow the order of the original scroll, and consecutive scans overlap slightly: the last columns of one page repeat at the start of the next, so you never lose your place.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Pages 7–10 show pieces from two different manuscripts side by side — both witness the same chapters.
        </p>

        {/* Footer / Action */}
        <div className="flex justify-end pt-2">
          <Button type="button" variant="default" onClick={onClose} className="px-6 font-medium">
            Got it
          </Button>
        </div>
      </div>
    </div>
  );
}
