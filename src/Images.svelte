<script lang="ts">
  import { type PageData } from "./utils/dom";

  export let pageData: PageData | undefined;
</script>

{#if pageData}
  <div class="space-y-6 text-sm">
    <div>
      <p class="font-bold mb-2">Images</p>
      <p class="text-gray-500 font-bold text-lg">
        {pageData.images?.length ?? 0}
      </p>

      <hr class="my-2"/>

      <div class="space-y-1">
        <div class="w-full">
          {#if pageData.images && pageData.images.length > 0}
            {#each pageData.images as img}
              <div class="p-2 border-b-gray-200 border-b">
                <a class="text-blue-400" href={img.src} target="_blank"
                  >{img.src}</a
                >
                <div class="flex">
                  {img.alt ?? ""}
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
