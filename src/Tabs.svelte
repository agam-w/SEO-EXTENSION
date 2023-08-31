<script lang="ts">
  export let activeTab = 0;
  export let onClick: (tab: number) => void;
</script>

<div class="flex space-x-1 text-sm">
  <button
    on:click={() => onClick(0)}
    class="px-4 py-2 {activeTab == 0
      ? 'bg-blue-300'
      : 'bg-gray-200'} hover:bg-blue-200 rounded-t-md"
  >
    Summary
  </button>

  <button
    on:click={() => onClick(1)}
    class="px-4 py-2 {activeTab == 1
      ? 'bg-blue-300'
      : 'bg-gray-200'} hover:bg-blue-200 rounded-t-md"
  >
    Headers
  </button>

  <button
    on:click={() => onClick(2)}
    class="px-4 py-2 {activeTab == 2
      ? 'bg-blue-300'
      : 'bg-gray-200'} hover:bg-blue-200 rounded-t-md"
  >
    Links
  </button>
   
  <button
    on:click={() => onClick(3)}
    class="px-4 py-2 {activeTab == 3
      ? 'bg-blue-300'
      : 'bg-gray-200'} hover:bg-blue-200 rounded-t-md"
  >
    Images
  </button>

  <button
    on:click={() => onClick(4)}
    class="px-4 py-2 {activeTab == 4
      ? 'bg-blue-300'
      : 'bg-gray-200'} hover:bg-blue-200 rounded-t-md"
  >
    Social
  </button>
</div>
