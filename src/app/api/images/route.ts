import { NextResponse } from 'next/server';

// Mock image gallery data
const mockImages = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
    title: 'Sensor Setup',
    timestamp: '2025-12-05T10:15:30+00:00'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400&h=300&fit=crop',
    title: 'Temperature Module',
    timestamp: '2025-12-05T11:20:15+00:00'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop',
    title: 'Light Sensor',
    timestamp: '2025-12-05T12:45:00+00:00'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1601524909162-ae8725290836?w=400&h=300&fit=crop',
    title: 'Water Detection',
    timestamp: '2025-12-05T14:10:22+00:00'
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop',
    title: 'Flame Detector',
    timestamp: '2025-12-05T15:30:45+00:00'
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&h=300&fit=crop',
    title: 'System Overview',
    timestamp: '2025-12-05T16:55:12+00:00'
  }
];

export async function GET() {
  return NextResponse.json(mockImages);
}
