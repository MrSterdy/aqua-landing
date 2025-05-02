import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqItems = [
  {
    id: 'item-1',
    question: 'Какие документы необходимы для оформления водопользования?',
    answer: 'Для оформления водопользования необходимы следующие документы: заявление, правоустанавливающие документы на земельный участок, проект водопользования, согласования с контролирующими органами.',
  },
  {
    id: 'item-2',
    question: 'Сколько времени занимает оформление документов?',
    answer: 'Сроки оформления документов зависят от сложности проекта и региона, но в среднем процесс занимает от 2 до 6 месяцев.',
  },
  {
    id: 'item-3',
    question: 'В каких регионах вы работаете?',
    answer: 'Мы работаем во всех регионах России, оказывая услуги по оформлению водопользования и согласованию документов.',
  },
]

export function FAQ() {
  return (
    <Accordion type="single" collapsible>
      {faqItems.map(item => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger className="text-base sm:text-lg">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-sm sm:text-base">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
