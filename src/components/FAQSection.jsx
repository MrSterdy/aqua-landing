import { FAQ } from '@/components/FAQ'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export default function FAQSection() {
  const [consultationData, setConsultationData] = useState({
    name: '',
    phone: '',
    email: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null

  const handleConsultationDataChange = (field, value) => {
    setConsultationData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleConsultationSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/telegram/send-consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(consultationData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setConsultationData({
          name: '',
          phone: '',
          email: '',
        })
        setTimeout(() => {
          setSubmitStatus(null)
        }, 3000)
      }
      else {
        setSubmitStatus('error')
      }
    }
    catch (error) {
      console.error('Ошибка отправки:', error)
      setSubmitStatus('error')
    }
    finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="px-6 border-border">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-12 py-12">
        <h2 className="text-3xl sm:text-4xl font-bold px-6 sm:px-8 py-4 sm:py-6 border-dashed border-[1px] text-center grid-bg rounded-md">
          Часто задаваемые вопросы
        </h2>

        <FAQ />

        <form
          onSubmit={handleConsultationSubmit}
          className="w-full bg-linear-to-tr from-primary/50 to-sky-600 flex flex-col gap-6 sm:gap-10 rounded-xl px-10 py-6 lg:px-16 lg:py-12 mt-4"
        >
          <div className="flex flex-col gap-2 text-white">
            <h2 className="text-3xl sm:text-4xl font-bold">Получите консультацию</h2>
            <p className="text-base sm:text-lg">Свяжитесь с нашими менеджерами и получите ответы на все ваши вопросы.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <label>
              <Input
                placeholder="Имя"
                className="placeholder:text-white text-white focus-visible:ring-0 focus-visible:border-input h-10"
                value={consultationData.name}
                onChange={e => handleConsultationDataChange('name', e.target.value)}
                required
              />
            </label>
            <label>
              <Input
                placeholder="Номер телефона"
                type="tel"
                className="placeholder:text-white text-white focus-visible:ring-0 focus-visible:border-input h-10"
                value={consultationData.phone}
                onChange={e => handleConsultationDataChange('phone', e.target.value)}
                required
              />
            </label>
            <label>
              <Input
                placeholder="Электронная почта"
                type="email"
                className="placeholder:text-white text-white focus-visible:ring-0 focus-visible:border-input h-10"
                value={consultationData.email}
                onChange={e => handleConsultationDataChange('email', e.target.value)}
                required
              />
            </label>
            <Button
              type="submit"
              variant="secondary"
              className="h-10"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Отправляем...' : 'Получить консультацию'}
            </Button>
          </div>

          {submitStatus === 'success' && (
            <div className="text-green-200 text-sm -mt-4 md:-mt-6">
              Запрос на консультацию успешно отправлен! Мы свяжемся с вами в ближайшее время.
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="text-red-200 text-sm -mt-4 md:-mt-6">
              Ошибка при отправке запроса. Попробуйте еще раз.
            </div>
          )}

          <span className="text-sm text-muted-foreground -mt-4 md:-mt-8">
            Нажимая на кнопку, вы принимаете
            {' '}
            <a className="text-sky-500" target="_blank" href="/docs/polozhenie">Положение</a>
            {' '}
            и
            {' '}
            <a className="text-sky-500" target="_blank" href="/docs/soglasie">Согласие</a>
            {' '}
            на обработку персональных данных
          </span>
        </form>
      </div>
    </section>
  )
}
