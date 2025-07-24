import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Share2, Copy, Check, Download, Facebook, Twitter, MessageCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card.jsx'

const ShareButton = ({ student }) => {
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [copied, setCopied] = useState(false)

  const shareText = `🎉 مبروك! حققت نتيجة متميزة في الامتحانات الرسمية
📊 المعدل: ${student['المعدل'].toFixed(2)}%
🏆 المرتبة: #${student['التسلسل']}
👤 الاسم: ${student['اسم الطالب الرباعي']}
🎓 القسم: ${student['القسم']}

#نتائج_الطلاب #العراق #النجاح`

  const shareUrl = window.location.href

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('فشل في النسخ:', err)
    }
  }

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`
    window.open(url, '_blank', 'width=600,height=400')
  }

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    window.open(url, '_blank', 'width=600,height=400')
  }

  const shareOnWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText + '\n' + shareUrl)}`
    window.open(url, '_blank')
  }

  const downloadResult = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    canvas.width = 800
    canvas.height = 600
    
    // خلفية متدرجة
    const gradient = ctx.createLinearGradient(0, 0, 0, 600)
    gradient.addColorStop(0, '#667eea')
    gradient.addColorStop(1, '#764ba2')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 800, 600)
    
    // النص
    ctx.fillStyle = 'white'
    ctx.font = 'bold 32px Cairo, Arial'
    ctx.textAlign = 'center'
    ctx.fillText('🎉 نتيجة متميزة 🎉', 400, 100)
    
    ctx.font = '24px Cairo, Arial'
    ctx.fillText(`الاسم: ${student['اسم الطالب الرباعي']}`, 400, 200)
    ctx.fillText(`المعدل: ${student['المعدل'].toFixed(2)}%`, 400, 250)
    ctx.fillText(`المرتبة: #${student['التسلسل']}`, 400, 300)
    ctx.fillText(`القسم: ${student['القسم']}`, 400, 350)
    
    ctx.font = '18px Cairo, Arial'
    ctx.fillText('نظام نتائج الطلاب - العراق', 400, 500)
    
    // تحويل إلى صورة وتحميلها
    const link = document.createElement('a')
    link.download = `نتيجة_${student['اسم الطالب الرباعي']}.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <div className="relative">
      <Button
        onClick={() => setShowShareMenu(!showShareMenu)}
        className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-cairo font-bold"
      >
        <Share2 className="h-5 w-5 ml-2" />
        مشاركة النتيجة
      </Button>

      {showShareMenu && (
        <Card className="absolute top-full mt-2 right-0 z-50 w-80 bg-white/95 backdrop-blur-sm border border-white/20">
          <CardContent className="p-4 space-y-3">
            <h3 className="font-cairo font-bold text-center mb-4">مشاركة النتيجة</h3>
            
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={shareOnFacebook}
                className="bg-blue-600 hover:bg-blue-700 text-white font-cairo"
                size="sm"
              >
                <Facebook className="h-4 w-4 ml-1" />
                فيسبوك
              </Button>
              
              <Button
                onClick={shareOnTwitter}
                className="bg-sky-500 hover:bg-sky-600 text-white font-cairo"
                size="sm"
              >
                <Twitter className="h-4 w-4 ml-1" />
                تويتر
              </Button>
              
              <Button
                onClick={shareOnWhatsApp}
                className="bg-green-600 hover:bg-green-700 text-white font-cairo"
                size="sm"
              >
                <MessageCircle className="h-4 w-4 ml-1" />
                واتساب
              </Button>
              
              <Button
                onClick={downloadResult}
                className="bg-purple-600 hover:bg-purple-700 text-white font-cairo"
                size="sm"
              >
                <Download className="h-4 w-4 ml-1" />
                تحميل
              </Button>
            </div>
            
            <Button
              onClick={copyToClipboard}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-cairo"
              size="sm"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 ml-1 text-green-400" />
                  تم النسخ!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 ml-1" />
                  نسخ النص
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default ShareButton

