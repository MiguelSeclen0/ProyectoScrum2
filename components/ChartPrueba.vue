<script lang="ts"></script>
  
  <script>
  import { Pie } from 'vue-chartjs'
  export default {
    extends: Pie,
    mounted() {
      this.renderChart(
        {
          labels: ['Manzanas', 'Plátanos', 'Uvas', 'Naranjas'],
          datasets: [
            {
              data: [12, 19, 3, 17],
              backgroundColor: ['red', 'yellow', 'purple', 'orange']
            }
          ]
        },
        {
          responsive: true,
          maintainAspectRatio: false
        }
      );
    }
  };
  </script>