"use client";
import { useState, useEffect } from "react";
import CryptoChart from "../components/cryptoChart";
import CoinSelector from "../components/coinSelector";
import useWebSocket from "../hooks/useWebSocket";
import { saveToStorage, loadFromStorage } from "../utils/storage";

export default function Home() {
  const [selectedCoin, setSelectedCoin] = useState("ethusdt");
  const [selectedInterval, setSelectedInterval] = useState("1m");
  const [chartData, setChartData] = useState(loadFromStorage("ethusdt"));

  const liveData = useWebSocket(selectedCoin, selectedInterval);

  useEffect(() => {
    setChartData((prevData) => [...prevData, ...liveData]);
    saveToStorage(selectedCoin, chartData);
  }, [liveData, selectedCoin]);

  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen py-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Cryptocurrency Live Chart
      </h1>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6 w-full max-w-md">
        <CoinSelector
          selectedCoin={selectedCoin}
          onCoinChange={(coin) => {
            setSelectedCoin(coin);
            setChartData(loadFromStorage(coin));
          }}
          selectedInterval={selectedInterval}
          onIntervalChange={setSelectedInterval}
        />
      </div>

      <div className="w-full max-w-3xl">
        <CryptoChart data={chartData} />
      </div>
    </div>
  );
}
