import { useEffect, useState } from 'react';

const BASE_URL = 'wss://stream.binance.com:9443/ws';

export default function useWebSocket(symbol, interval) {
  const [socketData, setSocketData] = useState([]);

  useEffect(() => {
    const ws = new WebSocket(`${BASE_URL}/${symbol}@kline_${interval}`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const kline = data.k;

      if (kline.x) {
        const candle = {
          time: kline.t,
          open: parseFloat(kline.o),
          high: parseFloat(kline.h),
          low: parseFloat(kline.l),
          close: parseFloat(kline.c),
        };
        setSocketData((prevData) => [...prevData, candle]);
      }
    };

    return () => {
      ws.close();
    };
  }, [symbol, interval]);

  return socketData;
}
