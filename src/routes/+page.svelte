<script lang="ts">
</script>

<!-- Banner Section -->
<div
  class="h-32 w-full overflow-hidden text-white text-2xl font-bold"
  style="background-image: url('/images/banner.svg'); background-size: cover; background-position: center; height: 300px"
></div>

<div class="px-6 py-8 mt-8 max-w-5xl mx-auto flex flex-col gap-8">
  <h1 class="text-4xl font-extrabold text-center" style="color: #3d014b;">
    Transfer Matrix Overview
  </h1>

  <p class="text-lg leading-relaxed text-center" style="color: #3d014b;">
    The <span class="font-semibold">Transfer Matrix</span> is a resource
    designed to help identify potential transfer credits and their equivalent
    courses at the
    <span class="font-semibold">University of Belize</span>. This tool allows
    students to explore whether courses they’ve completed—or plan to complete—at
    other academic institutions are transferable.
  </p>

  <h2 class="text-3xl font-bold text-center mt-6" style="color: #3d014b;">
    Key Notes
  </h2>
  <ul
    class="text-lg leading-relaxed list-disc list-inside mx-4"
    style="color: #3d014b;"
  >
    <li>The matrix is updated regularly as new courses are evaluated.</li>
    <li>
      It is intended <span class="font-semibold">for reference only</span> and does
      not represent a guarantee of credit transfer.
    </li>
    <li>
      Final course equivalencies are determined by the university's <span
        class="font-semibold">academic departments</span
      >.
    </li>
  </ul>

  <h2 class="text-3xl font-bold text-center mt-6" style="color: #3d014b;">
    Important Considerations
  </h2>
  <ul
    class="text-lg leading-relaxed list-disc list-inside mx-4"
    style="color: #3d014b;"
  >
    <li>
      <span class="font-semibold">Courses Not in the Matrix:</span> If a course
      is not listed in the matrix, it may still be transferable but has likely
      not yet been evaluated. Current UB students can request an evaluation
      through the <span class="font-semibold">Records Office</span>.
    </li>
    <li>
      <span class="font-semibold">Transfer Credit Requirements:</span> Only
      <span class="font-semibold">college-level courses</span>
      completed with a grade of <span class="font-semibold">C (2.0)</span> or better
      are eligible for credit transfer.
    </li>
  </ul>

  <!-- Disclaimer -->
  <h2 class="text-3xl font-bold text-center mt-6" style="color: #3d014b;">
    Disclaimer
  </h2>
  <p class="text-lg leading-relaxed text-center" style="color: #3d014b;">
    All information in the Equivalency Matrix is subject to change without prior
    notification. Please consult with the university for official
    determinations.
  </p>

  <!-- Button Section -->
  <div class="flex flex-row justify-center items-center gap-6 mt-8">
    <!-- Search Button -->
    <a href="/search" class="flex items-center gap-2">
      <button
        class="flex items-center bg-purple-900 text-white py-2 px-6 rounded-lg text-lg hover:bg-purple-700 transition duration-300 ease-in-out"
      >
        <img
          src="/images/magnifying-glass.svg"
          alt="Search Icon"
          class="h-6 w-6"
        />
        <span>Find a Course</span>
      </button>
    </a>

    <!-- Help Button -->
    <a href="/help" class="flex items-center gap-2">
      <button
        class="flex items-center bg-purple-900 text-white py-2 px-6 rounded-lg text-lg hover:bg-purple-700 transition duration-300 ease-in-out"
      >
      <span>Need Help</span>  
      <img src="/images/question-mark.svg" alt="Help Icon" class="h-6 w-6" />
        
      </button>
    </a>
  </div>
</div>

<!--Style Section-->

<style>
  * {
    font-family: Arial, Helvetica, sans-serif;
  }
  h1 {
    font-size: 45px;
    font-weight: 500px;
  }
  button {
    background-color: #3d014b;
  }
</style>
