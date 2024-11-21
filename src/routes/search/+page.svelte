<script lang="ts">
  import { onMount } from "svelte";
  import type { JSONData, School, Course } from "./types";
  import { goto } from "$app/navigation";

  let jsonData: JSONData = { schools: [] };
  let filteredData: JSONData = { schools: [] };
  let searchQuery = "";
  let selectedYear: string = "";
  let selectedSchool: string = "";
  let selectedProgramme: string = "";
  let transferStatus = false;
  let schools: string[] = [];
  let years: number[] = [];
  let programmes: string[] = [];
  let showTable = false;
  let printed = false;

  const defaultMessage = "Search to continue.";
  let message = defaultMessage;

  onMount(async () => {
    const response = await fetch("/data/course.json");
    jsonData = await response.json();
    schools = jsonData.schools.map((school) => school.name);
    years = [
      ...new Set(
        jsonData.schools.flatMap((school) =>
          school.courses.flatMap((course) => course.years)
        )
      ),
    ];
    programmes = [
      ...new Set(
        jsonData.schools.flatMap((school) =>
          school.courses.flatMap((course) =>
            course.programmes.map((p) => `${p.name} (${p.code})`)
          )
        )
      ),
    ];
  });

  function filterResults() {
    const filterBySchool = (school: School) =>
      selectedSchool ? school.name === selectedSchool : true;

    const filterByYear = (course: Course) =>
      selectedYear ? course.years.includes(Number(selectedYear)) : true;

    const filterByProgramme = (course: Course) =>
      selectedProgramme
        ? course.programmes.some(
            (p) => `${p.name} (${p.code})` === selectedProgramme
          )
        : true;

    const filterByTransferStatus = (course: Course) =>
      transferStatus ? course.transferStatus.status == transferStatus : true;

    const filterByQuery = (course: Course) =>
      searchQuery
        ? course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.code.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

    filteredData = {
      schools: jsonData.schools
        .filter(filterBySchool)
        .map((school) => ({
          ...school,
          courses: school.courses.filter(
            (course) =>
              filterByYear(course) &&
              filterByProgramme(course) &&
              filterByTransferStatus(course) &&
              filterByQuery(course)
          ),
        }))
        .filter((school) => school.courses.length > 0),
    };

    if (filteredData.schools.length > 0) {
      showTable = true;
      message = "";
    } else {
      showTable = false;
      message = searchQuery ? "Error: Nothing found." : defaultMessage;
    }
  }

  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === "Enter") {
      filterResults();
    }
  }

  function clearFilters() {
    selectedYear = "";
    selectedSchool = "";
    selectedProgramme = "";
    transferStatus = false;
    searchQuery = "";
    filteredData = { schools: [] };
    showTable = false;
    message = defaultMessage;
  }

  function printTable() {
    const printContents = document.getElementById("print-container")?.innerHTML;
    if (printContents) {
      const printWindow = window.open("", "_blank");
      printWindow?.document.write(`
        <html>
          <head>
            <title>Transferable Courses</title>
            <style>
              body { font-family: Arial, sans-serif; }
              table { border-collapse: collapse; width: 100%; }
              th, td { border: 1px solid black; padding: 8px; text-align: left; }
            </style>
          </head>
          <body>${printContents}</body>
        </html>
      `);
      printWindow?.document.close();
      printWindow?.focus();
      printWindow?.print();
      printWindow?.close();
      printed = true;
    }
  }

  function showTooltip(id: string) {
    const tooltip = document.getElementById(`tooltip-${id}`);
    if (tooltip) tooltip.classList.remove("hidden");
  }

  function hideTooltip(id: string) {
    const tooltip = document.getElementById(`tooltip-${id}`);
    if (tooltip) tooltip.classList.add("hidden");
  }
</script>

