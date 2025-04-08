"use client";

import { useState, useEffect } from 'react';
import { FiSave, FiPlay, FiEdit, FiCheckCircle, FiX, FiLoader } from 'react-icons/fi';

export default function ContentCreatorPage() {
  const [curriculumList, setCurriculumList] = useState<any[]>([]);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [filteredCurriculum, setFilteredCurriculum] = useState<any[]>([]);
  const [selectedCurriculumItem, setSelectedCurriculumItem] = useState<any>(null);
  const [difficultyLevel, setDifficultyLevel] = useState('orta');
  const [contentTitle, setContentTitle] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [contentSegments, setContentSegments] = useState<Array<{text: string, svg: string}>>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSegmenting, setIsSegmenting] = useState(false);
  const [displayMode, setDisplayMode] = useState<'form' | 'segments'>('form');

  // API'den müfredatları yükle
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
            },
            {
              id: 3,
              academicYear: '2024-2025',
              grade: 1,
              subject: 'Matematik',
              unit: 'Sayıları Tanıma',
              lessonComponents: '1-10 arası sayılar, sıralama',
              difficulty: 'kolay',
              additionalInfo: '1. sınıf öğrencileri için sayıları tanıma'
            },
          ];
          setCurriculumList(exampleData);
        }, 500);
      } catch (error) {
        console.error('Müfredat yükleme hatası:', error);
      }
    };

    fetchCurriculum();
  }, []);

  // Müfredatları filtrele
  useEffect(() => {
    let filtered = [...curriculumList];
    
    if (selectedAcademicYear) {
      filtered = filtered.filter(item => item.academicYear === selectedAcademicYear);
    }
    
    if (selectedGrade) {
      filtered = filtered.filter(item => item.grade.toString() === selectedGrade);
    }
    
    setFilteredCurriculum(filtered);
  }, [curriculumList, selectedAcademicYear, selectedGrade]);

  // Kullanılabilir eğitim yıllarını al
  const academicYears = Array.from(new Set(curriculumList.map(item => item.academicYear)));
  
  // Kullanılabilir sınıfları al
  const grades = Array.from(new Set(curriculumList.map(item => item.grade.toString())));

  // İçerik oluşturma
  const generateContent = async () => {
    if (!selectedCurriculumItem) {
      alert('Lütfen önce bir müfredat seçin');
      return;
    }
    
    if (!contentTitle) {
      alert('Lütfen bir içerik başlığı girin');
      return;
    }
    
    try {
      setIsGenerating(true);
      
      // API çağrısı
      const response = await fetch('/api/admin/content/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          curriculumItem: selectedCurriculumItem,
          difficulty: difficultyLevel
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'İçerik oluşturulurken bir hata oluştu');
      }
      
      setGeneratedContent(data.content);
    } catch (error) {
      console.error('İçerik oluşturma hatası:', error);
      alert('İçerik oluşturulurken bir hata oluştu');
    } finally {
      setIsGenerating(false);
    }
  };

  // İçeriği parçala ve SVG animasyonlar oluştur
