<script lang="ts">
  import { type PageData } from "./utils/dom";

  export let pageData: PageData | undefined;
</script>

{#if pageData}
  <div class="space-y-6 text-sm">
    <div>
      <p class="font-bold mb-2">Links</p>
      <p class="text-gray-500 font-bold text-lg">
        {pageData.links?.length ?? 0}
      </p>

      <hr class="my-2"/>

      <div class="space-y-1">
        <div class="w-full">
          {#if pageData.links && pageData.links.length > 0}
            {#each pageData.links as link}
              <div class="p-2 border-b-gray-200 border-b">
                <div class="flex">
                  <div class="flex-1 break-all">
                    {link.label}
                  </div>
                  <div class="basis-1/4 break-all">{link.rel ?? ''}</div>
                </div>
                <div class="text-blue-400">{link.href}</div>
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
