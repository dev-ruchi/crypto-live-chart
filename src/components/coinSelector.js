export default function CoinSelector({
  selectedCoin,
  onCoinChange,
  selectedInterval,
  onIntervalChange,
}) {
  return (
    <div className="flex flex-col space-y-4 p-4 bg-white shadow-md rounded-lg">
      <label className="flex flex-col">
        <span className="text-lg font-semibold mb-2">Select Coin:</span>
        <select
          value={selectedCoin}
          onChange={(e) => onCoinChange(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="ethusdt">ETH/USDT</option>
          <option value="bnbusdt">BNB/USDT</option>
          <option value="dotusdt">DOT/USDT</option>
        </select>
      </label>

      <label className="flex flex-col">
        <span className="text-lg font-semibold mb-2">Select Interval:</span>
        <select
          value={selectedInterval}
          onChange={(e) => onIntervalChange(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="1m">1 Minute</option>
          <option value="3m">3 Minutes</option>
          <option value="5m">5 Minutes</option>
        </select>
      </label>
    </div>
  );
}
