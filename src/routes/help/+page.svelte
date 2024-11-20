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

<!-- svelte-ignore a11y_img_redundant_alt -->
<div class="banner-image">
  src="https://www.ubelearn.com/pluginfile.php/1/theme_lambda/logo/1696980537/UB_logo_2017%20%282%29.png"
</div>

<main>
  <h1>Need help?</h1>
  <p>
    If you are still in need of assistance or would like to make an inquiry,
    feel free to reach out to us.
  </p>
  <p>You can reach us using the information provided:</p>

  <div class="contact-card">
    <h2>Contact us</h2>
    <p>{contactInfo.title}</p>
    <p>{contactInfo.location}</p>
    <p><a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></p>
    <p>{contactInfo.phone}</p>
  </div>
</main>

<style>
  main {
    padding-top: 40px;
    text-align: center;
    max-width: 800px;
    margin: auto;
  }

  .contact-card {
    background-color: #f0f0f0;
    padding: 0.45rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-top: 2rem;
  }
</style>
