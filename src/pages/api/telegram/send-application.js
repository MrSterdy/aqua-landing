import process from 'node:process'

export async function POST({ request }) {
  try {
    const data = await request.json()

    if (!data.name || !data.phone || !data.email || !data.calculation) {
      return new Response(JSON.stringify({ error: 'Недостаточно данных' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('Не настроены переменные окружения для Telegram')
      return new Response(JSON.stringify({ error: 'Ошибка конфигурации сервера' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const message = `🆕 *Новая заявка на расчет аренды*

👤 *Контактные данные:*
• Имя: ${data.name}
• Телефон: ${data.phone}
• Email: ${data.email}

📐 *Параметры расчета:*
• Длина: ${data.calculation.length} м
• Ширина: ${data.calculation.width} м
• Площадь: ${data.calculation.area} м²
• Срок аренды: ${data.calculation.term} лет

📅 Дата подачи: ${new Date().toLocaleString('ru-RU')}`

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`

    const telegramResponse = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    })

    if (!telegramResponse.ok) {
      const error = await telegramResponse.text()
      console.error('Ошибка отправки в Telegram:', error)
      return new Response(JSON.stringify({ error: 'Ошибка отправки сообщения' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }
  catch (error) {
    console.error('Ошибка обработки заявки:', error)
    return new Response(JSON.stringify({ error: 'Внутренняя ошибка сервера' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
