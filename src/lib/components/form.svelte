<script lang="ts">
  import { browser } from "$app/environment";
  import { onDestroy } from "svelte";

  let name = "";
  let email = "";
  let subject = "";
  let message = "";
  let isFormOpen = false;

  const toggleForm = (): void => {
    isFormOpen = !isFormOpen;
  };

  const closeForm = (): void => {
    isFormOpen = false;
  };

  const handleOutsideClick = (event: MouseEvent): void => {
    if (!browser) return;

    const form = document.querySelector(".contact-form") as HTMLElement;
    const icon = document.querySelector(".contact-icon") as HTMLElement;

    if (
      form &&
      icon &&
      !form.contains(event.target as Node) &&
      !icon.contains(event.target as Node)
    ) {
      closeForm();
    }
  };

  // Safe event listener management
  $: {
    if (browser && isFormOpen) {
      window.addEventListener("click", handleOutsideClick);
    }
  }

  // Cleanup event listener
  onDestroy(() => {
    if (browser) {
      window.removeEventListener("click", handleOutsideClick);
    }
  });
</script>

<!-- Message Icon in the Bottom Right -->
<button
  style="position: fixed; bottom: 70px; right: 40px; background-color: #3d014b; color: white; padding: 1rem; border-radius: 9999px; cursor: pointer; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);"
  on:click={toggleForm}
>
  <img
    src="src/static/images/message.svg"
    class="h-15 w-15"
    alt="Message Icon"
  />
</button>


<!-- Form Overlay and Form -->
{#if browser}
  <div
    class={`contact-form-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-end items-end z-50 transition-all ${isFormOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
     style="padding-right: 100px; padding-bottom: 100px;"
  >
    <div
      class="contact-form bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative"
    >
      <!-- Close Button for the Form -->
      <button
        class="close-btn absolute top-4 right-4 text-2xl text-purple-800 focus:outline-none"
        on:click={closeForm}
      >
        &times;
      </button>
      <h2 class="text-xl font-semibold mb-4">
        Seek assistance from faculty by sending an email:
      </h2>
      <form action="https://formspree.io/f/xblrzwgg" method="POST">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          bind:value={name}
          required
          class="w-full p-3 mb-3 border border-gray-300 rounded-lg"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          bind:value={email}
          required
          class="w-full p-3 mb-3 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          bind:value={subject}
          required
          class="w-full p-3 mb-3 border border-gray-300 rounded-lg"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          bind:value={message}
          required
          class="w-full p-3 mb-3 border border-gray-300 rounded-lg"
        ></textarea>
        <button
          type="submit"
          class="w-full py-3 bg-purple-800 text-white rounded-lg hover:bg-purple-700 focus:outline-none"
        >
          Send Message
        </button>
      </form>
    </div>
  </div>
{/if}
