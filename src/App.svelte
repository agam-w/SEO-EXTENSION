<script lang="ts">
  import { onMount } from "svelte";
  import { getPageData, type PageData } from "./utils/dom";

  // states
  let title: string | undefined;

  // subscribe message in chrome runtime on mount
  onMount(() => {
    chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
      console.log({ req, sender });
      const pageData = req.data as PageData;
      // todo:
      // update states with data heres
      title = pageData.title;
    });
  });

  // extract data from the page DOM and send message in chrome runtime
  const getPageDataAndSendMsg = () => {
    let pageData: PageData = {
      title: document.title,
    };

    const metaNodes = document.getElementsByTagName("meta");

    for (const node of metaNodes) {
      if (node.name == "description") {
        pageData.description = node.content;
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

  // handle button analyze click
  const clickAnalyze = () => {
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

<div class="min-w-[320px] bg-gray-50 p-3">
  <div class="mb-2 flex items-center">
    <h1 class="flex-1 text-xl font-bold text-center">SEO Tool</h1>
    <button
      id="button"
      on:click={clickAnalyze}
      class="py-1 px-2 bg-blue-500 text-white text-sm rounded">Analyze</button
    >
  </div>

  <div class="space-y-6 text-sm">
    <div class="">
      <p class="text-lg font-semibold">https://kumparan.com</p>
    </div>

    <div>
      <p class="font-bold mb-2">Meta Title</p>
      <div class="space-y-1">
        <div class="border-l-4 p-2 border-l-green-500 bg-gray-200">
          {title}
        </div>
        <p>Length: {title?.length}</p>
      </div>
    </div>

    <div>
      <p class="font-bold mb-2">Meta Description</p>
      <div class="space-y-1">
        <div class="border-l-4 p-2 border-l-green-500 bg-gray-200">
          kumparan.com adalah platform media berita kolaboratif, terkini
          Indonesia hari ini yang menyajikan informasi news, sepak bola,
          ekonomi, politik, showbiz, lifestyle, otomotif, tekno dan travel
        </div>
        <p>Length: 190</p>
      </div>
    </div>

    <div>
      <p class="font-bold mb-2">Open Graph Meta Tags</p>
      <div class="space-y-1">
        <div class="w-full">
          <div class="flex border-b-gray-200 border-b">
            <div class="basis-1/3 p-2">og:site</div>
            <div class="basis-2/3 p-2">kumparan</div>
          </div>
          <div class="flex border-b-gray-200 border-b">
            <div class="basis-1/3 p-2">og:url</div>
            <div class="basis-2/3 p-2">https://kumparan.com</div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <p class="font-bold mb-2">Keywords</p>
      <div class="space-y-1">
        <p class="inline-block px-2 rounded bg-gray-200">html</p>
        <p class="inline-block px-2 rounded bg-gray-200">css</p>
        <p class="inline-block px-2 rounded bg-gray-200">javascript</p>
        <p class="inline-block px-2 rounded bg-gray-200">html</p>
        <p class="inline-block px-2 rounded bg-gray-200">html</p>
        <p class="inline-block px-2 rounded bg-gray-200">css</p>
        <p class="inline-block px-2 rounded bg-gray-200">javascript</p>
        <p class="inline-block px-2 rounded bg-gray-200">css</p>
        <p class="inline-block px-2 rounded bg-gray-200">javascript</p>
      </div>
    </div>

    <div>
      <p class="font-bold mb-2">Heading Tags</p>
      <div class="space-y-1">
        <p class="font-semibold">H1</p>
        <div class="">
          kumparan.com - Platform Media Berita Kolaboratif, Terkini Indonesia
          Hari Ini
        </div>
      </div>
    </div>

    <div>
      <p class="font-bold mb-2">Robots.txt</p>
      <div class="space-y-1">
        <div class="" />
      </div>
    </div>

    <div>
      <p class="font-bold mb-2">Sitemap</p>
      <div class="space-y-1">
        <div class="" />
      </div>
    </div>
  </div>
</div>
