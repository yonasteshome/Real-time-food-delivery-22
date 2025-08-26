import React, { useEffect, useRef } from "react";
import {
  Chart,
  ArcElement,
  DoughnutController,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

Chart.register(
  DoughnutController,
  BarController,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function Graphs({ orders, grouped }) {
  const statusChartRef = useRef(null);
  const mealChartRef = useRef(null);

  const statusChartInstance = useRef(null);
  const mealChartInstance = useRef(null);

  const bucketColors = {
    Breakfast: "#f59e0b",
    Lunch: "#3b82f6",
    Dinner: "#6366f1",
    "Late Night": "#22c55e"
  };

  // 1️⃣ Create charts only once
  useEffect(() => {
    if (!statusChartRef.current || !mealChartRef.current) return;

    // Doughnut (order status)
    statusChartInstance.current = new Chart(
      statusChartRef.current.getContext("2d"),
      {
        type: "doughnut",
        data: {
          labels: ["Pending", "Preparing", "Completed"],
          datasets: [{
            data: [0, 0, 0],
            backgroundColor: ["#f59e0b", "#3b82f6", "#22c55e"]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: "bottom" } }
        }
      }
    );

    // Bar (meal times)
    mealChartInstance.current = new Chart(
      mealChartRef.current.getContext("2d"),
      {
        type: "bar",
        data: {
          labels: ["Breakfast", "Lunch", "Dinner", "Late Night"],
          datasets: [{
            label: "Orders",
            data: [0, 0, 0, 0],
            backgroundColor: Object.keys(bucketColors).map((k) => bucketColors[k])
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true } }
        }
      }
    );

    // Cleanup when component unmounts
    return () => {
      statusChartInstance.current?.destroy();
      mealChartInstance.current?.destroy();
    };
  }, []);

  // 2️⃣ Update chart data whenever orders/grouped change
  useEffect(() => {
    if (!statusChartInstance.current || !mealChartInstance.current) return;

    // Update doughnut chart
    statusChartInstance.current.data.datasets[0].data = [
      grouped.pending.length,
      grouped["in-progress"].length,
      grouped.completed.length
    ];
    statusChartInstance.current.update();

    // Update bar chart
    const buckets = { Breakfast: 4, Lunch: 2, Dinner: 3, "Late Night": 0 };
    orders.forEach((o) => {
      const hour = parseInt(o.time.split(":")[0]);
      if (hour >= 6 && hour < 12) buckets.Breakfast++;
      else if (hour >= 12 && hour < 17) buckets.Lunch++;
      else if (hour >= 17 && hour < 22) buckets.Dinner++;
      else buckets["Late Night"]++;
    });

    mealChartInstance.current.data.datasets[0].data = Object.values(buckets);
    mealChartInstance.current.update();
  }, [orders, grouped]);

  return (
    <div className="mt-3">
      {/* Header */}
      

      {/* Charts */}
      <div className="flex flex-row flex-wrap gap-4">
        <div className="flex-1 bg-white rounded shadow p-5">
          <canvas ref={statusChartRef} className="h-96 w-full"></canvas>
        </div>
        <div className="flex-1 bg-white rounded shadow p-5">
          <canvas ref={mealChartRef} className="h-96 w-full"></canvas>
        </div>
      </div>
    </div>
  );
}
