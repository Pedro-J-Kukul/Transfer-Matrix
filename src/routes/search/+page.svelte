<script lang="ts">
  import { onMount } from "svelte";
  import type { JSONData, School, Course } from "./types";
  import type { PageData } from "./$types";

  export let data: PageData;

  let jsonData: JSONData = { schools: [] };
  let filteredData: JSONData = { schools: [] };
  let searchQuery = "";
  let selectedYear: string = "";
  let selectedSchool: string = "";
  let selectedProgramme: string = "";
  let schools: string[] = [];
  let years: number[] = [];
  let programmes: string[] = [];
  let showTable = false;

  onMount(async () => {
    const response = await fetch("src/static/data/course.json");
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
              filterByQuery(course)
          ),
        }))
        .filter((school) => school.courses.length > 0),
    };

    showTable = filteredData.schools.length > 0;
  }
</script>

<div class="search-bar-container">
  <img
    src="path/to/image.png"
    alt="Search Illustration"
    class="placeholder-image"
  />

  <div class="search-container">
    <input
      class="search-input"
      type="text"
      aria-label="Search"
      placeholder="Search by course code or name..."
      bind:value={searchQuery}
    />

    <button
      id="search-button"
      class="search-button"
      type="button"
      on:click={filterResults}
    >
      Search
    </button>
  </div>

  <label class="filter-label">Filter By:</label>
  <div class="filter-container">
    <!-- School Filter -->
    <select
      class="filter-dropdown"
      bind:value={selectedSchool}
      on:change={filterResults}
    >
      <option value="">Select School</option>
      {#each schools as school}
        <option value={school}>{school}</option>
      {/each}
    </select>

    <!-- Programme Filter -->
    <select
      class="filter-dropdown"
      bind:value={selectedProgramme}
      on:change={filterResults}
    >
      <option value="">Select Programme</option>
      {#each programmes as programme}
        <option value={programme}>{programme}</option>
      {/each}
    </select>

    <!-- Year Filter -->
    <select
      class="filter-dropdown"
      bind:value={selectedYear}
      on:change={filterResults}
    >
      <option value="">Select Year</option>
      {#each years as year}
        <option value={year}>{year}</option>
      {/each}
    </select>
  </div>

  {#if showTable}
    <div id="table-container">
      <table class="transfer-table">
        <thead>
          <tr class="firstrow">
            <th>Code</th>
            <th>Course</th>
            <th>Year</th>
            <th>University Code</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {#each filteredData.schools as school}
            {#each school.courses as course}
              <tr>
                <td>{course.code}</td>
                <td>{course.name}</td>
                <td>{course.years.join(", ")}</td>
                <td>{course.transferStatus.universityCode}</td>
                <td>{course.transferStatus.status}</td>
              </tr>
            {/each}
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>

<style>
  .search-bar-container {
    width: 80%;
    margin: 0 auto;
    text-align: center;
  }

  .search-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
  }

  .search-input {
    flex: 1;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #3d014b;
    border-radius: 4px 0 0 4px;
    outline: none;
  }

  .search-button {
    padding: 10px 16px;
    font-size: 16px;
    border: none;
    background-color: #3d014b;
    color: white;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
  }

  .filter-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin: 20px 0;
  }

  .filter-dropdown {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #3d014b;
    border-radius: 5px;
  }

  #table-container {
    margin-top: 20px;
    max-width: 100%;
    overflow-y: auto;
    border-radius: 10px;
  }

  table {
    border-collapse: collapse;
    width: 90%;
  }

  th,
  td {
    border: 1px solid #3d014b;
    padding: 8px;
    text-align: center;
  }

  .placeholder-image {
    max-width: 100%;
    height: auto;
    margin: 20px 0;
  }
</style>
