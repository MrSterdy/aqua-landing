import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { LuCalculator, LuMoveDown, LuMoveLeft, LuMoveRight, LuMoveUp, LuNotebookText, LuPencil } from 'react-icons/lu'

export default function CalculatePrice() {
  const [rectangleLength, setRectangleLength] = useState(1)
  const [rectangleWidth, setRectangleWidth] = useState(1)
  const [term, setTerm] = useState(1)

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null

  const handleKeyDown = (e) => {
    const invalidKeys = ['-', '+', 'e', 'E', '.', ',']
    if (invalidKeys.includes(e.key)) {
      e.preventDefault()
    }
  }

  const handleDimensionChange = (value, setter) => {
    if (/\D/.test(value))
      return

    const numValue = Number.parseInt(value, 10)

    if (value === '' || (numValue >= 1 && numValue <= 9999999)) {
      setter(value)
    }
  }

  const handleTermChange = (value) => {
    if (/\D/.test(value))
      return

    const numValue = Number.parseInt(value, 10)

    if (value === '' || (numValue >= 1 && numValue <= 20)) {
      setTerm(value)
    }
  }

  const handleFormDataChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const calculationData = {
        length: rectangleLength,
        width: rectangleWidth,
        term,
        area: rectangleLength * rectangleWidth,
      }

      const response = await fetch('/api/telegram/send-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          calculation: calculationData,
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          phone: '',
          email: '',
        })
        setTimeout(() => {
          setSubmitStatus(null)
        }, 1500)
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
    <section className="px-6 border-border border-b-1 border-dashed overflow-hidden">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-8 sm:gap-10 py-12">
        <div className="flex flex-col gap-4">
          <h2 className="w-fit text-3xl text-center lg:text-left sm:text-4xl uppercase tracking-widest">
            <span className="text-primary">//</span>
            {' '}
            Рассчитать стоимость аренды
          </h2>
          <p className="text-muted-foreground text-base text-center lg:text-left sm:text-lg text-balance">
            Калькулятор для расчета арендной платы и задатка на аукционе за договор водопользования.
          </p>
        </div>
        <div className="flex w-full relative justify-center lg:justify-start lg:self-start">
          <div className="flex gap-16">
            <div className="flex flex-col gap-4">
              <Label className="flex flex-col gap-2 items-start">
                <span className="text-base">Длина (м)</span>
                <Input
                  min={1}
                  max={9999999}
                  placeholder="100"
                  className="w-fit xs:w-auto sm:min-w-96 lg:min-w-86 h-10"
                  type="number"
                  value={rectangleLength}
                  onInput={e => handleDimensionChange(e.target.value, setRectangleLength)}
                  onKeyDown={handleKeyDown}
                />
              </Label>
              <Label className="flex flex-col gap-2 items-start">
                <span className="text-base">Ширина (м)</span>
                <Input
                  min={1}
                  max={9999999}
                  placeholder="100"
                  className="w-fit xs:w-auto sm:min-w-96 lg:min-w-86 h-10"
                  type="number"
                  value={rectangleWidth}
                  onInput={e => handleDimensionChange(e.target.value, setRectangleWidth)}
                  onKeyDown={handleKeyDown}
                />
              </Label>
              <Label className="flex flex-col gap-2 items-start">
                <span className="text-base">Срок (лет)</span>
                <Input
                  min={1}
                  max={20}
                  placeholder="10"
                  className="w-fit xs:w-auto sm:min-w-96 lg:min-w-86 h-10"
                  type="number"
                  value={term}
                  onInput={e => handleTermChange(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </Label>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full cursor pointer">Рассчитать</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Оставьте свои контактные данные</DialogTitle>
                    <DialogDescription>Укажите ваши контактные данные, чтобы мы могли связаться с вами.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Label className="flex flex-col gap-2 items-start">
                      <span>Имя</span>
                      <Input
                        type="text"
                        placeholder="Иванов Иван"
                        value={formData.name}
                        onChange={e => handleFormDataChange('name', e.target.value)}
                        required
                      />
                    </Label>
                    <Label className="flex flex-col gap-2 items-start">
                      <span>Телефон</span>
                      <Input
                        type="tel"
                        placeholder="+7 (999) 999-99-99"
                        value={formData.phone}
                        onChange={e => handleFormDataChange('phone', e.target.value)}
                        required
                      />
                    </Label>
                    <Label className="flex flex-col gap-2 items-start">
                      <span>Email (необязательно)</span>
                      <Input
                        type="email"
                        placeholder="ivanov@example.ru"
                        value={formData.email}
                        onChange={e => handleFormDataChange('email', e.target.value)}
                      />
                    </Label>

                    {submitStatus === 'success' && (
                      <div className="text-green-600 text-sm">
                        Заявка успешно отправлена!
                      </div>
                    )}

                    {submitStatus === 'error' && (
                      <div className="text-red-600 text-sm">
                        Ошибка при отправке заявки. Попробуйте еще раз.
                      </div>
                    )}

                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Отправляем...' : 'Отправить'}
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      Нажимая на кнопку, вы принимаете
                      {' '}
                      <a className="text-primary" target="_blank" href="/docs/polozhenie">Положение</a>
                      {' '}
                      и
                      {' '}
                      <a className="text-primary" target="_blank" href="/docs/soglasie">Согласие</a>
                      {' '}
                      на обработку персональных данных
                    </span>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex-col gap-4 mt-8 self-center hidden lg:flex">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-primary/15 border-1 border-dashed grid-bg border-primary size-60 rounded-md"></div>
                <div className="flex">
                  <div className="h-full flex flex-col items-center relative w-fit">
                    <LuMoveUp className="size-6 relative -bottom-[2px] shrink-0 text-primary/50" />
                    <div className="bg-primary/50 h-full w-[2px] flex-grow relative"></div>
                    <LuMoveDown className="size-6 relative -top-[2px] shrink-0 text-primary/50" />
                  </div>
                  <span className="[writing-mode:sideways-lr] text-center text-muted-foreground">
                    {rectangleLength || 0}
                    {' '}
                    м.
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="h-full flex items-center relative">
                    <LuMoveLeft className="size-6 left-[2px] relative text-primary/50" />
                    <div className="bg-primary/50 h-[2px] flex-grow relative"></div>
                    <LuMoveRight className="size-6 -left-[2px] relative text-primary/50" />
                  </div>
                  <span className="text-center text-muted-foreground">
                    {rectangleWidth || 0}
                    {' '}
                    м.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden xl:contents">
            <LuCalculator strokeWidth={1.0} className="absolute right-0 top-0 text-primary size-64 -rotate-45" />
            <LuPencil strokeWidth={0.5} className="absolute right-58 -top-10 text-primary opacity-75 size-32 rotate-180" />
            <LuNotebookText strokeWidth={0.5} className="absolute right-64 bottom-0 text-primary opacity-75 size-32 rotate-45" />
          </div>
        </div>
      </div>
    </section>
  )
}
