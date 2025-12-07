import { NextResponse } from 'next/server';

interface SensorData {
  timestamp: string;
  temperature: string | number;
  water: string;
  light: number;
  isflame: string;
}

// หมายเหตุ: การเก็บข้อมูลในตัวแปร global แบบนี้ใน Vercel (Serverless) 
// ข้อมูลอาจจะหายไปเมื่อ Server มีการ Restart หรือ Cold Start
// แนะนำให้ใช้ Database จริงๆ เช่น MongoDB, PostgreSQL หรือ Firebase ในการใช้งานจริง
let sensorDataStore: SensorData[] = [];

export async function GET() {
  return NextResponse.json(sensorDataStore);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // รับข้อมูลจาก Raspberry Pi
    // คาดหวังข้อมูลรูปแบบ:
    // {
    //   "timestamp": "2025-12-05T18:29:21.303439+00:00",
    //   "temperature": 24.56,
    //   "water": "Dry",
    //   "light": 4095,
    //   "isflame": "FALSE"
    // }

    const newData: SensorData = {
      timestamp: body.timestamp || new Date().toISOString(),
      temperature: body.temperature.toString(),
      water: body.water,
      light: Number(body.light),
      isflame: body.isflame.toString()
    };

    // เก็บข้อมูลลงใน Array (เก็บไว้สูงสุด 50 ค่าล่าสุด)
    sensorDataStore.push(newData);
    if (sensorDataStore.length > 50) {
      sensorDataStore.shift();
    }

    return NextResponse.json({ success: true, message: 'Data received', data: newData });
  } catch (error) {
    console.error('Error processing sensor data:', error);
    return NextResponse.json({ success: false, error: 'Invalid data format' }, { status: 400 });
  }
}
