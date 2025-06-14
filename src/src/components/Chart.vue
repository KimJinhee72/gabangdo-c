<template>
  <div class="chart-container">
    <Line :data="chartData" :options="chartOptions" class="dark:text-white" />
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const isDarkMode = ref(false);
onMounted(() => {
  isDarkMode.value = document.documentElement.classList.contains('dark');
});

const chartData = {
  labels: ["1월", "2월", "3월", "4월", "5월", "6월"],
  datasets: [
    {
      label: "예약 수",
      data: [65, 59, 80, 81, 56, 55],
      fill: false,
      borderColor: "#3498db",
      tension: 0.1,
      backgroundColor: "rgba(52, 152, 219, 0.1)",
      pointBackgroundColor: "#3498db",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "#3498db",
    },
  ],
};

const chartOptions = ref({});
watchEffect(() => {
  const textColor = isDarkMode.value ? '#ffffff' : '#000000';
  const gridColor = isDarkMode.value ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

  chartOptions.value = {
    responsive: true,
    maintainAspectRatio: false,
    
    plugins: {      
      legend: {
        display: true,
        position: "top",
        labels: {
          color: textColor,
          font: { size: 12 },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
      },
      datalabels: {
        color: textColor,
        font: {
          weight: 'bold',
        },
        anchor: 'end',
        align: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: gridColor,
        },
        ticks: {
          color: textColor,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: textColor,
        },
      },
    },
  };
});

</script>

<style scoped>
.chart-container {
  height: 325px;
  width: 100%;
}
</style>
