<script lang="ts">
  import Header from './header.svelte'; // Import your Header component
  import { page } from '$app/stores';

let { title } = $page.data;



</script>
  
<div id="layout">
  <!-- Pass the title to the Header -->
  <Header title={title || "Default Page"}/>
  
  
  <!-- Page-specific content -->
  <main>
    <slot />
  </main>
  <footer>
    <p>&copy; 2024 My Website</p>
  </footer>
</div>

   <style>
     #layout {
       display: flex;
       flex-direction: column;
       min-height: 100vh;
     }
   
     main {
       flex: 1;
       padding: 20px;
       margin-top: 60px; /* Ensure content doesn't overlap the fixed header */
       box-sizing: border-box;
     }
   
     footer {
       background-color: #3d014b;
       color: white;
       text-align: center;
       padding: 10px;
     }
   </style>
   