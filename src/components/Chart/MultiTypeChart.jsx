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
    const tenRecords = records.slice(0, 10);
    const tenShippingSum = [];
    const tenStockSum = [];
    const tenSalesSum = [];
    const tenLabels = [];
    if (tenRecords.length < 10) {
      for (let i = tenRecords.length; i < 10; i += 1)
        tenRecords.push({
          shippingSum: 0,
          stockSum: 0,
          salesSum: 0,
          label: '無記錄',
        });
    }
    tenRecords.map((record) => {
      tenShippingSum.push(record.shippingSum);
      tenStockSum.push(record.stockSum);
      tenSalesSum.push(record.shippingSum - record.stockSum);
      if (record.date) {
        return tenLabels.push(dayjs(record.date).format('MM/DD (dd)'));
      }
      tenLabels.push(record.label);
      return record;
    });
    setShippingSum(tenShippingSum);
    setStockSum(tenStockSum);
    setSalesSum(tenSalesSum);
    setLabels(tenLabels);
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
