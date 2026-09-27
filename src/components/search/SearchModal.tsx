'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Search, X, BookOpen, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { MANUSCRIPT_PAGES } from '@/data/manuscriptData';
import { Button } from '@/components/ui/button';

interface SearchResult {
  pageNumber: number;
  chapter: string;
  text: string;
}

export default function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!isOpen) setQuery('');
  }, [isOpen]);

  const results = useMemo(() => {
    if (!query.trim()) return [];

    const searchTerms = query.toLowerCase().trim();
    const allResults: SearchResult[] = [];
    let currentChapter = 'Preface';

    MANUSCRIPT_PAGES.forEach((page) => {
      const paragraphs = page.content.split('\n\n');
      paragraphs.forEach((para) => {
        const trimmedPara = para.trim();
        if (/^(Chapter\s+\d+|Closing colophon)$/i.test(trimmedPara)) {
          currentChapter = trimmedPara;
        } else if (trimmedPara.toLowerCase().includes(searchTerms)) {
          allResults.push({
            pageNumber: page.pageNumber,
            chapter: currentChapter,
            text: trimmedPara,
          });
        }
      });
    });

    return allResults;
  }, [query]);

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase()
        ? <span key={i} className="bg-amber-400 dark:bg-amber-600 text-foreground px-0.5 rounded">{part}</span>
        : part
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-card border border-border w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-slideUp">
        <div className="p-4 border-b border-border flex items-center gap-3">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            autoFocus
            className="flex-1 bg-transparent border-none outline-none text-lg font-medium placeholder:text-muted-foreground"
            placeholder="Search English translation..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Escape' && onClose()}
          />
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0 rounded-full">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {query.trim() ? (
            results.length > 0 ? (
              <div className="space-y-3">
                <div className="text-xs font-medium text-muted-foreground px-1">
                  Found {results.length} matches
                </div>
                {results.map((result, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      router.push(`/manuscript/${result.pageNumber}?search=${encodeURIComponent(query)}`);
                      onClose();
                    }}
                    className="w-full text-left group p-3 rounded-xl border border-border bg-card hover:bg-accent hover:border-accent transition-all flex flex-col gap-1"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-tight">
                        <BookOpen className="h-3 w-3" />
                        <span>{result.chapter} — Page {result.pageNumber}</span>
                      </div>
                      <ChevronRight className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="text-sm text-foreground leading-relaxed opacity-80 group-hover:opacity-100">
                      {highlightText(result.text, query)}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center space-y-2">
                <Search className="h-12 w-12 text-muted-foreground mx-auto opacity-20" />
                <p className="text-muted-foreground">No matches found for "{query}"</p>
              </div>
            )
          ) : (
            <div className="py-12 text-center space-y-2">
              <p className="text-muted-foreground">Type a word or phrase to search the translation</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
