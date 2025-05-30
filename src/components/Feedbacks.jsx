import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { LuStar } from 'react-icons/lu'

const feedbacks = [
  {
    name: 'Пользователь',
    feedback: 'Профессионал своего дела! Я обращался с вопросом постройки и оформления дома у водоёма(пруда). В итоге получил полную информацию и поэтапное решение моего вопроса, которую никто в моем регионе дать не мог. Однозначно советую!!! Спасибо!!!',
  },
  {
    name: 'Владимир',
    feedback: 'Здравствуйте друзья! Смело можете обращаться в эту компанию. Получите грамотную консультацию бесплатно.',
  },
  {
    name: 'Авто Синдикат',
    feedback: 'Обратился за оформлением воды напротив своего участка для размещения понтона, все разъяснили, и выполнили профессионально свою работу. Теперь у меня есть договор водопользования! Огромная благодарность! Рекомендую всем.',
  },
  {
    name: 'Пользователь',
    feedback: 'Здравствуйте, Батыр😊😊😊👏👏👏!!! 👍👍👍Спасибо Вам огромное и за поздравление и за сотрудничество!!! Очень довольны всем!!!',
  },
]

export default function Feedbacks() {
  return (
    <Carousel opts={{ loop: true }} className="w-full" plugins={[Autoplay({ stopOnMouseEnter: true, stopOnInteraction: false })]}>
      <CarouselContent className="-ml-12 flex">
        {feedbacks.map((feedback, index) => (
          <CarouselItem className="md:basis-1/2 xl:basis-1/3 pl-12" key={index}>
            <div className="flex flex-col gap-2 rounded-lg h-full justify-between border-[1px] sm:border-2 border-primary/50 bg-primary/10 px-6 py-4">
              <div className="flex flex-col gap-2">
                <h4 className="text-2xl">{feedback.name}</h4>
                <p className="text-balance text-muted-foreground">{feedback.feedback}</p>
              </div>

              <span className="inline-flex text-sm items-center gap-2 text-muted-foreground">
                {Array.from({ length: 5 }).map((_, index) => (
                  <LuStar key={index} className="size-5 text-yellow-500 fill-yellow-500" />
                ))}
              </span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
