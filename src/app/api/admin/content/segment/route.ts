import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'matematikanka-admin-secret-key';

// JWT doğrulama fonksiyonu
const verifyJWT = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

// Admin yetkisini kontrol et
async function checkAdminAuth(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { authorized: false };
  }
  
  const token = authHeader.split(' ')[1];
  const decodedToken = verifyJWT(token);
  
  if (!decodedToken) {
    return { authorized: false };
  }
  
  return { authorized: true };
}

// İçeriği cümlelere veya paragraflara ayır
export async function POST(request: NextRequest) {
  const { authorized } = await checkAdminAuth(request);
  
  if (!authorized) {
    return NextResponse.json(
      { message: 'Yetkilendirme başarısız' },
      { status: 401 }
    );
  }
  
  try {
    const body = await request.json();
    const { content, segmentationType = 'sentence' } = body;
    
    if (!content) {
      return NextResponse.json(
        { message: 'İçerik gereklidir' },
        { status: 400 }
      );
    }
    
    let segments: string[] = [];
    
    // Parçalama tipine göre işlem yap
    if (segmentationType === 'sentence') {
      // Cümlelere ayır
      segments = segmentText(content);
    } else if (segmentationType === 'paragraph') {
      // Paragraflara ayır
      segments = content.split(/\n\s*\n/).filter((p: string) => p.trim() !== '');
    } else {
      return NextResponse.json(
        { message: 'Geçersiz parçalama tipi' },
        { status: 400 }
      );
    }
    
    // Her segment için SVG oluşturma için API çağrısı yapılabilir
    // Ancak burada sadece segmentleri döndürüyoruz
    // SVG'ler ayrı bir endpoint'ten alınacak
    
    return NextResponse.json({
      success: true,
      segments: segments.map((text, index) => ({
        text,
        index: index + 1
      }))
    });
  } catch (error) {
    console.error('İçerik parçalama hatası:', error);
    return NextResponse.json(
      { message: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}

// Metni cümlelere ayır (gelişmiş algoritma)
function segmentText(text: string): string[] {
  // Boşlukları normalize et
  const normalizedText = text.replace(/\s+/g, ' ').trim();
  
  // Cümle sonlarını tanımla
  const sentenceEndRegex = /([.!?][\s\u200B\u200C\u200D\u2060\u00A0]+)(?=[A-Z0-9"])/g;
  
  // Cümlelere ayır
  const segments = normalizedText
    .replace(sentenceEndRegex, '$1|SPLIT_HERE|')
    .split('|SPLIT_HERE|');
  
  // Cümleleri temizle ve filtrele
  return segments
    .map(s => s.trim())
    .filter(s => s.length > 0);
}