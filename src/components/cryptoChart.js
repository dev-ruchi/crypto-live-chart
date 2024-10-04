"use client";
import { OhlcElement, OhlcController, CandlestickElement, CandlestickController } from 'chartjs-chart-financial'
import {Chart, registerables } from 'chart.js/auto' // Easy way of importing everything

Chart.register(OhlcElement, OhlcController, CandlestickElement, CandlestickController)


import { useEffect, useRef } from "react";
//import { Chart, registerables } from "chart.js";
import "chartjs-adapter-date-fns"; // Import date adapter
import "chartjs-chart-financial"; // Import the financial chart package

// Register all necessary components
Chart.register(...registerables);

export default function CryptoChart({ data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    console.log("Chart data:", data); // Debugging data
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    const chartData = data.map((candle) => ({
      t: new Date(candle.time), // Ensure this is a valid Date
      o: candle.open,
      h: candle.high,
      l: candle.low,
      c: candle.close,
    }));

    // Initialize the chart
    const chart = new Chart(ctx, {
      type: "candlestick",
      data: {
        datasets: [
          {
            label: "Candlestick Chart",
            data: chartData,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: "time",
            time: {
              unit: "minute",
            },
          },
          y: {
            beginAtZero: false,
          },
        },
      },
    });

    // Cleanup function to destroy the chart on unmount
    return () => {
      chart.destroy();
    };
  }, [data]);

  return <canvas ref={chartRef}></canvas>;
}
