"use client"

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FiTerminal, FiChevronRight, FiArrowRight, FiCheckCircle } from 'react-icons/fi';

export default function RegisterTerminal() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [currentText, setCurrentText] = useState('');
  const [answers, setAnswers] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    city: '',
    phone: '',
    childName: '',
    childAge: '',
    childGrade: '',
    childInterests: ''
  });
  
  const [currentInput, setCurrentInput] = useState('');
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [registrationError, setRegistrationError] = useState('');
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  // Terminal sorguları ve açıklamaları
  const steps = [
    { 
      question: "  MatematiKanka'ya hoş geldiniz! Size nasıl hitap etmeliyiz? (Ad Soyad)",
      field: "fullName",
      validation: (value) => value.trim().length > 3 ? true : "Lütfen geçerli bir isim girin (en az 3 karakter)"
    },
    { 
      question: " Teşekkürler! E-posta adresinizi öğrenebilir miyim?",
      field: "email",
      validation: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? true : "Lütfen geçerli bir e-posta adresi girin"
    },
    { 
      question: " Hesabınız için güçlü bir şifre belirleyin (en az 8 karakter, bir büyük harf ve bir rakam içermeli)",
      field: "password",
      validation: (value) => /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(value) ? true : "Şifreniz en az 8 karakter olmalı ve en az 1 büyük harf ve 1 rakam içermelidir"
    },
    { 
      question: " Şifrenizi doğrulamak için tekrar girer misiniz?",
      field: "confirmPassword",
      validation: (value) => value === answers.password ? true : "Şifreler eşleşmiyor"
    },
    { 
      question: " Hangi şehirde yaşıyorsunuz?",
      field: "city",
      validation: (value) => value.trim().length > 2 ? true : "Lütfen geçerli bir şehir adı girin"
    },
    { 
      question: " İletişim için telefon numaranızı alabilir miyim? (Başında 0 olmadan 10 haneli numara)",
      field: "phone",
      validation: (value) => /^5[0-9]{9}$/.test(value) ? true : "Lütfen geçerli bir telefon numarası girin (5XX XXX XX XX formatında)"
    },
    { 
      question: " Şimdi çocuğunuzun bilgilerini alalım. Çocuğunuzun adı nedir?",
      field: "childName",
      validation: (value) => value.trim().length > 1 ? true : "Lütfen çocuğunuzun adını girin"
    },
    { 
      question: " Çocuğunuz kaç yaşında?",
      field: "childAge",
      validation: (value) => !isNaN(value) && value > 5 && value < 15 ? true : "Lütfen geçerli bir yaş girin (6-14 yaş aralığında)"
    },
    { 
      question: " Çocuğunuz hangi sınıfa gidiyor? (1-4 arası bir rakam girin)",
      field: "childGrade",
      validation: (value) => ['1', '2', '3', '4'].includes(value) ? true : "Lütfen 1-4 arasında bir sınıf değeri girin"
    },
    { 
      question: " Çocuğunuzun matematik dışında ilgi alanları neler? (virgülle ayırarak yazabilirsiniz)",
      field: "childInterests",
      validation: (value) => value.trim().length > 0 ? true : "En az bir ilgi alanı girin"
    },
  ];

  // Yazma animasyonu
  useEffect(() => {
    if (currentStep < steps.length && isTyping) {
      const question = steps[currentStep].question;
      let charIndex = 0;
      const typingInterval = setInterval(() => {
        if (charIndex < question.length) {
          setCurrentText(prev => prev + question.charAt(charIndex));
          charIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }
      }, 20); // Yazma hızı

      return () => clearInterval(typingInterval);
    }
  }, [currentStep, isTyping]);

  // Terminali en alta kaydır
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [currentText, answers]);

  // Input'u otomatik focusla
  useEffect(() => {
    if (!isTyping && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTyping]);

  const handleInputChange = (e) => {
    setCurrentInput(e.target.value);
  };

  const handleInputSubmit = async (e) => {
    e.preventDefault();
    
    const currentField = steps[currentStep].field;
    const validationResult = steps[currentStep].validation(currentInput);
    
    if (validationResult === true) {
      // Yanıtı kaydet
      setAnswers(prev => ({
        ...prev,
        [currentField]: currentInput
      }));
      
      // Terminal çıktısı ekle
      const newText = `${currentText}\n> ${currentInput}\n\n`;
      
      // Son adım ise kayıt işlemini gerçekleştir
      if (currentStep === steps.length - 1) {
        setCurrentText(newText + "Bilgileriniz kaydediliyor...");
        
        try {
          // API isteği
          const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              fullName: answers.fullName,
              email: answers.email,
              password: answers.password,
              city: answers.city,
              phone: answers.phone,
              child: {
                name: answers.childName,
                age: answers.childAge,
                grade: answers.childGrade,
                interests: answers.childInterests
              }
            }),
          });
          
          const data = await response.json();
          
          if (response.ok) {
            setCurrentText(newText + "✅ Kayıt işlemi başarıyla tamamlandı! Ana sayfaya yönlendiriliyorsunuz...");
            setRegistrationComplete(true);
            
            // 3 saniye sonra ana sayfaya yönlendir
            setTimeout(() => {
              window.location.href = '/login';
            }, 3000);
          } else {
            throw new Error(data.message || 'Kayıt sırasında bir hata oluştu');
          }
        } catch (err) {
          setCurrentText(newText + `❌ Hata: ${err.message}`);
          setRegistrationError(err.message);
        }
      } else {
        // Sonraki adıma geç
        setCurrentText(newText);
        setCurrentStep(prev => prev + 1);
        setCurrentInput('');
        setIsTyping(true);
      }
    } else {
      // Hata mesajını göster
      setCurrentText(`${currentText}\n> ${currentInput}\n❌ ${validationResult}\n`);
      setCurrentInput('');
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col items-center justify-center p-4">
      <div className="mb-8">
        <Link href="/" className="flex items-center space-x-2">
          <div className="rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 p-2">
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            MatematiKanka
          </span>
        </Link>
      </div>

      <div className="w-full max-w-3xl bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
        {/* Terminal header */}
        <div className="bg-gray-800 px-4 py-2 flex items-center">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
          <div className="flex-1 text-center">
            <span className="text-gray-400 text-sm font-mono">MatematiKanka Kayıt Terminali</span>
          </div>
          <div className="flex items-center space-x-2">
            <FiTerminal className="text-gray-400" />
          </div>
        </div>

        {/* Terminal content */}
        <div 
          ref={terminalRef}
          className="p-6 h-[500px] overflow-y-auto font-mono text-lg bg-gradient-to-b from-gray-900 to-indigo-900 text-gray-100"
        >
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-green-400">$</span>
              <span className="text-purple-300">matematikanka-kayit</span>
              <span className="text-yellow-300">init</span>
            </div>
            
            <div className="text-purple-200 mb-3 border-l-2 border-purple-500 pl-3">
              // MatematiKanka'ya hoş geldiniz!<br/>
              // Bu terminal aracılığıyla hızlı bir şekilde kayıt olabilirsiniz.<br/>
              // Soruları cevaplayarak ilerleyin.
            </div>
          </div>

          <pre className="whitespace-pre-wrap text-green-100 leading-relaxed">
            {currentText}
          </pre>
          
          {!isTyping && !registrationComplete && currentStep < steps.length && (
            <form onSubmit={handleInputSubmit} className="mt-4 flex items-center">
              <FiChevronRight className="text-green-400 text-xl mr-2" />
              <input
                ref={inputRef}
                type={steps[currentStep].field.includes('password') ? 'password' : 'text'}
                value={currentInput}
                onChange={handleInputChange}
                className="flex-1 bg-transparent border-b-2 border-indigo-500 outline-none text-white px-2 py-1 text-lg"
                autoFocus
              />
              <button 
                type="submit" 
                className="ml-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md flex items-center"
              >
                <FiArrowRight className="mr-1" /> Gönder
              </button>
            </form>
          )}
          
          {registrationComplete && (
            <div className="mt-4 p-4 bg-green-900 bg-opacity-30 rounded-lg border border-green-500 flex items-center">
              <FiCheckCircle className="text-green-400 text-2xl mr-2" />
              <div>
                <p className="text-green-200">Kayıt işlemi başarıyla tamamlandı!</p>
                <p className="text-green-300 text-sm">Giriş sayfasına yönlendiriliyorsunuz...</p>
              </div>
            </div>
          )}
          
          {registrationError && (
            <div className="mt-4 p-4 bg-red-900 bg-opacity-30 rounded-lg border border-red-500">
              <p className="text-red-200">Kayıt sırasında bir hata oluştu:</p>
              <p className="text-red-300">{registrationError}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
              >
                Yeniden Dene
              </button>
            </div>
          )}
        </div>

        {/* Terminal footer */}
        <div className="bg-gray-800 px-4 py-2 text-xs text-gray-400 flex justify-between">
          <div>
            Terminal v1.0.0
          </div>
          <div>
            {currentStep + 1}/{steps.length} adım
          </div>
          <div>
            <Link href="/login" className="text-indigo-400 hover:text-indigo-300">
              Giriş sayfasına dön
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} MatematiKanka. Tüm hakları saklıdır.
        </p>
      </div>
    </div>
  );
}