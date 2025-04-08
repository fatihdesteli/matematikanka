"use client";

import { useState, useEffect } from 'react';
import { FiBook, FiEdit3, FiUser } from 'react-icons/fi';
import Link from 'next/link';

export default function Dashboard() {
  const [stats, setStats] = useState({
    curriculumCount: 0,
    lessonsCount: 0
  });
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('adminUser');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // İstatistikleri yükle
    const fetchStats = async () => {
      try {
        // Burada gerçek API çağrısı yapılacak
        // Şimdilik örnek data kullanıyoruz
        setTimeout(() => {
          setStats({
            curriculumCount: 12,
            lessonsCount: 45
          });
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('İstatistik yükleme hatası:', error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-600">Hoş Geldiniz, {user?.fullName || 'Admin'}</h1>
        <p className="text-gray-600">Matematikanka admin panelindesiniz. Buradan müfredat ve ders içerikleri oluşturabilirsiniz.</p>
      </div>

      {/* İstatistikler */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <FiBook className="text-blue-600 text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-600">Toplam Müfredat</h3>
              <p className="text-3xl font-bold text-gray-600">{stats.curriculumCount}</p>
            </div>
          </div>
          <Link href="/admin/curriculum" className="text-blue-600 hover:text-blue-800 text-sm">
            Müfredatları Yönet →
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <FiEdit3 className="text-green-600 text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-600">Toplam İçerik</h3>
              <p className="text-3xl font-bold text-gray-600">{stats.lessonsCount}</p>
            </div>
          </div>
          <Link href="/admin/content-creator" className="text-green-600 hover:text-green-800 text-sm">
            İçerik Oluştur →
          </Link>
        </div>
      </div>

      {/* Hızlı Erişim */}
      <h2 className="text-xl font-bold mb-4 text-gray-600">Hızlı Erişim</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <Link href="/admin/curriculum">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="bg-blue-100 p-4 rounded-full mr-4">
                <FiBook className="text-blue-600 text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-600">Müfredat Yönetimi</h3>
                <p className="text-gray-600">Yeni müfredat ekleyin ve mevcut müfredatları düzenleyin</p>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/admin/content-creator">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="bg-green-100 p-4 rounded-full mr-4">
                <FiEdit3 className="text-green-600 text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-600">İçerik Oluşturucu</h3>
                <p className="text-gray-600">Yapay zeka ile ders içeriği ve görsel animasyonlar oluşturun</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}