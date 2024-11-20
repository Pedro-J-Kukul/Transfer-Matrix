<script lang="ts">
  import { onMount } from "svelte";
  import type { JSONData, School, Course, Programme } from "./types";

  let jsonData: JSONData = { schools: [] };
  let filteredData: JSONData = { schools: [] };
  let searchQuery = "";
  let selectedYear: string = "";
  let selectedSchool: string = "";
  let selectedProgramme: string = "";
  let schools: string[] = [];
  let years: number[] = [];
  let programmes: string[] = [];

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
    filteredData = jsonData;
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
        ? course.name.includes(searchQuery) || course.code.includes(searchQuery)
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
  }
</script>

<div class="container">
  <div class="filters">
    <input
      class="search-bar"
      type="text"
      placeholder="Search by course or code"
      bind:value={searchQuery}
      on:input={filterResults}
    />
    <select
      class="dropdown"
      bind:value={selectedProgramme}
      on:change={filterResults}
    >
      <option value="">Select Programme</option>
      {#each programmes as programme}
        <option value={programme}>{programme}</option>
      {/each}
    </select>
    <select
      class="dropdown"
      bind:value={selectedSchool}
      on:change={filterResults}
    >
      <option value="">Select School</option>
      {#each schools as school}
        <option value={school}>{school}</option>
      {/each}
    </select>
    <select
      class="dropdown"
      bind:value={selectedYear}
      on:change={filterResults}
    >
      <option value="">Select Year</option>
      {#each years as year}
        <option value={year}>{year}</option>
      {/each}
    </select>
  </div>
  <div>
    <table class="transfer-table">
      <thead>
        <tr>
          <th colspan="4"
            >{selectedSchool ? selectedSchool : "Feeder Institution"}</th
          >
          <th colspan="4">University of Belize</th>
        </tr>
        <tr>
          <th>Code</th>
          <th>Course</th>
          <th>Year</th>
          <th>Code</th>
          <th>Course</th>
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
              <td>{course.transferStatus.universityCourse}</td>
              <td>{course.transferStatus.status}</td>
            </tr>
          {/each}
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  .container {
    max-width: 800px;
    margin: auto;
    margin-top: 5cm;
    padding: 1rem;
    font-family: Arial, sans-serif;
  }
  .search-bar,
  .dropdown {
    margin-bottom: 1rem;
  }
  .transfer-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 2rem;
  }

  .transfer-table th,
  .transfer-table td {
    padding: 12px;
    text-align: left;
    border: 1px solid #ddd;
  }

  .transfer-table th {
    background-color: #5c2e91;
    color: white;
  }

  .transfer-table td {
    background-color: #f9f9f9;
  }

  .transfer-table th[colspan="4"] {
    text-align: center;
    font-size: 18px;
    background-color: #4a1e6b;
    color: white;
    font-weight: bold;
  }

  .transfer-table th[colspan="4"]:last-child {
    background-color: #5c2e91;
  }

  .transfer-table tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  .transfer-table tr:hover {
    background-color: #ddd;
  }
</style>
