'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, BookOpen, Layers } from 'lucide-react';
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

  // Keyboard navigation (Left / Right Arrow)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && hasPrev) {
        router.push(`/manuscript/${prevPageNum}`);
      } else if (e.key === 'ArrowRight' && hasNext) {
        router.push(`/manuscript/${nextPageNum}`);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasPrev, hasNext, prevPageNum, nextPageNum, router]);

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Header & Page Selector Bar */}
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
            <Button asChild variant="outline" size="sm" className="gap-1">
              <Link href={`/manuscript/${prevPageNum}`}>
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Prev</span>
              </Link>
            </Button>
          ) : (
            <Button variant="outline" size="sm" disabled className="gap-1">
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Prev</span>
            </Button>
          )}

          {/* Page Indicator / Dropdown */}
          <div className="flex items-center gap-1.5 px-2">
            <Layers className="h-4 w-4 text-muted-foreground hidden xs:inline" />
            <span className="text-xs font-medium text-muted-foreground">Page</span>
            <div className="flex gap-1">
              {MANUSCRIPT_PAGES.map((p) => {
                const isActive = p.pageNumber === pageNum;
                return (
                  <Link
                    key={p.pageNumber}
                    href={`/manuscript/${p.pageNumber}`}
                    className={`flex h-7 w-7 items-center justify-center rounded-md text-xs font-semibold transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    }`}
                    title={`Go to page ${p.pageNumber}: ${p.shortTitle}`}
                  >
                    {p.pageNumber}
                  </Link>
                );
              })}
            </div>
            <span className="text-xs font-medium text-muted-foreground">of {totalPages}</span>
          </div>

          {hasNext ? (
            <Button asChild variant="outline" size="sm" className="gap-1">
              <Link href={`/manuscript/${nextPageNum}`}>
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
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
        {/* Left Side: Zoomable Manuscript Image */}
        <div className="w-full flex flex-col h-full">
          <ZoomableImage
            src={currentPage.imageSrc}
            alt={`Manuscript scan - ${currentPage.title}`}
            caption={currentPage.caption}
          />
        </div>

        {/* Right Side: English Text Panel */}
        <div className="w-full flex flex-col h-full">
          <div className="flex flex-col justify-between rounded-xl bg-card p-6 border border-border shadow-sm flex-1">
            <div>
              <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
                <span className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-widest">
                  Translation & Notes
                </span>
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                  Page {currentPage.pageNumber} of {totalPages}
                </span>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                {currentPage.content.split('\n\n').map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-base sm:text-lg leading-relaxed text-foreground whitespace-pre-line font-serif"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* End of Page 3 indicator or Next page suggestion */}
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
                <Button asChild size="sm" variant="ghost" className="gap-1 text-xs text-muted-foreground hover:text-foreground">
                  <Link href={`/manuscript/${nextPageNum}`}>
                    Continue to Page {nextPageNum} ({MANUSCRIPT_PAGES[nextPageNum - 1].shortTitle})
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        {hasPrev ? (
          <Button asChild variant="outline" className="gap-2">
            <Link href={`/manuscript/${prevPageNum}`}>
              <ChevronLeft className="h-4 w-4" />
              Previous Page
            </Link>
          </Button>
        ) : (
          <div />
        )}

        {hasNext && (
          <Button asChild variant="default" className="gap-2">
            <Link href={`/manuscript/${nextPageNum}`}>
              Next Page
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
