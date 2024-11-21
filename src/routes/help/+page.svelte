<script lang="ts">
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
  let contactInfo = {
    title: "Office of Registrar",
    location: "Belmopan Campus",
    email: "registrar@ub.edu.bz",
    phone: "+501 625-8987",
  };
</script>

<!-- Banner Section -->
<div
  class="bg-purple-900 text-white h-32 w-full text-2xl font-bold flex items-center justify-center"
  style="background-image: url('src/static/images/banner.svg'); background-size: cover; background-position: center;"
></div>

<main class="py-10 px-4 md:px-16 lg:px-32 max-w-6xl mx-auto">
  <!-- Content Section -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <!-- Left Column: "Need Help?" Section -->
    <div class="bg-white border-b-4 border-gray-300 p-6 rounded-lg shadow-md">
      <h1 class="text-3xl font-bold text-purple-900">Need help?</h1>
      <p class="text-gray-700 mt-4">
        If you are still in need of assistance or would like to make an inquiry,
        feel free to reach out to us.
      </p>
      <p class="text-gray-700 mt-2">
        You can reach us using the information provided:
      </p>
    </div>

    <!-- Right Column: Contact Card -->
    <div class="bg-gray-100 p-6 rounded-lg shadow-lg">
      <h2 class="text-xl font-semibold text-purple-900 mb-4">Contact us</h2>
      <p class="text-gray-800 font-bold">{contactInfo.title}</p>
      <p class="text-gray-700">{contactInfo.location}</p>
      <p>
        <a
          href={`mailto:${contactInfo.email}`}
          class="text-purple-700 underline hover:text-purple-900"
        >
          {contactInfo.email}
        </a>
      </p>
      <p class="text-gray-700">{contactInfo.phone}</p>
    </div>
  </div>
</main>

<style>
  /* Add additional styling if necessary */
</style>
