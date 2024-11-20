<script lang="ts">
  import { onMount } from 'svelte';

  export let filterData: Record<string, any>;
  let courses : Array<string>[]  | any[] = [];
  let filteredCourses: Array<string>[] | any[] = [];

  onMount(async () => {
    const response = await fetch('/data/course.json');
    if (!response.ok) {
      console.error('Failed to load course data');
      return;
    }
    courses = await response.json();
    filterCourses();
  });

  function filterCourses() {
    filteredCourses = courses.filter((course) => {
      const matchesSearch = !filterData.searchQuery || course.course.includes(filterData.searchQuery);
      const matchesFeeder = !filterData.feeder || course.feeder === filterData.feeder;
      const matchesYear = !filterData.year || course.year === filterData.year;
      const matchesMajor = !filterData.major || course.major === filterData.major;

      return matchesSearch && matchesFeeder && matchesYear && matchesMajor;
    });
  }

  $: filterCourses();
</script>

<table>
  <thead>
    <tr>
      <th>Code</th>
      <th>Course</th>
      <th>Year</th>
      <th>Feeder</th>
      <th>Major</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    {#if filteredCourses.length}
      {#each filteredCourses as course}
        <tr>
          <td>{course.code}</td>
          <td>{course.course}</td>
          <td>{course.year}</td>
          <td>{course.feeder}</td>
          <td>{course.major}</td>
          <td>{course.status}</td>
        </tr>
      {/each}
    {:else}
      <tr>
        <td colspan="6">No matching courses found.</td>
      </tr>
    {/if}
  </tbody>
</table>
