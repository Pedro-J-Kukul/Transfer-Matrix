<script lang="ts">
  export let mainfeeder = 'University of Belize';
  export let feeder = '';
</script>

<div id="table-container">
        
    <table id="transfer-table">
        <thead>
            <tr class="firstrow">
                <th id="table-name" colspan="5">
                    <h2>Transferable Courses</h2>
                </th>
                <th id="print-section" colspan="1">
                    <span class="hint__circle" title="Export document or print for future reference">?</span>
                    <button>Print</button>
                </th>
            </tr>
            <tr>
                <th colspan="3" id="feeder-name">{feeder}</th>
                <th colspan="3" id="feeder-name">{mainfeeder}!</th>

            </tr>
            <tr class="col-title">
                <th>Code</th>
                <th>Course</th>
                <th>Year</th>
                <th>Code</th>
                <th>Course</th>
                <th>Status</th>
            </tr>
            <tbody></tbody>
    </table>
</div>

<style>
  #table-container {
    margin: 0 auto; 
    width: 50%; 
  }
  
  #transfer-table {
    border-collapse: collapse; 
    width: 100%; 
    
  }
  
  th, tr {
    border: 1px solid #3d014b; 
    padding: 8px; 
    text-align: center; 
    font-family: Arial, Helvetica, sans-serif;
  }

  .firstrow {
    background-color: #3d014b;
  }

  #table-name {
    text-align: left; 
    vertical-align: middle; 
    font-weight: bold;
    color: whitesmoke;
  }


  .hint__circle {
    height: 30px;
    width: 30px;
    margin: 0 auto;
    -webkit-border-radius: 100px;
    color: black;
    text-align: center;
    line-height: 30px;
    font-family: arial;
    font-size: 20px;
    border: 2px solid black;
    opacity: .4;
  }
  
  .hint__circle:hover {
    cursor: pointer;
    opacity: 1;
  }
  
  #feeder-name {
    background-color: #f2f2f2; 
    font-weight: bold; 
  }

  .col-title {
    background-color: #3d014b;
    color: whitesmoke;
  }
  

</style>
