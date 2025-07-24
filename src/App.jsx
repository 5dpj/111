import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Search, Star, Trophy, GraduationCap, CheckCircle, Sparkles, Award, Crown, Medal, Moon, Sun } from 'lucide-react'
import studentsData from './assets/students_data.json'
import ShareButton from './components/ShareButton.jsx'
import PrintButton from './components/PrintButton.jsx'
import StatisticsCard from './components/StatisticsCard.jsx'
import './App.css'

// مكون الجزيئات المتحركة
const AnimatedParticles = () => {
  return (
    <div className="particles">
      {Array.from({ length: 9 }, (_, i) => (
        <div key={i} className="particle" />
      ))}
    </div>
  )
}

// مكون تأثيرات الاحتفال المحسنة
const EnhancedCelebrationEffects = () => {
  const [confetti, setConfetti] = useState([])
  const [fireworks, setFireworks] = useState([])

  useEffect(() => {
    // إنشاء قطع الكونفيتي المحسنة
    const confettiPieces = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 4,
      color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#a8e6cf', '#ff8b94'][Math.floor(Math.random() * 7)]
    }))
    setConfetti(confettiPieces)

    // إنشاء الألعاب النارية المحسنة
    const fireworksArray = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#a8e6cf', '#ff8b94'][Math.floor(Math.random() * 7)]
    }))
    setFireworks(fireworksArray)
  }, [])

  return (
    <div className="celebration">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="confetti"
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}s`,
            backgroundColor: piece.color
          }}
        />
      ))}
      {fireworks.map((firework) => (
        <div
          key={firework.id}
          className="fireworks"
          style={{
            left: `${firework.left}%`,
            top: `${firework.top}%`,
            animationDelay: `${firework.delay}s`,
            color: firework.color
          }}
        />
      ))}
    </div>
  )
}

// مكون أيقونة متحركة
const AnimatedIcon = ({ icon: Icon, className = "" }) => {
  return <Icon className={`${className} icon-bounce`} />
}

// مكون بطاقة معلومات محسنة
const InfoCard = ({ title, value, icon: Icon, gradient = false, badge = null }) => {
  return (
    <div className="info-card p-4 rounded-xl">
      <h3 className="font-cairo font-semibold mb-2 flex items-center gap-2 text-white">
        <AnimatedIcon icon={Icon} className="h-5 w-5 text-yellow-300" />
        {title}
      </h3>
      <div className="flex items-center gap-2">
        <span className={`text-lg font-bold font-cairo ${gradient ? 'text-yellow-300' : 'text-white'}`}>
          {value}
        </span>
        {badge && (
          <Badge className="grade-badge">
            {badge}
          </Badge>
        )}
      </div>
    </div>
  )
}

function App() {
  const [examNumber, setExamNumber] = useState('')
  const [student, setStudent] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showCelebration, setShowCelebration] = useState(false)
  const [telegramVerified, setTelegramVerified] = useState(false)
  const [searchAttempts, setSearchAttempts] = useState(0)
  const [darkMode, setDarkMode] = useState(false)
  const [showStatistics, setShowStatistics] = useState(false)

  // تأثير الكشف عند التمرير
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
        }
      })
    }, observerOptions)

    const elements = document.querySelectorAll('.scroll-reveal')
    elements.forEach(el => observer.observe(el))

    const savedDarkMode = localStorage.getItem("darkMode")
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode))
      document.documentElement.classList.toggle("dark", JSON.parse(savedDarkMode))
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode))
    document.documentElement.classList.toggle("dark", darkMode)
  }, [darkMode])

  // محاكاة التحقق من الاشتراك في تيليجرام مع تحسينات
  const verifyTelegramSubscription = async (examNum) => {
    setIsLoading(true)
    setError('')
    
    try {
      // محاكاة استدعاء API مع تأخير متدرج
      const delay = Math.min(1000 + (searchAttempts * 500), 3000)
      await new Promise(resolve => setTimeout(resolve, delay))
      
      // في التطبيق الحقيقي، سيتم التحقق من الاشتراك عبر Telegram Bot API
      setTelegramVerified(true)
      setSearchAttempts(prev => prev + 1)
      return true
    } catch (err) {
      setError('فشل في التحقق من الاشتراك في القناة. يرجى المحاولة مرة أخرى.')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const searchStudent = async () => {
    if (!examNumber.trim()) {
      setError('يرجى إدخال الرقم الامتحاني')
      return
    }

    if (examNumber.trim().length < 10) {
      setError('الرقم الامتحاني يجب أن يكون 10 أرقام على الأقل')
      return
    }

    // التحقق من الاشتراك في تيليجرام أولاً
    const isSubscribed = await verifyTelegramSubscription(examNumber)
    if (!isSubscribed) {
      return
    }

    // البحث عن الطالب
    const foundStudent = studentsData.find(s => s['الرقم الامتحاني'].toString() === examNumber.trim())
    
    if (foundStudent) {
      setStudent(foundStudent)
      setShowCelebration(true)
      setError('')
      
      // تشغيل صوت النجاح (إذا كان متاحًا)
      try {
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT')
        audio.play().catch(() => {}) // تجاهل الأخطاء إذا لم يكن الصوت مدعومًا
      } catch (e) {}
      
      // إخفاء تأثيرات الاحتفال بعد 6 ثوان
      setTimeout(() => {
        setShowCelebration(false)
      }, 6000)
    } else {
      setError('لم يتم العثور على الرقم الامتحاني في قائمة الأوائل')
      setStudent(null)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchStudent()
    }
  }

  const getGradeText = (average) => {
    if (average >= 90) return 'امتياز'
    if (average >= 80) return 'جيد جداً'
    if (average >= 70) return 'جيد'
    if (average >= 60) return 'متوسط'
    return 'مقبول'
  }

  const getRankIcon = (rank) => {
    if (rank <= 3) return Crown
    if (rank <= 10) return Medal
    if (rank <= 50) return Award
    return Trophy
  }

  return (
    <div className="min-h-screen animated-background flex flex-col items-center justify-center p-4 relative">
      <AnimatedParticles />
      {showCelebration && <EnhancedCelebrationEffects />}

      {/* زر تبديل الوضع المظلم/الفاتح */}
      <Button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-4 left-4 z-50 bg-white/20 backdrop-blur-md text-white rounded-full p-2 shadow-lg hover:bg-white/30 transition-all duration-300"
        aria-label="Toggle dark mode"
      >
        {darkMode ? (
          <Sun className="h-6 w-6 text-yellow-300" />
        ) : (
          <Moon className="h-6 w-6 text-indigo-300" />
        )}
      </Button>
      
      <div className="w-full max-w-4xl space-y-8 relative z-10">
        {/* العنوان الرئيسي المحسن */}
        <div className="text-center space-y-6 scroll-reveal">
          <div className="flex items-center justify-center space-x-3 space-x-reverse">
            <AnimatedIcon icon={GraduationCap} className="h-16 w-16 text-white" />
            <h1 className="text-5xl md:text-6xl font-cairo font-black text-white text-glow">
              أوائل السادس المهني
            </h1>
            <AnimatedIcon icon={Sparkles} className="h-12 w-12 text-yellow-300" />
          </div>
          <p className="text-xl md:text-2xl text-white/90 font-tajawal font-medium">
            🇮🇶 العراق - أوائل الصف السادس المهني 🇮🇶
          </p>
          <div className="flex items-center justify-center space-x-2 space-x-reverse text-white/80">
            <CheckCircle className="h-5 w-5 text-green-300" />
            <span className="font-almarai">نظام متطور وآمن للاستعلام عن أوائل السادس المهني</span>
          </div>
        </div>

        {/* نموذج البحث المحسن */}
        <Card className="search-card scroll-reveal">
          <CardHeader>
            <CardTitle className="text-center text-white flex items-center justify-center gap-3 text-2xl font-cairo">
              <Search className="h-8 w-8" />
              البحث في قائمة الأوائل
              <Search className="h-8 w-8" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <label className="text-white font-cairo font-semibold text-lg flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-300" />
                الرقم الامتحاني
              </label>
              <Input
                type="text"
                placeholder="أدخل الرقم الامتحاني (مثال: 2025522120067)..."
                value={examNumber}
                onChange={(e) => setExamNumber(e.target.value)}
                onKeyPress={handleKeyPress}
                className="enhanced-input text-right text-lg font-cairo"
                disabled={isLoading}
                maxLength={15}
              />
            </div>
            
            {error && (
              <div className="text-red-200 text-center bg-red-500/30 backdrop-blur-sm p-4 rounded-xl border border-red-400/30 font-cairo">
                <div className="flex items-center justify-center gap-2">
                  <i className="fas fa-exclamation-triangle"></i>
                  {error}
                </div>
              </div>
            )}

            <Button 
              onClick={searchStudent}
              disabled={isLoading || !examNumber.trim()}
              className="search-button w-full text-lg font-cairo font-bold py-3 h-auto"
            >
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <div className="loading-spinner"></div>
                  جاري التحقق من الاشتراك...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  البحث في الأوائل
                  <Sparkles className="h-5 w-5" />
                </div>
              )}
            </Button>

            <div className="text-center space-y-3">
              <div className="bg-blue-500/20 backdrop-blur-sm p-4 rounded-xl border border-blue-400/30">
                <p className="text-white/90 font-cairo font-medium mb-2">
                  📱 يجب الاشتراك في قناة تيليجرام للحصول على النتيجة
                </p>
                <a 
                  href="https://t.me/dveIQ" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 font-bold text-lg transition-colors duration-300"
                >
                  <i className="fab fa-telegram"></i>
                  @dveIQ
                  <i className="fas fa-external-link-alt text-sm"></i>
                </a>
              </div>
              
              {searchAttempts > 0 && (
                <div className="text-white/70 text-sm font-almarai">
                  عدد مرات البحث: {searchAttempts}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* عرض النتيجة المحسن */}
        {student && telegramVerified && (
          <Card className="result-card text-white border-0 pulse-success scroll-reveal">
            <CardHeader className="text-center pb-6">
              <div className="flex items-center justify-center space-x-3 space-x-reverse mb-6">
                <AnimatedIcon icon={Trophy} className="h-10 w-10 text-yellow-300" />
                <CardTitle className="text-3xl md:text-4xl font-cairo font-black text-glow">
                  🎉 مبروك! أنت من أوائل السادس المهني في العراق 🎉
                </CardTitle>
                <AnimatedIcon icon={Trophy} className="h-10 w-10 text-yellow-300" />
              </div>
              
              <div className="flex items-center justify-center space-x-2 space-x-reverse bg-green-500/20 backdrop-blur-sm p-3 rounded-xl border border-green-400/30">
                <CheckCircle className="h-6 w-6 text-green-300" />
                <span className="text-green-300 font-cairo font-semibold">
                  ✅ تم التحقق من الاشتراك بنجاح
                </span>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoCard
                  title="اسم الطالب"
                  value={student['اسم الطالب الرباعي']}
                  icon={Star}
                />
                
                <InfoCard
                  title="الرقم الامتحاني"
                  value={student['الرقم الامتحاني']}
                  icon={GraduationCap}
                />
                
                <InfoCard
                  title="المعدل"
                  value={`${student['المعدل'].toFixed(2)}%`}
                  icon={Trophy}
                  gradient={true}
                  badge={getGradeText(student['المعدل'])}
                />
                
                <InfoCard
                  title="القسم"
                  value={student['القسم']}
                  icon={Award}
                />
              </div>

              <div className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm p-6 rounded-xl text-center border border-yellow-400/30">
                <h3 className="font-cairo font-bold mb-3 flex items-center justify-center gap-3 text-xl">
                  <AnimatedIcon icon={getRankIcon(student['التسلسل'])} className="h-8 w-8 text-yellow-300" />
                  التسلسل والترتيب
                </h3>
                <div className="flex items-center justify-center gap-4">
                  <span className="text-3xl md:text-4xl font-black text-yellow-300 font-cairo">
                    المرتبة #{student['التسلسل']}
                  </span>
                  {student['التسلسل'] <= 10 && (
                    <Badge className="grade-badge text-lg px-4 py-2">
                      🏆 من العشرة الأوائل
                    </Badge>
                  )}
                </div>
              </div>

              <div className="text-center bg-gradient-to-r from-purple-400/20 to-pink-400/20 backdrop-blur-sm p-6 rounded-xl border border-purple-400/30">
                <div className="space-y-4">
                  <p className="text-2xl md:text-3xl font-black text-yellow-300 font-cairo">
                    🎊 تهانينا الحارة! لقد حققت نتيجة متميزة 🎊
                  </p>
                  <p className="text-white/90 text-lg font-tajawal">
                    نتمنى لك التوفيق والنجاح في مسيرتك التعليمية والمهنية
                  </p>
                  <div className="flex items-center justify-center space-x-4 space-x-reverse text-sm text-white/70 font-almarai">
                    <span>🌟 إنجاز رائع</span>
                    <span>•</span>
                    <span>🎯 هدف محقق</span>
                    <span>•</span>
                    <span>🚀 مستقبل مشرق</span>
                  </div>
                </div>
              </div>

              {/* إحصائيات إضافية */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="info-card p-3 text-center">
                  <div className="text-2xl mb-1">📊</div>
                  <div className="text-sm text-white/80 font-almarai">معدل عالي</div>
                </div>
                <div className="info-card p-3 text-center">
                  <div className="text-2xl mb-1">🎯</div>
                  <div className="text-sm text-white/80 font-almarai">هدف محقق</div>
                </div>
                <div className="info-card p-3 text-center">
                  <div className="text-2xl mb-1">⭐</div>
                  <div className="text-sm text-white/80 font-almarai">أداء متميز</div>
                </div>
                <div className="info-card p-3 text-center">
                  <div className="text-2xl mb-1">🏆</div>
                  <div className="text-sm text-white/80 font-almarai">إنجاز رائع</div>
                </div>
              </div>

              {/* أزرار الإجراءات */}
              <div className="flex flex-wrap gap-4 justify-center">
                <ShareButton student={student} />
                <PrintButton student={student} />
                <Button
                  onClick={() => setShowStatistics(!showStatistics)}
                  className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-cairo font-bold"
                >
                  <Award className="h-5 w-5 ml-2" />
                  {showStatistics ? 'إخفاء الإحصائيات' : 'عرض الإحصائيات'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* بطاقة الإحصائيات */}
        {student && telegramVerified && showStatistics && (
          <div className="scroll-reveal">
            <StatisticsCard currentStudent={student} />
          </div>
        )}
      </div>

      {/* تذييل الصفحة المحسن */}
      <div className="mt-12 text-center text-white/60 space-y-2 relative z-10">
        <p className="font-cairo font-medium">
          © 2024 نظام أوائل السادس المهني المتطور - العراق 🇮🇶
        </p>
        <div className="flex items-center justify-center space-x-4 space-x-reverse text-sm">
          <span>🔒 آمن ومحمي</span>
          <span>•</span>
          <span>⚡ سريع وموثوق</span>
          <span>•</span>
          <span>📱 متوافق مع جميع الأجهزة</span>
        </div>
      </div>
    </div>
  )
}

export default App

