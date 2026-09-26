'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Maximize2, Minimize2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MANUSCRIPT_PAGES } from '@/data/manuscriptData';

interface ZoomableImageProps {
  src: string;
  alt: string;
  caption: string;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  pageNum: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  onSelectPage: (page: number) => void;
}

export default function ZoomableImage({
  src,
  alt,
  caption,
  isFullscreen,
  onToggleFullscreen,
  hasPrev,
  hasNext,
  pageNum,
  totalPages,
  onPrev,
  onNext,
  onSelectPage,
}: ZoomableImageProps) {
  const [scale, setScale] = useState<number>(1);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [scrollStart, setScrollStart] = useState<{ left: number; top: number }>({
    left: 0,
    top: 0,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = useCallback(() => {
    setScale((prev) => Math.min(Number((prev + 0.25).toFixed(2)), 3.5));
  }, []);

  const handleZoomOut = useCallback(() => {
    setScale((prev) => Math.max(Number((prev - 0.25).toFixed(2)), 0.75));
  }, []);

  const handleReset = useCallback(() => {
    setScale(1);
    if (containerRef.current) {
      containerRef.current.scrollLeft = 0;
      containerRef.current.scrollTop = 0;
    }
  }, []);

  // Handle Drag / Pan
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setScrollStart({
      left: containerRef.current.scrollLeft,
      top: containerRef.current.scrollTop,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    containerRef.current.scrollLeft = scrollStart.left - dx;
    containerRef.current.scrollTop = scrollStart.top - dy;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  // Touch handlers for drag/pan
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1 && containerRef.current) {
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      setScrollStart({
        left: containerRef.current.scrollLeft,
        top: containerRef.current.scrollTop,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging && e.touches.length === 1 && containerRef.current) {
      const dx = e.touches[0].clientX - dragStart.x;
      const dy = e.touches[0].clientY - dragStart.y;
      containerRef.current.scrollLeft = scrollStart.left - dx;
      containerRef.current.scrollTop = scrollStart.top - dy;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      if (e.deltaY < 0) {
        handleZoomIn();
      } else {
        handleZoomOut();
      }
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={`flex flex-col h-full transition-all duration-300 ${
        isFullscreen
          ? 'fixed inset-0 z-50 bg-background/95 backdrop-blur-md p-4 sm:p-6 overflow-hidden'
          : 'relative w-full'
      }`}
    >
      {/* Main Image Card Container */}
      <div className="flex flex-col flex-1 rounded-xl border border-border overflow-hidden bg-card shadow-sm">
        {isFullscreen ? (
          /* FULLSCREEN HEADER CHROME - Identical across both panels */
          <div className="flex flex-wrap items-center justify-between gap-3 bg-card p-3 border-b border-border shrink-0 shadow-sm">
            {/* Left: Navigation Controls */}
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onPrev}
                disabled={!hasPrev}
                title="Previous Page (Left Arrow)"
                className="h-8 gap-1 text-xs"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span className="hidden xs:inline">Prev</span>
              </Button>

              <div className="flex items-center gap-1">
                <span className="text-xs font-medium text-muted-foreground hidden sm:inline">
                  Page
                </span>
                <div className="flex gap-1">
                  {MANUSCRIPT_PAGES.map((p) => {
                    const isActive = p.pageNumber === pageNum;
                    return (
                      <button
                        type="button"
                        key={p.pageNumber}
                        onClick={() => onSelectPage(p.pageNumber)}
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
                onClick={onNext}
                disabled={!hasNext}
                title="Next Page (Right Arrow)"
                className="h-8 gap-1 text-xs"
              >
                <span className="hidden xs:inline">Next</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>

            {/* Middle: Zoom Controls */}
            <div className="flex items-center gap-1 rounded-lg bg-muted/60 p-1 border border-border">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleZoomOut}
                disabled={scale <= 0.75}
                title="Zoom Out (-)"
                className="h-7 w-7 p-0"
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </Button>
              <span className="min-w-[3rem] text-center font-mono text-xs font-medium text-foreground">
                {Math.round(scale * 100)}%
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleZoomIn}
                disabled={scale >= 3.5}
                title="Zoom In (+)"
                className="h-7 w-7 p-0"
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleReset}
                disabled={scale === 1}
                title="Reset Zoom"
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
              onClick={onToggleFullscreen}
              title="Exit Fullscreen (Esc)"
              className="h-8 gap-1.5 text-xs font-medium"
            >
              <Minimize2 className="h-3.5 w-3.5" />
              <span>Exit</span>
            </Button>
          </div>
        ) : (
          /* NORMAL EMBEDDED HEADER BAR */
          <div className="flex flex-wrap items-center justify-between gap-2 bg-muted/80 p-2.5 backdrop-blur border-b border-border shrink-0">
            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleZoomOut}
                disabled={scale <= 0.75}
                title="Zoom Out (-)"
                aria-label="Zoom Out"
                className="h-8 w-8 p-0"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="min-w-[3.5rem] text-center font-mono text-xs font-medium text-foreground">
                {Math.round(scale * 100)}%
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleZoomIn}
                disabled={scale >= 3.5}
                title="Zoom In (+)"
                aria-label="Zoom In"
                className="h-8 w-8 p-0"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleReset}
                disabled={scale === 1}
                title="Reset Zoom"
                aria-label="Reset Zoom"
                className="h-8 px-2 text-xs"
              >
                <RotateCcw className="mr-1 h-3.5 w-3.5" />
                Reset
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-[11px] text-muted-foreground">
                Drag to pan | Scroll to zoom
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onToggleFullscreen}
                title="Fullscreen"
                aria-label="Fullscreen"
                className="h-8 px-2.5 text-xs"
              >
                <Maximize2 className="mr-1 h-3.5 w-3.5" />
                Fullscreen
              </Button>
            </div>
          </div>
        )}

        {/* Image Container */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
          className={`relative w-full flex-1 overflow-auto bg-neutral-900/90 select-none shadow-inner transition-colors ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          } ${isFullscreen ? 'min-h-[calc(100vh-10rem)]' : 'min-h-[480px] sm:min-h-[560px]'}`}
        >
          <div
            className="flex min-h-full min-w-full items-center justify-center p-4"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'center center',
              transition: isDragging ? 'none' : 'transform 0.15s ease-out',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="max-h-full max-w-full object-contain shadow-2xl rounded"
              draggable={false}
            />
          </div>
        </div>

        {/* Attribution Caption Footer inside Card */}
        <div className="border-t border-border bg-muted/40 p-2.5 text-center text-xs text-muted-foreground shrink-0 font-sans tracking-tight">
          {caption}
        </div>
      </div>
    </div>
  );
}
