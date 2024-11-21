<script lang="ts">
  import { writable } from "svelte/store";

  // Form data interface
  interface ContactFormData {
    name: string;
    email: string;
    message: string;
  }

  // Initial form state
  const initialFormState: ContactFormData = {
    name: "",
    email: "",
    message: "",
  };

  // Form data store
  const formData = writable<ContactFormData>(initialFormState);

  // Overlay visibility store
  const isOverlayOpen = writable<boolean>(false);

  // Function to open overlay
  function openOverlay() {
    isOverlayOpen.set(true);
  }

  // Function to close overlay
  function closeOverlay() {
    isOverlayOpen.set(false);
  }

  // Form submission handler
  function handleSubmit() {
    // Validate form data
    if (!$formData.name || !$formData.email || !$formData.message) {
      alert("Please fill out all fields");
      return;
    }

    // Here you would typically send the form data to a backend
    console.log("Form submitted:", $formData);

    // Reset form and close overlay
    formData.set(initialFormState);
    closeOverlay();
  }
</script>

<div class="relative">
  <button
    on:click={openOverlay}
    class="fixed bottom-4 right-4 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
  >
    Contact Us
  </button>

  {#if $isOverlayOpen}
    <div
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      on:click|self={closeOverlay}
    >
      <div
        class="bg-white p-6 rounded-lg w-full max-w-md relative"
        on:click|stopPropagation
      >
        <button
          class="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          on:click={closeOverlay}>&times;</button
        >

        <form on:submit|preventDefault={handleSubmit}>
          <h2 class="text-xl font-semibold mb-4">Contact Form</h2>

          <div class="mb-4">
            <label for="name" class="block mb-1">Name</label>
            <input
              type="text"
              id="name"
              bind:value={$formData.name}
              required
              class="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div class="mb-4">
            <label for="email" class="block mb-1">Email</label>
            <input
              type="email"
              id="email"
              bind:value={$formData.email}
              required
              class="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div class="mb-4">
            <label for="message" class="block mb-1">Message</label>
            <textarea
              id="message"
              bind:value={$formData.message}
              required
              class="w-full p-2 border border-gray-300 rounded h-24"
            ></textarea>
          </div>

          <button
            type="submit"
            class="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  {/if}
</div>

<style>
  /* Add any additional custom styles here if needed */
</style>
