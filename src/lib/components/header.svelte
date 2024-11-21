<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";

  export let title: string = "University App"; // Default title

  let sidebarOpen = false;
  let isMounted = false;

  const toggleSidebar = () => {
    sidebarOpen = !sidebarOpen;
  };

  const handleClickOutside = (event: MouseEvent) => {
    // Ensure we're in the browser and component is mounted
    if (!browser || !isMounted) return;

    const sidebar = document.querySelector("#sidebar");
    const hamburger = document.querySelector("#hamburger");

    if (
      sidebarOpen &&
      sidebar &&
      hamburger &&
      event.target instanceof Node &&
      !sidebar.contains(event.target) &&
      !hamburger.contains(event.target)
    ) {
      sidebarOpen = false;
    }
  };

  onMount(() => {
    // Ensure we're in the browser environment
    if (browser) {
      isMounted = true;
      document.addEventListener("click", handleClickOutside);
    }
  });

  onDestroy(() => {
    // Ensure we're in the browser environment
    if (browser) {
      isMounted = false;
      document.removeEventListener("click", handleClickOutside);
    }
  });
</script>

<!-- Header -->
<header
  class="flex items-center justify-between h-32 bg-purple-900 text-white shadow-lg px-4 z-30"
>
  <!-- Hamburger Button -->
  <div id="hamburger" class="flex justify-center items-center w-32 h-full">
    <button
      class="text-5xl focus:outline-none"
      on:click={toggleSidebar}
      aria-label="Toggle menu"
    >
      ☰
    </button>
  </div>

  <!-- Header Title -->
  <h1 class="text-center text-5xl h-16 align-middle font-bold w-4/5 truncate">
    {title}
  </h1>

  <!-- Logo -->
  <div class="flex justify-center items-center w-24 h-fit">
    <a href="/" class="flex items-center justify-center w-full h-full">
      {#if browser}
        <img
          src="/images/logo.svg"
          alt="UB Logo"
          class="object-contain h-25"
          on:error={() => console.error("Logo failed to load")}
        />
      {/if}
    </a>
  </div>
</header>

<!-- Sidebar -->
<div
  id="sidebar"
  class={`fixed top-0 left-0 h-screen w-64 bg-purple-900 text-white shadow-lg transform transition-transform duration-300 ease-in-out ${
    sidebarOpen ? "translate-x-0" : "-translate-x-full"
  } z-20`}
>
  <!-- Hamburger Cell (matches header height) -->
  <div class="flex justify-center items-center h-32">
    <button
      class="text-5xl focus:outline-none"
      on:click={toggleSidebar}
      aria-label="Toggle menu"
    >
      ☰
    </button>
  </div>

  <!-- Sidebar Navigation -->
  <nav class="flex flex-col items-center space-y-4 mt-4">
    <a href="/" class="hover:text-gray-300 text-center text-lg w-full">Home</a>
    <a href="/search" class="hover:text-gray-300 text-center text-lg w-full"
      >Search</a
    >
    <a href="/help" class="hover:text-gray-300 text-center text-lg w-full"
      >Help</a
    >
  </nav>
</div>
