<template>
  <div style="height: 270px;">
    <Pie :data="data" :options="options" />
  </div>
</template>

<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { reactive, ref, watchEffect } from "vue";
import { Pie } from "vue-chartjs";

// Chart.js 요소 등록
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// 차트 데이터
const data = {
  labels: ["1월", "2월", "3월", "4월", "5월", "6월"],
  datasets: [
    {
      backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16", "#b4cf27", "#e18f10"],
      data: [30, 25, 50, 55, 21, 20],
    },
  ],
};

// 차트 옵션
const options = reactive({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    datalabels: {
      color: '#000000', // 기본값, watchEffect에서 업데이트됨
      font: {
        weight: 'normal',
        size: 10,
      },
      formatter: (value: number, context: any) => {
        const label = context.chart.data.labels[context.dataIndex];
        return [label, value]; // 줄바꿈 표시
      },
      anchor: 'center',
      align: 'center',
    },
    legend: {
      position: 'bottom',
      labels: {
        color: '#000000', // 기본값, watchEffect에서 업데이트됨
      },
    },
  },
});
// 다크 모드 감지
const isDarkMode = ref(false);
// 다크모드 여부에 따라 색상 업데이트
watchEffect(() => {
  const textColor = isDarkMode.value ? '#ffffff' : '#000000';
  options.plugins.datalabels.color = textColor;
  options.plugins.legend.labels.color = textColor;
});
</script>