<section class="w-full h-screen overflow-y-auto p-10">
  <div class="w-4/5 mx-auto text-center">
    <div class="w-4/5 mx-auto text-center">
      <div class="flex items-center justify-center mb-5">
        <button
          class="px-4 py-2 mr-2 text-lg text-white bg-red-500 rounded-md"
          on:click={clearFilters}
        >
          Clear
        </button>
        <input
          class="flex-1 px-4 py-2 text-lg border border-purple-800 rounded-l-md focus:outline-none"
          type="text"
          aria-label="Search"
          placeholder="Search by course code or name..."
          bind:value={searchQuery}
          on:keypress={handleKeyPress}
        />
        <button
          id="search-button"
          class="px-4 py-2 text-lg text-white bg-purple-800 rounded-r-md"
          type="button"
          on:click={filterResults}
        >
          <img
            src="/images/magnifying-glass.svg"
            alt="Search Icon"
            class="h-6 w-6"
          />
        </button>
      </div>

      <div class="flex flex-wrap items-center justify-center gap-2 my-5">
        <!-- Filters remain as is -->
        <!-- School Filter -->
        <select
          class="px-4 py-2 text-lg border border-purple-800 rounded-md"
          bind:value={selectedSchool}
        >
          <option value="">Select School</option>
          {#each schools as school}
            <option value={school}>{school}</option>
          {/each}
        </select>

        <!-- Programme Filter -->
        <select
          class="px-4 py-2 text-lg border border-purple-800 rounded-md"
          bind:value={selectedProgramme}
        >
          <option value="">Select Program</option>
          {#each programmes as programme}
            <option value={programme}>{programme}</option>
          {/each}
        </select>

        <!-- Year Filter -->
        <select
          class="px-4 py-2 text-lg border border-purple-800 rounded-md"
          bind:value={selectedYear}
        >
          <option value="">Select Year</option>
          {#each years as year}
            <option value={year}>{year}</option>
          {/each}
        </select>

        <!-- Transfer Status Filter -->
        <label
          class="flex items-center gap-2 text-sm font-medium text-gray-700"
        >
          <input type="checkbox" bind:checked={transferStatus} />
          Transfer Status
        </label>
      </div>
    </div>

    {#if showTable}
      <div id="table-container" class="mt-5 overflow-y-auto rounded-lg">
        <table class="table-auto border-collapse border w-11/12 mx-auto" 
        >
          <thead>
            <tr class="bg-purple-800 text-white" style="background-color: #3d014b; ">
              <th class="border border-purple-800 p-2" style="font-size: 24px" colspan="4"
                >Transferable Courses</th
              >
              <th class="border border-purple-800 p-2" style="text-align: center; vertical-align: middle;"
                ><button
                  class="px-4 py-2 text-lg text-white bg-green-700 rounded-md mb-3"
                  on:click={printTable}
                >
                  Print
                </button></th>
            </tr>
            <tr class="bg-purple-800 text-white">
              <th class="border border-purple-800 p-2">Code</th>
              <th class="border border-purple-800 p-2">Course</th>
              <th class="border border-purple-800 p-2">University Course</th>
              <th class="border border-purple-800 p-2">University Code</th>
              <th class="border border-purple-800 p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {#each filteredData.schools as school}
              <!-- Feeder School Header -->
              <tr class="bg-gray-200 text-black font-bold">
                <td class="border border-purple-800 p-2" colspan="5">
                  {school.name}
                </td>
              </tr>
              <!-- Courses for the Current School -->
              {#each school.courses as course}
                <tr>
                  <td class="border border-purple-800 p-2">{course.code}</td>
                  <td class="border border-purple-800 p-2">{course.name}</td>
                  <td class="border border-purple-800 p-2">
                    {course.transferStatus.universityCourse}
                  </td>
                  <td class="border border-purple-800 p-2">
                    {course.transferStatus.universityCode}
                  </td>
                  <td class="border border-purple-800 p-2">
                    {course.transferStatus.status ? "Yes" : "No"}
                  </td>
                </tr>
              {/each}
            {/each}
          </tbody>
        </table>
      </div>
    {:else}
      <p class="mt-10 text-center text-lg text-gray-600">{message}</p>
    {/if}
  </div>

  <!-- Hidden print container -->
  <div id="print-container" class="hidden">
    <table>
      <thead>
        <tr>
          <th>Code</th>
          <th>Course</th>
          <th>University Course</th>
          <th>University Code</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {#each filteredData.schools as school}
          <tr>
            <td colspan="5"><strong>{school.name}</strong></td>
          </tr>
          {#each school.courses as course}
            <tr>
              <td>{course.code}</td>
              <td>{course.name}</td>
              <td>{course.transferStatus.universityCourse}</td>
              <td>{course.transferStatus.universityCode}</td>
              <td>{course.transferStatus.status ? "Yes" : "No"}</td>
            </tr>
          {/each}
        {/each}
      </tbody>
    </table>
  </div>
</section>
