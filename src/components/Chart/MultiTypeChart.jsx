import React from 'react';
import dayjs from 'dayjs';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import useStore from '../../store';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
);

const MultiTypeChart = () => {
  const records = useStore((state) => state.records);
  const [shippingSum, setShippingSum] = React.useState();
  const [stockSum, setStockSum] = React.useState();
  const [salesSum, setSalesSum] = React.useState();
  const [labels, setLabels] = React.useState();

  React.useEffect(() => {
    setShippingSum(() => {
      return records.map((record) => record.shippingSum);
    });
    setStockSum(() => {
      return records.map((record) => record.stockSum);
    });
    setSalesSum(() => {
      return records.map((record) => record.shippingSum - record.stockSum);
    });
    setLabels(() => {
      return records.map((record) => dayjs(record.date).format('MM/DD (dd)'));
    });
  }, [records]);

  const data = {
    labels,
    datasets: [
      {
        type: 'line',
        label: '應賣',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 2,
        fill: false,
        data: salesSum,
      },
      {
        type: 'bar',
        label: '出貨',
        backgroundColor: 'rgb(75, 192, 192)',
        data: shippingSum,
        borderColor: 'white',
        borderWidth: 2,
      },
      {
        type: 'bar',
        label: '存貨',
        backgroundColor: 'rgb(53, 162, 235)',
        data: stockSum,
      },
    ],
    options: {
      scales: {
        x: {
          stacked: false,
        },
        y: {
          stacked: false,
        },
      },
    },
  };
  return (
    <Chart type="bar" data={data} options={{ maintainAspectRatio: false }} />
  );
};

export default React.memo(MultiTypeChart);
