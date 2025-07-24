import { Button } from '@/components/ui/button.jsx'
import { Printer, Download } from 'lucide-react'

const PrintButton = ({ student }) => {
  const generatePrintableContent = () => {
    const printWindow = window.open('', '_blank')
    const printContent = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>شهادة أوائل السادس المهني - ${student['اسم الطالب الرباعي']}</title>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Cairo', Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
          }
          
          .certificate {
            background: white;
            border-radius: 20px;
            padding: 40px;
            max-width: 800px;
            width: 100%;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            position: relative;
            overflow: hidden;
          }
          
          .certificate::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 10px;
            background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
          }
          
          .header {
            text-align: center;
            margin-bottom: 40px;
            border-bottom: 3px solid #667eea;
            padding-bottom: 20px;
          }
          
          .title {
            font-size: 2.5rem;
            font-weight: 900;
            color: #667eea;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
          }
          
          .subtitle {
            font-size: 1.2rem;
            color: #666;
            font-weight: 500;
          }
          
          .congratulations {
            text-align: center;
            font-size: 1.8rem;
            font-weight: 700;
            color: #f093fb;
            margin: 30px 0;
            padding: 20px;
            background: linear-gradient(135deg, #f093fb10, #667eea10);
            border-radius: 15px;
            border: 2px solid #f093fb30;
          }
          
          .student-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin: 40px 0;
          }
          
          .info-card {
            background: linear-gradient(135deg, #f8f9ff, #e8f0ff);
            padding: 25px;
            border-radius: 15px;
            border: 2px solid #667eea20;
            text-align: center;
          }
          
          .info-label {
            font-size: 1rem;
            color: #666;
            font-weight: 600;
            margin-bottom: 10px;
          }
          
          .info-value {
            font-size: 1.4rem;
            font-weight: 800;
            color: #667eea;
          }
          
          .rank-section {
            text-align: center;
            background: linear-gradient(135deg, #ffd700, #ffb347);
            color: #8b4513;
            padding: 30px;
            border-radius: 20px;
            margin: 30px 0;
            box-shadow: 0 10px 20px rgba(255, 215, 0, 0.3);
          }
          
          .rank-title {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 15px;
          }
          
          .rank-value {
            font-size: 3rem;
            font-weight: 900;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
          }
          
          .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #667eea20;
            color: #666;
          }
          
          .date {
            font-size: 1rem;
            margin-bottom: 10px;
          }
          
          .system-name {
            font-size: 1.1rem;
            font-weight: 600;
            color: #667eea;
          }
          
          .decorative-elements {
            position: absolute;
            top: 20px;
            right: 20px;
            font-size: 2rem;
            opacity: 0.1;
            color: #667eea;
          }
          
          @media print {
            body {
              background: white;
              padding: 0;
            }
            
            .certificate {
              box-shadow: none;
              border: 2px solid #667eea;
            }
          }
        </style>
      </head>
      <body>
        <div class="certificate">
          <div class="decorative-elements">🎓✨🏆</div>
          
          <div class="header">
            <h1 class="title">🎓 شهادة تقدير 🎓</h1>
            <p class="subtitle">أوائل الصف السادس المهني - العراق</p>
          </div>
          
          <div class="congratulations">
            🎉 مبروك! أنت من أوائل السادس المهني في العراق 🎉
          </div>
          
          <div class="student-info">
            <div class="info-card">
              <div class="info-label">⭐ اسم الطالب</div>
              <div class="info-value">${student['اسم الطالب الرباعي']}</div>
            </div>
            
            <div class="info-card">
              <div class="info-label">🎯 الرقم الامتحاني</div>
              <div class="info-value">${student['الرقم الامتحاني']}</div>
            </div>
            
            <div class="info-card">
              <div class="info-label">📊 المعدل</div>
              <div class="info-value">${student['المعدل'].toFixed(2)}%</div>
            </div>
            
            <div class="info-card">
              <div class="info-label">🏫 القسم</div>
              <div class="info-value">${student['القسم']}</div>
            </div>
          </div>
          
          <div class="rank-section">
            <div class="rank-title">🏆 التسلسل والترتيب</div>
            <div class="rank-value">المرتبة #${student['التسلسل']}</div>
          </div>
          
          <div class="footer">
            <div class="date">تاريخ الإصدار: ${new Date().toLocaleDateString('ar-EG')}</div>
            <div class="system-name">نظام أوائل السادس المهني المتطور - العراق 🇮🇶</div>
          </div>
        </div>
      </body>
      </html>
    `
    
    printWindow.document.write(printContent)
    printWindow.document.close()
    
    // انتظار تحميل المحتوى ثم طباعة
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print()
      }, 500)
    }
  }

  const downloadPDF = async () => {
    try {
      // إنشاء محتوى HTML للتحويل إلى PDF
      const element = document.createElement('div')
      element.innerHTML = `
        <div style="font-family: 'Cairo', Arial, sans-serif; direction: rtl; padding: 40px; background: white;">
          <div style="text-align: center; margin-bottom: 40px; border-bottom: 3px solid #667eea; padding-bottom: 20px;">
            <h1 style="font-size: 2.5rem; font-weight: 900; color: #667eea; margin-bottom: 10px;">🎓 شهادة تقدير 🎓</h1>
            <p style="font-size: 1.2rem; color: #666; font-weight: 500;">أوائل الصف السادس المهني - العراق</p>
          </div>
          
          <div style="text-align: center; font-size: 1.8rem; font-weight: 700; color: #f093fb; margin: 30px 0; padding: 20px; background: linear-gradient(135deg, #f093fb10, #667eea10); border-radius: 15px;">
            🎉 مبروك! أنت من أوائل السادس المهني في العراق 🎉
          </div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin: 40px 0;">
            <div style="background: #f8f9ff; padding: 25px; border-radius: 15px; text-align: center;">
              <div style="font-size: 1rem; color: #666; font-weight: 600; margin-bottom: 10px;">⭐ اسم الطالب</div>
              <div style="font-size: 1.4rem; font-weight: 800; color: #667eea;">${student['اسم الطالب الرباعي']}</div>
            </div>
            
            <div style="background: #f8f9ff; padding: 25px; border-radius: 15px; text-align: center;">
              <div style="font-size: 1rem; color: #666; font-weight: 600; margin-bottom: 10px;">🎯 الرقم الامتحاني</div>
              <div style="font-size: 1.4rem; font-weight: 800; color: #667eea;">${student['الرقم الامتحاني']}</div>
            </div>
            
            <div style="background: #f8f9ff; padding: 25px; border-radius: 15px; text-align: center;">
              <div style="font-size: 1rem; color: #666; font-weight: 600; margin-bottom: 10px;">📊 المعدل</div>
              <div style="font-size: 1.4rem; font-weight: 800; color: #667eea;">${student['المعدل'].toFixed(2)}%</div>
            </div>
            
            <div style="background: #f8f9ff; padding: 25px; border-radius: 15px; text-align: center;">
              <div style="font-size: 1rem; color: #666; font-weight: 600; margin-bottom: 10px;">🏫 القسم</div>
              <div style="font-size: 1.4rem; font-weight: 800; color: #667eea;">${student['القسم']}</div>
            </div>
          </div>
          
          <div style="text-align: center; background: linear-gradient(135deg, #ffd700, #ffb347); color: #8b4513; padding: 30px; border-radius: 20px; margin: 30px 0;">
            <div style="font-size: 1.5rem; font-weight: 700; margin-bottom: 15px;">🏆 التسلسل والترتيب</div>
            <div style="font-size: 3rem; font-weight: 900;">المرتبة #${student['التسلسل']}</div>
          </div>
          
          <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 2px solid #667eea20; color: #666;">
            <div style="font-size: 1rem; margin-bottom: 10px;">تاريخ الإصدار: ${new Date().toLocaleDateString('ar-EG')}</div>
            <div style="font-size: 1.1rem; font-weight: 600; color: #667eea;">نظام أوائل السادس المهني المتطور - العراق 🇮🇶</div>
          </div>
        </div>
      `
      
      // هنا يمكن إضافة مكتبة لتحويل HTML إلى PDF
      // للآن سنستخدم window.print كبديل
      generatePrintableContent()
      
    } catch (error) {
      console.error('خطأ في تحميل PDF:', error)
      // العودة إلى الطباعة العادية في حالة الخطأ
      generatePrintableContent()
    }
  }

  return (
    <div className="flex gap-2">
      <Button
        onClick={generatePrintableContent}
        className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-cairo font-bold"
      >
        <Printer className="h-5 w-5 ml-2" />
        طباعة الشهادة
      </Button>
      
      <Button
        onClick={downloadPDF}
        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-cairo font-bold"
      >
        <Download className="h-5 w-5 ml-2" />
        تحميل PDF
      </Button>
    </div>
  )
}

export default PrintButton

