import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getManuscriptPage, MANUSCRIPT_PAGES } from '@/data/manuscriptData';
import ManuscriptViewer from '@/components/manuscript/ManuscriptViewer';

interface ManuscriptPageProps {
  params: {
    page: string;
  };
}

export function generateStaticParams() {
  return MANUSCRIPT_PAGES.map((p) => ({
    page: p.pageNumber.toString(),
  }));
}

export function generateMetadata({ params }: ManuscriptPageProps): Metadata {
  const pageNum = parseInt(params.page, 10);
  const pageData = getManuscriptPage(pageNum);

  if (!pageData) {
    return {
      title: 'Page Not Found',
    };
  }

  return {
    title: `${pageData.title} | Dunhuang Manuscript Pelliot chinois 2584`,
    description: `Read ${pageData.title} of Dunhuang manuscript Pelliot chinois 2584 (Bibliothèque nationale de France) side-by-side with English text.`,
  };
}

export default function ManuscriptPage({ params }: ManuscriptPageProps) {
  const pageNum = parseInt(params.page, 10);
  if (isNaN(pageNum)) {
    notFound();
  }

  const pageData = getManuscriptPage(pageNum);
  if (!pageData) {
    notFound();
  }

  return <ManuscriptViewer currentPage={pageData} />;
}
