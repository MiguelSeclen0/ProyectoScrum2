<script lang="ts"></script>
  
  <script>
  import { Bar } from 'vue-chartjs'
  export default {
    extends: Bar,
    mounted() {
      this.renderChart(
        {
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
          datasets: [
            {
              data: [10, 19, 3, 17,10, 19, 3, 17,10, 19, 3, 17],
              backgroundColor: ['red', 'yellow', 'purple', 'oranFge','red', 'yellow', 'purple', 'oranFge','red', 'yellow', 'purple', 'oranFge']
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