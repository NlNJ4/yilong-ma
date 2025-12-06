import { NextResponse } from 'next/server';

// Mock sensor data generator
function generateSensorData() {
  const data = [];
  const now = new Date();
  
  // Generate last 10 readings
  for (let i = 9; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 500); // 500ms intervals
    data.push({
      timestamp: timestamp.toISOString(),
      temperature: (23 + Math.random() * 3).toFixed(2),
      water: Math.random() > 0.7 ? 'Wet' : 'Dry',
      light: Math.floor(3000 + Math.random() * 1095),
      isflame: Math.random() > 0.9 ? 'TRUE' : 'FALSE'
    });
  }
  
  return data;
}

export async function GET() {
  const data = generateSensorData();
  return NextResponse.json(data);
}
