// app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Basit doğrulama
    if (!email || !password) {
      return NextResponse.json(
        { message: 'E-posta ve şifre zorunludur' },
        { status: 400 }
      );
    }

    // Veritabanı bağlantısı oluştur
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // Kullanıcıyı bul
    const [users] = await connection.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    await connection.end();

    if (users.length === 0) {
      return NextResponse.json(
        { message: 'Geçersiz kimlik bilgileri' },
        { status: 401 }
      );
    }

    const user = users[0];

    // Şifre kontrolü
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { message: 'Geçersiz kimlik bilgileri' },
        { status: 401 }
      );
    }

    // Hassas bilgileri temizle
    const { password: _, ...userWithoutPassword } = user;

    // JWT token oluştur
    const token = sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Cookie'ye token ekle
    cookies().set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 gün
      path: '/',
    });

    return NextResponse.json({
      message: 'Giriş başarılı',
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Giriş hatası:', error);
    return NextResponse.json(
      { message: 'Giriş işlemi sırasında bir hata oluştu' },
      { status: 500 }
    );
  }
}