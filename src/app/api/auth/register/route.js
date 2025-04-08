// app/api/auth/register/route.js
import { NextResponse} from 'next/server';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const body = await request.json();
    const { fullName, email, password, city, phone, child } = body;

    // Basit doğrulama
    if (!fullName || !email || !password) {
      return NextResponse.json(
        { message: 'Zorunlu alanlar eksik' },
        { status: 400 }
      );
    }

    // E-posta doğrulama
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Geçersiz e-posta adresi' },
        { status: 400 }
      );
    }

    // Şifre doğrulama (en az 8 karakter, bir büyük harf ve bir rakam)
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      return NextResponse.json(
        { message: 'Şifre en az 8 karakter olmalı ve en az bir büyük harf ve bir rakam içermelidir' },
        { status: 400 }
      );
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    // Veritabanı bağlantısı oluştur
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // E-posta adresi kontrolü
    const [existingUser] = await connection.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (existingUser.length > 0) {
      await connection.end();
      return NextResponse.json(
        { message: 'Bu e-posta adresi zaten kullanımda' },
        { status: 400 }
      );
    }

    // Transaction başlat
    await connection.beginTransaction();

    try {
      // Kullanıcıyı ekle
      const [userResult] = await connection.execute(
        'INSERT INTO users (email, password, full_name, city, phone) VALUES (?, ?, ?, ?, ?)',
        [email, hashedPassword, fullName, city, phone]
      );

      const userId = userResult.insertId;

      // Çocuğu ekle
      if (child && child.name) {
        await connection.execute(
          'INSERT INTO students (user_id, name, age, grade, interests) VALUES (?, ?, ?, ?, ?)',
          [userId, child.name, child.age, child.grade, child.interests]
        );
      }

      // Transaction'ı tamamla
      await connection.commit();
      
      // Bağlantıyı kapat
      await connection.end();

      // Başarı yanıtı
      return NextResponse.json(
        { message: 'Kayıt başarıyla tamamlandı', userId },
        { status: 201 }
      );
    } catch (error) {
      // Hata durumunda rollback yap
      await connection.rollback();
      await connection.end();
      throw error;
    }
  } catch (error) {
    console.error('Kayıt hatası:', error);
    return NextResponse.json(
      { message: 'Kayıt işlemi sırasında bir hata oluştu' },
      { status: 500 }
    );
  }
}

