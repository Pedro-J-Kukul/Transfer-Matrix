<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<main>
  <h1>Welcome to the University of Belize Transfer Matrix!</h1>
  <p>
    The Equivalency Matrix is designed to be a resource to identify potential
    transfer credit and associated University of Belize course equivalents from
    completed course work at other academic institutions. This database is
    provided as a service for students wanting to know whether the course(s)
    they are taking or plan to take will transfer to the University of Belize.
    The database is for reference only and is continually being updated as new
    courses are evaluated. It is neither an official determination nor a
    guarantee of transfer credit equivalencies. All information contained within
    this Matrix is subject to change, without prior notification. Final course
    equivalency is determined by the university's academic departments.<br /> Courses
    not appearing in the Matrix may transfer, but most likely have not been evaluated
    yet. Current UB students desiring an evaluation of courses not appearing in the
    Matrix should follow up with the Records Office. Credits for college-level courses
    must be completed with a grade of "C" (2.0) or better.
  </p>

  <div class="button-container">
    <a href="/search"
      ><button class="button">
        <i class="fas fa-search"></i> Search
      </button></a
    >
    <a href="/about"
      ><button class="button">
        <i class="fas fa-search"></i> About
      </button></a
    >
    <a href="/help"
      ><button class="button">
        <i class="fas fa-search"></i> Help
      </button></a
    >
  </div>
</main>

<style>
  main {
    padding-top: 40px;
    text-align: center;
    max-width: 1500px;
    margin: auto;
  }

  h1 {
    font-size: 3rem;
    color: #3d014b;
  }

  p {
    font-size: 18px;
    line-height: 2;
  }

  .button-container {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 2rem;
  }

  .button {
    background-color: #3d014b;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    cursor: pointer;
  }

  .button:hover {
    background-color: #5a2377;
  }
</style>
