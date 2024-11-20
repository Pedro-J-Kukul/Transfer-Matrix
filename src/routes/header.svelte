<script lang="ts">
  
  import { onMount } from 'svelte';
  export let  title: string;
  let isMenuOpen = false;

  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
  };

  const closeMenu = () => {
    isMenuOpen = false;
  };
  onMount(() => {
    const handleOutsideClick = (event: MouseEvent) => {
    const menu = document.querySelector('.menu-panel');
    const target = event.target as Element; // Assert the target is an Element
    if (menu && !menu.contains(target) && !target.matches('.hamburger')) {
      closeMenu();
    }
  };


    if (isMenuOpen) {
      window.addEventListener('click', handleOutsideClick);
    } else {
      window.removeEventListener('click', handleOutsideClick);
    }
});

</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content="About this app" />
</svelte:head>


<header>
  <button class="hamburger" aria-label="Menu" on:click={toggleMenu}>&#9776;</button>
  <div class="header-content">
    <!-- Dynamically display the title -->
    <div class="header-title">
      <h1>{title}</h1>
    </div>
    <div class="header-logo">
      <a href="/">
        <img
          src="https://www.ubelearn.com/pluginfile.php/1/theme_lambda/logo/1696980537/UB_logo_2017%20%282%29.png"
          alt="UB Logo"
        />
      </a>
    </div>
  </div>
</header>

<!-- Menu Panel -->
<div class="menu-panel {isMenuOpen ? 'open' : ''}">
  <button class="hamburger" on:click={toggleMenu}>&#9776;</button>
  <ul>
    <li>
      <i class="fas fa-home"></i>
      <a href="/">Home</a>
    </li>
    <li>
      <i class="fas fa-search"></i>
      <a href="/search">Search</a>
    </li>
    <li>
      <i class="fas fa-question-circle"></i>
      <a href="/about">About</a>
    </li>
  </ul>
</div>

<style>
  header {
    background-color: #3D014B;
    color: white;
    padding: 0.5rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
    box-sizing: border-box;
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
  }

  .header-title h1 {
    margin: 0;
    font-size: 1.5rem;
  }

  .hamburger {
    font-size: 1.5rem;
    cursor: pointer;
    background: none;
    border: none;
    color: white;
    order: -1;
  }

  .menu-panel {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 250px;
    background-color: #3D014B;
    color: white;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 15;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
  }

  .menu-panel.open {
    transform: translateX(0);
  }

  .menu-panel ul {
    list-style: none;
    padding: 1rem;
    margin: 0;
  }

  .menu-panel li {
    display: flex;
    align-items: center;
    margin: 1rem 0;
  }

  .menu-panel i {
    margin-right: 0.8rem;
    font-size: 1.5rem;
  }

  .menu-panel a {
    color: white;
    text-decoration: none;
    font-size: 1.2rem;
  }
</style>
