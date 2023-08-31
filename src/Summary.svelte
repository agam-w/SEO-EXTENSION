<script lang="ts">
  import Tooltip from "./Tooltip.svelte";
  import { type PageData } from "./utils/dom";

  export let pageData: PageData | undefined;
</script>

{#if pageData}
  <div class="space-y-6 text-sm">
    <div class="">
      <div class="flex items-center space-x-1">
        <p class="font-bold">URL</p>
        <Tooltip>
          <p class="font-bold">Current URL</p>
          <p>
            The uniform resource locator, abbreviated as URL (also known as web
            address, particularly when used with HTTP), is a specific character
            string that constitutes a reference to a resource. (i.e.: a webpage)
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
              page's content. It also provides search engines with a description
              for search engine Index purposes. The description tag is not
              displayed on the website itself.
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
              page, or not, and whether they should follow links from a page, or
              not.
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
            <p>&lt;html lang=... specifies the language of the current page.</p>
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
  </div>
{/if}
