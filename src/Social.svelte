<script lang="ts">
  import { type PageData } from "./utils/dom";

  export let pageData: PageData | undefined;
</script>

{#if pageData}
  <div class="space-y-6 text-sm">
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
