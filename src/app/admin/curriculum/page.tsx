"use client";

import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';

export default function CurriculumPage() {
  const [curriculumList, setCurriculumList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [formData, setFormData] = useState({
    id: null,
    academicYear: '',
    grade: '',
    subject: '',
    unit: '',
    lessonComponents: '',
    difficulty: 'orta',
    additionalInfo: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  // Müfredat listesini yükle
  useEffect(() => {
    const fetchCurriculum = async () => {
      try {
        // API çağrısı gelecek
        // Şimdilik örnek veri kullanıyoruz
        setTimeout(() => {
          const exampleData = [
            {
              id: 1,
              academicYear: '2023-2024',
              grade: 2,
              subject: 'Matematik',
              unit: 'Toplama ve Çıkarma',
              lessonComponents: 'Sayılar, işlemler, problemler',
              difficulty: 'kolay',
              additionalInfo: 'İkinci sınıf öğrencileri için temel toplama ve çıkarma işlemleri'
            },
            {
              id: 2,
              academicYear: '2023-2024',
              grade: 3,
              subject: 'Matematik',
              unit: 'Çarpma İşlemi',
              lessonComponents: 'Çarpım tablosu, sıfırlı çarpma',
              difficulty: 'orta',
              additionalInfo: 'Üçüncü sınıf öğrencileri için çarpma işlemi'
            }
          ];
          setCurriculumList(exampleData);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Müfredat yükleme hatası:', error);
        setLoading(false);
      }
    };

    fetchCurriculum();
  }, []);

  // Form gönderme işlemi
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // Endpoint'e gönderilecek veri
      const data = {
        academicYear: formData.academicYear,
        grade: parseInt(formData.grade),
        subject: formData.subject,
        unit: formData.unit,
        lessonComponents: formData.lessonComponents,
        difficulty: formData.difficulty,
        additionalInfo: formData.additionalInfo
      };
      
      if (isEditing && formData.id) {
        // Düzenleme API çağrısı gelecek
        console.log('Düzenleme verisi:', { id: formData.id, ...data });
        
        // Şimdilik frontend update ediyoruz
        setCurriculumList(curriculumList.map(item => 
          item.id === formData.id ? { id: formData.id, ...data } : item
        ));
      } else {
        // Yeni kayıt API çağrısı gelecek
        console.log('Yeni kayıt verisi:', data);
        
        // Şimdilik frontend update ediyoruz
        const newId = Math.max(...curriculumList.map(item => item.id), 0) + 1;
        setCurriculumList([...curriculumList, { id: newId, ...data }]);
      }
      
      // Formu sıfırla
      resetForm();
      setShowForm(false);
    } catch (error) {
      console.error('Form gönderme hatası:', error);
    } finally {
      setLoading(false);
    }
  };

  // Düzenleme işlemi
  const handleEdit = (item: any) => {
    setFormData({
      id: item.id,
      academicYear: item.academicYear,
      grade: item.grade.toString(),
      subject: item.subject,
      unit: item.unit,
      lessonComponents: item.lessonComponents,
      difficulty: item.difficulty,
      additionalInfo: item.additionalInfo
    });
    setIsEditing(true);
    setShowForm(true);
  };
  
  // Silme işlemi
  const handleDelete = async (id: number) => {
    if (!window.confirm('Bu müfredatı silmek istediğinize emin misiniz?')) {
      return;
    }
    
    try {
      setLoading(true);
      
      // API silme çağrısı gelecek
      console.log('Silinecek ID:', id);
      
      // Şimdilik frontend update ediyoruz
      setCurriculumList(curriculumList.filter(item => item.id !== id));
    } catch (error) {
      console.error('Silme hatası:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Formu sıfırla
  const resetForm = () => {
    setFormData({
      id: null,
      academicYear: '',
      grade: '',
      subject: '',
      unit: '',
      lessonComponents: '',
      difficulty: 'orta',
      additionalInfo: ''
    });
    setIsEditing(false);
  };
  
  // Filtreleme 
  const filteredCurriculum = curriculumList.filter(item => {
    const searchLower = searchText.toLowerCase();
    return (
      item.subject.toLowerCase().includes(searchLower) ||
      item.unit.toLowerCase().includes(searchLower) ||
      item.academicYear.includes(searchText) ||
      item.grade.toString().includes(searchText)
    );
  });
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">Müfredat Yönetimi</h1>
        <button
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          {showForm ? 'İptal' : <><FiPlus className="mr-2" /> Yeni Müfredat</>}
        </button>
      </div>
      
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold mb-4 text-black">{isEditing ? 'Müfredat Düzenle' : 'Yeni Müfredat Ekle'}</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Öğretim Yılı
                </label>
                <input
                  type="text"
                  value={formData.academicYear}
                  onChange={(e) => setFormData({...formData, academicYear: e.target.value})}
                  className="w-full text-black placeholder:text-black px-3 py-2 border border-black-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Örn: 2023-2024"
                  style={{color: 'black'}}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Sınıf
                </label>
                <select
                  value={formData.grade}
                  onChange={(e) => setFormData({...formData, grade: e.target.value})}
                  className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="" className="text-black">Sınıf Seçin</option>
                  <option value="1" className="text-black">1. Sınıf</option>
                  <option value="2" className="text-black">2. Sınıf</option>
                  <option value="3" className="text-black">3. Sınıf</option>
                  <option value="4" className="text-black">4. Sınıf</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Konu
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full text-black placeholder:text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Örn: Matematik"
                  style={{color: 'black'}}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Ünite
                </label>
                <input
                  type="text"
                  value={formData.unit}
                  onChange={(e) => setFormData({...formData, unit: e.target.value})}
                  className="w-full text-black placeholder:text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Örn: Toplama ve Çıkarma"
                  style={{color: 'black'}}
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-black mb-1">
                  Ders Bileşenleri
                </label>
                <input
                  type="text"
                  value={formData.lessonComponents}
                  onChange={(e) => setFormData({...formData, lessonComponents: e.target.value})}
                  className="w-full text-black placeholder:text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Örn: Sayılar, işlemler, problemler"
                  style={{color: 'black'}}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Zorluk Seviyesi
                </label>
                <select
                  value={formData.difficulty}
                  onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                  className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="kolay" className="text-black">Kolay</option>
                  <option value="orta" className="text-black">Orta</option>
                  <option value="zor" className="text-black">Zor</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-black mb-1">
                  Diğer Bilgiler
                </label>
                <textarea
                  value={formData.additionalInfo}
                  onChange={(e) => setFormData({...formData, additionalInfo: e.target.value})}
                  className="w-full text-black placeholder:text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ekstra bilgiler"
                  style={{color: 'black'}}
                  rows={3}
                ></textarea>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setShowForm(false);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-black mr-2 hover:bg-gray-50"
              >
                İptal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? 'İşleniyor...' : isEditing ? 'Güncelle' : 'Kaydet'}
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Arama */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-black" />
          </div>
          <input
            type="text"
            placeholder="Müfredat ara..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder:text-black"
            style={{color: 'black'}}
          />
        </div>
      </div>
      
      {/* Müfredat Listesi */}
      {loading && curriculumList.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      ) : filteredCurriculum.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-black">Kayıtlı müfredat bulunamadı.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Sınıf</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Öğretim Yılı</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Konu</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Ünite</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Ders Bileşenleri</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Zorluk</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-black uppercase tracking-wider">İşlemler</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCurriculum.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{item.grade}. Sınıf</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{item.academicYear}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{item.subject}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{item.unit}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{item.lessonComponents}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm capitalize">
                      <span 
                        className={`px-2 py-1 rounded-full text-xs ${
                          item.difficulty === 'kolay' ? 'bg-green-100 text-green-800' : 
                          item.difficulty === 'orta' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }`}
                      >
                        {item.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => handleEdit(item)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <FiEdit2 />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}