export type PageData = {
  title?: string;
  description?: string;
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
