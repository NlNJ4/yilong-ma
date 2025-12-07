'use client';

import { useEffect, useState } from 'react';

interface SensorData {
  timestamp: string;
  temperature: string;
  water: string;
  light: number;
  isflame: string;
}

export default function CurrentStatus() {
  const [currentData, setCurrentData] = useState<SensorData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/sensor-data');
        const data = await response.json();
        // API returns array with oldest first, so take the last element
        if (data && data.length > 0) {
          setCurrentData(data[data.length - 1]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (!currentData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-8 bg-gray-100 dark:bg-gray-800 rounded-3xl shadow-inner border-2 border-dashed border-gray-300 dark:border-gray-700">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-red-500 rounded-full opacity-20 animate-ping"></div>
          <div className="relative bg-white dark:bg-gray-700 p-8 rounded-full shadow-xl">
            <span className="text-6xl grayscale opacity-50">📡</span>
          </div>
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-bounce">
            OFFLINE
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-200 mb-3">
          ไม่พบสัญญาณจากอุปกรณ์
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-8 text-lg">
          กำลังรอรับข้อมูลจาก Raspberry Pi... <br/>
          <span className="text-sm opacity-75">กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ตหรือสถานะของอุปกรณ์</span>
        </p>
        <div className="flex gap-3 items-center text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 px-6 py-3 rounded-full shadow-sm border border-gray-200 dark:border-gray-700">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
          </span>
          กำลังพยายามเชื่อมต่อใหม่...
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
      {/* Temperature Card */}
      <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl shadow-xl p-8 text-white transform hover:scale-105 transition-transform duration-300">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold opacity-90">อุณหภูมิปัจจุบัน</h2>
            <p className="text-sm opacity-75">Temperature</p>
          </div>
          <span className="text-5xl">🌡️</span>
        </div>
        <div className="text-center py-4">
          <span className="text-7xl font-bold tracking-tighter">
            {currentData.temperature}
          </span>
          <span className="text-3xl ml-2">°C</span>
        </div>
        <div className="mt-4 bg-white/20 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-white h-full transition-all duration-500"
            style={{ width: `${Math.min((parseFloat(currentData.temperature) / 50) * 100, 100)}%` }}
          />
        </div>
      </div>

      {/* Water Status Card */}
      <div className={`rounded-2xl shadow-xl p-8 text-white transform hover:scale-105 transition-transform duration-300 bg-gradient-to-br ${
        currentData.water === 'Wet' 
          ? 'from-blue-500 to-cyan-600' 
          : 'from-gray-400 to-gray-500'
      }`}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold opacity-90">สถานะน้ำ</h2>
            <p className="text-sm opacity-75">Water Sensor</p>
          </div>
          <span className="text-5xl">💧</span>
        </div>
        <div className="text-center py-4">
          <span className="text-6xl font-bold">
            {currentData.water === 'Wet' ? 'ตรวจพบน้ำ' : 'แห้งปกติ'}
          </span>
        </div>
        <div className="mt-4 text-center bg-black/10 rounded-lg py-2">
          สถานะ: {currentData.water}
        </div>
      </div>

      {/* Flame Status Card */}
      <div className={`rounded-2xl shadow-xl p-8 text-white transform hover:scale-105 transition-transform duration-300 bg-gradient-to-br ${
        currentData.isflame === 'TRUE'
          ? 'from-red-600 to-red-800 animate-pulse'
          : 'from-green-500 to-emerald-600'
      }`}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold opacity-90">ตรวจจับไฟไหม้</h2>
            <p className="text-sm opacity-75">Flame Sensor</p>
          </div>
          <span className="text-5xl">🔥</span>
        </div>
        <div className="text-center py-4">
          <span className="text-6xl font-bold">
            {currentData.isflame === 'TRUE' ? 'อันตราย!' : 'ปลอดภัย'}
          </span>
        </div>
        {currentData.isflame === 'TRUE' && (
          <div className="mt-4 text-center bg-red-900/30 rounded-lg py-2 font-bold animate-bounce">
            ⚠️ ตรวจพบเปลวไฟในพื้นที่!
          </div>
        )}
      </div>

      {/* Light Status Card */}
      <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-xl p-8 text-white transform hover:scale-105 transition-transform duration-300">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold opacity-90">ความเข้มแสง</h2>
            <p className="text-sm opacity-75">Light Sensor</p>
          </div>
          <span className="text-5xl">💡</span>
        </div>
        <div className="text-center py-4">
          <span className="text-7xl font-bold tracking-tighter">
            {currentData.light}
          </span>
          <span className="text-xl ml-2">Lux</span>
        </div>
        <div className="mt-4 bg-black/10 rounded-full h-4 overflow-hidden border border-white/30">
          <div 
            className="bg-white h-full transition-all duration-500 shadow-[0_0_10px_rgba(255,255,255,0.8)]"
            style={{ width: `${Math.min((currentData.light / 4095) * 100, 100)}%` }}
          />
        </div>
      </div>

      {/* Last Update Time */}
      <div className="md:col-span-2 text-center mt-8">
        <div className="inline-block bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-sm">
          <span className="text-gray-500 dark:text-gray-400 mr-2">อัพเดทล่าสุด:</span>
          <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
            {new Date(currentData.timestamp).toLocaleTimeString('th-TH', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              fractionalSecondDigits: 2
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
