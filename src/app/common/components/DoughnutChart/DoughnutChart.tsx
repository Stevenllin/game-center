import React from 'react';
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import { DoughnutChartProps } from './types';

Chart.register(ArcElement);

const DoughnutChart: React.FC <DoughnutChartProps>= (props) => {
  const rest = 100 - Math.floor((props.value) * 100 );

  const data = {
    datasets: [
      {
        data: [Math.floor((props.value) * 100), rest],
        backgroundColor: [
          '#4987df',
          "#eb4f72"
        ],
        borderRadius: 10,
        borderWidth: [0, 0, 0, 0],
        display: true,
        cutout: '80%'
      }
    ]
  };

  return (
    <div className="doughnut-container">
      <Doughnut
        data={data}
        options={{
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              enabled: false
            }
          },
          responsive: true
        }}
      />
    </div>
  )
}

export default DoughnutChart; 