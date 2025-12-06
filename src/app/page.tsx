import SensorCharts from './components/SensorCharts';
import SensorTable from './components/SensorTable';
import ImageGallery from './components/ImageGallery';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-xl">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2 flex items-center gap-4">
                <span className="text-5xl">🚀</span>
                Embedding Project
              </h1>
              <p className="text-blue-100 text-lg">ระบบติดตามและแสดงผลข้อมูลเซ็นเซอร์แบบเรียลไทม์</p>
            </div>
            <div className="hidden md:flex flex-col items-end gap-2">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
                <span className="font-semibold">ระบบทำงานปกติ</span>
              </div>
              <p className="text-sm text-blue-100">
                อัพเดทล่าสุด: {new Date().toLocaleString('th-TH')}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Statistics Cards */}
        <SensorCharts />

        {/* Real-time Data Table */}
        <SensorTable />

        {/* Image Gallery */}
        <ImageGallery />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-semibold mb-2">🎓 Embedding Project - CEDT</p>
          <p className="text-gray-400">
            ระบบติดตามและแสดงผลข้อมูลเซ็นเซอร์แบบเรียลไทม์ | Built with Next.js & Tailwind CSS
          </p>
          <p className="text-gray-500 text-sm mt-4">
            © {new Date().getFullYear()} All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
