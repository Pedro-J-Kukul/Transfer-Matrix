<!--Js Script-->
<script>
  import { createEventDispatcher } from 'svelte';

  // Create an event dispatcher to send data to the parent component
  const dispatch = createEventDispatcher();

  // Reactive variables for filter inputs
  let searchQuery = '';
  let feeder = '';
  let year = '';
  let major = '';

  // Tooltip functionality
  function showTooltip(event) {
    const message = event.target.getAttribute('data-message');
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = message;
    document.body.appendChild(tooltip);

    const rect = event.target.getBoundingClientRect();
    tooltip.style.left = `${rect.left + window.scrollX}px`;
    tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;

    event.target.addEventListener('mouseleave', () => {
      if (tooltip) tooltip.remove();
    }, { once: true });
  }

  // Function to emit the filter data
  function sendFilterData() {
    const filterData = {
      searchQuery: searchQuery.trim(),
      feeder,
      year: year.trim(),
      major
    };
    dispatch('filterChange', filterData);
  }
</script>

<!-- HTML -->
<div class="search-bar-container">
  <!-- Search Bar -->
  <div class="search-container">
    <input
      type="text"
      id="search-input"
      class="search-input"
      placeholder="Search..."
      aria-label="Search"
      bind:value="{searchQuery}"
    />
    <button
      id="search-button"
      class="search-button"
      type="button"
      on:click="{sendFilterData}"
    >
      <i class="fas fa-search"></i>
    </button>
  </div>

  <!-- Filters -->
  <label class="filter-label" for="filters">Filter By:</label>
  <div id="filters" class="filter-container">
    <select
      id="feeder-select"
      class="filter-dropdown"
      name="feeder"
      bind:value="{feeder}"
      on:change="{sendFilterData}"
    >
      <option value="" disabled selected id="default-option">Feeder</option>
      <option value="Galen">Galen University</option>
      <option value="Johns">St. John's College Junior College</option>
      <option value="Sacred">Sacred Heart Junior College</option>
      <option value="Independence">Independence Junior College</option>
      <option value="Muffle">Muffle's Junior College</option>
    </select>
    <span
      class="hint__circle"
      data-message="Previously attended institution that student wishes to transfer classes from."
      on:mouseenter="{showTooltip}"
    >
      ?
    </span>

    <input
      type="text"
      id="year-input"
      placeholder="Year"
      class="year-filter"
      bind:value="{year}"
      on:input="{sendFilterData}"
    />
    <span
      class="hint__circle"
      data-message="When the student graduated or intended to graduate from the institution."
      on:mouseenter="{showTooltip}"
    >
      ?
    </span>

    <select
      id="major-select"
      class="filter-dropdown"
      name="major"
      bind:value="{major}"
      on:change="{sendFilterData}"
    >
      <option value="" disabled selected id="default-option">Major</option>
      <option value="Art">Art</option>
      <option value="Chemistry">Chemistry</option>
      <option value="ComSci">Computer Science</option>
      <option value="Business">Business</option>
      <option value="EduStu">Educational Studies</option>
    </select>
    <span
      class="hint__circle"
      data-message="Primary field of study pursued at the previous institution."
      on:mouseenter="{showTooltip}"
    >
      ?
    </span>
  </div>
</div>


<!--CSS-->
<style>
    .search-bar-container {
  width: 80%;
  margin: 0 auto;
}

.search-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
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

.search-button:hover {
  background-color: #5a2679;
}

.filter-label {
  display: block;
  text-align: left;
  font-size: 14px;
  font-weight: lighter;
  margin-bottom: 10px;
  font-family: Arial, Helvetica, sans-serif;
}

.filter-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.filter-dropdown,
.year-filter {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #3d014b;
  border-radius: 5px;
  box-sizing: border-box;
}

.hint__circle {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  background-color: #3d014b;
  color: white;
  font-family: Arial, sans-serif;
  font-size: 14px; 
  border-radius: 50%;
  border: none;
  cursor: pointer;
  flex-shrink: 0;
}


.tooltip {
  position: absolute;
  background-color: #3d014b;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  z-index: 1000;
}
</style>