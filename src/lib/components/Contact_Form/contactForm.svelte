<script lang="ts">
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
    const form = document.querySelector(".contact-form") as HTMLElement;
    const icon = document.querySelector(".contact-icon") as HTMLElement;

    if (
      form &&
      !form.contains(event.target as Node) &&
      !icon.contains(event.target as Node)
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
</script>

<!-- Message Icon in the Bottom Right -->
<div
  class="contact-icon fixed bottom-5 right-5 bg-purple-800 text-white p-4 rounded-full cursor-pointer z-50"
  on:click={toggleForm}
>
  <i class="fas fa-comment-alt text-xl"></i>
</div>
<!-- Form Overlay and Form -->
<div
  class={`contact-form-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-end items-end z-50 transition-all ${isFormOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
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
