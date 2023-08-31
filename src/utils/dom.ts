type Header = {
  level: number;
  text: string | null;
};

type Link = {
  href?: string | null;
  label: string | null;
  rel?: string | null;
};

type Image = {
  src: string | null;
  alt: string | null;
};

export type PageData = {
  url?: string;
  title?: string;
  description?: string;
  socialMetaTags?: Record<string, string>;
  keywords?: string;
  robots?: string;
  author?: string;
  lang?: string;
  headers?: Header[];
  links?: Link[];
  images?: Image[];
};

export const getPageData = (): PageData => {
  let pageData: PageData = {
    title: document.title,
  };

  const metaNodes = document.getElementsByTagName("meta");

  for (const node of metaNodes) {
    if (node.name == "description") {
      pageData.description = node.content;
    }
  }

  return pageData;
};
