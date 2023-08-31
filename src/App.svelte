<script lang="ts">
  import { onMount } from "svelte";
  import { type PageData } from "./utils/dom";
  import Tooltip from "./Tooltip.svelte";

  // states
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

<div class="min-w-[450px] bg-gray-50 p-3">
  <div class="mb-2 flex items-center">
    <h1 class="flex-1 text-xl font-bold text-center">SEO Tool</h1>
  </div>

  {#if pageData}
    <div class="space-y-6 text-sm">
      <div class="">
        <div class="flex items-center space-x-1">
          <p class="font-bold">URL</p>
          <Tooltip>
            <p class="font-bold">Current URL</p>
            <p>
              The uniform resource locator, abbreviated as URL (also known as
              web address, particularly when used with HTTP), is a specific
              character string that constitutes a reference to a resource.
              (i.e.: a webpage)
            </p>
          </Tooltip>
        </div>
        <p>{pageData.url ?? "-"}</p>
      </div>

      <div>
        <div class="flex items-center space-x-1">
          <p class="font-bold">Title</p>
          <Tooltip>
            <p class="font-bold">Title Tag</p>
            <p>30-65 characters page title</p>
            <div>
              <p>Defines a title for:</p>
              <ul class="list-disc ml-5">
                <li>the document</li>
                <li>in the browser toolbar</li>
                <li>the page when it is added to favorites</li>
                <li>for the page in search-engine results</li>
              </ul>
            </div>
          </Tooltip>
        </div>
        {#if pageData.title}
          <div class="space-y-1">
            <p
              class={pageData.title.length >= 30 && pageData.title.length <= 65
                ? "text-green-500"
                : "text-yellow-500"}
            >
              Length: {pageData.title.length}
            </p>
            <div class="border-l-4 p-2 border-l-blue-500 bg-gray-200">
              {pageData.title}
            </div>
          </div>
        {:else}
          <p class="text-orange-500">Title is missing</p>
        {/if}
      </div>

      <div>
        <div class="flex items-center space-x-1">
          <p class="font-bold">Description</p>
          <Tooltip>
            <p class="font-bold">Description Meta Tag</p>
            <p>120-320 characters page description</p>
            <div>
              <p>
                The meta description tag is a brief and concise summary of your
                page's content. It also provides search engines with a
                description for search engine Index purposes. The description
                tag is not displayed on the website itself.
              </p>
            </div>
          </Tooltip>
        </div>
        {#if pageData.description}
          <div class="space-y-1">
            <p
              class={pageData.description.length >= 120 &&
              pageData.description.length <= 320
                ? "text-green-500"
                : "text-yellow-500"}
            >
              Length: {pageData.description?.length}
            </p>
            <div class="border-l-4 p-2 border-l-blue-500 bg-gray-200">
              {pageData.description}
            </div>
          </div>
        {:else}
          <p class="text-orange-500">Description is missing</p>
        {/if}
      </div>

      <div>
        <div class="flex items-center space-x-1">
          <p class="font-bold">Keywords</p>
          <Tooltip>
            <p class="font-bold">Keywords Meta Tag</p>
            <div>
              <p>
                A meta keywords tag provides search engines with a list of
                keywords that are relevant to a webpage. Unfortunately, search
                engines are now giving less importance to meta keywords tags in
                lieu of actual page content.
              </p>
            </div>
          </Tooltip>
        </div>
        {#if pageData.keywords}
          <div class="space-y-1">
            <p class="text-gray-400">
              Values {pageData.keywords?.split(",").length}
            </p>
            <div class="p-2 bg-gray-200">
              {pageData.keywords}
            </div>
          </div>
        {:else}
          <p class="text-gray-500">Keywords are missing!</p>
        {/if}
      </div>

      <div>
        <div class="flex items-center space-x-1">
          <p class="font-bold">Robots Tag</p>
          <Tooltip>
            <p class="font-bold">Robots Meta Tag</p>
            <div>
              <p>
                The robots attribute, supported by several major search engines,
                controls whether search engine spiders are allowed to index a
                page, or not, and whether they should follow links from a page,
                or not.
              </p>
            </div>
          </Tooltip>
        </div>
        {#if pageData.robots}
          <div class="space-y-1">
            <div class="p-2 bg-gray-200">
              {pageData.robots}
            </div>
          </div>
        {:else}
          <p class="text-gray-500">Robots meta tag is not defined.</p>
        {/if}
      </div>

      <div>
        <div class="flex items-center space-x-1">
          <p class="font-bold">Author</p>
          <Tooltip>
            <p class="font-bold">Author link or meta</p>
            <div>
              <p>
                This element can be used to identify the author of a page
                (article, blog, ...).
              </p>
            </div>
          </Tooltip>
        </div>
        {#if pageData.author}
          <div class="space-y-1">
            <div class="p-2 bg-gray-200">
              {pageData.author}
            </div>
          </div>
        {:else}
          <p class="text-gray-500">Author meta tag is not defined.</p>
        {/if}
      </div>

      <div>
        <div class="flex items-center space-x-1">
          <p class="font-bold">Lang</p>
          <Tooltip>
            <p class="font-bold">Lang attribute of HTML element</p>
            <div>
              <p>
                &lt;html lang=... specifies the language of the current page.
              </p>
            </div>
          </Tooltip>
        </div>
        {#if pageData.lang}
          <div class="space-y-1">
            <div class="p-2 bg-gray-200">
              {pageData.lang}
            </div>
          </div>
        {:else}
          <p class="text-gray-500">Lang meta tag is not defined.</p>
        {/if}
      </div>

      <div>
        <p class="font-bold mb-2">Social Meta Tags</p>
        <div class="space-y-1">
          <div class="w-full text-xs">
            {#if pageData.socialMetaTags && Object.keys(pageData.socialMetaTags).length > 0}
              {#each Object.keys(pageData.socialMetaTags) as k}
                <div class="flex border-b-gray-200 border-b">
                  <div class="basis-1/3 p-2">{k}</div>
                  <div class="basis-2/3 p-2 break-all">
                    {pageData.socialMetaTags[k]}
                  </div>
                </div>
              {/each}
            {:else}
              -
            {/if}
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>
