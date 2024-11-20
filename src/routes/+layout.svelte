<script lang="ts">
  import "../app.css";
  import { page } from "$app/stores";
  import Header from "./header.svelte";
  import ContactForm from "$lib/components/Contact_Form/contactForm.svelte";
  let { title } = $page.data;
  $: title = $page.data?.title ?? "Default Title";
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content="About this app" />
</svelte:head>

<div class="h-screen flex flex-col">
  <Header {title} />
  <main class="flex-grow overflow-y-auto p-4">
    <slot />
  </main>
  <footer class="p-4 bg-purple-900 text-white text-center">
    <p>&copy; 2024 Melo</p>
  </footer>
</div>
