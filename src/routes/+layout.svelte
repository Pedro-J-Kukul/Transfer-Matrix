<script lang="ts">
  import "../app.css";
  import { page } from "$app/stores";
  import Form from "$src/lib/components/form.svelte";
  import Header from "$src/lib/components/header.svelte";

  let { title } = $page.data;
  $: title = $page.data?.title ?? "Default Title";
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content="About this app" />
</svelte:head>

<div class="h-screen flex flex-col">
  <!-- Header -->
  <Header {title} />

  <!-- Main Content -->
  <main class="flex-grow overflow-y-auto p-0 m-0">
    <slot />
  </main>
  <!-- Footer -->
  <Form />
  <footer class="p-4 bg-purple-900 text-white text-center">
    <p>&copy; 2024 Melo</p>
  </footer>
</div>
