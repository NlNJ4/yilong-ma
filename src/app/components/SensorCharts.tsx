'use client';

import { useEffect, useState } from 'react';

interface SensorData {
  timestamp: string;
  temperature: string;
  water: string;
  light: number;
  isflame: string;
}

export default function SensorCharts() {
  const [history, setHistory] = useState<SensorData[]>([]);
  const [stats, setStats] = useState({
    avgTemp: '0',
    maxTemp: '0',
    minTemp: '0',
    wetCount: 0,
    dryCount: 0,
    flameDetections: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/sensor-data');
        const newData = await response.json();
        
        // Keep last 50 readings for history
        setHistory((prev) => {
          const combined = [...newData, ...prev];
          return combined.slice(0, 50);
        });

        // Calculate statistics
        const temps = newData.map((d: SensorData) => parseFloat(d.temperature));
        const avgTemp = (temps.reduce((a: number, b: number) => a + b, 0) / temps.length).toFixed(2);
        const maxTemp = Math.max(...temps).toFixed(2);
        const minTemp = Math.min(...temps).toFixed(2);
        const wetCount = newData.filter((d: SensorData) => d.water === 'Wet').length;
        const dryCount = newData.filter((d: SensorData) => d.water === 'Dry').length;
        const flameDetections = newData.filter((d: SensorData) => d.isflame === 'TRUE').length;

        setStats({ avgTemp, maxTemp, minTemp, wetCount, dryCount, flameDetections });
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {/* Temperature Stats */}
      <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">อุณหภูมิ</h3>
          <span className="text-4xl">🌡️</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-orange-100">เฉลี่ย:</span>
            <span className="text-2xl font-bold">{stats.avgTemp}°C</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-orange-100">สูงสุด: {stats.maxTemp}°C</span>
            <span className="text-orange-100">ต่ำสุด: {stats.minTemp}°C</span>
          </div>
        </div>
      </div>

      {/* Water Detection Stats */}
      <div className="bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">ความชื้น</h3>
          <span className="text-4xl">💧</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-blue-100">เปียก:</span>
            <span className="text-2xl font-bold">{stats.wetCount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-blue-100">แห้ง:</span>
            <span className="text-2xl font-bold">{stats.dryCount}</span>
          </div>
        </div>
      </div>

      {/* Flame Detection Stats */}
      <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">ตรวจจับไฟไหม้</h3>
          <span className="text-4xl">🔥</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-red-100">ตรวจพบ:</span>
            <span className="text-2xl font-bold">{stats.flameDetections}</span>
          </div>
          <div className="mt-2">
            <div className="w-full bg-red-800 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-500"
                style={{ width: `${(stats.flameDetections / 10) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Light Sensor Visualization */}
      <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl shadow-lg p-6 text-white md:col-span-2 lg:col-span-3">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">กราฟความเข้มแสง (Real-time)</h3>
          <span className="text-4xl">💡</span>
        </div>
        <div className="flex items-end justify-between gap-1 h-32">
          {history.slice(0, 30).reverse().map((data, index) => {
            const height = (data.light / 4095) * 100;
            return (
              <div
                key={`${data.timestamp}-${index}`}
                className="flex-1 bg-white bg-opacity-70 rounded-t-lg transition-all duration-500 hover:bg-opacity-100"
                style={{ height: `${height}%` }}
                title={`Light: ${data.light} at ${new Date(data.timestamp).toLocaleTimeString('th-TH')}`}
              ></div>
            );
          })}
        </div>
        <div className="flex justify-between mt-2 text-sm text-yellow-100">
          <span>0</span>
          <span>ความเข้มแสง (Lux)</span>
          <span>4095</span>
        </div>
      </div>
    </div>
  );
}
