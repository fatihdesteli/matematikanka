import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '@/lib/db';

const JWT_SECRET = process.env.JWT_SECRET || "comolokko";

export async function POST(request: NextRequest) {
  try {
    console.log("Login isteği başladı");
    const { username, password } = await request.json();
    console.log("Gelen istek bilgileri:", { username, password: "***" });

    // Kullanıcı adını kontrol et
    if (!username || !password) {
      console.log("Eksik veri:", { usernameExists: !!username, passwordExists: !!password });
      return NextResponse.json(
        { message: 'Kullanıcı adı ve şifre gereklidir' },
        { status: 400 }
      );
    }
    // console.log("TEST HASH:", await bcrypt.hash("123456", 10));
    console.log("Veritabanı bağlantısı kuruluyor...");
    // Veritabanından kullanıcıyı sorgula
    const connection = await db.getConnection();
    
    try {
      console.log(`'${username}' kullanıcısı için veritabanı sorgusu yapılıyor...`);
      const [rows] = await connection.execute(
        'SELECT * FROM admin_users WHERE username = ?',
        [username]
      );
      
      connection.release();
      console.log("Veritabanı bağlantısı kapatıldı");
      
      const users = rows as any[];
      console.log(`Sorgu sonucu: ${users.length} kullanıcı bulundu`);
      
      if (users.length === 0) {
        console.log("Kullanıcı bulunamadı");
        return NextResponse.json(
          { message: 'Geçersiz kullanıcı adı veya şifre' },
          { status: 401 }
        );
      }
      
      const user = users[0];
      console.log("Kullanıcı bilgileri bulundu:", { 
        id: user.id, 
        username: user.username,
        fullName: user.full_name,
        hasPassword: !!user.password
      });
      
      // Şifreyi kontrol et
      console.log("Şifre karşılaştırması başlıyor...");
      console.log("Veritabanındaki şifre (ilk 10 karakter):", user.password.substring(0, 10) + "...");
      const passwordMatch = await bcrypt.compare(password, user.password);
      // const passwordMatch = true; 
      console.log("Şifre karşılaştırma sonucu:", passwordMatch);
      
      if (!passwordMatch) {
        console.log("Şifre eşleşmiyor");
        return NextResponse.json(
          { message: 'Geçersiz kullanıcı adı veya şifre' },
          { status: 401 }
        );
      }
      
      // JWT token oluştur
      console.log("JWT token oluşturuluyor...");
      const token = jwt.sign(
        {
          userId: user.id,
          username: user.username,
          isSuperAdmin: user.is_super_admin
        },
        JWT_SECRET,
        { expiresIn: '8h' }
      );
      console.log("JWT token oluşturuldu");
      
      // Kullanıcı bilgilerini ve token'ı gönder
      console.log("Login başarılı, yanıt gönderiliyor");
      return NextResponse.json({
        message: 'Giriş başarılı',
        user: {
          id: user.id,
          username: user.username,
          fullName: user.full_name,
          isSuperAdmin: user.is_super_admin
        },
        token
      });
    } catch (error) {
      connection.release();
      console.error("Veritabanı işlemi sırasında hata:", error);
      throw error;
    }
  } catch (error) {
    console.error('Login işlemi hatası:', error);
    console.error('Hata detayları:', JSON.stringify(error, null, 2));
    return NextResponse.json(
      { message: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}