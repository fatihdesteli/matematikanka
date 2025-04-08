"use client";

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiHome, FiBook, FiEdit, FiLogOut, FiMenu, FiX } from 'react-icons/fi';

// Admin sayfalarını koruyan wrapper bileşeni
function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Giriş yapılıp yapılmadığını kontrol et
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const userData = localStorage.getItem('adminUser');

    // Login sayfasında değilse ve token yoksa login'e yönlendir
    if (pathname !== '/admin' && (!token || !userData)) {
      router.push('/admin');
      return;
    }

    // Token ve kullanıcı varsa state'e kaydet
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        router.push('/admin');
        return;
      }
    }

    setLoading(false);
  }, [pathname, router]);

  // Login sayfasındaysa ve kullanıcı giriş yapmışsa dashboard'a yönlendir
  useEffect(() => {
    if (pathname === '/admin' && user) {
      router.push('/admin/dashboard');
    }
  }, [pathname, user, router]);

  // Çıkış yap
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/admin');
  };

  // Login sayfasındaysa sadece children göster
  if (pathname === '/admin') {
    return <>{children}</>;
  }

  // Yükleniyor
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-3">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobil menü butonu */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-white p-2 rounded-md shadow-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 transform md:relative md:translate-x-0 z-40 w-64 bg-blue-700 text-white transition-transform duration-300 ease-in-out`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">Matematikanka</h1>
          <p className="text-sm text-blue-200">Admin Paneli</p>
        </div>

        <nav className="mt-8">
          <Link
            href="/admin/dashboard"
            className={`flex items-center py-3 px-6 hover:bg-blue-800 ${
              pathname === '/admin/dashboard' ? 'bg-blue-800' : ''
            }`}
          >
            <FiHome className="mr-3" /> Dashboard
          </Link>
          <Link
            href="/admin/curriculum"
            className={`flex items-center py-3 px-6 hover:bg-blue-800 ${
              pathname.includes('/admin/curriculum') ? 'bg-blue-800' : ''
            }`}
          >
            <FiBook className="mr-3" /> Müfredat Yönetimi
          </Link>
          <Link
            href="/admin/content-creator"
            className={`flex items-center py-3 px-6 hover:bg-blue-800 ${
              pathname.includes('/admin/content-creator') ? 'bg-blue-800' : ''
            }`}
          >
            <FiEdit className="mr-3" /> İçerik Oluşturucu
          </Link>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="border-t border-blue-600 pt-4">
            <div className="text-sm mb-4">
              <p className="text-blue-200">Giriş yapan:</p>
              <p>{user?.fullName || user?.username}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center w-full py-2 px-4 rounded hover:bg-blue-800 transition-colors"
            >
              <FiLogOut className="mr-2" /> Çıkış Yap
            </button>
          </div>
        </div>
      </div>

      {/* Ana içerik */}
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;