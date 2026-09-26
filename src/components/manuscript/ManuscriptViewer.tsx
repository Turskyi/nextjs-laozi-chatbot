'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Layers,
  Maximize2,
  Minimize2,
  RotateCcw,
} from 'lucide-react';
import { ManuscriptPageData, MANUSCRIPT_PAGES } from '@/data/manuscriptData';
import ZoomableImage from './ZoomableImage';
import { Button } from '@/components/ui/button';

interface ManuscriptViewerProps {
  currentPage: ManuscriptPageData;
}

export default function ManuscriptViewer({ currentPage }: ManuscriptViewerProps) {
  const router = useRouter();

  const totalPages = MANUSCRIPT_PAGES.length;
  const pageNum = currentPage.pageNumber;
  const hasPrev = pageNum > 1;
  const hasNext = pageNum < totalPages;

  const prevPageNum = pageNum - 1;
  const nextPageNum = pageNum + 1;

  // State
  const [fullscreen, setFullscreen] = useState<'none' | 'manuscript' | 'text'>('none');
  const [fontScale, setFontScale] = useState<number>(1);

  // Read initial fullscreen state from query params if available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const fs = params.get('fullscreen');
      if (fs === 'manuscript' || fs === 'text') {
        setFullscreen(fs);
      }
    }
  }, []);

  // Navigation handlers that preserve fullscreen state during page transitions
  const handleNavigate = useCallback(
    (targetPage: number) => {
      const query = fullscreen !== 'none' ? `?fullscreen=${fullscreen}` : '';
      router.push(`/manuscript/${targetPage}${query}`);
    },
    [fullscreen, router],
  );

  const handleToggleFullscreen = useCallback(
    (mode: 'manuscript' | 'text') => {
      const nextMode = fullscreen === mode ? 'none' : mode;
      setFullscreen(nextMode);
      const query = nextMode !== 'none' ? `?fullscreen=${nextMode}` : '';
      router.push(`/manuscript/${pageNum}${query}`, { scroll: false });
    },
    [fullscreen, pageNum, router],
  );

  // Keyboard Navigation (Left / Right Arrow for pages, ESC for exiting fullscreen)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && hasPrev) {
        handleNavigate(prevPageNum);
      } else if (e.key === 'ArrowRight' && hasNext) {
        handleNavigate(nextPageNum);
      } else if (e.key === 'Escape' && fullscreen !== 'none') {
        setFullscreen('none');
        router.push(`/manuscript/${pageNum}`, { scroll: false });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasPrev, hasNext, prevPageNum, nextPageNum, fullscreen, pageNum, handleNavigate, router]);

  // Font Size Adjustments
  const handleFontIncrease = () => {
    setFontScale((prev) => Math.min(Number((prev + 0.15).toFixed(2)), 1.45));
  };

  const handleFontDecrease = () => {
    setFontScale((prev) => Math.max(Number((prev - 0.15).toFixed(2)), 0.85));
  };

  const handleFontReset = () => {
    setFontScale(1);
  };

  return (
    <div className="relative left-1/2 w-screen max-w-[100rem] -translate-x-1/2 space-y-6 px-4 pb-12 animate-fadeIn sm:px-6">
      {/* Top Header & Page Selector Bar (Normal View) */}
      <div className="flex flex-col gap-4 rounded-xl bg-card p-4 sm:p-5 border border-border shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <BookOpen className="h-4 w-4" />
            <span>Dunhuang Manuscript Pelliot chinois 2584</span>
          </div>
          <h1 className="mt-1 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            {currentPage.title}
          </h1>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center gap-2 self-stretch sm:self-auto justify-between sm:justify-end">
          {hasPrev ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleNavigate(prevPageNum)}
              className="gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Prev</span>
            </Button>
          ) : (
            <Button variant="outline" size="sm" disabled className="gap-1">
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Prev</span>
            </Button>
          )}

          {/* Page Indicator */}
          <div className="flex flex-wrap items-center gap-1.5 px-2">
            <Layers className="h-4 w-4 text-muted-foreground hidden xs:inline" />
            <span className="text-xs font-medium text-muted-foreground">Page</span>
            <div className="flex flex-wrap gap-1">
              {MANUSCRIPT_PAGES.map((p) => {
                const isActive = p.pageNumber === pageNum;
                return (
                  <button
                    type="button"
                    key={p.pageNumber}
                    onClick={() => handleNavigate(p.pageNumber)}
                    className={`flex h-7 w-7 items-center justify-center rounded-md text-xs font-semibold transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    }`}
                    title={`Go to page ${p.pageNumber}: ${p.shortTitle}`}
                  >
                    {p.pageNumber}
                  </button>
                );
              })}
            </div>
            <span className="text-xs font-medium text-muted-foreground">of {totalPages}</span>
          </div>

          {hasNext ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleNavigate(nextPageNum)}
              className="gap-1"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="outline" size="sm" disabled className="gap-1 opacity-60">
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Main Split Screen View */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-stretch">
        {/* Left Side: Zoomable Manuscript Image Panel */}
        <div className="w-full flex flex-col h-full">
          <ZoomableImage
            src={currentPage.imageSrc}
            alt={`Manuscript scan - ${currentPage.title}`}
            caption={currentPage.caption}
            isFullscreen={fullscreen === 'manuscript'}
            onToggleFullscreen={() => handleToggleFullscreen('manuscript')}
            hasPrev={hasPrev}
            hasNext={hasNext}
            pageNum={pageNum}
            totalPages={totalPages}
            onPrev={() => handleNavigate(prevPageNum)}
            onNext={() => handleNavigate(nextPageNum)}
            onSelectPage={(p) => handleNavigate(p)}
          />
        </div>

        {/* Right Side: English Text Panel */}
        <div className="w-full flex flex-col h-full">
          {fullscreen === 'text' ? (
            /* FULLSCREEN TEXT PANEL OVERLAY */
            <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md p-4 sm:p-6 overflow-hidden flex flex-col animate-fadeIn">
              {/* Fullscreen Header Chrome (Identical to Manuscript Fullscreen) */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-card p-3 border border-border rounded-xl shadow-md shrink-0 mb-4">
                {/* Left: Navigation Controls */}
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleNavigate(prevPageNum)}
                    disabled={!hasPrev}
                    title="Previous Page (Left Arrow)"
                    className="h-8 gap-1 text-xs"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                    <span className="hidden xs:inline">Prev</span>
                  </Button>

                  <div className="flex flex-wrap items-center gap-1">
                    <span className="text-xs font-medium text-muted-foreground hidden sm:inline">
                      Page
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {MANUSCRIPT_PAGES.map((p) => {
                        const isActive = p.pageNumber === pageNum;
                        return (
                          <button
                            type="button"
                            key={p.pageNumber}
                            onClick={() => handleNavigate(p.pageNumber)}
                            className={`flex h-7 w-7 items-center justify-center rounded-md text-xs font-semibold transition-colors ${
                              isActive
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                            }`}
                            title={`Go to page ${p.pageNumber}: ${p.shortTitle}`}
                          >
                            {p.pageNumber}
                          </button>
                        );
                      })}
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">
                      of {totalPages}
                    </span>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleNavigate(nextPageNum)}
                    disabled={!hasNext}
                    title="Next Page (Right Arrow)"
                    className="h-8 gap-1 text-xs"
                  >
                    <span className="hidden xs:inline">Next</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                </div>

                {/* Middle: Font Size Controls */}
                <div className="flex items-center gap-1 rounded-lg bg-muted/60 p-1 border border-border">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleFontDecrease}
                    disabled={fontScale <= 0.85}
                    title="Decrease Font Size"
                    className="h-7 px-2 text-xs font-bold"
                  >
                    A-
                  </Button>
                  <span className="min-w-[3rem] text-center font-mono text-xs font-medium text-foreground">
                    {Math.round(fontScale * 100)}%
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleFontIncrease}
                    disabled={fontScale >= 1.45}
                    title="Increase Font Size"
                    className="h-7 px-2 text-xs font-bold"
                  >
                    A+
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleFontReset}
                    disabled={fontScale === 1}
                    title="Reset Font Size"
                    className="h-7 px-1.5 text-xs"
                  >
                    <RotateCcw className="mr-1 h-3 w-3" />
                    Reset
                  </Button>
                </div>

                {/* Right: Exit Fullscreen */}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleFullscreen('text')}
                  title="Exit Fullscreen (Esc)"
                  className="h-8 gap-1.5 text-xs font-medium"
                >
                  <Minimize2 className="h-3.5 w-3.5" />
                  <span>Exit</span>
                </Button>
              </div>

              {/* Scrollable Text Body in Fullscreen */}
              <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start">
                <div className="max-w-3xl w-full bg-card border border-border rounded-xl p-6 sm:p-10 shadow-lg my-auto">
                  <div className="flex items-center justify-between border-b border-border pb-3 mb-6">
                    <div>
                      <span className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-widest block">
                        Translation & Notes
                      </span>
                      <h2 className="text-xl font-bold text-foreground mt-1">
                        {currentPage.title}
                      </h2>
                    </div>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      Page {currentPage.pageNumber} of {totalPages}
                    </span>
                  </div>

                  <div className="prose dark:prose-invert max-w-none">
                    {pageNum === 1 && (
                      <div className="mb-4 rounded-lg bg-amber-500/10 border border-amber-500/25 p-3 text-xs sm:text-sm text-amber-900 dark:text-amber-200 leading-relaxed font-sans">
                        <span className="font-semibold">Note:</span> this manuscript is read right to left. This title leaf physically belongs at the end of the scroll — after page 10 — where it served as the cover. The manuscript itself begins on page 2. It is shown here first only for readers used to left-to-right books, who would otherwise encounter the first page last.
                      </div>
                    )}
                    {pageNum === 2 && (
                      <div className="mb-4 rounded-lg bg-amber-500/10 border border-amber-500/25 p-3 text-xs sm:text-sm text-amber-900 dark:text-amber-200 leading-relaxed font-sans">
                        <span className="font-semibold">Note:</span> this scan ends in the middle of the preface. Even though the manuscript may look finished here, the preface continues on the next page.
                      </div>
                    )}
                    {pageNum === 3 && (
                      <div className="mb-4 rounded-lg bg-amber-500/10 border border-amber-500/25 p-3 text-xs sm:text-sm text-amber-900 dark:text-amber-200 leading-relaxed font-sans">
                        <span className="font-semibold">Note:</span> this page continues the preface from page 2 — not from page 1. Read right to left: the rightmost columns pick up where page 2&apos;s leftmost columns ended.
                      </div>
                    )}
                    {currentPage.content.split('\n\n').map((paragraph, idx) => {
                      const isChapterHeading = /^Chapter\s+\d+/i.test(paragraph.trim());
                      return (
                        <p
                          key={idx}
                          style={{ fontSize: `${(fontScale * 1.125).toFixed(3)}rem` }}
                          className={`leading-relaxed text-foreground whitespace-pre-line font-serif transition-[font-size] duration-150 ${
                            isChapterHeading ? 'mt-6 sm:mt-8' : ''
                          }`}
                        >
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>

                  {/* End of Page 3 indicator or Next page link in Fullscreen */}
                  {currentPage.isLastPage ? (
                    <div className="mt-8 pt-4 border-t border-border flex items-center gap-2.5 rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                      </span>
                      <span className="font-medium italic">…in development</span>
                    </div>
                  ) : (
                    <div className="mt-8 pt-4 border-t border-border flex justify-end">
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => handleNavigate(nextPageNum)}
                        className="gap-1 text-xs text-muted-foreground hover:text-foreground"
                      >
                        Continue to Page {nextPageNum} ({MANUSCRIPT_PAGES[nextPageNum - 1].shortTitle})
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* EMBEDDED TEXT PANEL CARD */
            <div className="flex flex-col justify-between rounded-xl bg-card p-6 border border-border shadow-sm flex-1">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-widest">
                      Translation & Notes
                    </span>
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                      Page {currentPage.pageNumber} of {totalPages}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Font Size Controls */}
                    <div className="flex items-center gap-1 rounded-md bg-muted/60 p-0.5 border border-border">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleFontDecrease}
                        disabled={fontScale <= 0.85}
                        title="Decrease Font Size"
                        aria-label="Decrease Font Size"
                        className="h-7 px-1.5 text-xs font-bold"
                      >
                        A-
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleFontIncrease}
                        disabled={fontScale >= 1.45}
                        title="Increase Font Size"
                        aria-label="Increase Font Size"
                        className="h-7 px-1.5 text-xs font-bold"
                      >
                        A+
                      </Button>
                    </div>

                    {/* Fullscreen Button */}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleFullscreen('text')}
                      title="Fullscreen Text"
                      aria-label="Fullscreen Text"
                      className="h-8 px-2.5 text-xs gap-1"
                    >
                      <Maximize2 className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Fullscreen</span>
                    </Button>
                  </div>
                </div>

                <div className="prose dark:prose-invert max-w-none">
                  {pageNum === 1 && (
                    <div className="mb-4 rounded-lg bg-amber-500/10 border border-amber-500/25 p-3 text-xs sm:text-sm text-amber-900 dark:text-amber-200 leading-relaxed font-sans">
                      <span className="font-semibold">Note:</span> this manuscript is read right to left. This title leaf physically belongs at the end of the scroll — after page 10 — where it served as the cover. The manuscript itself begins on page 2. It is shown here first only for readers used to left-to-right books, who would otherwise encounter the first page last.
                    </div>
                  )}
                  {pageNum === 2 && (
                    <div className="mb-4 rounded-lg bg-amber-500/10 border border-amber-500/25 p-3 text-xs sm:text-sm text-amber-900 dark:text-amber-200 leading-relaxed font-sans">
                      <span className="font-semibold">Note:</span> this scan ends in the middle of the preface. Even though the manuscript may look finished here, the preface continues on the next page.
                    </div>
                  )}
                  {pageNum === 3 && (
                    <div className="mb-4 rounded-lg bg-amber-500/10 border border-amber-500/25 p-3 text-xs sm:text-sm text-amber-900 dark:text-amber-200 leading-relaxed font-sans">
                      <span className="font-semibold">Note:</span> this page continues the preface from page 2 — not from page 1. Read right to left: the rightmost columns pick up where page 2&apos;s leftmost columns ended.
                    </div>
                  )}
                  {currentPage.content.split('\n\n').map((paragraph, idx) => {
                    const isChapterHeading = /^Chapter\s+\d+/i.test(paragraph.trim());
                    return (
                      <p
                        key={idx}
                        style={{ fontSize: `${(fontScale * 1.125).toFixed(3)}rem` }}
                        className={`leading-relaxed text-foreground whitespace-pre-line font-serif transition-[font-size] duration-150 ${
                          isChapterHeading ? 'mt-6 sm:mt-8' : ''
                        }`}
                      >
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              </div>

              {/* End of Page 3 indicator or Next page link */}
              {currentPage.isLastPage ? (
                <div className="mt-8 pt-4 border-t border-border flex items-center gap-2.5 rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                  </span>
                  <span className="font-medium italic">…in development</span>
                </div>
              ) : (
                <div className="mt-8 pt-4 border-t border-border flex justify-end">
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => handleNavigate(nextPageNum)}
                    className="gap-1 text-xs text-muted-foreground hover:text-foreground"
                  >
                    Continue to Page {nextPageNum} ({MANUSCRIPT_PAGES[nextPageNum - 1].shortTitle})
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        {hasPrev ? (
          <Button
            type="button"
            variant="outline"
            onClick={() => handleNavigate(prevPageNum)}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous Page
          </Button>
        ) : (
          <div />
        )}

        {hasNext && (
          <Button
            type="button"
            variant="default"
            onClick={() => handleNavigate(nextPageNum)}
            className="gap-2"
          >
            Next Page
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
