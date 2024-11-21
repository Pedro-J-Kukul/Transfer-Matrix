<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  let name: string = "";
  let email: string = "";
  let subject: string = "";
  let message: string = "";
  let isFormOpen: boolean = false;

  const toggleForm = () => {
    isFormOpen = !isFormOpen;
  };

  const closeForm = () => {
    isFormOpen = false;
  };

  const handleOutsideClick = (event: MouseEvent) => {
    const form = document.querySelector(".contact-form") as HTMLElement;
    if (
      form &&
      !form.contains(event.target as Node) &&
      !(event.target as HTMLElement).matches(".contact-icon")
    ) {
      closeForm();
    }
  };

  $: {
    if (isFormOpen) {
      window.addEventListener("click", handleOutsideClick);
    } else {
      window.removeEventListener("click", handleOutsideClick);
    }
  }

  onDestroy(() => {
    window.removeEventListener("click", handleOutsideClick);
  });
</script>

<!-- Contact Icon -->
<button
  class="fixed bottom-5 right-5 bg-purple-700 text-white p-4 rounded-full text-xl flex justify-center items-center cursor-pointer z-50 shadow-lg"
  on:click={toggleForm}
>
  Send Messge
</button>

<!-- Form Overlay -->
<div
  class={`fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-40 transition-opacity ${
    isFormOpen
      ? "opacity-100 pointer-events-auto"
      : "opacity-0 pointer-events-none"
  }`}
>
  <!-- Contact Form -->
  <div
    class="contact-form bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative"
  >
    <!-- Close Button -->
    <button
      class="absolute top-2 right-2 text-purple-700 text-2xl"
      on:click={closeForm}
    >
      &times;
    </button>

    <h2 class="text-lg font-semibold mb-4 text-purple-800">
      Seek assistance from faculty by sending an email:
    </h2>

    <form
      action="https://formspree.io/f/xblrzwgg"
      method="POST"
      class="space-y-4"
    >
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        bind:value={name}
        required
        class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-purple-200"
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        bind:value={email}
        required
        class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-purple-200"
      />
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        bind:value={subject}
        required
        class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-purple-200"
      />
      <textarea
        name="message"
        placeholder="Your Message"
        rows="5"
        bind:value={message}
        required
        class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-purple-200"
      ></textarea>
      <button
        type="submit"
        class="w-full bg-purple-700 text-white p-3 rounded hover:bg-purple-800 transition duration-200"
      >
        Send Message
      </button>
    </form>
  </div>
</div>

<style>
  /* You can place additional custom styles here, if needed */
</style>