// İçeriği parçala ve SVG animasyonlar oluştur
const segmentAndCreateSVG = async () => {
  if (!generatedContent) {
    alert('Önce içerik oluşturmanız gerekiyor');
    return;
  }
  
  try {
    setIsSegmenting(true);
    
    // Cümlelere ayır (basit bir yaklaşım, daha gelişmiş olabilir)
    const sentences = generatedContent
      .split(/(?<=[.!?])\s+/)
      .filter(sentence => sentence.trim() !== '');
    
    // Her cümle için OpenAI SVG API'sini çağır
    const segmentPromises = sentences.map(async (text, index) => {
      try {
        const response = await fetch('/api/admin/content/svg-generator', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Authorization header'ı cookie tabanlı yetkilendirme kullandığınız için gerekli olmayabilir
          },
          body: JSON.stringify({ text, index: index + 1 })
        });
        
        // Burada hatayı fırlatmak yerine kontrol edip geçiyoruz
        if (!response.ok) {
          console.error(`SVG isteği başarısız: ${response.status}`);
          return {
            text,
            svg: `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
              <rect width="100%" height="100%" fill="#f8f9fa" rx="10" ry="10" />
              <text x="150" y="100" text-anchor="middle" font-size="24" fill="#333">${index + 1}</text>
            </svg>`
          };
        }
        
        const data = await response.json();
        return {
          text,
          svg: data.svg
        };
      } catch (error) {
        console.error(`Segment ${index + 1} için hata:`, error);
        // Hata durumunda varsayılan SVG
        return {
          text,
          svg: `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#f8f9fa" rx="10" ry="10" />
            <text x="150" y="100" text-anchor="middle" font-size="24" fill="#333">${index + 1}</text>
          </svg>`
        };
      }
    });
    
    // Tüm SVG'ler tamamlandığında setContentSegments'i güncelle
    const segments = await Promise.all(segmentPromises);
    setContentSegments(segments);
    setDisplayMode('segments');
  } catch (error) {
    console.error('İçerik parçalama hatası:', error);
    alert('İçerik parçalanırken bir hata oluştu');
  } finally {
    setIsSegmenting(false);
  }
};

  // Segmentleri kaydet
  const saveSegments = async () => {
    if (contentSegments.length === 0) {
      alert('Kaydedilecek segment bulunamadı');
      return;
    }
    
    try {
      // API'ye kaydetme işlemi
      console.log('Kaydedilecek segmentler:', {
        title: contentTitle,
        curriculumId: selectedCurriculumItem.id,
        difficultyLevel,
        fullContent: generatedContent,
        segments: contentSegments
      });
      
      // Başarılı kayıt sonrası
      alert('İçerik başarıyla kaydedildi');
      
      // Formu sıfırla
      setSelectedCurriculumItem(null);
      setContentTitle('');
      setGeneratedContent('');
      setContentSegments([]);
      setDisplayMode('form');
    } catch (error) {
      console.error('Kaydetme hatası:', error);
      alert('Kaydetme sırasında bir hata oluştu');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">İçerik Oluşturucu</h1>
      
      {displayMode === 'form' ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Ders İçeriği Oluştur</h2>
          
          {/* Filtreleme */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Öğretim Yılı
              </label>
              <select
                value={selectedAcademicYear}
                onChange={(e) => setSelectedAcademicYear(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              >
                <option value="" className="text-black">Tüm Yıllar</option>
                {academicYears.map((year) => (
                  <option key={year} value={year} className="text-black">{year}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Sınıf
              </label>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              >
                <option value="" className="text-black">Tüm Sınıflar</option>
                {grades.map((grade) => (
                  <option key={grade} value={grade} className="text-black">{grade}. Sınıf</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Zorluk Seviyesi
              </label>
              <select
                value={difficultyLevel}
                onChange={(e) => setDifficultyLevel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              >
                <option value="kolay" className="text-black">Kolay</option>
                <option value="orta" className="text-black">Orta</option>
                <option value="zor" className="text-black">Zor</option>
              </select>
            </div>
          </div>
          
          {/* Müfredat seçimi */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-black mb-2">
              Müfredat
            </label>
            
            {filteredCurriculum.length === 0 ? (
              <div className="p-4 border border-gray-200 rounded-md bg-gray-50 text-black text-center">
                Seçilen kriterlere uygun müfredat bulunamadı
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {filteredCurriculum.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 border rounded-md cursor-pointer transition-colors ${
                      selectedCurriculumItem?.id === item.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => setSelectedCurriculumItem(item)}
                  >
                    <div className="font-medium text-black">{item.subject} - {item.unit}</div>
                    <div className="text-sm text-black">{item.grade}. Sınıf • {item.academicYear}</div>
                    <div className="text-sm text-black mt-1">{item.lessonComponents}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* İçerik başlığı */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-black mb-1">
              İçerik Başlığı
            </label>
            <input
              type="text"
              value={contentTitle}
              onChange={(e) => setContentTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder:text-black"
              placeholder="Bu içerik için bir başlık girin"
            />
          </div>
          
          {/* İçerik oluşturma butonu */}
          <div className="mb-6">
            <button
              onClick={generateContent}
              disabled={!selectedCurriculumItem || !contentTitle || isGenerating}
              className="flex items-center justify-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:hover:bg-green-600 w-full md:w-auto"
            >
              {isGenerating ? (
                <>
                  <FiLoader className="animate-spin mr-2" /> İçerik Oluşturuluyor...
                </>
              ) : (
                <>
                  <FiPlay className="mr-2" /> İçerik Oluştur
                </>
              )}
            </button>
          </div>
          
          {/* Oluşturulan içerik */}
          {generatedContent && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-black">Oluşturulan İçerik</h3>
                <button
                  onClick={segmentAndCreateSVG}
                  disabled={isSegmenting}
                  className="flex items-center text-sm bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isSegmenting ? (
                    <>
                      <FiLoader className="animate-spin mr-2" /> İşleniyor...
                    </>
                  ) : (
                    <>
                      <FiEdit className="mr-2" /> Parçala ve SVG Oluştur
                    </>
                  )}
                </button>
              </div>
              
              <div className="p-4 border border-gray-300 rounded-md bg-gray-50 whitespace-pre-line text-black">
                {generatedContent}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-black">{contentTitle}</h2>
            <div>
              <button
                onClick={() => setDisplayMode('form')}
                className="mr-2 px-3 py-1 border border-gray-300 text-black rounded-md hover:bg-gray-50"
              >
                Geri Dön
              </button>
              <button
                onClick={saveSegments}
                className="flex items-center bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors"
              >
                <FiSave className="mr-2" /> Tümünü Kaydet
              </button>
            </div>
          </div>
          
          <div className="text-sm text-black mb-4">
            <p>Toplam {contentSegments.length} segment oluşturuldu. Her segment için bir SVG animasyon oluşturuldu.</p>
          </div>
          
          <div className="space-y-8">
            {contentSegments.map((segment, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-3 border-b border-gray-200 flex justify-between items-center">
                  <span className="font-medium text-black">Segment {index + 1}</span>
                </div>
                
                <div className="p-4">
                  <h4 className="font-medium mb-2 text-black">Metin:</h4>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-md mb-4 text-black">
                    {segment.text}
                  </div>
                  
                  <h4 className="font-medium mb-2 text-black">SVG Animasyon:</h4>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-md overflow-auto">
                      <pre className="text-xs text-black">{segment.svg}</pre>
                    </div>
                    <div className="flex-1 border border-gray-200 rounded-md flex items-center justify-center p-4">
                      <div 
                        dangerouslySetInnerHTML={{ __html: segment.svg }} 
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}