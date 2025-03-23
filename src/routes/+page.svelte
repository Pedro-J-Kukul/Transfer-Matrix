<script lang="ts">
    export let data;
    const { rawData, error } = data;

    // Format the raw data into a table-friendly structure
    const transferMatrix = rawData.map((row:any) => {
        const feederCourse = row.feederCourses;
        const ubCourse = row.ubCourses;
        const feederInstitution = feederCourse?.feederid;

        return {
            feederInstitution: feederInstitution?.schoolName || 'N/A',
            feederCourseName: feederCourse?.courseName || 'N/A',
            feederCourseCode: feederCourse?.courseCode || 'N/A',
            ubCourseName: ubCourse?.courseName || 'N/A',
            ubCourseCode: ubCourse?.courseCode || 'N/A',
            transferStatus: row.transferStatus
        };
    });
</script>

<main>
    <h1>Transfer Matrix</h1>

    {#if error}
        <p style="color: red;">Error: {error}</p>
    {:else if transferMatrix.length === 0}
        <p>No data available.</p>
    {:else}
        <table>
            <thead>
                <tr>
                    <th>Feeder Institution</th>
                    <th>Feeder Course Name</th>
                    <th>Feeder Course Code</th>
                    <th>UB Course Name</th>
                    <th>UB Course Code</th>
                    <th>Transfer Status</th>
                </tr>
            </thead>
            <tbody>
                {#each transferMatrix as item}
                    <tr>
                        <td>{item.feederInstitution}</td>
                        <td>{item.feederCourseName}</td>
                        <td>{item.feederCourseCode}</td>
                        <td>{item.ubCourseName}</td>
                        <td>{item.ubCourseCode}</td>
                        <td>{item.transferStatus}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {/if}
</main>

<style>
    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 1rem;
    }

    th, td {
        padding: 0.75rem;
        border: 1px solid #ddd;
        text-align: left;
    }

    th {
        background-color: #f4f4f4;
    }
</style>