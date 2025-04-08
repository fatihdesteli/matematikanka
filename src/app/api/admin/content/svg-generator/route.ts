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
  return { authorized: true };
  // if (!authHeader || !authHeader.startsWith('Bearer ')) {
  //   return { authorized: false };
  // }
  
  // const token = authHeader.split(' ')[1];
  // const decodedToken = verifyJWT(token);
  
  // if (!decodedToken) {
  //   return { authorized: false };
  // }
  
  // return { authorized: true };
}


// OpenAI kullanarak SVG oluştur
// OpenAI kullanarak SVG oluştur
async function generateSvgWithAI(text: string, index: number): Promise<string> {
  try {
    const prompt = `
      İlkokul çocukları için aşağıdaki metnin anlamına uygun, basit bir SVG animasyon kodu oluştur:
      
      "${text}"
      
      SVG 300x200 boyutunda olmalı, canlı ve çocuk dostu renkler kullanmalı ve sadece temel şekiller içermeli.
      Metin içeriğiyle alakalı görsel öğeler kullan (sayılar, geometrik şekiller, matematiksel işlemler vb).
      
      ÖNEMLİ: Yanıt olarak SADECE çalışan SVG kodunu döndür. Açıklama ekleme.
      Örnek yanıt formatı:
      <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
        <!-- SVG içeriği -->
      </svg>
    `;
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Sen bir SVG uzmanısın. SADECE çalışır SVG kodu döndür, başka açıklama yapma.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1500
      })
    });
    
    const data = await response.json();
    let svgCode = data.choices[0].message.content.trim();
    
    // Kod bloklarını temizle
    svgCode = svgCode.replace(/```svg/g, '').replace(/```/g, '');
    
    // SVG etiketlerini ayıkla
    if (svgCode.includes('<svg')) {
      const svgStartIndex = svgCode.indexOf('<svg');
      const svgEndIndex = svgCode.lastIndexOf('</svg>') + 6;
      svgCode = svgCode.substring(svgStartIndex, svgEndIndex);
    }
    
    // SVG yoksa yedek bir SVG oluştur
    if (!svgCode || !svgCode.includes('<svg')) {
      return createBackupSvg(index, text);
    }
    
    return svgCode;
  } catch (error) {
    console.error('OpenAI SVG generation error:', error);
    return createBackupSvg(index, text);
  }
}

// Yedek SVG oluştur (API'den SVG gelmediğinde)
function createBackupSvg(index: number, text: string): string {
  // İçeriğe göre renk belirle
  let color = '#2196F3'; // varsayılan mavi
  if (text.includes('topla')) color = '#4CAF50'; // yeşil
  if (text.includes('çıkar')) color = '#F44336'; // kırmızı
  if (text.includes('çarp')) color = '#9C27B0'; // mor
  if (text.includes('böl')) color = '#FF9800'; // turuncu
  
  return `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
    <style>
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
      }
      .floating { animation: float 3s ease-in-out infinite; }
    </style>
    <rect width="100%" height="100%" fill="#f8f9fa" rx="10" ry="10" />
    <g class="floating">
      <circle cx="150" cy="80" r="40" fill="#E3F2FD" stroke="${color}" stroke-width="2" />
      <text x="150" y="90" text-anchor="middle" font-size="32" font-weight="bold" fill="${color}">${index}</text>
    </g>
    <text x="150" y="150" text-anchor="middle" font-size="14" fill="#333">${text.substring(0, 50)}${text.length > 50 ? '...' : ''}</text>
  </svg>`;
}

// SVG animasyonları oluştur
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
    const { text, index = 1 } = body;
    
    if (!text) {
      return NextResponse.json(
        { message: 'Metin gereklidir' },
        { status: 400 }
      );
    }
    
    // OpenAI ile SVG oluştur
    const svgContent = await generateSvgWithAI(text, index);
    
    return NextResponse.json({
      success: true,
      svg: svgContent
    });
  } catch (error) {
    console.error('SVG oluşturma hatası:', error);
    return NextResponse.json(
      { message: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}