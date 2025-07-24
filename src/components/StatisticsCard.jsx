import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { BarChart3, TrendingUp, Users, Award, Target, Zap } from 'lucide-react'
import studentsData from '../assets/students_data.json'

const StatisticsCard = ({ currentStudent }) => {
  const [stats, setStats] = useState({})
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // حساب الإحصائيات
    const totalStudents = studentsData.length
    const averageGrade = studentsData.reduce((sum, student) => sum + student["المعدل"], 0) / totalStudents
    const highestGrade = Math.max(...studentsData.map(s => s["المعدل"]))
    const lowestGrade = Math.min(...studentsData.map(s => s["المعدل"]))
    
    // تصنيف الطلاب حسب المعدل
    const excellentCount = studentsData.filter(s => s["المعدل"] >= 90).length
    const veryGoodCount = studentsData.filter(s => s["المعدل"] >= 80 && s["المعدل"] < 90).length
    const goodCount = studentsData.filter(s => s["المعدل"] >= 70 && s["المعدل"] < 80).length
    
    // إحصائيات الأقسام
    const departmentStats = studentsData.reduce((acc, student) => {
      const dept = student["القسم"]
      acc[dept] = (acc[dept] || 0) + 1
      return acc
    }, {})
    
    const topDepartment = Object.entries(departmentStats).sort((a, b) => b[1] - a[1])[0]
    
    setStats({
      totalStudents,
      averageGrade: averageGrade.toFixed(2),
      highestGrade: highestGrade.toFixed(2),
      lowestGrade: lowestGrade.toFixed(2),
      excellentCount,
      veryGoodCount,
      goodCount,
      topDepartment: topDepartment ? topDepartment[0] : "غير محدد",
      topDepartmentCount: topDepartment ? topDepartment[1] : 0,
      currentRank: currentStudent ? currentStudent["التسلسل"] : null,
      currentGrade: currentStudent ? currentStudent["المعدل"] : null
    })

    // تأثير الظهور التدريجي
    setTimeout(() => setIsVisible(true), 500)
  }, [currentStudent, studentsData]) // أضف studentsData كاعتماد

  const getGradeCategory = (grade) => {
    if (grade >= 90) return { text: 'ممتاز', color: 'bg-green-500', emoji: '🌟' }
    if (grade >= 80) return { text: 'جيد جداً', color: 'bg-blue-500', emoji: '⭐' }
    if (grade >= 70) return { text: 'جيد', color: 'bg-yellow-500', emoji: '👍' }
    return { text: 'مقبول', color: 'bg-gray-500', emoji: '✅' }
  }

  const StatItem = ({ icon: Icon, title, value, subtitle, color = "text-white", badge = null }) => (
    <div className={`bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 transition-all duration-500 hover:bg-white/15 hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="flex items-center gap-3 mb-2">
        <Icon className={`h-6 w-6 ${color}`} />
        <h3 className="font-cairo font-semibold text-white">{title}</h3>
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-2xl font-bold font-cairo ${color}`}>{value}</span>
        {badge && (
          <Badge className={`${badge.color} text-white font-cairo`}>
            {badge.emoji} {badge.text}
          </Badge>
        )}
      </div>
      {subtitle && (
        <p className="text-white/70 text-sm font-almarai mt-1">{subtitle}</p>
      )}
    </div>
  )

  if (!stats.totalStudents) return null

  return (
    <Card className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 backdrop-blur-sm border-white/20 text-white">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-cairo font-bold flex items-center justify-center gap-3">
          <BarChart3 className="h-8 w-8 text-yellow-300" />
          إحصائيات أوائل السادس المهني
          <TrendingUp className="h-8 w-8 text-green-300" />
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* إحصائيات عامة */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatItem
            icon={Users}
            title="إجمالي الأوائل"
            value={stats.totalStudents}
            subtitle="طالب وطالبة"
            color="text-blue-300"
          />
          
          <StatItem
            icon={Target}
            title="المعدل العام"
            value={`${stats.averageGrade}%`}
            subtitle="متوسط درجات الأوائل"
            color="text-green-300"
          />
          
          <StatItem
            icon={Award}
            title="أعلى معدل"
            value={`${stats.highestGrade}%`}
            subtitle="الدرجة الأعلى المحققة"
            color="text-yellow-300"
          />
        </div>

        {/* إحصائيات التصنيف */}
        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
          <h3 className="font-cairo font-bold text-xl mb-4 text-center flex items-center justify-center gap-2">
            <Zap className="h-6 w-6 text-yellow-300" />
            توزيع الدرجات
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-500/20 rounded-lg border border-green-400/30">
              <div className="text-3xl font-bold text-green-300 font-cairo">{stats.excellentCount}</div>
              <div className="text-green-200 font-almarai">🌟 ممتاز (90%+)</div>
            </div>
            
            <div className="text-center p-4 bg-blue-500/20 rounded-lg border border-blue-400/30">
              <div className="text-3xl font-bold text-blue-300 font-cairo">{stats.veryGoodCount}</div>
              <div className="text-blue-200 font-almarai">⭐ جيد جداً (80-89%)</div>
            </div>
            
            <div className="text-center p-4 bg-yellow-500/20 rounded-lg border border-yellow-400/30">
              <div className="text-3xl font-bold text-yellow-300 font-cairo">{stats.goodCount}</div>
              <div className="text-yellow-200 font-almarai">👍 جيد (70-79%)</div>
            </div>
          </div>
        </div>

        {/* إحصائيات القسم الأول */}
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm p-6 rounded-xl border border-purple-400/30">
          <h3 className="font-cairo font-bold text-xl mb-3 text-center">🏆 القسم الأكثر تميزاً</h3>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-300 font-cairo mb-2">
              {stats.topDepartment}
            </div>
            <div className="text-purple-200 font-almarai">
              {stats.topDepartmentCount} من الأوائل
            </div>
          </div>
        </div>

        {/* إحصائيات الطالب الحالي */}
        {currentStudent && (
          <div className="bg-gradient-to-r from-gold-400/20 to-orange-400/20 backdrop-blur-sm p-6 rounded-xl border border-yellow-400/30">
            <h3 className="font-cairo font-bold text-xl mb-4 text-center flex items-center justify-center gap-2">
              <Award className="h-6 w-6 text-yellow-300" />
              إحصائياتك الشخصية
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-center p-4 bg-yellow-500/20 rounded-lg">
                <div className="text-3xl font-bold text-yellow-300 font-cairo">#{stats.currentRank}</div>
                <div className="text-yellow-200 font-almarai">ترتيبك بين الأوائل</div>
              </div>
              
              <div className="text-center p-4 bg-green-500/20 rounded-lg">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-3xl font-bold text-green-300 font-cairo">
                    {stats.currentGrade?.toFixed(2)}%
                  </span>
                  <Badge className={`${getGradeCategory(stats.currentGrade).color} text-white font-cairo`}>
                    {getGradeCategory(stats.currentGrade).emoji} {getGradeCategory(stats.currentGrade).text}
                  </Badge>
                </div>
                <div className="text-green-200 font-almarai">معدلك النهائي</div>
              </div>
            </div>
            
            <div className="mt-4 text-center bg-white/10 p-3 rounded-lg">
              <p className="text-white/90 font-almarai">
                🎯 أنت أفضل من {((stats.totalStudents - stats.currentRank) / stats.totalStudents * 100).toFixed(1)}% من الطلاب
              </p>
            </div>
          </div>
        )}

        {/* رسالة تحفيزية */}
        <div className="text-center bg-gradient-to-r from-cyan-400/20 to-blue-400/20 backdrop-blur-sm p-6 rounded-xl border border-cyan-400/30">
          <h3 className="font-cairo font-bold text-xl mb-3">💫 رسالة تحفيزية</h3>
          <p className="text-white/90 font-tajawal text-lg leading-relaxed">
            {currentStudent 
              ? `تهانينا ${currentStudent['اسم الطالب الرباعي']}! إنجازك الرائع يضعك ضمن نخبة الأوائل في العراق. استمر في التميز والإبداع! 🌟`
              : "كل طالب في هذه القائمة يمثل قصة نجاح ملهمة. هؤلاء هم قادة المستقبل ونجوم العراق الساطعة! ⭐"
            }
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default StatisticsCard

