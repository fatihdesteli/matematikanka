"use client";
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaRobot, FaCertificate, FaRegLightbulb, FaChartLine, FaGamepad, FaUserGraduate } from 'react-icons/fa';
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white font-sans">
      <Head>
        <title>MatematiKanka - İlkokul Çocukları için Yapay Zeka Destekli Matematik Eğitimi</title>
        <meta name="description" content="İlkokul çocukları için MEB müfredatına uygun, eğlenceli ve kişiselleştirilmiş matematik öğrenme deneyimi" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="flex items-center space-x-2">
                <div className="rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 p-2">
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  MatematiKanka
                </span>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              <a href="#ozellikler" className="text-gray-700 hover:text-indigo-600 px-3 py-2 font-medium transition duration-150">
                Özellikler
              </a>
              <a href="#nasil-calisir" className="text-gray-700 hover:text-indigo-600 px-3 py-2 font-medium transition duration-150">
                Nasıl Çalışır
              </a>
              <a href="#fiyatlar" className="text-gray-700 hover:text-indigo-600 px-3 py-2 font-medium transition duration-150">
                Fiyatlar
              </a>
              <Link href="/login" className="text-gray-700 hover:text-indigo-600 px-3 py-2 font-medium transition duration-150">
                Giriş Yap
              </Link>
              <Link href="/register" className="ml-3 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-full shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-0.5">
                Ücretsiz Dene
              </Link>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 focus:outline-none"
              >
                {isMenuOpen ? <HiX className="h-6 w-6" /> : <HiOutlineMenuAlt3 className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white pt-2 pb-4 px-4 space-y-1 sm:px-6 lg:px-8 shadow-lg rounded-b-xl">
            <a href="#ozellikler" className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-indigo-600 border-b border-gray-100">
              Özellikler
            </a>
            <a href="#nasil-calisir" className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-indigo-600 border-b border-gray-100">
              Nasıl Çalışır
            </a>
            <a href="#fiyatlar" className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-indigo-600 border-b border-gray-100">
              Fiyatlar
            </a>
            <Link href="/login" className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-indigo-600">
              Giriş Yap
            </Link>
            <Link href="/register" className="block mt-3 w-full text-center px-5 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-full shadow-md">
              Ücretsiz Dene
            </Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
        <div className="absolute inset-0 bg-[url('/images/pattern-bg.svg')] opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-purple-700 via-indigo-700 to-indigo-800 bg-clip-text text-transparent">
                Matematik Öğrenmenin <br />
                <span className="relative">
                  <span className="inline-block transform rotate-1">Eğlenceli</span>
                  <svg className="absolute -bottom-3 left-0 w-full h-3 text-indigo-300" viewBox="0 0 200 9" preserveAspectRatio="none">
                    <path d="M0,8 C50,0 150,0 200,8" stroke="currentColor" fill="none" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span> Yolu!
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto md:mx-0">
                MatematiKanka, ilkokul çocukları için MEB müfredatına uygun, eğlenceli ve kişiselleştirilmiş bir matematik öğrenme deneyimi sunar.
              </p>
              <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                <Link href="/register" className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 text-center">
                  3 Gün Ücretsiz Dene
                </Link>
                <a href="#nasil-calisir" className="px-8 py-4 bg-white text-indigo-600 font-medium rounded-full shadow-md hover:shadow-lg transition duration-300 border-2 border-indigo-100 hover:border-indigo-200 text-center">
                  Nasıl Çalışır?
                </a>
              </div>
              <div className="mt-8 flex items-center justify-center md:justify-start space-x-4">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-300 to-indigo-300 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-indigo-600">500+</span> mutlu öğrenci
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob"></div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000"></div>
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-100 to-indigo-100 transform rotate-1"></div>
              <div className="relative rounded-3xl bg-white shadow-xl overflow-hidden transform -rotate-1">
                <div className="flex items-center justify-between bg-indigo-50 px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="text-xs font-medium text-gray-500">MatematiKanka Uygulaması</div>
                  <div></div>
                </div>
                <div className="relative">
                  <Image 
                    src="/images/app-screenshot.png" 
                    alt="MatematiKanka uygulaması"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent h-16"></div>
                </div>
                <div className="absolute bottom-4 right-4">
                  <div className="bg-white rounded-full p-2 shadow-lg animate-bounce">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Teasing features */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <FaRobot className="h-6 w-6" />, text: "Yapay Zeka Destekli" },
              { icon: <FaCertificate className="h-6 w-6" />, text: "MEB Müfredatına Uygun" },
              { icon: <FaGamepad className="h-6 w-6" />, text: "Eğlenceli Oyunlar" },
              { icon: <FaChartLine className="h-6 w-6" />, text: "İlerleme Takibi" }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl shadow-md p-6 flex items-center space-x-4 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                  {feature.icon}
                </div>
                <span className="text-gray-700 font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section id="nasil-calisir" className="py-16 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              MatematiKanka Nasıl Çalışır?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Çocuğunuzun matematik yeteneklerini geliştirmek için tasarlanmış basit ve etkili adımlar
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-indigo-200 hidden md:block"></div>
            
            {[
              {
                title: "Üye Ol ve Profil Oluştur",
                description: "Hızlı üyelik ile çocuğunuzun yaşına ve sınıf seviyesine uygun bir profil oluşturun.",
                image: "/images/signup.png",
                align: "left"
              },
              {
                title: "Seviye Testi ile Başla",
                description: "Yapay zeka destekli seviye belirleme testi ile çocuğunuzun matematik becerilerini ölçün.",
                image: "/images/level-test.png",
                align: "right"
              },
              {
                title: "Kişiselleştirilmiş Ders Planı",
                description: "Çocuğunuzun seviyesine ve öğrenme hızına göre özel olarak hazırlanmış ders planını takip edin.",
                image: "/images/custom-plan.png",
                align: "left"
              },
              {
                title: "Eğlenceli Öğrenme ve İlerleme",
                description: "İnteraktif dersler, oyunlar ve ödüller ile matematik öğrenmenin keyfini çıkarın.",
                image: "/images/fun-learning.png",
                align: "right"
              }
            ].map((step, index) => (
              <div key={index} className="relative mb-12">
                <div className={`flex flex-col md:flex-row items-center gap-8 ${step.align === 'right' ? 'md:flex-row-reverse' : ''}`}>
                  <div className="md:w-1/2 relative">
                    <div className="bg-white p-2 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                      <div className="aspect-video relative rounded-xl overflow-hidden">
                        <Image
                          src={step.image}
                          alt={step.title}
                          width={600}
                          height={400}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/2 text-center md:text-left p-6">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white font-bold text-lg mb-4">
                      {index + 1}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
                {index < 3 && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-6 hidden md:block">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 border-4 border-white flex items-center justify-center">
                      <svg className="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="ozellikler" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent">
  MatematiKanka'nın Benzersiz Özellikleri
</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Çocuğunuzun matematik yolculuğunu daha eğlenceli ve etkili hale getiren yapay zeka destekli özelliklerimiz
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaRobot />,
                color: "bg-purple-100 text-purple-600",
                title: "Yapay Zeka Destekli Öğrenme",
                description: "Her çocuğun öğrenme stiline uyum sağlayan, zamanla daha akıllı hale gelen özel öğretim teknolojisi."
              },
              {
                icon: <FaCertificate />,
                color: "bg-green-100 text-green-600",
                title: "MEB Müfredatına Uygun",
                description: "1-4. sınıf matematik müfredatı ile tam uyumlu, çocuğunuzun okul başarısını destekleyen içerikler."
              },
              {
                icon: <FaRegLightbulb />,
                color: "bg-yellow-100 text-yellow-600",
                title: "Eğlenceli Öğrenme",
                description: "Animasyonlu anlatımlar ve öğrenilen konulara özel oyunlarla matematiği sevdiren eğlenceli deneyim."
              },
              {
                icon: <FaChartLine />,
                color: "bg-blue-100 text-blue-600",
                title: "Detaylı İlerleme Raporları",
                description: "Ebeveynler için çocuklarının gelişimini takip edebilecekleri kapsamlı ve anlaşılır ilerleme raporları."
              },
              {
                icon: <FaGamepad />,
                color: "bg-red-100 text-red-600",
                title: "Oyunlaştırılmış İçerik",
                description: "Rozetler, ödüller ve seviye sistemleriyle çocukların motivasyonunu artıran oyunlaştırma unsurları."
              },
              {
                icon: <FaUserGraduate />,
                color: "bg-teal-100 text-teal-600",
                title: "Uzman Eğitimci Desteği",
                description: "İçeriklerimiz pedagojik yaklaşımları gözeten uzman eğitimciler tarafından hazırlanmıştır."
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl shadow-md p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100"
              >
                <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6 text-xl`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent">
              Ailelerin Yorumları
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              MatematiKanka'yı kullanan aileler neler söylüyor?
            </p>
          </div>
          
          <div className="relative bg-white rounded-3xl shadow-xl p-8 max-w-3xl mx-auto overflow-hidden">
            <div className="absolute top-0 right-0 mt-4 mr-4">
              <svg className="w-16 h-16 text-indigo-100" fill="currentColor" viewBox="0 0 32 32">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
            </div>
            
            <div className="relative overflow-hidden" style={{ height: "320px" }}>
              {[
                {
                  quote: "Oğlum matematikten hep korkardı, ama MatematiKanka ile çalışmaya başladıktan sonra matematiği sevmeye başladı. Artık her gün oturup çalışmak istiyor ve okuldaki başarısı da arttı.",
                  name: "Ayşe Yılmaz",
                  role: "3. Sınıf Öğrenci Velisi",
                  avatar: "AY"
                },
                {
                  quote: "Kızım için özel ders aramaya başlamıştım ama çok pahalıydı. MatematiKanka'yı keşfettikten sonra hem ekonomik hem de kaliteli bir çözüm bulduk. İlerleme raporları sayesinde gelişimini takip edebiliyorum.",
                  name: "Mehmet Saygın",
                  role: "2. Sınıf Öğrenci Velisi",
                  avatar: "MS"
                },
                {
                  quote: "Oğlum oyun oynarken matematik öğreniyor! Animasyonlu anlatımlar ve eğlenceli oyunlar sayesinde matematiği sevdi. Öğretmeni de okuldaki gelişimini fark etti ve bize sordu nasıl çalıştığını.",
                  name: "Zeynep Kaya",
                  role: "1. Sınıf Öğrenci Velisi", 
                  avatar: "ZK"
                }
              ].map((testimonial, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 flex flex-col items-center ${
                    index === activeTestimonial ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <p className="text-xl text-gray-600 text-center mb-8 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-r from-purple-400 to-indigo-500 flex items-center justify-center text-white font-bold text-xl">
                      {testimonial.avatar}
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold">{testimonial.name}</h4>
                      <p className="text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center space-x-2 mt-8">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeTestimonial ? "bg-indigo-600" : "bg-gray-300"
                  }`}
                  aria-label={`Görüntülenecek yorum ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="fiyatlar" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Uygun Fiyatlı Abonelik Planları
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Her bütçeye uygun, çocuğunuzun matematik öğrenimini destekleyecek seçenekler
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Plan 1 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Aylık Plan</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-extrabold text-gray-900">₺49,90</span>
                  <span className="ml-1 text-xl font-medium text-gray-500">/ay</span>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  {["Sınırsız ders ve konu erişimi", "Eğitici oyunlar ve testler", "Temel ilerleme raporları"].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link 
                    href="/register" 
                    className="w-full flex justify-center py-3 px-4 rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
                  >
                    3 Gün Ücretsiz Dene
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Plan 2 */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-indigo-400 transform scale-105 z-10 transition-all duration-300 hover:-translate-y-1">
              <div className="relative p-6 bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                <div className="absolute -top-6 -right-6">
                  <div className="w-12 h-12 bg-yellow-300 rounded-full transform rotate-12 flex items-center justify-center">
                    <span className="text-indigo-800 font-bold text-xs transform -rotate-12">EN İYİ</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-1">3 Aylık Plan</h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-indigo-800">
                  %13 TASARRUF
                </span>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-extrabold">₺129,90</span>
                  <span className="ml-1 text-xl font-medium opacity-80">/3 ay</span>
                </div>
                <p className="mt-1 text-indigo-100 text-sm">Aylık sadece ₺43,30</p>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  {[
                    "Sınırsız ders ve konu erişimi",
                    "Tüm eğitici oyunlar ve testler",
                    "Detaylı ilerleme raporları",
                    "Ebeveyn kontrol paneli"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link 
                    href="/register" 
                    className="w-full flex justify-center py-3 px-4 rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
                  >
                    3 Gün Ücretsiz Dene
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Plan 3 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Yıllık Plan</h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  %33 TASARRUF
                </span>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-extrabold text-gray-900">₺399,90</span>
                  <span className="ml-1 text-xl font-medium text-gray-500">/yıl</span>
                </div>
                <p className="mt-1 text-gray-500 text-sm">Aylık sadece ₺33,32</p>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  {[
                    "Sınırsız ders ve konu erişimi",
                    "Tüm eğitici oyunlar ve testler",
                    "Premium detaylı raporlar",
                    "Özel içerikler ve etkinlikler",
                    "Öncelikli destek"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link 
                    href="/register" 
                    className="w-full flex justify-center py-3 px-4 rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
                  >
                    3 Gün Ücretsiz Dene
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <p className="text-gray-600">
              Tüm planlarda 3 günlük ücretsiz deneme süresi mevcuttur. İstediğiniz zaman iptal edebilirsiniz.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-indigo-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Sıkça Sorulan Sorular
            </h2>
            <p className="text-lg text-gray-600">
              MatematiKanka hakkında merak edilenler
            </p>
          </div>
          
          <div className="space-y-6">
            {[
              {
                question: "MatematiKanka hangi yaş grubuna uygun?",
                answer: "MatematiKanka, 6-10 yaş arası ilkokul 1-4. sınıf öğrencileri için tasarlanmıştır. MEB müfredatına uygun içeriklerimiz, bu yaş grubu çocukların matematik becerilerini geliştirmek için özel olarak hazırlanmıştır."
              },
              {
                question: "Yapay zeka özelliği tam olarak ne işe yarıyor?",
                answer: "Yapay zeka sistemimiz, çocuğunuzun öğrenme hızını, zorlandığı konuları ve öğrenme stilini analiz ederek kişiselleştirilmiş bir öğrenim deneyimi sunar. Zaman içinde çocuğunuzun güçlü ve geliştirmesi gereken yönlerini öğrenerek içerikleri buna göre şekillendirir."
              },
              {
                question: "Ücretsiz deneme süresinde tüm özelliklere erişebilir miyim?",
                answer: "Evet, 3 günlük ücretsiz deneme süresinde seçtiğiniz plana ait tüm özelliklere tam erişim sağlayabilirsiniz. Deneme süresi sonunda herhangi bir ücret ödemek istemezseniz, aboneliğinizi kolayca iptal edebilirsiniz."
              },
              {
                question: "Çocuğum MatematiKanka'yı nasıl kullanacak?",
                answer: "MatematiKanka web tabanlı bir uygulamadır ve herhangi bir cihazdan (bilgisayar, tablet, telefon) tarayıcı üzerinden erişilebilir. Kullanımı çok kolaydır, çocuklar için özel tasarlanmış arayüzü sayesinde çocuğunuz kolayca gezinebilir ve öğrenebilir."
              },
              {
                question: "İlerleme raporları hakkında bilgi alabilir miyim?",
                answer: "İlerleme raporları, çocuğunuzun hangi konularda ne kadar zaman geçirdiği, başarı oranı, güçlü ve geliştirmesi gereken alanları görsel grafiklerle size sunar. Bu raporlara ebeveyn hesabınızla erişebilir ve çocuğunuzun gelişimini takip edebilirsiniz."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 overflow-hidden">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 via-indigo-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-extrabold mb-6 leading-tight">
                Çocuğunuzun Matematik <br /> Yolculuğu Bugün Başlasın!
              </h2>
              <p className="text-xl mb-8 max-w-xl mx-auto lg:mx-0 text-indigo-100">
                Hemen kaydolun ve 3 gün boyunca MatematiKanka'nın tüm özelliklerini ücretsiz kullanmaya başlayın.
              </p>
              <Link 
                href="/register" 
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-base font-medium rounded-full text-indigo-600 bg-white hover:bg-indigo-50 transition-colors duration-300 shadow-lg"
              >
                Hemen Ücretsiz Deneyin
              </Link>
            </div>
            <div className="mt-12 lg:mt-0 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-white opacity-20 blur-2xl transform rotate-6 scale-110"></div>
                <div className="relative bg-white p-3 rounded-3xl shadow-2xl transform -rotate-2">
                  <Image 
                    src="/images/math-fun.png" 
                    alt="Matematik eğlenceli" 
                    width={400}
                    height={300}
                    className="rounded-2xl"
                  />
                  <div className="absolute -bottom-6 -right-6">
                    <div className="bg-yellow-400 rounded-full p-4 shadow-lg">
                      <svg className="w-8 h-8 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('/images/math-pattern.svg')] opacity-10 mix-blend-overlay"></div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2">
                <div className="rounded-full bg-white p-1.5">
                  <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent">
                  MatematiKanka
                </span>
              </div>
              <p className="mt-4 text-gray-400 text-sm">
                İlkokul çocukları için yapay zeka destekli özel matematik öğretmeni. MEB müfredatına uygun, eğlenceli ve interaktif içeriklerle matematik öğrenmenin yeni yolu.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-100 mb-4">Hızlı Bağlantılar</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Anasayfa</a></li>
                <li><a href="#ozellikler" className="text-gray-400 hover:text-white transition-colors duration-200">Özellikler</a></li>
                <li><a href="#nasil-calisir" className="text-gray-400 hover:text-white transition-colors duration-200">Nasıl Çalışır</a></li>
                <li><a href="#fiyatlar" className="text-gray-400 hover:text-white transition-colors duration-200">Fiyatlandırma</a></li>
                <li><Link href="/register" className="text-gray-400 hover:text-white transition-colors duration-200">Üye Ol</Link></li>
                <li><Link href="/login" className="text-gray-400 hover:text-white transition-colors duration-200">Giriş Yap</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-100 mb-4">İletişim</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-400">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@matematikanka.com
                </li>
                <li className="flex items-center text-gray-400">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +90 (555) 123 45 67
                </li>
                <li className="flex items-start text-gray-400">
                  <svg className="w-5 h-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  İstanbul, Türkiye
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-100 mb-4">Bizi Takip Edin</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </a>
              </div>
              <div className="mt-6">
                <h3 className="font-semibold text-gray-100 mb-4">Bültenimize Abone Olun</h3>
                <div className="flex mt-2">
                  <input
                    type="email"
                    placeholder="E-posta adresiniz"
                    className="px-4 py-2 w-full rounded-l-lg text-gray-900 focus:outline-none"
                  />
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-r-lg transition-colors duration-200">
                    Abone Ol
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 MatematiKanka. Tüm hakları saklıdır.</p>
            <div className="mt-4 sm:mt-0 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Gizlilik Politikası</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Kullanım Koşulları</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">KVKK</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}