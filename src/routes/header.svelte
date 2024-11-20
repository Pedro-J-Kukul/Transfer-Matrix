<script lang="ts">
  export let title: string;
  import { onMount, onDestroy } from "svelte";
  let sidebarOpen = false;
  let sidebar: HTMLElement;

  const toggleSidebar = () => {
    sidebarOpen = !sidebarOpen;
  };

  // Close the sidebar when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    if (sidebarOpen && sidebar && !sidebar.contains(event.target as Node)) {
      sidebarOpen = false;
    }
  };
</script>

<header
  class="flex items-center justify-between p-4 bg-purple-900 text-white shadow z-20"
>
  <button
    class="text-2xl focus:outline-none"
    on:click={toggleSidebar}
    aria-label="Toggle menu"
  >
    ☰
  </button>
  <h1 class="text-xl font-bold">{title}</h1>
  <a href="/">
    <img
      src="https://www.ubelearn.com/pluginfile.php/1/theme_lambda/logo/1696980537/UB_logo_2017%20%282%29.png"
      alt="UB Logo"
      class="w-12 h-12 object-contain"
    />
  </a>
</header>

<!-- Sidebar -->
<div
  bind:this={sidebar}
  class="fixed top-20 left-0 h-[calc(100vh-4rem)] bg-purple-900 text-white shadow-md z-10 transition-transform duration-300 ease-in-out z-20"
  style="transform: translateX({sidebarOpen ? 0 : '-100%'}); width: 250px;"
>
  <nav class="flex flex-col p-4 space-y-4">
    <a href="/" class="hover:text-gray-200">Home</a>
    <a href="/search" class="hover:text-gray-200">Search</a>
    <a href="/help" class="hover:text-gray-200">Help</a>
  </nav>
</div>
