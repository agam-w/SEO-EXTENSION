<script lang="ts">
  import { onMount } from "svelte";
  import { type PageData } from "./utils/dom";
  import Tooltip from "./Tooltip.svelte";
  import Tabs from "./Tabs.svelte";
  import Summary from "./Summary.svelte";
    import Social from "./Social.svelte";

  // states
  let activeTab = 0;

  let pageData: PageData | undefined = {
    url: "https://media.apik.web.id/",
    title: "Media Berita Nasional Aktual Terpercaya - Media.apik.web.id",
    description:
      "Media.apik.web.id - Media Berita Nasional Terkini Aktual Terpercaya Terlengkap Seputar Ekonomi, Bisnis, Teknologi, Otomotif, Bola",
    keywords:
      "Berita Terkini, Berita Hari Ini, Berita Harian, Berita Terbaru, Berita Akurat, Berita Terpercaya, Berita indonesia, Berita Terpopuler, Berita, Info Terkini, Media",
    robots: "index, follow",
    author: "andreecy",
    lang: "en",
  };

  onMount(() => {
    analyze();

    // subscribe message in chrome runtime on mount
    chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
      console.log({ req, sender });
      // update states with data heres
      pageData = req.data as PageData;
    });
  });

  // extract data from the page DOM and send message in chrome runtime
  const getPageDataAndSendMsg = () => {
    let pageData: PageData = {
      url: document.location.href,
      title: document.title,
      socialMetaTags: {},
      lang: document.querySelector("html")?.getAttribute("lang") ?? undefined,
    };

    const metaNodes = document.getElementsByTagName("meta");

    for (const node of metaNodes) {
      if (node.name === "description") {
        pageData.description = node.content;
      }

      if (node.getAttribute("property")?.match("og:")) {
        let k = node.getAttribute("property");
        if (pageData.socialMetaTags && k)
          pageData.socialMetaTags[k] = node.content;
      }

      if (node.name.match("twitter:")) {
        if (pageData.socialMetaTags)
          pageData.socialMetaTags[node.name] = node.content;
      }

      if (node.name === "keywords") {
        pageData.keywords = node.content;
      }

      if (node.name === "robots") {
        pageData.robots = node.content;
      }

      if (node.name === "author" || node.name === "article:author") {
        pageData.author = node.content;
      }
    }

    // https://developer.chrome.com/docs/extensions/mv3/messaging/
    (async () => {
      const response = await chrome.runtime.sendMessage({
        data: pageData,
      });
      // do something with response here, not outside the function
      console.log(response);
    })();
  };

  const analyze = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (!tab.id) return;
      // execute chrome scripting
      chrome.scripting
        .executeScript({
          target: { tabId: tab.id },
          func: getPageDataAndSendMsg,
        })
        .then(() => console.log("executed"));
    });
  };
</script>

<div class="min-w-[450px] p-2">
  <div class="mb-2 flex items-center">
    <h1 class="flex-1 text-xl font-bold text-center">SEO Tool</h1>
  </div>

  <Tabs
    {activeTab}
    onClick={(tabIdx) => {
      activeTab = tabIdx;
    }}
  />

  <div class="px-2 py-4">
    {#if activeTab == 0}
      <Summary {pageData} />
    {/if}
    {#if activeTab == 4}
      <Social {pageData} />
    {/if}
  </div>
</div>
