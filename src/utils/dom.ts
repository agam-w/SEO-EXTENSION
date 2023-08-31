export type PageData = {
  url?: string;
  title?: string;
  description?: string;
  socialMetaTags?: Record<string, string>;
  keywords?: string;
  robots?: string;
  author?: string;
  lang?: string;
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
