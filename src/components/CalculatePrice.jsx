import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useState } from 'react'
import { LuCalculator, LuMoveDown, LuMoveLeft, LuMoveRight, LuMoveUp, LuNotebookText, LuPencil } from 'react-icons/lu'

export default function CalculatePrice() {
  const [rectangleLength, setRectangleLength] = useState(0)
  const [rectangleWidth, setRectangleWidth] = useState(0)

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
                  placeholder="100"
                  className="w-fit xs:w-auto sm:min-w-96 lg:min-w-86 h-10"
                  type="number"
                  value={rectangleLength}
                  onInput={e => setRectangleLength(e.target.value)}
                />
              </Label>
              <Label className="flex flex-col gap-2 items-start">
                <span className="text-base">Ширина (м)</span>
                <Input
                  placeholder="100"
                  className="w-fit xs:w-auto sm:min-w-96 lg:min-w-86 h-10"
                  type="number"
                  value={rectangleWidth}
                  onInput={e => setRectangleWidth(e.target.value)}
                />
              </Label>
              <Label className="flex flex-col gap-2 items-start">
                <span className="text-base">Срок (дн)</span>
                <Input placeholder="30" className="w-fit xs:w-auto sm:min-w-96 lg:min-w-86 h-10" type="number" />
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
                  <form className="flex flex-col gap-4">
                    <Label className="flex flex-col gap-2 items-start">
                      <span>Имя</span>
                      <Input type="text" placeholder="Иванов Иван" />
                    </Label>
                    <Label className="flex flex-col gap-2 items-start">
                      <span>Телефон</span>
                      <Input type="tel" placeholder="+7 (999) 999-99-99" />
                    </Label>
                    <Label className="flex flex-col gap-2 items-start">
                      <span>Email</span>
                      <Input type="email" placeholder="ivanov@example.ru" />
                    </Label>
                    <Button type="submit">Отправить</Button>
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
                    {rectangleLength}
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
                    {rectangleWidth}
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
