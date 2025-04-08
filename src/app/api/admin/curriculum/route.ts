import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
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
    return { authorized: false, userId: null };
  }
  
  const token = authHeader.split(' ')[1];
  const decodedToken = verifyJWT(token) as { userId: number } | null;
  
  if (!decodedToken) {
    return { authorized: false, userId: null };
  }
  
  return { authorized: true, userId: decodedToken.userId };
}

// Tüm müfredatları getir
export async function GET(request: NextRequest) {
  const { authorized } = await checkAdminAuth(request);
  
  if (!authorized) {
    return NextResponse.json(
      { message: 'Yetkilendirme başarısız' },
      { status: 401 }
    );
  }
  
  try {
    const [rows] = await db.query(
      'SELECT * FROM curriculum ORDER BY created_at DESC'
    );
    
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Müfredat getirme hatası:', error);
    return NextResponse.json(
      { message: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}

// Yeni müfredat ekle
export async function POST(request: NextRequest) {
  const { authorized, userId } = await checkAdminAuth(request);
  
  if (!authorized) {
    return NextResponse.json(
      { message: 'Yetkilendirme başarısız' },
      { status: 401 }
    );
  }
  
  try {
    const body = await request.json();
    
    const { 
      academicYear,
      grade,
      subject,
      unit,
      lessonComponents,
      difficulty,
      additionalInfo
    } = body;
    
    // Zorunlu alanları kontrol et
    if (!academicYear || !grade || !subject || !unit) {
      return NextResponse.json(
        { message: 'Öğretim yılı, sınıf, konu ve ünite alanları zorunludur' },
        { status: 400 }
      );
    }
    
    const connection = await db.getConnection();
    
    try {
      await connection.beginTransaction();
      
      // Yeni müfredat ekle
      const [result] = await connection.execute(
        `INSERT INTO curriculum (
          academic_year, grade, subject, unit, 
          lesson_components, difficulty_level, additional_info, created_by
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          academicYear,
          grade,
          subject,
          unit,
          lessonComponents || '',
          difficulty || 'orta',
          additionalInfo || '',
          userId
        ]
      );
      
      await connection.commit();
      connection.release();
      
      const insertId = (result as any).insertId;
      
      return NextResponse.json({
        id: insertId,
        academicYear,
        grade,
        subject,
        unit,
        lessonComponents,
        difficulty,
        additionalInfo,
        createdBy: userId
      });
    } catch (error) {
      await connection.rollback();
      connection.release();
      throw error;
    }
  } catch (error) {
    console.error('Müfredat ekleme hatası:', error);
    return NextResponse.json(
      { message: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}