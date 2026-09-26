export interface ManuscriptPageData {
  pageNumber: number;
  title: string;
  shortTitle: string;
  imageSrc: string;
  caption: string;
  content: string;
  isLastPage?: boolean;
}

export const MANUSCRIPT_PAGES: ManuscriptPageData[] = [
  {
    pageNumber: 1,
    title: "Title Leaf",
    shortTitle: "Title Leaf",
    imageSrc: "/manuscripts/pelliot-2584/page-1.jpg",
    caption:
      "Pelliot chinois 2584, Bibliothèque nationale de France (via the International Dunhuang Project)",
    content:
      "Laozi's Daodejing - Upper Part. Title leaf of a handwritten Dunhuang copy (Pelliot chinois 2584, Bibliothèque nationale de France). The small inscription names a former owner, the Daoist priest Su Dongxuan; the red seal is the library's stamp.",
  },
  {
    pageNumber: 2,
    title: "Preface",
    shortTitle: "Preface",
    imageSrc: "/manuscripts/pelliot-2584/page-2.jpg",
    caption:
      "Pelliot chinois 2584, Bibliothèque nationale de France (via the International Dunhuang Project)",
    content:
      "Preface. Preface by the Daoist master Ge Xuan (3rd century) on how the Daodejing was handed down - from Laozi to Heshang Gong, who expounded it to Emperor Wen of Han. This is front matter: the Daodejing itself begins on the next page.",
  },
  {
    pageNumber: 3,
    title: "Chapter 1",
    shortTitle: "Chapter 1",
    imageSrc: "/manuscripts/pelliot-2584/page-3.jpg",
    caption:
      "Pelliot chinois 2584, Bibliothèque nationale de France (via the International Dunhuang Project)",
    content: `Chapter 1

The Dao that can be spoken is not the constant Dao;
the name that can be named is not the constant name.
The nameless is the beginning of heaven and earth…`,
    isLastPage: true,
  },
];

export function getManuscriptPage(pageNumber: number): ManuscriptPageData | undefined {
  return MANUSCRIPT_PAGES.find((p) => p.pageNumber === pageNumber);
}
