<script lang="ts">
  import { onMount } from "svelte";
  import { type PageData } from "./utils/dom";
  import Tabs from "./Tabs.svelte";
  import Summary from "./Summary.svelte";
  import Social from "./Social.svelte";
  import Headers from "./Headers.svelte";
  import Links from "./Links.svelte";
  import Images from "./Images.svelte";

  // states
  let activeTab = 0;
  let pageData: PageData | undefined;
  // let pageData: PageData | undefined = {
  //   url: "https://media.apik.web.id/",
  //   title: "Media Berita Nasional Aktual Terpercaya - Media.apik.web.id",
  //   description:
  //     "Media.apik.web.id - Media Berita Nasional Terkini Aktual Terpercaya Terlengkap Seputar Ekonomi, Bisnis, Teknologi, Otomotif, Bola",
  //   keywords:
  //     "Berita Terkini, Berita Hari Ini, Berita Harian, Berita Terbaru, Berita Akurat, Berita Terpercaya, Berita indonesia, Berita Terpopuler, Berita, Info Terkini, Media",
  //   robots: "index, follow",
  //   author: "andreecy",
  //   lang: "en",
  //   headers: [
  //     { level: 1, text: "hello world" },
  //     { level: 2, text: "hello world" },
  //     { level: 3, text: "hello world" },
  //   ],
  //   links: [
  //     { href: "https://asdf.com", label: "asdf.com", rel: "nofollow" },
  //     { href: "https://asdf.com", label: "asdf.com", rel: "nofollow" },
  //   ],
  //   images: [
  //     { src: "https://example.com/example.jng", alt: "example jpg image" },
  //     { src: "https://example.com/example.jng", alt: "example jpg image" },
  //   ],
  // };

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
      headers: [],
      links: [],
      images: [],
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

    // get headers
    const headerNodes = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    for (const h of headerNodes) {
      if (pageData.headers) {
        pageData.headers.push({
          level: Number(h.nodeName.toLowerCase().replace("h", "")),
          text: h.textContent,
        });
      }
    }

    // get links
    const linkNodes = document.querySelectorAll("a");
    for (const link of linkNodes) {
      if (pageData.links) {
        pageData.links.push({
          href: link.getAttribute("href"),
          label: link.textContent,
          rel: link.getAttribute("rel"),
        });
      }
    }

    // get imgs
    const imgNodes = document.querySelectorAll("img");
    for (const img of imgNodes) {
      if (pageData.images) {
        pageData.images.push({
          src: img.getAttribute("src"),
          alt: img.getAttribute("alt"),
        });
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

<div class="w-[450px] p-2">
  <div class="mb-2 flex items-center">
    <h1 class="flex-1 text-xl font-bold text-center">SEO Tool</h1>
  </div>

  {#if pageData}
    <Tabs
      {activeTab}
      onClick={(tabIdx) => {
        activeTab = tabIdx;
      }}
    />

    <div class="px-2 py-4 min-h-[500px]">
      {#if activeTab == 0}
        <Summary {pageData} />
      {/if}
      {#if activeTab == 1}
        <Headers {pageData} />
      {/if}
      {#if activeTab == 2}
        <Links {pageData} />
      {/if}
      {#if activeTab == 3}
        <Images {pageData} />
      {/if}
      {#if activeTab == 4}
        <Social {pageData} />
      {/if}
    </div>
  {:else}
    <div
      class="flex text-center text-gray-500 items-center justify-center px-2 py-4 min-h-[500px]"
    >
      <p>No SEO data available<br /> for this page.</p>
    </div>
  {/if}
</div>
