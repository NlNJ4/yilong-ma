'use client';

import { useEffect, useState } from 'react';

interface SensorData {
  timestamp: string;
  temperature: string;
  water: string;
  light: number;
  isflame: string;
}

export default function SensorTable() {
  const [data, setData] = useState<SensorData[]>([]);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/sensor-data');
        const newData = await response.json();
        setData(newData);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };

    fetchData();
    
    if (isLive) {
      const interval = setInterval(fetchData, 2000); // Update every 2 seconds
      return () => clearInterval(interval);
    }
  }, [isLive]);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('th-TH', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
          <span className="text-3xl">📊</span>
          ข้อมูลเซ็นเซอร์แบบเรียลไทม์
        </h2>
        <button
          onClick={() => setIsLive(!isLive)}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            isLive
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
          }`}
        >
          {isLive ? (
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              กำลังอัพเดท
            </span>
          ) : (
            'หยุดชั่วคราว'
          )}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <th className="px-4 py-3 text-left rounded-tl-lg">เวลา</th>
              <th className="px-4 py-3 text-left">อุณหภูมิ (°C)</th>
              <th className="px-4 py-3 text-left">ความชื้น</th>
              <th className="px-4 py-3 text-left">แสง</th>
              <th className="px-4 py-3 text-left rounded-tr-lg">ไฟไหม้</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={`${row.timestamp}-${index}`}
                className={`border-b border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors ${
                  index === 0 ? 'bg-blue-50 dark:bg-gray-700' : ''
                }`}
              >
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300 font-mono text-sm">
                  {formatTime(row.timestamp)}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full font-semibold">
                    🌡️ {row.temperature}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-semibold ${
                      row.water === 'Wet'
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                        : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                    }`}
                  >
                    💧 {row.water}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full font-semibold">
                    💡 {row.light}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-semibold ${
                      row.isflame === 'TRUE'
                        ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 animate-pulse'
                        : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                    }`}
                  >
                    {row.isflame === 'TRUE' ? '🔥 ตรวจพบ!' : '✅ ปกติ'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
