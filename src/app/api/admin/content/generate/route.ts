import { NextRequest, NextResponse } from 'next/server';
import { generateContentWithOpenAI } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const { curriculumItem, difficulty } = await request.json();
    
    // Promptu oluştur
    const prompt = `
      Bir ilkokul ${curriculumItem.grade}. sınıf öğrencisine ${curriculumItem.subject} dersinde 
      ${curriculumItem.unit} ünitesini anlat. İçerik ${difficulty} zorluk seviyesinde olmalı.
      
      Ders bileşenleri: ${curriculumItem.lessonComponents}
      
      İçerik bir öğretmenin öğrencisiyle konuşuyormuş gibi doğal ve samimi bir dille 
      yazılmalı. Basit cümleler kullan, karmaşık terimlerden kaçın.
      
      Her paragraf en fazla 1-2 cümleden oluşsun. Paragrafları kısa tut.
      
      İçeriği adım adım anlat, örnekler ver, basit sorular sor.
    `;
    
    // OpenAI ile içerik oluştur
    const generatedContent = await generateContentWithOpenAI(prompt);
    
    return NextResponse.json({
      success: true,
      content: generatedContent
    });
  } catch (error) {
    console.error('İçerik oluşturma hatası:', error);
    return NextResponse.json(
      { message: 'İçerik oluşturulurken bir hata oluştu' },
      { status: 500 }
    );
  }
}